import IProject from "../interfaces/IProject";
import ITodo from "../interfaces/ITodo";
import Project from "../components/Project";
import Todo from "../components/Todo";
import IStateManager from "../interfaces/IStateManager";
import GenerateTag from "../utils/GenerateTag"
import ITag from "../interfaces/ITag";
import { mainHtmlElement, navHtmlElement } from "../ui/htmlElements";
import stringDate from "../utils/stringDate";
import Priority from "./Priority";
import displayMain from "../ui/displayMain";

const InteractionHandler = (stateManager: IStateManager) => {
  function addProject() {
    const newProjectTitle: string | null = prompt('Project Name:')
    if (!newProjectTitle)
      return
    const newProject = Project(newProjectTitle)
    stateManager.setCurrentProject(newProject)
    stateManager.addProject(newProject)
  }

  function deleteProject(projectToRemove: IProject) {
    stateManager.deleteProject(projectToRemove)
    //const projectToDisplay = getProjectToDisplay(projectToRemove)
  }

  function deleteTodo(todoToRemove: ITodo, project: IProject) {
    project.deleteTodo(todoToRemove.getId())
  }

  function updateTodo(
    id: string,
    title: string,
    description: string,
    dueDateString: string,
    priority: string,
    projectId: string,
    tagsNodeList: NodeListOf<Element>
  ) {
    let dueDate: Date = stringDate(dueDateString)
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

    // TODO: after update generate more copies of Todo object, so updating add!!
    project.updateTodo(id, title, description, dueDate, Priority[priority as keyof typeof Priority], project, tags)

    stateManager.setCurrentProject(project)
    navHtmlElement.classList.remove('hidden')
    mainHtmlElement.classList.remove('blur')
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
    navHtmlElement.classList.remove('hidden')
    mainHtmlElement.classList.remove('blur')
  }

  return {
    addProject,
    deleteProject,
    deleteTodo,
    updateTodo,
    addTodo
  }
}

export default InteractionHandler
