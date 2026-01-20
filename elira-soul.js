export function shapeResponse(reply, mood, time) {
  let finalReply = reply;

  // soften all responses
  finalReply = finalReply
    .replace(/!/g, ".")
    .replace(/\b(you should|do this|must)\b/gi, "you can try");

  // mood-based tone
  if (mood === "sad") {
    finalReply = "I'm here. " + finalReply;
  }

  // late-night softness
  if (time >= 22 || time <= 5) {
    finalReply += " 🌙";
  }

  // keep it short & human
  if (finalReply.length > 220) {
    finalReply = finalReply.slice(0, 200) + "...";
  }

  return finalReply;
}
