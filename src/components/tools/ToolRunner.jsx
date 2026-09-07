import Stepper from "./Stepper";
import InheritanceResult from "./InheritanceTool";
import DiabetesRiskResult from "./DiabetesRiskTool";
import HeartAgeResult from "./HeartAgeTool";
import BmiWaistResult from "./BmiWaistTool";
import KidneyCheckResult from "./KidneyCheckTool";
import {
  BMI_PARTS,
  DIABETES_PARTS,
  HEART_PARTS,
  INHERITANCE_PARTS,
  KIDNEY_PARTS,
  computeBmiFull,
  computeDiabetesFull,
  computeHeartFull,
  computeInheritanceFull,
  computeKidneyFull,
} from "../../data/tools/compose";

// The inheritance flow opens on genotype already ticked, because that is what
// the ad promised and what most people came for. Everything else is opt-in.
const INHERITANCE_INITIAL = { traits: ["genotype"] };

/**
 * Slug -> question UI. All five tools drive the shared Stepper through parts.
 * Part 1 is the validated instrument's own STEPS, untouched; later parts are
 * the descriptive or additional-trait sections, and compute*Full staples them
 * together without changing the instrument's output (src/data/tools/compose.js).
 */
export function ToolQuestions({ slug, onFinish }) {
  if (slug === "genotype-compatibility")
    return (
      <Stepper
        parts={INHERITANCE_PARTS}
        initialValues={INHERITANCE_INITIAL}
        onFinish={(v) => onFinish(computeInheritanceFull(v))}
      />
    );
  if (slug === "diabetes-risk")
    return <Stepper parts={DIABETES_PARTS} onFinish={(v) => onFinish(computeDiabetesFull(v))} />;
  if (slug === "heart-age") return <Stepper parts={HEART_PARTS} onFinish={(v) => onFinish(computeHeartFull(v))} />;
  if (slug === "bmi-waist") return <Stepper parts={BMI_PARTS} onFinish={(v) => onFinish(computeBmiFull(v))} />;
  if (slug === "kidney-check") return <Stepper parts={KIDNEY_PARTS} onFinish={(v) => onFinish(computeKidneyFull(v))} />;
  return null;
}

/** Slug -> result UI. Rendered only after a successful lead submit. */
export default function ToolResult({ slug, result, tool, panel }) {
  if (slug === "genotype-compatibility") return <InheritanceResult result={result} tool={tool} />;
  if (slug === "diabetes-risk") return <DiabetesRiskResult result={result} tool={tool} panel={panel} />;
  if (slug === "heart-age") return <HeartAgeResult result={result} tool={tool} panel={panel} />;
  if (slug === "bmi-waist") return <BmiWaistResult result={result} tool={tool} panel={panel} />;
  if (slug === "kidney-check") return <KidneyCheckResult result={result} tool={tool} panel={panel} />;
  return null;
}
