// The phone screens the marketing pages show. Each entry is either a coded
// mockup ({ key, node, alt }) or, once we have real store screenshots, an
// image ({ src, alt }); PhoneFrame renders both.
import { HomeScreen, FoodScreen, ReadingsScreen, ResultsScreen, MedicinesScreen } from "./AppScreenMockups";

export const APP_SCREENS = {
  home: { key: "home", node: <HomeScreen />, alt: "BetterHealth app home: food, water and exercise rings and today's three healthy-day goals" },
  food: { key: "food", node: <FoodScreen />, alt: "Food log with hausa koko, koose, waakye and egg" },
  readings: { key: "readings", node: <ReadingsScreen />, alt: "Blood pressure readings falling over a week" },
  results: { key: "results", node: <ResultsScreen />, alt: "My Health: lab results with a health score and each result against its range" },
  medicines: { key: "medicines", node: <MedicinesScreen />, alt: "Medicine reminders with doses marked taken" },
};

export const heroAppScreens = [APP_SCREENS.home, APP_SCREENS.food, APP_SCREENS.readings, APP_SCREENS.results];
