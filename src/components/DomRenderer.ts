import IProject from "../interfaces/IProject";
import Project from "../components/Project";
import ITodo from "../interfaces/ITodo";
import InteractionHandler from "../components/InteractionHandler"

const DomRenderer = (projects: IProject[]) => {
  const projectsHtml = document.querySelector('#projectsList')!
  const todosHtml = document.querySelector('#todosList')!
  const projectHtml = document.querySelector('#selectedProject')!
  const interactionHandler = InteractionHandler(projects)

  function displayTodos(project: IProject | null) {
    todosHtml.innerHTML = ``

    if (!project)
      return

    const todos = project.getTodos()

    todos.forEach(todo => {
      const li = document.createElement('li')
      li.textContent = todo.getTitle()
      todosHtml.append(li)
    })
  }

  function displayProjectTitle(project: IProject | null) {
    projectHtml.textContent = ''

    if (!project)
      return

    projectHtml.textContent = project.getTitle()
  }

  function displayProjects() {
    projectsHtml.innerHTML = ``

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
