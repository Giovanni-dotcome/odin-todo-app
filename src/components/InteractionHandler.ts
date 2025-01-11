import IProject from "../interfaces/IProject";
import ITodo from "../interfaces/ITodo";
import Project from "../components/Project";
import Todo from "../components/Todo";
import IStateManager from "../interfaces/IStateManager";
import { mainHtmlElement, navHtmlElement } from "../ui/htmlElements";

const InteractionHandler = (stateManager: IStateManager) => {
  function addProject() {
    const newProjectTitle: string | null = prompt('Project Name:')
    if (!newProjectTitle)
      return
    const newProject = Project(newProjectTitle)
    stateManager.setSelectedProject(newProject.id)
    stateManager.addProject(newProject)
  }

  function deleteProject(project: IProject) {
    stateManager.deleteProject(project.id)
  }

  function deleteTodo(todo: ITodo, project: IProject) {
    stateManager.deleteTodo(project.id, todo.id)
  }

  function updateTodo(
    todo: ITodo,
    title: string,
    description: string,
    date: string, // TODO: this date is not safe to update without any check, try to create a single function to handle dates (a template is in IsoDate.ts)
    priority: string,
    projectId: string,
    tagsIds: string[],
  ) {
    const tags: string[] = []

    tagsIds.forEach(id => tags.push(id));

    stateManager.updateTodo(todo, title, description, date, priority, projectId, tags)

    stateManager.setSelectedProject(projectId)
    navHtmlElement.classList.remove('hidden')
    mainHtmlElement.classList.remove('blur')
  }

  function addTodo(
    title: string,
    description: string,
    date: string,
    priority: string,
    projectId: string,
    tagIds: string[]
  ) {
    const project: IProject | undefined = stateManager.getProject(projectId)
    const tags: string[] = []

    tagIds.forEach(id => tags.push(id));

    if (!project)
      return;

    // TODO: check if you really need the project object in the todo object, is used in the object constructor below
    stateManager.addTodo(projectId, Todo(title, description, new Date(date), priority, project, tags))
    stateManager.setSelectedProject(project.id)
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
