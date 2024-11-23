export function parseDate(dateStr: string): Date {
	if (!dateStr) return new Date();
	const parsed = new Date(dateStr);
	return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function getTextContent(element: Element, tagName: string) {
	return element.querySelector(tagName)?.textContent?.trim();
}

export function getAtomLink(element: Element): string {
	const links = Array.from(element.getElementsByTagName('link'));
	const alternateLink = links.find(
		(link) => link.getAttribute('rel') === 'alternate' || !link.hasAttribute('rel')
	);
	return alternateLink?.getAttribute('href') || links[0]?.getAttribute('href') || '';
}
