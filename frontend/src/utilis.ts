export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}


 function correctedLink(link: string): string {
    if (link.includes("youtu.be")) {
      return link.replace("youtu.be/", "youtube.com/embed/");
    } else if (link.includes("youtube.com/watch")) {
      return link.replace("youtube.com/watch?v=", "youtube.com/embed/");
    }
    return link;
  }


