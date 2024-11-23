<script lang="ts">
	import { accessConfig, possibleProfiles } from '$lib/config/config.svelte';

	const config = accessConfig();

</script>

<select>
	{#each config.availableProfiles as profile}
		<option value={profile.id} selected={profile.id === config.activeProfile}>{profile.name}</option>
	{/each}
	{#if config.availableProfiles.length < possibleProfiles.length}
		<option>Add new</option>
	{/if}
</select>

<style>
    select {
        border-radius: var(--radius);
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        border: var(--border);

    }
</style>