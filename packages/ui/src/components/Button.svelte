<script lang="ts">
  type Props = {
    isIconOnly?: boolean;
  } & svelteHTML.IntrinsicElements["button" & "a"];

  let { href, children, isIconOnly, ...props }: Props = $props();
</script>

<svelte:element
  this={href ? "a" : "button"}
  class="button"
  class:iconOnly={isIconOnly}
  {...props}
>
  {@render children()}</svelte:element
>

<style>
  .button {
    text-decoration: none;
    color: inherit;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .iconOnly {
    border-radius: var(--round);
    height: var(--touch-size);
    width: var(--touch-size);
  }

  .button {
    position: relative;
    font-weight: 400;
    padding-inline: 1rem;
    padding-block: 0.3rem;
    border-radius: var(--radius);
    background-color: var(--background-highlight);
    transition: color 0.1s ease;
    outline: var(--border);
    box-shadow: var(--box-shadow);
    cursor: pointer;
    font-family: "JosefinSans";
  }

  .button:hover {
    color: var(--foreground-highlight);
  }

  .button:active {
    top: 5px;
    left: 5px;
    box-shadow: none;
  }

  .button:active:before {
    opacity: 0;
  }
</style>
