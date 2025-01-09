import IProject from "./IProject";
import ITodo from "./ITodo";

export interface IInteractionHandler {
  addProject(): void;
  deleteProject(projectToRemove: IProject): void;
  deleteTodo(todoToRemove: ITodo, project: IProject): void;
  updateTodo(
    id: string,
    title: string,
    description: string,
    dueDateString: string,
    priority: string,
    projectId: string,
    tagsNodeList: NodeListOf<Element>
  ): void
  addTodo(
    title: string,
    description: string,
    dueDateString: string,
    priority: string,
    projectId: string,
    tagsNodeList: NodeListOf<Element>
  ): void
}
