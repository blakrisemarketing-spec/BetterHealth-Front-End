import { useSyncExternalStore } from "react";
import { PANEL_CODES, SINGLE_TEST_CODES } from "../data/app-catalogue";
import { normalisePanelPrices, normaliseTestPrices } from "./pricing-normalize";
import pricingSnapshot from "../data/pricing-snapshot.json";

// Prices baked at build time by the nightly refresh job
// (scripts/build-pricing-snapshot.mjs). Used as the initial store value so the
// first paint shows real backend prices with no API round-trip and no flash of
// the hardcoded fallbacks. The live background refresh below still runs to catch
// any intra-day changes.
const STATIC_SNAPSHOT = {
  fetchedAt: 0,
  panelsByCode: pricingSnapshot?.panelsByCode || {},
  testsByCode: pricingSnapshot?.testsByCode || {},
};

const DEFAULT_CATALOGUE_BASE = "https://app.betterhealth.africa/api/public";
const CATALOGUE_BASE = (
  import.meta.env.VITE_PUBLIC_CATALOGUE_API_BASE ||
  (import.meta.env.DEV ? "/api/public" : DEFAULT_CATALOGUE_BASE)
).replace(/\/$/, "");
const CATALOGUE_COUNTRY = import.meta.env.VITE_PUBLIC_CATALOGUE_COUNTRY || "Ghana";
const STORAGE_KEY = `bh_public_catalogue_prices_v1:${CATALOGUE_COUNTRY}`;
const REFRESH_AFTER_MS = 24 * 60 * 60 * 1000;
const MAX_CACHE_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const API_TIMEOUT_MS = 10000;

let snapshot = readCachedCatalogue() || STATIC_SNAPSHOT;
let refreshPromise = null;
let refreshQueued = false;
const listeners = new Set();

function hasBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readCachedCatalogue() {
  if (!hasBrowserStorage()) return null;

  try {
    const cached = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (!cached?.fetchedAt || Date.now() - cached.fetchedAt > MAX_CACHE_AGE_MS) {
      return null;
    }
    return cached;
  } catch {
    return null;
  }
}

function writeCachedCatalogue(nextSnapshot) {
  if (!hasBrowserStorage()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSnapshot));
  } catch {
    // Storage can be unavailable in private browsing or embedded contexts.
  }
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function shouldRefresh(force) {
  if (force) return true;
  if (!snapshot?.fetchedAt) return true;
  return Date.now() - snapshot.fetchedAt > REFRESH_AFTER_MS;
}

function scheduleRefresh(force = false) {
  if (refreshPromise || refreshQueued || !shouldRefresh(force)) return refreshPromise;
  if (typeof window === "undefined") return null;

  refreshQueued = true;
  const run = () => {
    refreshQueued = false;
    refreshPromise = fetchPricingCatalogue()
      .then((nextSnapshot) => {
        snapshot = nextSnapshot;
        writeCachedCatalogue(nextSnapshot);
        notifyListeners();
        return nextSnapshot;
      })
      .catch(() => snapshot)
      .finally(() => {
        refreshPromise = null;
      });
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 1500 });
  } else {
    window.setTimeout(run, 1);
  }

  return refreshPromise;
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return null;
}

function subscribe(listener) {
  listeners.add(listener);
  scheduleRefresh();

  return () => {
    listeners.delete(listener);
  };
}

async function getJson(path) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  const url = `${CATALOGUE_BASE}/${path}?country=${encodeURIComponent(CATALOGUE_COUNTRY)}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "no-cache",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

async function fetchPricingCatalogue() {
  const [panelsResult, testsResult] = await Promise.allSettled([
    getJson("disease-panels"),
    getJson("diagnostic-tests"),
  ]);

  if (panelsResult.status === "rejected" && testsResult.status === "rejected") {
    throw panelsResult.reason;
  }

  return {
    fetchedAt: Date.now(),
    panelsByCode:
      panelsResult.status === "fulfilled"
        ? normalisePanelPrices(panelsResult.value)
        : snapshot?.panelsByCode || {},
    testsByCode:
      testsResult.status === "fulfilled"
        ? normaliseTestPrices(testsResult.value)
        : snapshot?.testsByCode || {},
  };
}

export function usePricingCatalogue() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function refreshPricingCatalogue({ force = false } = {}) {
  return scheduleRefresh(force);
}

export function panelPrice(pricingCatalogue, slug, fallback) {
  const code = String(PANEL_CODES[slug] || slug || "").toLowerCase();
  return pricingCatalogue?.panelsByCode?.[code]?.formatted || fallback;
}

export function singleTestPrice(pricingCatalogue, slug, fallback) {
  const code = String(SINGLE_TEST_CODES[slug] || "").toUpperCase();
  return pricingCatalogue?.testsByCode?.[code]?.formatted || fallback;
}

export function withBackendPanelPrice(panel, pricingCatalogue) {
  if (!panel) return panel;
  return {
    ...panel,
    price: panelPrice(pricingCatalogue, panel.slug, panel.price),
  };
}

export function withBackendPanelPrices(panels, pricingCatalogue) {
  return panels.map((panel) => withBackendPanelPrice(panel, pricingCatalogue));
}

export function withBackendSingleTestPrice(test, pricingCatalogue) {
  if (!test) return test;
  return {
    ...test,
    price: singleTestPrice(pricingCatalogue, test.slug, test.price),
  };
}

export function withBackendSingleTestPrices(tests, pricingCatalogue) {
  return tests.map((test) => withBackendSingleTestPrice(test, pricingCatalogue));
}

export function withBackendPricingPage(pricingPage, pricingCatalogue) {
  return {
    ...pricingPage,
    singleTests: {
      ...pricingPage.singleTests,
      examples: pricingPage.singleTests.examples.map((test) => ({
        ...test,
        price: preservePricePrefix(
          test.price,
          singleTestPrice(pricingCatalogue, test.slug, test.price),
        ),
      })),
    },
  };
}

function preservePricePrefix(fallback, nextPrice) {
  if (!nextPrice || nextPrice === fallback) return fallback;
  return /^from\s+/i.test(fallback) ? `from ${nextPrice}` : nextPrice;
}
