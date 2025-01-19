<script lang="ts">
  type Props = Omit<svelteHTML.IntrinsicElements["input"], "type" | "role">;

  let { checked = $bindable(), ...props }: Props = $props();
</script>

<input type="checkbox" role="switch" bind:checked {...props} />

<style>
  /* Tokens */
  input {
    /* Generic values*/
    --toggle-transition: 250ms ease-in-out;
    --toggle-disabled-opacity: 0.38;
    --touch-height: 44px;
    /* Track values */
    --track-background: #f5f4f5;
    --track-border-radius: 999px;
    --toggle-border-width: 1px;
    --track-border: var(--toggle-border-width) solid #949494;
    --track-width: 56px;
    --track-height: 32px;
    --container-spacing-block-start: 8px;
    --container-spacing-block-end: 8px;
    --container-spacing-inline-start: 8px;
    --container-spacing-inline-end: 8px;
    /* Icon values */
    --checked-icon: url("data:image/svg+xml;utf8,<svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3.48861 9.66681L8.2225 14.4007L16.5367 6.08646' stroke='black' stroke-width='2'/></svg>");
    --checked-ball-mask: var(--checked-icon) no-repeat 50% 50%,
      linear-gradient(#fff, #fff);
    --checked-icon-width: 24px;
    --checked-icon-height: 24px;
    --checked-icon-size: var(--checked-icon-width) var(--checked-icon-height);
    /* Handle values   */
    --handle-background: #616161;
    --handle-width: 16px;
    --handle-height: 16px;
    /* Halo values */
    --halo-width: 40px;
    --halo-height: 40px;
    --halo-color: transparent;
    /* The halo should extend horizontally this much from the track in order to be centered */
    --halo-offset: calc(
      calc(var(--halo-width) / 2) - calc(var(--handle-width) / 2) -
        var(--container-spacing-inline-start)
    );
  }

  input:checked {
    --track-background: #3643ba;
    --handle-background: #fff;
    --toggle-border-width: 0px;
    --track-border: var(--toggle-border-width) solid transparent;
    --handle-width: 24px;
    --handle-height: 24px;
    --container-spacing-block-start: 4px;
    --container-spacing-block-end: 4px;
    --container-spacing-inline-start: 4px;
    --container-spacing-inline-end: 4px;
  }

  input:hover {
    --halo-color: rgba(97, 97, 97, 0.05);
  }

  input:active {
    --halo-color: rgba(97, 97, 97, 0.15);
  }

  input:hover:checked {
    --halo-color: rgba(54, 67, 186, 0.05);
  }

  input:active:checked {
    --halo-color: rgba(54, 67, 186, 0.15);
  }

  /* Styling */
  input {
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    appearance: none;
    margin: 0;
    padding: 0;
    width: var(--track-width);
    height: var(--track-height);
    background-color: var(--track-background);
    border-radius: var(--track-border-radius);
    border: var(--track-border);
    transition: background-color var(--toggle-transition);
  }

  input:disabled {
    opacity: var(--toggle-disabled-opacity);
    pointer-events: none;
  }

  input::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: max(var(--touch-height), var(--halo-height));
    /* Leave space to the sides for the halo */
    width: calc(100% + var(--halo-offset) * 2);
    transition: background-position-x var(--toggle-transition);
    background-size: var(--halo-width) var(--halo-height);
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 0px;
    /* Create the halo as a background image */
    background-image: radial-gradient(
      circle at center,
      var(--halo-color) 0%,
      var(--halo-color) 70%,
      transparent 70%,
      transparent 100%
    );
  }

  input:checked::before {
    background-position-x: 100%;
  }

  input::after {
    content: "";
    position: absolute;
    z-index: 1;
    height: var(--handle-height);
    width: var(--handle-width);
    border-radius: 100%;
    background-color: var(--handle-background);
    inset: 0px;
    /* Even with box-sizing configured, absolute positioning will start below the border */
    top: calc(var(--toggle-border-width) * -1);
    margin-inline: var(--container-spacing-inline-start)
      var(--container-spacing-inline-end);
    margin-block: var(--container-spacing-block-start)
      var(--container-spacing-block-end);
    transition:
      transform var(--toggle-transition),
      width var(--toggle-transition),
      height var(--toggle-transition);
  }

  input:checked::after {
    /* We calculate the distance the handle needs to be moved in order to be on the right end of the 
      track, leaving room for the spacing. */
    transform: translateX(
      calc(
        var(--track-width) - var(--handle-width) -
          var(--container-spacing-inline-start) -
          var(--container-spacing-inline-end)
      )
    );
    /* In order to implement the handle + checkmark without creating an additional HTML element, we create a 
      CSS mask, which means that it will render a cutout in the shape of the checkmark.
      This is in line with how the component is designed. */
    @supports (mask-image: url("")) {
      mask: var(--checked-ball-mask);
      mask-composite: exclude;
      mask-size: var(--checked-icon-size);
    }
    @supports (not (mask-image: url(""))) {
      -webkit-mask: var(--checked-ball-mask);
      -webkit-mask-composite: destination-out;
      -webkit-mask-size: var(--checked-icon-size);
    }
  }
</style>
