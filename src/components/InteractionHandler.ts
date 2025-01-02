import IProject from "../interfaces/IProject";
import ITodo from "../interfaces/ITodo";
import Project from "../components/Project";
import Todo from "../components/Todo";
import IStateManager from "../interfaces/IStateManager";
import Priority from "./Priority";
import ITag from "../interfaces/ITag";

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
  function deleteTodo(todoToRemove: ITodo, project: IProject) {
    project.deleteTodo(todoToRemove.getId())
  }

  function addTodo(title: string, description: string, priority: Priority, project: IProject, tags: ITag[]) {
    project.addTodo(Todo(title, description, priority, project, tags))
  }

  return {
    addProject,
    deleteProject,
    deleteTodo
  }
}

export default InteractionHandler
