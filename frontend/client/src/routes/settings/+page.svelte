<script lang="ts">
  import { t } from "@translations";
  import { settings, themes } from "@settings";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Toggle } from "@menteka/ui";

  let theme = $derived(settings.theme);
  let lang = $derived(settings.language);
  let mode = $derived(settings.mode);

  const updateTheme = async (e) => {
    settings.setTheme(e.target.value);
  };
  const updateLang = async (e) => {
    settings.setLanguage(e.target.value);
    goto($page.route.id!.replace("[[lang=lang]]", e.target.value), {
      noScroll: true,
    });
  };
  const updateMode = async (e) => {
    console.log("changing");
    settings.setMode(e.target.value);
  };
</script>

<h1>{t("settings.title")}</h1>

<select value={theme.value} onchange={updateTheme}>
  {#each themes as theme}
    <option value={theme}>{theme}</option>
  {/each}
</select>
<select value={lang.value} onchange={updateLang}>
  <option value="en">English</option>
  <option value="nl">Nederlands</option>
</select>
<label>
  Dark mode
  <Toggle checked={mode.value === "dark"} onchange={updateMode} />
</label>
