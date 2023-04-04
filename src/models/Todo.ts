let id = 0;
class Todo {
	id: number;
	name: string;
	done: boolean;

	constructor(name: string, done = false) {
		this.id = ++id;
		this.name = name;
		this.done = done;
	}
}

export default Todo;
