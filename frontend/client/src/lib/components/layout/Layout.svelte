<script lang="ts">
  import type { Snippet } from "svelte";
  import MobileNav from "$lib/components/layout/nav/MobileNav.svelte";
  import DesktopNav from "$lib/components/layout/nav/DesktopNav.svelte";
  import Actions from "$lib/components/layout/nav/Actions.svelte";

  let { children } = $props<{ children: Snippet }>();
</script>

<div class="layout">
  <Actions />

  <div class="mainContainer">
    <DesktopNav />
    <main id="main">
      {@render children()}
    </main>
  </div>
  <MobileNav />
</div>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow: auto;
  }
  .layout {
    height: 100vh;
    height: 100dvh;
    width: 100vw;
    width: 100dvw;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    main {
      /*Leave space for mobile navigation*/
      padding-bottom: 4rem;
    }
  }

  .mainContainer {
    position: relative;
    display: flex;
    padding: min(3rem, 5dvw);
    flex-grow: 1;
  }
</style>
