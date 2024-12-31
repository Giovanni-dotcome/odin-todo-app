import IProject from "../interfaces/IProject";
import Project from "../components/Project";
import ITodo from "../interfaces/ITodo";

const ui = (projects: IProject[]) => {
  const projectsHtml = document.querySelector('#projectsList')!
  const todosHtml = document.querySelector('#todosList')!
  const projectHtml = document.querySelector('#selectedProject')!

  function changeProject(project: IProject) {
    displayProject(project)
    displayTodos(project)
  }

  function addProject() {
    const newProjectTitle: string | null = prompt('Project Name:')
    if (newProjectTitle)
      projects.push(Project(newProjectTitle))
    displayProjects(projects)
  }

  function displayTodos(project: IProject) {
    const todos = project.getTodos()
    todosHtml.innerHTML = ``
    todos.forEach(todo => {
      const li = document.createElement('li')
      li.textContent = todo.getTitle()
      todosHtml.append(li)
    })
  }

  function displayProjects(projects: IProject[]) {
    projectsHtml.innerHTML = ``
    projects.forEach(project => {
      const li = document.createElement('li')
      li.textContent = project.getTitle()
      li.addEventListener('click', () => changeProject(project));
      projectsHtml.append(li)
    })
    const liAddProjectHtml = document.createElement('li')
    liAddProjectHtml.textContent = `New Project`
    liAddProjectHtml.addEventListener('click', () => addProject())
    projectsHtml.append(liAddProjectHtml)
  }

  function displayProject(project: IProject) {
    projectHtml.textContent = project.getTitle()
  }

  return {
    displayProjects,
    displayProject,
    displayTodos
  }
}

export default ui;
