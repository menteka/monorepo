<script lang="ts">
  import { t } from "@translations";
</script>

<li>
  <a href="#main"> {t("skipToMainText")}</a>
</li>

<style>
  li {
    position: absolute;
  }

  a {
    position: absolute;
    left: -1000px;
    background: var(--background);
  }

  a:focus-visible {
    left: 1rem;
    top: 1rem;
  }
</style>
