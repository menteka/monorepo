<script lang="ts">
  import { getContext, type Snippet } from "svelte";

  type Props = {
    value: string;
    children: Snippet;
  } & svelteHTML.IntrinsicElements["button"];

  let { children, value }: Props = $props();

  const { select } =
    getContext<{
      select: (value: string) => void;
    }>("radioGroup") ?? {};
  const getSelectedValue = getContext<() => string>("getSelectedValue");

  const isSelected = $derived(getSelectedValue?.() === value);

  function handleClick() {
    select(value);
  }

  function keyHandler(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      let next = document.activeElement?.nextElementSibling as HTMLElement;
      if (next === document.activeElement) {
        next = document.activeElement?.parentElement
          ?.firstElementChild as HTMLElement;
      }
      next?.focus();
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      let prev = document.activeElement?.previousElementSibling as HTMLElement;
      if (prev === document.activeElement) {
        prev = document.activeElement?.parentElement
          ?.lastElementChild as HTMLElement;
      }
      prev?.focus();
    }
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  }
</script>

<li
  role="radio"
  aria-checked={isSelected}
  class="radio-item"
  class:selected={isSelected}
  onclick={handleClick}
  onkeydown={keyHandler}
  id={`opt-${value}`}
  tabindex="0"
>
  {@render children()}
</li>

<style>
  .radio-item {
    border-radius: 8px;
    border: 2px solid #d1d5db;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
    aspect-ratio: var(--golden-ratio);
    flex-grow: 0;
    flex-shrink: 0;
    width: 8rem;
  }

  .radio-item:hover:not(.selected) {
    border-color: #9ca3af;
  }

  .radio-item.selected {
    border-color: #3b82f6;
    background-color: #eff6ff;
    color: #1d4ed8;
  }

  .radio-item:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
</style>
