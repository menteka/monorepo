<script lang="ts">
  import { FeedItem } from "@components";
  import { fetchFeed } from "@logic/feed";
  import { t } from "@translations";
  import { onMount } from "svelte";
  import { Loader } from "@menteka/ui";
  import { feedCache } from "@db";

  let { data } = $props();

  //TODO: paginate content, allow user to set amount on page.

  let isLoading = $state(true);
  let feed = $state([]);

  onMount(async () => {
    feedCache.addFeed({ title: "Grote Podcastlas" });
    const a = await feedCache.getAllFeeds();
    console.log(a);
    // feed = await fetchFeed();
    isLoading = false;
  });
</script>

<h1>{t("title")}</h1>

{#if isLoading}
  <Loader />
{/if}

{#each feed as { metadata, items }}
  <section lang={metadata.language ?? undefined}>
    <h2>{metadata.title}</h2>

    <p>{metadata.description}</p>
    <a href={metadata.link}>{metadata.link}</a>
    <p>{metadata.lastBuildDate}</p>
    <ul>
      {#each items as item}
        <li>
          <p>{item.pubDate}</p>
          <FeedItem
            feedTitle={metadata.title}
            title={item.title}
            content={item.content}
            pubDate={item.pubDate}
            enclosure={item.enclosure}
            lang={metadata.language}
            subtitle={item.subtitle}
            thumbnail={item.thumbnail}
            url={item.link}
          />
        </li>
        <!-- <li>
					<h3>{item.title}</h3>
					<img srcSet={item.thumbnail} width="260px" alt="" loading="lazy" />

					<p>{@html DOMPurify.sanitize(item.description)}</p>

					Compact view:
					<a
						href={item.link}
						style="display: grid; grid-template-columns: 1fr 3fr;"
						aria-labelledby="id-for-h3-element"
					>
						{item.title} - {metadata.title}
						{item.link}

						{#if item.thumbnail}
							<img srcSet={item.thumbnail} width="60px" alt="" />
						{/if}
					</a>
					<p>Date: {new Intl.DateTimeFormat(data.lang, { month: 'long' }).format(item.pubDate)}</p>
					<p>Categories: {new Intl.ListFormat(data.lang).format(item.categories)}</p>
					{#if item.enclosure}
						{#if item.enclosure.type.includes('audio')}
							<audio controls>
								<source src={item.enclosure.url} type={item.enclosure.type} />
								Your browser does not support the audio tag.
							</audio>
						{:else if item.enclosure.type.includes('image')}
							<img src={item.enclosure.url} width="300" />
						{/if}
					{/if}
				</li> -->
      {/each}
    </ul>
  </section>
{/each}

<style>
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
