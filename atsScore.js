// atsScore.js

export function calculateATSScore(resumeText, jobDescription) {
  const resumeWords = resumeText.toLowerCase().split(/\s+/);
  const jobWords = jobDescription.toLowerCase().split(/\s+/);

  const jobWordSet = new Set(jobWords);
  let matchCount = 0;

  resumeWords.forEach(word => {
    if (jobWordSet.has(word)) {
      matchCount++;
    }
  });

  const score = Math.floor((matchCount / jobWords.length) * 100);
  return Math.min(score, 100); // cap at 100
}
