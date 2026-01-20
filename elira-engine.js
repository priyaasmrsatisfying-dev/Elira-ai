// elira-engine.js

function detectMood(message) {
  const sadWords = ["sad", "tired", "thak", "udaas", "alone", "akela", "ro"];
  return sadWords.some(word => message.toLowerCase().includes(word))
    ? "sad"
    : "normal";
}

function eliraReply(userMessage) {
  const mood = detectMood(userMessage);

  if (mood === "sad") {
    return "Main yahin hoon 🤍\nTum chaaho toh bol sakti ho… koi jaldi nahi.";
  }

  if (userMessage.length < 4) {
    return "Hmm… main sun rahi hoon 🌙";
  }

  return "Samajh rahi hoon… thoda aur bataogi? 🤍";
}

export default eliraReply;
