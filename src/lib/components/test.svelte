<script lang="ts">
	import { createUser } from '$lib/instructions/initUser';
    import { test } from './test2.svelte'

	const handleClick = async () => {
		await createUser();
	};
</script>

<button on:click={handleClick}> test </button>
