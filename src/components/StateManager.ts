import IProject from "../interfaces/IProject"
import Project from "./Project";

const StateManager = () => {
  const defaultProject = Project('Default')
  let currentProject: IProject = defaultProject
  let projects: IProject[] = []
  projects.push(currentProject)

  function getDefaultProject(): IProject {
    return defaultProject
  }

  function getCurrentProject(): IProject {
    return currentProject;
  }

  function setCurrentProject(newProject: IProject): void {
    currentProject = newProject
  }

  function isDefaultProject(project: IProject): boolean {
    return project.getId() === defaultProject.getId()
  }

  function isCurrentProject(project: IProject): boolean {
    return project.getId() === currentProject.getId()
  }

  function getProjects(): IProject[] {
    return projects;
  }

  function getProject(projectId: string): IProject | undefined {
    const projectFound = projects.find(project => project.getId() === projectId)
    if (projectFound)
      return projectFound
  }

  function addProject(project: IProject): void {
    projects.push(project)
  }

  function deleteProject(projectToRemove: IProject): void {
    const index = projects.findIndex(project => project.getId() === projectToRemove.getId())
    if (index !== -1)
      projects.splice(index, 1)
  }

  return {
    getProjects,
    getProject,
    addProject,
    isDefaultProject,
    isCurrentProject,
    getDefaultProject,
    getCurrentProject,
    deleteProject,
    setCurrentProject
  }
}

export default StateManager
