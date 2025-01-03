import IProject from "./IProject";

export default interface IStateManager {
  getProjects(): IProject[];
  getCurrentProject(): IProject;
  setCurrentProject(newProject: IProject): void;
  getProject(projectId: string): IProject | undefined;
  deleteProject(project: IProject): void;
  addProject(project: IProject): void;
}
