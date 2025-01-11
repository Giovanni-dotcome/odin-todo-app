import ITodo from './ITodo'

export default interface IProject {
    id: string;
    name: string;
    isDefault: boolean;
    isSelected: boolean;
    todos: ITodo[];
}
