import IProject from "./IProject";

export default interface IStateManager {
  getProjects(): IProject[];
  deleteProject(project: IProject): void;
  addProject(project: IProject): void;
}
