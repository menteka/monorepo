<script lang="ts">
  import { initConfig, accessConfig } from "$lib/config/config.svelte";
  import { Layout } from "@components";
  import { feedCache } from "@db";
  import { onMount } from "svelte";

  let { children } = $props();

  const config = accessConfig();

  onMount(async () => {
    initConfig();
    feedCache.init();
  });
</script>

<!-- TODO add splashscreen onmount for at least 1 second :) so there is no flashing -->

<svelte:head>
  {#if config.theme}
    <link rel="stylesheet" href="/themes/{config.theme}.css" />
  {/if}
</svelte:head>
<Layout>
  {@render children()}
</Layout>
