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


export function isValidDateString(value: any): boolean {
  if (typeof value !== "string") return false;

  // Check if string looks like an ISO date
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
  if (!isoDatePattern.test(value)) return false;

  const date = new Date(value);
  return !isNaN(date.getTime());

}