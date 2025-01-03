import IProject from "../interfaces/IProject"
import Project from "./Project";

const StateManager = () => {
  let currentProject: IProject = Project("Default")
  let projects: IProject[] = []
  projects.push(currentProject)

  function getCurrentProject(): IProject {
    return currentProject;
  }

  function setCurrentProject(newProject: IProject): void {
    currentProject = newProject
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
    deleteProject,
    getCurrentProject,
    setCurrentProject
  }
}

export default StateManager
