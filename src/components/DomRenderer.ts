import IProject from "../interfaces/IProject";
import InteractionHandler from "../components/InteractionHandler"
import IStateManager from "../interfaces/IStateManager";
import ITodo from "../interfaces/ITodo";

const DomRenderer = (stateManager: IStateManager) => {
  const projectsHtml = document.querySelector('#projectsList')!
  const todosHtml = document.querySelector('#todosList')!
  const projectHtml = document.querySelector('#selectedProject')!
  const interactionHandler = InteractionHandler(stateManager)

  function displayTodo(todo: ITodo) {
    const li = document.createElement('li')
    li.textContent = todo.getTitle()
    todosHtml.append(li)
  }

  function displayTodos(project: IProject | null) {
    todosHtml.innerHTML = ``

    if (!project)
      return

    const todos = project.getTodos()

    todos.forEach(todo => displayTodo(todo))
  }

  function displayProjectTitle(project: IProject | null) {
    projectHtml.textContent = ''

    if (!project)
      return

    projectHtml.textContent = project.getTitle()
  }

  function displayProjects() {
    projectsHtml.innerHTML = ``
    const projects = stateManager.getProjects()

    projects.forEach(project => {
      const li = document.createElement('li')
      const selectProject = document.createElement('div')
      const removeProject = document.createElement('div')
      selectProject.textContent = project.getTitle()
      removeProject.textContent = 'X'
      li.append(selectProject)
      li.append(removeProject)
      selectProject.addEventListener('click', () => displayMain(project));
      removeProject.addEventListener('click', () => {
        interactionHandler.deleteProject(project)
        displayProjects()
        displayMain(null)
      })
      projectsHtml.append(li)
    })

    const liAddProjectHtml = document.createElement('li')

    liAddProjectHtml.textContent = `New Project`
    liAddProjectHtml.addEventListener('click', () => {
      interactionHandler.addProject()
      displayProjects()
    })

    projectsHtml.append(liAddProjectHtml)
  }

  function displayMain(project: IProject | null) {
    displayProjectTitle(project)
    displayTodos(project)
  }

  return {
    displayProjects,
    displayProject: displayProjectTitle,
    displayTodos
  }
}

export default DomRenderer;
