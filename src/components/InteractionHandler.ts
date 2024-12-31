import IProject from "../interfaces/IProject";
import Project from "../components/Project";

const InteractionHandler = (projects: IProject[]) => {

  function addProject() {
    const newProjectTitle: string | null = prompt('Project Name:')
    if (newProjectTitle)
      projects.push(Project(newProjectTitle))
  }


  //function getProjectToDisplay(projectToRemove: IProject): IProject | null {
  //  // TODO: implemente logic to display the project below or above the project is removed (now it returns null so it's just resetted the display)
  //  return null;
  //}

  function deleteProject(projectToRemove: IProject) {
    const index = projects.findIndex(project => project.getId() === projectToRemove.getId())
    if (index !== -1)
      projects.splice(index, 1)
    //const projectToDisplay = getProjectToDisplay(projectToRemove)
  }

  return {
    addProject,
    deleteProject
  }
}

export default InteractionHandler
