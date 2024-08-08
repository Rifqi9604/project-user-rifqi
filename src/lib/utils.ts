export function truncateText(
  text: string | null | undefined,
  wordLimit: number
): string {
  if (!text) return "";

  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;

  return words.slice(0, wordLimit).join(" ") + "...";
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
