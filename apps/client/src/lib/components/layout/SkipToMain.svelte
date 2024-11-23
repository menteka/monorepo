<script lang="ts">
	import { globalT } from '@translations';
</script>

<li>
	<a href="#main">{globalT('skipToMainText')}</a>
</li>

<style>
    li {
        position: absolute;
    }

    a {
        position: absolute;
        left: -1000px;
        background: var(--background)
    }

    a:focus-visible {
        left: 1rem;
        top: 1rem;
    }
</style>
