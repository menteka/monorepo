<script lang="ts">
  import { settings } from "./settings.svelte";

  const href = $derived(`/themes/${settings.theme.value}.css`);

  $effect(() => {
    console.log(href);
    if (settings?.theme.value) {
      const themesheet = document.head.querySelector(
        "theme-sheet"
      ) as HTMLLinkElement;
      if (themesheet) {
        themesheet.href = href;
      }
    }
  });
</script>

<svelte:head>
  <!-- This only runs on initial load -->
  <link rel="stylesheet" id="theme-sheet" {href} />
</svelte:head>
