<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Todo from '../models/Todo';

	const dispatch = createEventDispatcher();

	let selectedIndexes: number[] = [];
	const batchDelete = () => {
		dispatch('deleteByIndexes', selectedIndexes);
		selectedIndexes = [];
	};

	const deleteByIndex = (index: number) => {
		const idx = selectedIndexes.indexOf(index);
		if (idx !== -1) {
			selectedIndexes.splice(idx, 1);
		}
		selectedIndexes = selectedIndexes.map((idx) => (idx > index ? idx - 1 : idx));

		dispatch('deleteByIndexes', [index]);
	};

	export let todos: Todo[];
</script>

<div class="w-96 py-2">
	<div class="text-center my-4">
		<button class="bg-red-500 text-white px-3 py-1" on:click={batchDelete}>Batch delete.</button>
	</div>
	<ul>
		{#each todos as todo, index (todo.id)}
			<li class="flex justify-between border-b mb-2">
				<label class="flex-grow py-1">
					<input type="checkbox" bind:group={selectedIndexes} value={index} />
					{todo.name}
				</label>

				<div class="flex">
					<button
						class="text-white px-3 py-1"
						class:bg-yellow-500={todo.done}
						class:bg-green-500={!todo.done}
						on:click={() => dispatch('switchStatusByIndex', index)}
					>
						{todo.done ? 'Undone' : 'Done'}
					</button>

					<button class="bg-red-500 text-white px-3 py-1" on:click={() => deleteByIndex(index)}>
						x
					</button>
				</div>
			</li>
		{/each}
	</ul>
</div>
