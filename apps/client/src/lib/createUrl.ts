import { get } from 'svelte/store';
import { page } from '$app/stores';

export function createUrl(href: string) {
	return `/${get(page).params.lang ?? ''}${href}`;
}
