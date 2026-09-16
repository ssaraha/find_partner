export function cutTextTo20Words(text) {
  // Split the text by spaces into an array of words
  const words = text.trim().split(/\s+/);
  
  // If the text has 20 words or fewer, return it as-is
  if (words.length <= 20) return text;
  
  // Cut to 20 words and add an ellipsis (...) at the end
  return words.slice(0, 20).join(' ') + '...';
}