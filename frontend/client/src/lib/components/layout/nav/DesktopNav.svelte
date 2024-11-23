<script lang="ts">
	import { routes } from './Routes';
	import { globalT } from '@translations';
	import Icon from '$lib/components/Icon.svelte';

</script>

<nav>
	<ul>
		{#each routes as route}
			<li class="nav">
				<a class="button" href={route.href}>
					<Icon src={route.svg} />
					{globalT(`routes.${route.name}`)}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
    nav {
        position: sticky;
        top: 3rem;
        align-self: flex-start

    }

    ul {
        display: flex;
        gap: 2rem;
        flex-direction: column;
        min-width: 20vw;
    }

    @media (max-width: 768px) {
        nav {
            display: none;
        }
    }
</style>