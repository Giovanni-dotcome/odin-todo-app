import IProject from "../interfaces/IProject"

const StateManager = () => {
  let projects: IProject[] = []

  function getProjects() {
    return projects;
  }

  function getProject(projectId: string): IProject | undefined {
    const projectFound = projects.find(project => project.getId() === projectId)
    if (projectFound)
      return projectFound
  }

  function addProject(project: IProject) {
    projects.push(project)
  }

  function deleteProject(projectToRemove: IProject) {
    const index = projects.findIndex(project => project.getId() === projectToRemove.getId())
    if (index !== -1)
      projects.splice(index, 1)
  }

  return {
    getProjects,
    getProject,
    addProject,
    deleteProject
  }
}

export default StateManager
