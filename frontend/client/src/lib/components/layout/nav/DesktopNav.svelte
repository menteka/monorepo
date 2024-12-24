<script lang="ts">
  import { Button } from "@menteka/ui";
  import { routes } from "./Routes";
  import { globalT } from "@translations";
  import Icon from "$lib/components/Icon.svelte";
</script>

<nav>
  <ul>
    {#each routes as route}
      <li class="nav">
        <Button href={route.href}>
          <Icon src={route.svg} />
          {globalT(`routes.${route.name}`)}
        </Button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    position: sticky;
    top: 3rem;
    align-self: flex-start;
  }

  ul {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    min-width: 20vw;
  }

  @media (max-width: 768px) {
    nav {
      display: none;
    }
  }
</style>
