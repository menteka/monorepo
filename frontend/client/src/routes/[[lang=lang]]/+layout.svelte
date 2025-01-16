<script lang="ts">
  import { initializeSettings, themes } from "@settings";
  import { Layout } from "@components";
  import { feedCache } from "@db";
  import { onMount } from "svelte";

  let { children } = $props();
  let theme = $state("");

  onMount(async () => {
    feedCache.init();
    const settings = await initializeSettings();
    theme = settings.theme.value;
  });

  function onchange() {
    document.head.querySelector("link")!.href = `/themes/${theme}.css`;
  }
</script>

<svelte:head>
  {#if theme}
    <link rel="stylesheet" href="/themes/{theme}.css" />
  {/if}
</svelte:head>
<Layout>
  {@render children()}
  <p>{theme}</p>
  <select bind:value={theme} {onchange}>
    {#each themes as theme}
      <option value={theme}>{theme}</option>
    {/each}
  </select>
</Layout>
