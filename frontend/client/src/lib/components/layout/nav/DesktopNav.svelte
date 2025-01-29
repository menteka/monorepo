<script lang="ts">
  import { Button } from "@menteka/ui";
  import { routes } from "./Routes";
  import { t } from "@translations";
  import Icon from "$lib/components/Icon.svelte";
</script>

<nav>
  <ul>
    {#each routes as route}
      <li class="nav">
        <Button href={route.href}>
          <Icon src={route.svg} />
          {t(`${route.name}.title`)}
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
