<script lang="ts">
  import { Settings } from "@settings";
  import { Layout } from "@components";
  import { Translations } from "@translations";

  let { children } = $props();
</script>

<Settings />
<Translations />
<Layout>
  {@render children()}
</Layout>
