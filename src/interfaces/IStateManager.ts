import IProject from "./IProject";
import ITodo from "./ITodo";

export default interface IStateManager {
  getProjects(): IProject[];

  getProject(id: string): IProject;
  addProject(project: IProject): void;
  deleteProject(id: string): void;

  isDefaultProject(id: string): boolean;
  getDefaultProject(): IProject;

  isSelectedProject(id: string): boolean;
  getSelectedProject(): IProject;
  setSelectedProject(id: string): void;

  addTodo(projectId: string, todo: ITodo): void;
  updateTodo(projectId: string, todoId: string, newName: string, newDescription: string, newDate: string, newPriority: string, newProjectId: string, tags: string[]): void;
  deleteTodo(projectId: string, todoId: string): void;
}
