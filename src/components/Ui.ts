import IProject from "../interfaces/IProject";
import Project from "../components/Project";
import ITodo from "../interfaces/ITodo";

const ui = (projects: IProject[]) => {
  const projectsHtml = document.querySelector('#projectsList')!
  const todosHtml = document.querySelector('#todosList')!
  const projectHtml = document.querySelector('#selectedProject')!

  function changeProject(project: IProject | null) {
    displayProject(project)
    displayTodos(project)
  }

  function addProject() {
    const newProjectTitle: string | null = prompt('Project Name:')
    if (newProjectTitle)
      projects.push(Project(newProjectTitle))
    displayProjects()
  }

  function displayTodos(project: IProject | null) {
    if (!project) {
      todosHtml.innerHTML = ``
      return
    }
    const todos = project.getTodos()
    todosHtml.innerHTML = ``
    todos.forEach(todo => {
      const li = document.createElement('li')
      li.textContent = todo.getTitle()
      todosHtml.append(li)
    })
  }

  function getProjectToDisplay(projectToRemove: IProject): IProject | null {
    // TODO: implemente logic to display the project below or above the project is removed (now it returns null so it's just resetted the display)
    return null;
  }

  function deleteProject(projectToRemove: IProject) {
    projects = projects.filter(project => project.getId() !== projectToRemove.getId())
    displayProjects()

    const projectToDisplay = getProjectToDisplay(projectToRemove)

    changeProject(projectToDisplay)
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
      selectProject.addEventListener('click', () => changeProject(project));
      removeProject.addEventListener('click', () => deleteProject(project));
      projectsHtml.append(li)
    })
    const liAddProjectHtml = document.createElement('li')
    liAddProjectHtml.textContent = `New Project`
    liAddProjectHtml.addEventListener('click', () => addProject())
    projectsHtml.append(liAddProjectHtml)
  }

  function displayProject(project: IProject | null) {
    if (project)
      projectHtml.textContent = project.getTitle()
    else
      projectHtml.textContent = ''
  }

  return {
    displayProjects,
    displayProject,
    displayTodos
  }
}

export default ui;
