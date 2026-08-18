/**
 * "Other" is stored as the literal word plus a sibling `__other` field while the
 * form is open, because that is what the chips need to render a selected state.
 * Flatten before sending: a consultant reading "Other" learns nothing.
 */
export function flattenAnswers(questions, answers) {
  const out = { ...answers };
  for (const q of questions) {
    if (q.other && answers[q.id] === "Other") {
      out[q.id] = (answers[`${q.id}__other`] || "").trim() || "Other";
    }
    delete out[`${q.id}__other`];
  }
  for (const k of Object.keys(out)) {
    if (!String(out[k] ?? "").trim()) delete out[k];
  }
  return out;
}

export function missingRequired(questions, answers) {
  return questions.filter((q) => q.required && !String(answers[q.id] || "").trim());
}
