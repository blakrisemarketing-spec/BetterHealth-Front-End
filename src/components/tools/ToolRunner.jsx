import Stepper from "./Stepper";
import GenotypeResult, { GenotypeQuestions } from "./GenotypeTool";
import DiabetesRiskResult from "./DiabetesRiskTool";
import HeartAgeResult from "./HeartAgeTool";
import BmiWaistResult from "./BmiWaistTool";
import {
  BMI_PARTS,
  DIABETES_PARTS,
  HEART_PARTS,
  computeBmiFull,
  computeDiabetesFull,
  computeHeartFull,
} from "../../data/tools/compose";

/**
 * Slug -> question UI. The genotype tool answers on two screens of its own;
 * the other three drive the shared Stepper through two parts each. Part 1 is
 * the validated instrument's own STEPS, untouched; Part 2 is the descriptive
 * section, and compute*Full staples the two together without changing the
 * instrument's output (src/data/tools/compose.js).
 */
export function ToolQuestions({ slug, onFinish }) {
  if (slug === "genotype-compatibility") return <GenotypeQuestions onFinish={onFinish} />;
  if (slug === "diabetes-risk")
    return <Stepper parts={DIABETES_PARTS} onFinish={(v) => onFinish(computeDiabetesFull(v))} />;
  if (slug === "heart-age") return <Stepper parts={HEART_PARTS} onFinish={(v) => onFinish(computeHeartFull(v))} />;
  if (slug === "bmi-waist") return <Stepper parts={BMI_PARTS} onFinish={(v) => onFinish(computeBmiFull(v))} />;
  return null;
}

/** Slug -> result UI. Rendered only after a successful lead submit. */
export default function ToolResult({ slug, result, tool, panel }) {
  if (slug === "genotype-compatibility") return <GenotypeResult result={result} tool={tool} />;
  if (slug === "diabetes-risk") return <DiabetesRiskResult result={result} tool={tool} panel={panel} />;
  if (slug === "heart-age") return <HeartAgeResult result={result} tool={tool} panel={panel} />;
  if (slug === "bmi-waist") return <BmiWaistResult result={result} tool={tool} panel={panel} />;
  return null;
}
