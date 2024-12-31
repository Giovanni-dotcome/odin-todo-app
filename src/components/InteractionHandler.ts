import IProject from "../interfaces/IProject";
import Project from "../components/Project";
import IStateManager from "../interfaces/IStateManager";

const InteractionHandler = (stateManager: IStateManager) => {

  function addProject() {
    const newProjectTitle: string | null = prompt('Project Name:')
    if (newProjectTitle)
      stateManager.addProject(Project(newProjectTitle))
  }


  //function getProjectToDisplay(projectToRemove: IProject): IProject | null {
  //  // TODO: implemente logic to display the project below or above the project is removed (now it returns null so it's just resetted the display)
  //  return null;
  //}

  function deleteProject(projectToRemove: IProject) {
    stateManager.deleteProject(projectToRemove)
    //const projectToDisplay = getProjectToDisplay(projectToRemove)
  }

  return {
    addProject,
    deleteProject
  }
}

export default InteractionHandler