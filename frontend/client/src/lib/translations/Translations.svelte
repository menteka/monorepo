<script lang="ts">
  import { settings } from "@settings";
  import { translations } from "./db.svelte";
  import { onMount } from "svelte";

  $effect(() => {
    if (translations.isReady) {
      translations.loadTranslations(settings.language.value);
    }
  });

  onMount(async () => {
    await translations.initialize();
  });
</script>
