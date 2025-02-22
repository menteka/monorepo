<script lang="ts">
  type Props = {} & svelteHTML.IntrinsicElements["textarea"];

  let { value = $bindable(""), ...props }: Props = $props();
</script>

<textarea bind:value {...props} />

<style>
  textarea {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: var(--radius);
    background-color: var(--background);
    outline: var(--border);
    padding: 1rem;
  }
</style>
