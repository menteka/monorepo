<script lang="ts">
  import DOMPurify from "dompurify";
  import EnrichtContent from "$lib/components/feed/EnrichtContent.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import { Button } from "@menteka/ui";

  type Props = {
    feedTitle: string;
    title?: string;
    subtitle?: string;
    thumbnail?: string;
    url?: string;
    type?: "deviantArt";
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
    type,
  }: Props = $props();

  let expanded = $state(false);

  function toggleExpansion() {
    expanded = !expanded;
  }
</script>

<article {lang} dir="auto">
  <h3>
    <div style="color: grey; font-size:small">{feedTitle}</div>
    <div>{title}</div>
  </h3>
  {#if thumbnail}
    <img width="50%" src={thumbnail.src} srcset={thumbnail.srcSet} />
  {/if}
  <div style="float: right;">
    <Button aria-label="TODO" isIconOnly>
      <Icon src="bookmark" />
    </Button>
    <Button aria-label="TODO" isIconOnly>
      <Icon src="kebab" />
    </Button>
  </div>
  <!-- <a
    href={url}
    style="display: grid; grid-template-columns: 1fr 3fr;"
    aria-labelledby="id-for-h3-element"
  >
    {url}
  </a> -->

  <p class="subtitle">{@html DOMPurify.sanitize(subtitle)}</p>

  {#if tags}
    <p>Tags: {new Intl.ListFormat(lang).format(tags)}</p>
  {/if}
  {#if enclosure}
    {#if enclosure.type.includes("audio")}
      <audio controls preload="none">
        <source src={enclosure.url} type={enclosure.type} />
        Your browser does not support the audio tag.
      </audio>
    {:else if enclosure.type.includes("image")}
      <img src={enclosure.url} width="300" />
    {/if}
  {/if}
  {#if expanded}
    <EnrichtContent {content} />
  {/if}
  {#if content}
    <Button
      isIconOnly
      style="float: right"
      aria-label="TODO"
      onclick={toggleExpansion}
      >{#if expanded}
        <Icon src="minimize" />
      {:else}
        <Icon src="expand" />
      {/if}</Button
    >
  {/if}
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
    position: relative;
    overflow: hidden;
  }

  .subtitle {
    max-height: 5lh;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
