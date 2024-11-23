import { get } from 'svelte/store';
import { page } from '$app/stores';

export const supportedLangs = ['nl', 'en'] as const;

export const defaultLang = 'en';

export type Lang = (typeof supportedLangs)[number];

export async function initializeTranslations({ routeId, lang }: { routeId: string; lang: Lang }) {
	const content = import.meta.glob('./content/**/*.json');
	//@ts-expect-error We expect this path to always resolve successfully, and write tests to guard that.
	let t = {};
	try {
		t = (await content[`./content${routeId}/${lang}.json`]()).default;
	} catch (e) {}
	const globalT = (await import(`./global/${lang}.json`)).default;
	return { t, globalT };
}

export function t(key: string) {
	return deepGet(get(page).data.t, key);
}

export function globalT(key: string) {
	return deepGet(get(page).data.globalT, key);
}

function deepGet(object: unknown, key: string) {
	try {
		const keyElements = key.split('.');
		let result = object;
		while (keyElements.length > 0) {
			const key = keyElements.shift() as string;
			result = result[key];
		}
		return result as string;
	} catch {}
	console.log(
		`Could not find translation of key ${key} in language ${get(page).params.lang ?? defaultLang}`
	);
	return '';
}
