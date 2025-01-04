import IProject from "./IProject";

export default interface IStateManager {
  getDefaultProject(): IProject;
  getProjects(): IProject[];
  isDefaultProject(project: IProject): boolean;
  isCurrentProject(project: IProject): boolean;
  getCurrentProject(): IProject;
  setCurrentProject(newProject: IProject): void;
  getProject(projectId: string): IProject | undefined;
  deleteProject(project: IProject): void;
  addProject(project: IProject): void;
}
