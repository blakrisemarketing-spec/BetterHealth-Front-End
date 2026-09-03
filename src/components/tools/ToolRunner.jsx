import Stepper from "./Stepper";
import GenotypeResult, { GenotypeQuestions } from "./GenotypeTool";
import DiabetesRiskResult from "./DiabetesRiskTool";
import HeartAgeResult from "./HeartAgeTool";
import BmiWaistResult from "./BmiWaistTool";
import { STEPS as FINDRISC_STEPS, computeFindrisc } from "../../data/tools/diabetes-risk";
import { STEPS as HEART_STEPS, computeHeartAge } from "../../data/tools/heart-age";
import { STEPS as BMI_WAIST_STEPS, computeBmiWaist } from "../../data/tools/bmi-waist";

/**
 * Slug -> question UI. The genotype tool answers on one screen; the other two
 * are long enough to need one question per screen, so they drive the shared
 * Stepper from their own STEPS and hand back a scored result.
 */
export function ToolQuestions({ slug, onFinish }) {
  if (slug === "genotype-compatibility") return <GenotypeQuestions onFinish={onFinish} />;
  if (slug === "diabetes-risk")
    return <Stepper steps={FINDRISC_STEPS} onFinish={(v) => onFinish(computeFindrisc(v))} />;
  if (slug === "heart-age")
    return <Stepper steps={HEART_STEPS} onFinish={(v) => onFinish(computeHeartAge(v))} />;
  if (slug === "bmi-waist")
    return <Stepper steps={BMI_WAIST_STEPS} onFinish={(v) => onFinish(computeBmiWaist(v))} />;
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
