// Scoring for the "Which test do I need?" quiz. Kept out of Quiz.jsx so the
// component file only exports a component (react-refresh lint rule) and so the
// page can re-score without rendering.

/**
 * @param {{ questions: Array<{ id: string, options: Array<{ label: string, scores: Record<string, number> }> }> }} quiz
 * @param {Record<string, number>} selections  question id -> chosen option index
 * @returns {{ panelSlug: string, scores: Record<string, number>, answers: Record<string, string> }}
 *   panelSlug is the highest-scoring panel; any tie for first place resolves
 *   to "panorama" (the complete check is the safe default when the answers do
 *   not single out one focus).
 */
export function scoreQuiz(quiz, selections) {
  const scores = {};
  const answers = {};

  for (const q of quiz.questions) {
    const idx = selections[q.id];
    const opt = q.options[idx];
    if (!opt) continue;
    answers[q.id] = opt.label;
    for (const [slug, n] of Object.entries(opt.scores || {})) {
      scores[slug] = (scores[slug] || 0) + n;
    }
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (ranked.length === 0) return { panelSlug: "panorama", scores, answers };

  const [topSlug, topScore] = ranked[0];
  const tied = ranked.filter(([, n]) => n === topScore);
  const panelSlug = tied.length > 1 ? "panorama" : topSlug;

  return { panelSlug, scores, answers };
}
