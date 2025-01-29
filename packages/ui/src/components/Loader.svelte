<script lang="ts">
  import { onMount } from "svelte";

  let dots = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      dots++;
      if (dots > 3) dots = 0;
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="loader"></div>
Loading{Array(dots).fill(".").join("")}

<style>
  /* HTML: <div class="loader"></div> */
  .loader {
    width: 30px;
    aspect-ratio: 0.577;
    color: #000;
    display: grid;
    background:
      linear-gradient(currentColor 0 0) top / 100% 1px,
      linear-gradient(currentColor 0 0) bottom/100% 1px,
      linear-gradient(
          to bottom right,
          #0000 calc(50% - 2px),
          currentColor calc(50% - 1px),
          #0000 50%
        )
        top/100% calc(100% + 2px),
      linear-gradient(
          to bottom left,
          #0000 calc(50% - 2px),
          currentColor calc(50% - 1px),
          #0000 50%
        )
        top/100% calc(100% + 2px);
    background-repeat: no-repeat;
    animation: l17 4s infinite linear;
  }
  .loader::before,
  .loader::after {
    content: "";
    grid-area: 1/1;
    background: inherit;
    border: inherit;
    animation: inherit;
  }
  .loader::after {
    animation-duration: 2s;
  }
  @keyframes l17 {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
