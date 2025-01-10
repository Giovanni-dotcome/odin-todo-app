import ITag from './ITag'
import ITodo from './ITodo'

export default interface IProject {
    getId(): string;
    getTitle(): string;
    getTodos(): ITodo[];
    setTitle(title: string): void;
    deleteTodo(todoId: string): void;
    addTodo(todo: ITodo): void;
    updateTodo(id: string, title: string, description: string, dueDate: Date, priority: string, project: IProject, tags: ITag[]): void;
}
