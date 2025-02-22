<script lang="ts">
  import { t } from "@translations";
  import { settings, themes } from "@settings";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { RadioGroup, RadioItem } from "@menteka/ui";

  let theme = $derived(settings.theme);
  let lang = $derived(settings.language);
  let mode = $derived(settings.mode);

  const updateLang = async (e) => {
    settings.setLanguage(e.target.value);
    goto($page.route.id!.replace("[[lang=lang]]", e.target.value), {
      noScroll: true,
    });
  };
</script>

<h1>{t("settings.title")}</h1>

<RadioGroup bind:value={theme.value} label={t("settings.themes.title")}>
  {#each themes as theme}
    <RadioItem value={theme}>{theme}</RadioItem>
  {/each}
</RadioGroup>

<RadioGroup bind:value={mode.value} label={t("settings.mode.title")}>
  <RadioItem value="light">{t("settings.mode.light")}</RadioItem>
  <RadioItem value="dark">{t("settings.mode.dark")}</RadioItem>
  <RadioItem value="auto">{t("settings.mode.auto")}</RadioItem>
</RadioGroup>

<label>
  {t("settings.language.title")}
  <select value={lang.value} onchange={updateLang}>
    <option value="en">English</option>
    <option value="nl">Nederlands</option>
  </select>
</label>
