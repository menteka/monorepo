<script lang="ts">
	import SkipToMain from '../SkipToMain.svelte';
	import Logo from '../Logo.svelte';
	import Search from '../Search.svelte';
	import ProfileSwitch from '$lib/components/layout/ProfileSwitch.svelte';
</script>
<nav id="actions">
	<ul>
		<SkipToMain />
		<li>
			<Logo />
		</li>
		<li>
			<Search />
		</li>
		<li>
			<ProfileSwitch />
		</li>
	</ul>
</nav>

<style>
    ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        align-items: center;
    }

</style>