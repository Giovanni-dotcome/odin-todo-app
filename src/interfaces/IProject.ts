import ITodo from './ITodo'

export default interface IProject {
    getId(): string;
    getTitle(): string;
    getTodos(): ITodo[];
    setTitle(title: string): void;
    deleteTodo(todoId: string): void;
    addTodo(todo: ITodo): void;
    updateTodo(todo: ITodo, title: string, description: string, ): void;
}
