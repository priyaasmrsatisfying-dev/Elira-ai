/// elira-engine.js

function detectLanguage(text) {
  if (/[अ-ह]/.test(text)) return "hi";
  if (/[అ-హ]/.test(text)) return "te";
  if (/[ಅ-ಹ]/.test(text)) return "kn";
  if (/[അ-ഹ]/.test(text)) return "ml";
  if (/[ء-ي]/.test(text)) return "ur";
  return "en";
}

function detectEmotion(text) {
  const sad = ["sad", "tired", "thak", "udaas", "alone", "akela", "ro", "cry"];
  const stress = ["overwhelmed", "pressure", "tension", "anxious"];

  const t = text.toLowerCase();

  if (sad.some(w => t.includes(w))) return "sad";
  if (stress.some(w => t.includes(w))) return "stress";
  return "neutral";
}

function eliraRespond(message) {
  const lang = detectLanguage(message);
  const emotion = detectEmotion(message);

  // 🌙 SAD RESPONSES
  if (emotion === "sad") {
    if (lang === "hi") return "Main yahin hoon 🤍\nTum akeli nahi ho.";
    if (lang === "ur") return "Main yahin hoon… aap akelay nahi hain 🤍";
    return "I’m here 🤍 Take your time.";
  }

  // 🌿 STRESS RESPONSES
  if (emotion === "stress") {
    if (lang === "hi") return "Thoda sa saans lete hain… main saath hoon 🌙";
    return "Let’s slow down for a moment. I’m with you 🌙";
  }

  // 🤍 SHORT / SILENT
  if (message.length < 3) {
    return "Hmm… 🤍";
  }

  // 🌸 NORMAL
  if (lang === "hi") return "Main sun rahi hoon… dheere bolo 🌸";
  if (lang === "ur") return "Main sun rahi hoon…";
  return "I’m listening… 🤍";
}

export default eliraRespond;
