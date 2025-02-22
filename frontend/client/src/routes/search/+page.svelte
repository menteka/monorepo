<script lang="ts">
  import { page } from "$app/stores";
  import { t } from "@translations";

  import { PUBLIC_API_HOST } from "$env/static/public";
  import { Button } from "@menteka/ui";
  import { fetchFeedMetadata } from "@logic/feed";
  import type {
    Metadata,
    FeedItem as FeedItemType,
  } from "../../../../../packages/parser/src/types";
  import AddFeed from "$lib/components/AddFeed.svelte";
  import { FeedItem } from "@components";

  let results = $state([]);
  let feedData = $state<{ items: FeedItemType[]; metadata: Metadata } | null>(
    null
  );

  let error = $state<string | null>(null);

  function isUrl(input: string) {
    let url;

    try {
      url = new URL(input);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  async function searchBackend(query: string) {
    const response = await fetch(`${PUBLIC_API_HOST}/db/search?q=${query}`);
    results = await response.json();
  }

  async function fetchFeed(query: string) {
    const data = await fetchFeedMetadata(query);
    feedData = data;
  }

  $effect(() => {
    const query = $page.url.searchParams.get("q")?.trim();
    if (!query) {
      error = "noQuery";
      return;
    }
    if (isUrl(query)) {
      fetchFeed(query);
    } else {
      searchBackend(query);
    }
  });
  // TODO implement predict categories + type
</script>

{#if error}
  <p>{t(`search.errors.${error}`)}</p>
{/if}

{#if feedData}
  <p style="background-color: var(--background-highlight);">Feed found!</p>

  <section style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
    <AddFeed
      defaultURL={$page.url.searchParams.get("q")?.trim()}
      defaultDescription={feedData.metadata.description}
      defaultCopyright={feedData.metadata.copyright}
      defaultTitle={feedData.metadata.title}
      defaultLink={feedData.metadata.link}
      defaultType={undefined}
    />

    <div>
      <h2>Preview</h2>
      <ul>
        {#each feedData.items.slice(0, 3) as item}
          <li>
            <FeedItem
              feedTitle={feedData.metadata.title}
              title={item.title}
              content={item.content}
              pubDate={item.pubDate}
              enclosure={item.enclosure}
              lang={feedData.metadata.language}
              subtitle={item.subtitle}
              thumbnail={item.thumbnail}
              url={item.link}
            />
          </li>
        {/each}
      </ul>
    </div>
  </section>
{/if}

<ul>
  {#each results as result}
    <li>
      <a href={result.id}>{result.name}</a>
      <br />
      {result.description}
      <Button>Follow</Button>
    </li>
  {/each}
</ul>

<a href="/add">Add new</a>

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  a {
    padding-top: 44px;
  }
</style>
