<script lang="ts">
	import '../index.css';
	import Header from '../components/Header.svelte';
	import TodoList from '../components/TodoList.svelte';
	import Todo from '../models/Todo';

	let name = '';
	let todos: Todo[] = [];

	const addTodo = () => {
		if (!name) {
			return;
		}

		const todo = new Todo(name);
		todos = [...todos, todo];
		name = '';
	};

	const deleteByIndexes = (e: CustomEvent<number[]>) => {
		todos = todos.filter((_, index) => !e.detail.includes(index));
	};

	const switchStatusByIndex = (e: CustomEvent<number>) => {
		todos[e.detail].done = !todos[e.detail].done;
	};
</script>

<Header />

<main class="flex flex-col items-center">
	<form on:submit|preventDefault={addTodo}>
		<div class="flex items-center justify-center">
			<input
				id="todo-input"
				class="border-b outline-none w-96 px-4 py-2"
				type="text"
				placeholder="Please input todo name..."
				bind:value={name}
			/>
			<button class="bg-blue-500 text-white px-4 py-2">Add</button>
		</div>
	</form>

	<TodoList
		{todos}
		on:deleteByIndexes={deleteByIndexes}
		on:switchStatusByIndex={switchStatusByIndex}
	/>
</main>
