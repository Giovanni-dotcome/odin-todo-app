import IProject from "../interfaces/IProject";
import InteractionHandler from "../components/InteractionHandler"
import IStateManager from "../interfaces/IStateManager";
import ITodo from "../interfaces/ITodo";
import ITag from "../interfaces/ITag";

const DomRenderer = (stateManager: IStateManager) => {
  const projectsHtmlElement = document.querySelector('#projectsList')!
  const todosHtmlElement = document.querySelector('#todosList')!
  const projectHtmlElement = document.querySelector('#selectedProject')!
  const popupHtmlElement = document.querySelector('#popup')!
  const interactionHandler = InteractionHandler(stateManager)

  function displayTodo(todo: ITodo, project: IProject) {
    const todoHtmlElement = document.createElement('div')
    const contentHtmlElement = document.createElement('div')
    const checkboxHtmlElement = document.createElement('input')
    const dueDateHtmlElement = document.createElement('input')
    const tagsHtmlElement = document.createElement('div')
    const priorityHtmlElement = document.createElement('div')

    contentHtmlElement.textContent = todo.getTitle()
    checkboxHtmlElement.type = 'checkbox'
    checkboxHtmlElement.checked = todo.isDone()
    checkboxHtmlElement.addEventListener('input', () => {
      interactionHandler.deleteTodo(todo, project)
      displayTodos(project)
    })

    dueDateHtmlElement.type = 'date'
    priorityHtmlElement.style.background = todo.getPriority()
    priorityHtmlElement.classList.add('priority')

    todo.getTags().forEach((tag: ITag) => {
      const tagHtmlElement = document.createElement('div')
      tagHtmlElement.style.background = tag.color
      tagHtmlElement.textContent = tag.name

      tagsHtmlElement.append(tagHtmlElement)
    })

    const date = todo.getDueDate()!

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let formattedDate = `${year}-${month}-${day}`;
    //console.log(formattedDate);


    dueDateHtmlElement.value = formattedDate ? formattedDate : ''

    todoHtmlElement.append(priorityHtmlElement)
    todoHtmlElement.append(checkboxHtmlElement)
    todoHtmlElement.append(contentHtmlElement)
    todoHtmlElement.append(dueDateHtmlElement)
    todoHtmlElement.append(tagsHtmlElement)
    todoHtmlElement.classList.add('todo')

    todosHtmlElement.append(todoHtmlElement)
  }

  function displayAddTodoButton() {
    const addTodoHtmlElement = document.createElement('div')
    addTodoHtmlElement.textContent = 'add todo'
    addTodoHtmlElement.addEventListener('click', () => {
      popupHtmlElement.classList.toggle('hidden')
      // TODO: add rendering of pop up to add new todo.
      // then call interactionHandler.addTodo('tile', etc...)
    })
    todosHtmlElement.append(addTodoHtmlElement)
  }

  function displayTodos(project: IProject | null) {
    todosHtmlElement.innerHTML = ``

    if (!project)
      return

    const todos = project.getTodos()

    todos.forEach(todo => displayTodo(todo, project))
    displayAddTodoButton()
  }

  function displayProjectTitle(project: IProject | null) {
    projectHtmlElement.textContent = ''

    if (!project)
      return

    projectHtmlElement.textContent = project.getTitle()
  }

  function displayProjects() {
    projectsHtmlElement.innerHTML = ``
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
      projectsHtmlElement.append(li)
    })

    const liAddProjectHtml = document.createElement('li')

    liAddProjectHtml.textContent = `New Project`
    liAddProjectHtml.addEventListener('click', () => {
      interactionHandler.addProject()
      displayProjects()
    })

    projectsHtmlElement.append(liAddProjectHtml)
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
