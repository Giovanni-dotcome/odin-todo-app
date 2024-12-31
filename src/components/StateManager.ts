import IProject from "../interfaces/IProject"

const StateManager = () => {
  let projects: IProject[] = []

  function getProjects() {
    return projects;
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
    addProject,
    deleteProject
  }
}

export default StateManager
