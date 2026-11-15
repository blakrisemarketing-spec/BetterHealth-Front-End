// The BetterHealth app's screens, as real screenshots taken from the app in
// the iOS Simulator on 2026-11-15 (store build branch, staging data for the
// demo patient "Ama Mensah"; no real patient's data). Files live in
// public/app-screens/. The component names are kept so every page that used
// the old coded mock-ups now shows the real app.

function Shot({ src }) {
  return (
    <img
      src={`/app-screens/${src}.webp`}
      alt=""
      decoding="async"
      draggable="false"
      className="absolute inset-0 w-full h-full object-cover object-top select-none"
    />
  );
}

export function HomeScreen() {
  return <Shot src="home-v2" />;
}

export function FoodScreen() {
  return <Shot src="food-v1" />;
}

export function FoodMealsScreen() {
  return <Shot src="food-meals-v1" />;
}

export function FoodTotalScreen() {
  return <Shot src="food-v1" />;
}

export function ReadingsScreen() {
  return <Shot src="bp-v1" />;
}

export function ResultsScreen() {
  return <Shot src="myhealth-v1" />;
}

export function MedicinesScreen() {
  return <Shot src="medicines-v1" />;
}

export function WaterScreen() {
  return <Shot src="water-v2" />;
}

export function ExerciseScreen() {
  return <Shot src="exercise-v1" />;
}

export function PlanScreen() {
  return <Shot src="onb-plan-v1" />;
}
