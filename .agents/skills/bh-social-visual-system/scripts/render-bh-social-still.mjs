#!/usr/bin/env node
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const [, , inputArg, outputArg, widthArg = "1080", heightArg = "1350"] = process.argv;

if (!inputArg || !outputArg) {
  console.error("Usage: render-bh-social-still.mjs <input-html> <output-png> [width] [height]");
  process.exit(1);
}

const mediaRoot = process.env.BH_MEDIA_ROOT || "/Users/greatdamzi/Documents/01. GitHub/BetterHealth-Media";
const renderer = path.join(mediaRoot, "scripts/render-social-still.mjs");

if (!existsSync(renderer)) {
  console.error(`BetterHealth Media renderer not found: ${renderer}`);
  console.error("Set BH_MEDIA_ROOT to the BetterHealth-Media repository path.");
  process.exit(1);
}

const result = spawnSync(
  process.execPath,
  [renderer, inputArg, outputArg, widthArg, heightArg],
  {
    cwd: mediaRoot,
    stdio: "inherit",
    env: process.env,
  },
);

process.exit(result.status ?? 1);
