import { initializeTranslations, type Lang } from '@translations';

export async function load({ params: { lang = 'en' }, route: { id } }) {
	const routeId = id.replace('/[[lang=lang]]', '');
	const translations = await initializeTranslations({ routeId, lang: lang as Lang });
	return { lang, ...translations };
}
