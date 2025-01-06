import IProject from "../interfaces/IProject";
import ITodo from "../interfaces/ITodo";
import Project from "../components/Project";
import Todo from "../components/Todo";
import IStateManager from "../interfaces/IStateManager";
import GenerateTag from "../utils/GenerateTag"
import ITag from "../interfaces/ITag";
import { popupHtmlElement } from "../ui/htmlElements";

const InteractionHandler = (stateManager: IStateManager) => {

  function addProject() {
    const newProjectTitle: string | null = prompt('Project Name:')
    if (!newProjectTitle)
      return
    const newProject = Project(newProjectTitle)
    stateManager.setCurrentProject(newProject)
    stateManager.addProject(newProject)
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
    let dueDate: Date = new Date(dueDateString)
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

    const isCorrectDate = (date: Date): boolean => {
      return date instanceof Date && isFinite(+date);

    };

    if (!isCorrectDate(dueDate)) dueDate = new Date()

    project.addTodo(Todo(title, description, dueDate, priority, project, tags))
    stateManager.setCurrentProject(project)
    popupHtmlElement.classList.toggle('hidden')
  }

  return {
    addProject,
    deleteProject,
    deleteTodo,
    addTodo
  }
}

export default InteractionHandler
