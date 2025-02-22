<script lang="ts">
    import { t } from "@translations";
    import { supportedLanguages } from "@translations";
    import { setLanguage } from "@translations";
    
    let { children } = $props<{ children: Snippet }>();
    
    let selectedLanguage = localStorage.getItem("lang") || "en";
    
    function changeLanguage(event: Event) {
        const target = event.target as HTMLSelectElement;
        const lang = target.value;
        setLanguage(lang);
        selectedLanguage = lang;
    }
</script>

<select>
    
</select>