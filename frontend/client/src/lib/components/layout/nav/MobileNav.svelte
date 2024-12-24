<script lang="ts">
  import { routes } from "./Routes";
  import { page } from "$app/stores";
  import { createUrl } from "$lib/createUrl";
  import Icon from "../../Icon.svelte";
  import { globalT } from "@translations";
</script>

<nav>
  <ul>
    {#each routes as route}
      <li class="nav">
        <a
          href={createUrl(route.href)}
          aria-label={globalT(`routes.${route.name}`)}
        >
          <Icon src={route.svg} />
          <span>{globalT(`routes.${route.name}`)}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  a {
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    outline: none !important;
    box-shadow: none !important;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
    min-width: var(--touch-size);
    min-height: var(--touch-size);
  }

  a:hover {
    background-color: grey;
    color: inherit;
  }

  nav {
    position: fixed;
    inset: auto 0 0 0;
    padding: 0.5rem;
    background-color: var(--background-highlight);
    border-top: var(--border);
  }

  ul {
    display: flex;
    justify-content: space-around;
    gap: 8px;
  }

  @media (min-width: 768px) {
    nav {
      display: none;
    }
  }

  @media (max-width: 350px) {
    span {
      opacity: 0;
      height: 0;
      width: 0;
    }
  }
</style>
