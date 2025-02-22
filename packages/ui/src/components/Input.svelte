<script lang="ts">
  type Props = {} & svelteHTML.IntrinsicElements["input"];

  let { value = $bindable(""), ...props }: Props = $props();
</script>

<input bind:value {...props} />

<style>
  input {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: var(--radius);
    background-color: var(--background-primary);
    padding: 1rem;
    outline: var(--border);
  }
</style>
