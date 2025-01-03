import IProject from "../interfaces/IProject";
import ITodo from "../interfaces/ITodo";
import Project from "../components/Project";
import Todo from "../components/Todo";
import IStateManager from "../interfaces/IStateManager";
import GenerateTag from "../utils/GenerateTag/GenerateTag"
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

  function addTodo(
    title: string,
    description: string,
    dueDateString: string,
    priority: string,
    projectId: string,
    tagsNodeList: NodeListOf<Element>
  ) {
    const dueDate: Date = new Date(dueDateString)
    const project: IProject | undefined = stateManager.getProject(projectId)
    const tags: ITag[] = []

    tagsNodeList.forEach(element => {
      if (element.classList.contains('tag-checked')) {
        const id = (element as HTMLElement).id

        const tag = GenerateTag(id)
        if (tag)
          tags.push(tag)
      }
    });

    if (!project)
      return;
    console.log(project.getTodos());
    project.addTodo(Todo(title, description, dueDate, priority, project, tags))
    console.log(project.getTodos());

  }

  return {
    addProject,
    deleteProject,
    deleteTodo,
    addTodo
  }
}

export default InteractionHandler
