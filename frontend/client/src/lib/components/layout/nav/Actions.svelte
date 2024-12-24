<script lang="ts">
  import SkipToMain from "../SkipToMain.svelte";
  import Logo from "../Logo.svelte";
  import Search from "../Search.svelte";
  import CloudStatus from "./CloudStatus.svelte";
</script>

<nav id="actions">
  <ul>
    <SkipToMain />
    <li>
      <Logo />
    </li>
    <li>
      <Search />
    </li>
    <li><CloudStatus /></li>
  </ul>
</nav>

<style>
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
  }
</style>
