export function isvalidURL(str) {
  let url;

  try {
    url = new URL(str);
  } catch (_) {
    return false;  
  }
  const result = url.protocol === "http:" || url.protocol === "https:";
  if(result) return result;
  else throw new Error("Not Valid URL");
}
