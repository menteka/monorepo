<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import { PUBLIC_API_HOST } from "$env/static/public";
  import { Button } from "@menteka/ui";

  let results = $state([]);

  onMount(async () => {
    const query = $page.url.searchParams.get("q");
    const response = await fetch(`${PUBLIC_API_HOST}/db/search?q=${query}`);
    results = await response.json();
  });
</script>

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
