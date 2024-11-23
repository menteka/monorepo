<script lang="ts">
	import { supportedLangs } from '@translations';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const labels = {
		en: '🇬🇧 English',
		nl: '🇳🇱 Nederlands'
	} as const;

	function updatePath(e) {
		console.log($page.route);
		goto($page.route.id!.replace('[[lang=lang]]', e.target.value), { noScroll: true });
	}
</script>

<select value={$page.params['lang']} onchange={updatePath}>
	{#each supportedLangs as lang}
		<option value={lang} selected={lang === 'en'}>{labels[lang]}</option>
	{/each}
</select>

<style>
	select {
		outline: var(--border);
		border: none;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		font-family: inherit;
		border-radius: var(--radius);
	}
</style>
