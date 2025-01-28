<script lang="ts">
  import { Settings } from "@settings";
  import { Layout } from "@components";
  import { t, Translations } from "@translations";

  let { children } = $props();
</script>

<Settings />
<Translations />
<Layout>
  {t("title")}
  {@render children()}
</Layout>
