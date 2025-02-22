<script lang="ts">
  import { setContext, type Snippet } from "svelte";

  type Props = {
    label?: string;
    value?: string;
    onvaluechange?: (value: string) => void;
    children: Snippet;
  } & svelteHTML.IntrinsicElements["div"];

  let {
    children,
    label,
    value = $bindable(""),
    onvaluechange,
  }: Props = $props();

  setContext("radioGroup", {
    select: (val: string) => {
      value = val;
      onvaluechange?.(val);
    },
  });
  const id = crypto.randomUUID();

  setContext("getSelectedValue", () => value);
</script>

<div>
  {#if label}
    <p {id}>{label}</p>
  {/if}

  <ul
    aria-labelledby={label ? id : undefined}
    aria-activedescendant={`opt-${value}`}
    role="radiogroup"
  >
    {@render children()}
  </ul>
</div>

<style>
  p {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  ul {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
</style>
