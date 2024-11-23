import { supportedLangs, type Lang } from '$lib/translations';

export function match(param: Lang) {
	return supportedLangs.includes(param);
}
