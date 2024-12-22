export function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function getTextContent(element: Element, tagName: string) {
  return element.querySelector(tagName)?.textContent?.trim();
}

export function getAtomLink(element: Element): string {
  const links = Array.from(element.getElementsByTagName("link"));
  const alternateLink = links.find(
    (link) =>
      link.getAttribute("rel") === "alternate" || !link.hasAttribute("rel")
  );
  return (
    alternateLink?.getAttribute("href") || links[0]?.getAttribute("href") || ""
  );
}

export function extractUrls(htmlContent: string) {
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  // Array to store anchor information
  const anchorUrls = [];
  const uniqueUrls = new Set();

  // Extract URLs from anchor tags
  const anchorTags = tempDiv.getElementsByTagName("a");
  for (const tag of anchorTags) {
    const href = tag.getAttribute("href")?.trim();
    const label = tag.textContent?.trim();

    // Only add if href exists and is a valid URL
    if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
      const urlEntry: { href: string; label?: string } = { href };

      // Add label if it exists and is not empty
      if (label) {
        urlEntry.label = label;
      }

      // Avoid duplicates
      if (!uniqueUrls.has(href)) {
        anchorUrls.push(urlEntry);
        uniqueUrls.add(href);
      }
    }
  }

  // Find loose URLs
  const urlRegex = /https?:\/\/\S+/g;
  const matches = htmlContent.match(urlRegex) || [];

  matches.forEach((url) => {
    // Clean up potential punctuation at the end of URL
    const cleanedUrl = url.replace(/[.,;!?)}"']+$/, "");

    // Only add if not already in the list
    if (!uniqueUrls.has(cleanedUrl)) {
      anchorUrls.push({ href: cleanedUrl });
      uniqueUrls.add(cleanedUrl);
    }
  });

  return anchorUrls;
}
