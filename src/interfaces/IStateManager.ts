import IProject from "./IProject";
import ITodo from "./ITodo";

export default interface IStateManager {
  getProjects(): IProject[];

  getProject(id: string): IProject;
  addProject(project: IProject): void;
  deleteProject(id: string): void;

  getDefaultProject(): IProject;

  getSelectedProject(): IProject;
  setSelectedProject(id: string): void;

  addTodo(projectId: string, todo: ITodo): void;
  updateTodo(todo: ITodo, newName: string, newDescription: string, newDate: string, newPriority: string, newProjectId: string, tags: string[]): void;
  deleteTodo(projectId: string, todoId: string): void;
}
