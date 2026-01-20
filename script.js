function detectLanguage(text) {
  if (/[\u0900-\u097F]/.test(text)) return "hi"; // Hindi
  if (/[\u0C80-\u0CFF]/.test(text)) return "kn"; // Kannada
  if (/[\u0C00-\u0C7F]/.test(text)) return "te"; // Telugu
  if (/[\u0D00-\u0D7F]/.test(text)) return "ml"; // Malayalam
  if (/[\u0600-\u06FF]/.test(text)) return "ur"; // Urdu
  return "en";
}const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");
const chatArea = document.getElementById("chatArea");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const userText = input.value.trim();
  if (userText === "") return;

  // USER MESSAGE
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = userText;
  chatArea.appendChild(userMsg);

  input.value = "";
  chatArea.scrollTop = chatArea.scrollHeight;

  // Calm pause before Elira replies
  setTimeout(() => {
    const eliraMsg = document.createElement("div");
    eliraMsg.className = "message elira";
    eliraMsg.innerText = getEliraReply(userText);
    chatArea.appendChild(eliraMsg);
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 900);
}

/* 🌍 LANGUAGE + EMOTION AWARE ELIRA */
function getEliraReply(text) {
  const lower = text.toLowerCase();

  // --- LANGUAGE DETECTION (basic demo) ---
  const isHindi = /hai|nahi|kyu|kya|thik|haan|dukhi|akela/.test(lower);
  const isMarathi = /ahe|kaay|nahi|bara|dukhi/.test(lower);
  const isUrdu = /hai|nahi|kyun|akela|udaas/.test(lower);

  // --- EMOTIONAL STATES ---
  const sadWords = ["sad", "tired", "alone", "cry", "hurt", "dukhi", "udaas", "akela"];
  const angryWords = ["angry", "frustrated", "fed up", "gussa", "pareshan"];
  const happyWords = ["happy", "good", "excited", "khush", "accha"];

  if (sadWords.some(word => lower.includes(word))) {
    if (isHindi || isUrdu)
      return "Yeh thoda bhaari lag raha hai… main yahin hoon. Jaldi karne ki zarurat nahi 🤍";
    if (isMarathi)
      return "He thoda jड वाटतंय… mi ikडे aahe. Ghaya nako 🤍";
    return "That sounds heavy… I’m here with you. You don’t have to rush 🤍";
  }

  if (angryWords.some(word => lower.includes(word))) {
    if (isHindi || isUrdu)
      return "Aisa mehsoos hona theek hai. Chaaho toh bol sakti ho, main sun rahi hoon.";
    if (isMarathi)
      return "Asa वाटणं theek aahe. Mi aiktey.";
    return "It’s okay to feel this way. I’m listening.";
  }

  if (happyWords.some(word => lower.includes(word))) {
    if (isHindi || isUrdu)
      return "Yeh sunke accha laga 😊";
    if (isMarathi)
      return "He aikun chhaan वाटलं 😊";
    return "That’s nice to hear 😊";
  }

  // --- DEFAULT CALM RESPONSES ---
  const softReplies = [
    "I’m here. Take your time 🌙",
    "You don’t have to explain everything.",
    "We can talk… or just sit quietly.",
    "You’re safe here.",
    "I’m listening 🤍"
  ];

  return softReplies[Math.floor(Math.random() * softReplies.length)];const eliraReplies = {
  en: [
    "I’m here. Take your time 🤍",
    "That sounds heavy… do you want to talk about it?",
    "You don’t have to explain everything. I’m listening.",
    "We can sit quietly too, if you want."
  ],
  hi: [
    "मैं यहीं हूँ… आराम से बताओ 🤍",
    "यह थोड़ा भारी लग रहा है… चाहो तो बात करें?",
    "सब कुछ समझाना ज़रूरी नहीं है, मैं सुन रही हूँ।",
    "अगर चाहो तो बस चुपचाप भी बैठ सकते हैं।"
  ],
  ur: [
    "میں یہیں ہوں… آہستہ آہستہ بتاؤ 🤍",
    "یہ مشکل لگ رہا ہے… بات کرنا چاہو گے؟",
    "سب کچھ کہنا ضروری نہیں، میں سن رہی ہوں۔"
  ]
};
}function showTyping() {
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.id = "typing";
  typing.innerHTML = "Elira is typing<span>.</span><span>.</span><span>.</span>";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}function replyElira(userText) {
  const lang = detectLanguage(userText);
  const replies = eliraReplies[lang] || eliraReplies.en;

  showTyping();

  setTimeout(() => {
    removeTyping();
    const reply =
      replies[Math.floor(Math.random() * replies.length)];
    addMessage(reply, "elira");
  }, 1200);
}
