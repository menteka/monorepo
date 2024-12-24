<script lang="ts">
  import { goto } from "$app/navigation";

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const query = event.currentTarget.search.value;
    goto(`/search?q=${query}`);
  }
</script>

<form onsubmit={onSubmit}>
  <input name="search" type="search" placeholder="find feeds" />
</form>

<style>
  input {
    outline: var(--border);
    border: none;
    padding-inline: 1rem;
    padding-block: 0.5rem;
    font-family: inherit;
    border-radius: var(--radius);
    height: fit-content;
  }
</style>
