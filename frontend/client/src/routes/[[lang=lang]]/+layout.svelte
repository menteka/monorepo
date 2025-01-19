<script lang="ts">
  import { Theme } from "@settings";
  import { Layout } from "@components";

  let { children } = $props();
</script>

<Theme />
<Layout>
  {@render children()}
</Layout>
