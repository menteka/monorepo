<script lang="ts">
  import { onMount } from "svelte";
  import { settings } from "./store.svelte";

  const href = $derived(`/themes/${settings.theme.value}.css`);

  $effect(() => {
    if (settings?.theme.value) {
      const themesheet = document.head.querySelector(
        "theme-sheet"
      ) as HTMLLinkElement;
      if (themesheet) {
        themesheet.href = href;
      }
    }
  });

  onMount(() => {
    settings.initialize();
  });
</script>

<svelte:head>
  <!-- This only runs on initial load -->
  <link rel="stylesheet" id="theme-sheet" {href} />
</svelte:head>
