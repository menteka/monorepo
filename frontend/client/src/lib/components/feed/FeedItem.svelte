<script lang="ts">
	import DOMPurify from 'dompurify';
	import EnrichtContent from '$lib/components/feed/EnrichtContent.svelte';
	import Icon from '$lib/components/Icon.svelte';

	type Props = {
		feedTitle: string;
		title?: string;
		subtitle?: string;
		thumbnail?: string;
		url?: string;
		type?: 'deviantArt';
		lang?: string;
		pubDate: string;
		content: string;
		enclosure?: unknown;
		tags?: string[];
	};

	let {
		title,
		feedTitle,
		thumbnail,
		url,
		lang,
		pubDate,
		enclosure,
		subtitle,
		tags,
		content,
		type
	}: Props = $props();

	let expanded = $state(false);

	function toggleExpansion() {
		expanded = !expanded;
	}

	console.log(content);
</script>

<article {lang} dir="auto">
	<h3>
		<div style="color: grey; font-size:small">{feedTitle}</div>
		<div>{title}</div>
	</h3>
	<img srcSet={thumbnail} width="260px" alt="" loading="lazy" />

	<div style="float: right;">
		<button class="button" aria-label="TODO">
			<Icon src="bookmark" />
		</button>
		<button class="button" aria-label="TODO">
			<Icon src="kebab" />
		</button>
	</div>
	<a
		href={url}
		style="display: grid; grid-template-columns: 1fr 3fr;"
		aria-labelledby="id-for-h3-element"
	>
		{url}
		<p class="subtitle">{@html DOMPurify.sanitize(subtitle)}</p>

		{#if thumbnail}
			<img srcSet={thumbnail} width="60px" alt="" />
		{/if}
	</a>
	{#if tags}
		<p>Tags: {new Intl.ListFormat(lang).format(tags)}</p>
	{/if}
	{#if enclosure}
		{#if enclosure.type.includes('audio')}
			<audio controls preload="none">
				<source src={enclosure.url} type={enclosure.type} />
				Your browser does not support the audio tag.
			</audio>
		{:else if enclosure.type.includes('image')}
			<img src={enclosure.url} width="300" />
		{/if}
	{/if}
	{#if expanded}
		<EnrichtContent {content} />
	{/if}
	<button style="float: right" class="button" aria-label="TODO" onclick={toggleExpansion}
		>{#if expanded}
			<Icon src="minimize" />
		{:else}
			<Icon src="expand" />
		{/if}</button
	>
</article>

<!-- <p>
	Date: <time datetime={pubDate}
		>{new Intl.DateTimeFormat(lang, { month: 'long' }).format(new Date(pubDate || ''))}</time
	>
</p> -->

<style>
	article {
		border: var(--border);
		border-radius: var(--radius);
		padding: var(--padding-m);
	}

	.subtitle {
		max-height: 5lh;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
