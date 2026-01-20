export function detectMood(text) {
  if (text.match(/sad|tired|akela|thak gayi|cry/i)) return "sad";
  if (text.match(/happy|excited|khush/i)) return "happy";
  return "normal";
}

export function detectLanguage(text) {
  if (text.match(/[अ-ह]/)) return "hi";
  if (text.match(/[ఁ-౿]/)) return "te";
  if (text.match(/[ಅ-ಹ]/)) return "kn";
  return "en";
}

if (message.trim() === "" || message === "...") {
  return "Main yahin hoon. Jab chaaho bol lena 🤍";
}
