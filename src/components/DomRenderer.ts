import InteractionHandler from "../components/InteractionHandler"
import IStateManager from "../interfaces/IStateManager";
import ITodo from "../interfaces/ITodo";
import ITag from "../interfaces/ITag";
import TagsList from "./TagsList";
import GeneratePriorityColor from "../utils/GeneratePriorityColor";

const DomRenderer = (stateManager: IStateManager) => {
  const projectsHtmlElement = document.querySelector('#projectsList')!
  const todosHtmlElement = document.querySelector('#todosList')!
  const selectedProjectHtmlElement = document.querySelector('#selectedProject')!
  const popupHtmlElement = document.querySelector('#popup')!
  const interactionHandler = InteractionHandler(stateManager)

  function displayTodo(todo: ITodo) {
    const todoHtmlElement = createTodoElement(todo);
    todosHtmlElement.appendChild(todoHtmlElement);
  }

  function createPriorityElement(todo: ITodo): HTMLDivElement {
    const priorityHtmlElement = document.createElement('div')
    priorityHtmlElement.style.background = GeneratePriorityColor(todo.getPriority())
    priorityHtmlElement.classList.add('priority')
    return priorityHtmlElement
  }

  function createCheckboxElement(todo: ITodo): HTMLDivElement {
    const checkboxHtmlElement = document.createElement('input')
    checkboxHtmlElement.type = 'checkbox'
    checkboxHtmlElement.checked = todo.isDone()
    checkboxHtmlElement.addEventListener('input', () => {
      interactionHandler.deleteTodo(todo, stateManager.getCurrentProject())
      displayTodos()
    })
    return checkboxHtmlElement
  }

  function createContentHtmlElement(todo: ITodo): HTMLDivElement {
    const contentHtmlElement = document.createElement('div')
    contentHtmlElement.textContent = todo.getTitle()
    return contentHtmlElement
  }

  function createDueDateHtmlElement(todo: ITodo): HTMLDivElement {
    const dueDateHtmlElement = document.createElement('input')
    dueDateHtmlElement.type = 'date'
    let date = todo.getDueDate()!

    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let formattedDate = date.getFullYear() + "-" + (month) + "-" + (day);

    dueDateHtmlElement.value = formattedDate ? formattedDate : ''

    return dueDateHtmlElement
  }

  function createTagsHtmlElement(todo: ITodo): HTMLDivElement {
    const tagsHtmlElement = document.createElement('div')
    todo.getTags().forEach((tag: ITag) => {
      const tagHtmlElement = document.createElement('div')
      tagHtmlElement.style.background = tag.color
      tagHtmlElement.textContent = tag.name

      tagsHtmlElement.append(tagHtmlElement)
    })

    return tagsHtmlElement
  }

  function createTodoElement(todo: ITodo): HTMLDivElement {
    const todoHtmlElement = document.createElement('div')

    const priorityHtmlElement = createPriorityElement(todo)
    const checkboxHtmlElement = createCheckboxElement(todo)
    const contentHtmlElement = createContentHtmlElement(todo)
    const dueDateHtmlElement = createDueDateHtmlElement(todo)
    const tagsHtmlElement = createTagsHtmlElement(todo)

    todoHtmlElement.append(priorityHtmlElement)
    todoHtmlElement.append(checkboxHtmlElement)
    todoHtmlElement.append(contentHtmlElement)
    todoHtmlElement.append(dueDateHtmlElement)
    todoHtmlElement.append(tagsHtmlElement)
    todoHtmlElement.classList.add('todo')

    return todoHtmlElement
  }

  function togglePopup() {
    const addTodoHtmlElement = document.createElement('div')
    addTodoHtmlElement.textContent = 'add todo'
    addTodoHtmlElement.addEventListener('click', () => {
      const projectsHtmlElement = popupHtmlElement.querySelector('#project')
      const projects = stateManager.getProjects()

      const tagsHtmlElement = document.querySelector('#tags')!

      TagsList.forEach(tag => {
        const tagHtmlElemenet = document.createElement('button')
        tagHtmlElemenet.classList.add('tag-button')
        tagHtmlElemenet.innerText = `#${tag.name}`
        tagHtmlElemenet.value = tag.name
        tagHtmlElemenet.id = tag.id
        tagHtmlElemenet.style.backgroundColor = tag.color
        tagHtmlElemenet.addEventListener('click', () => {
          tagHtmlElemenet.classList.toggle('tag-checked')
        })
        tagsHtmlElement.append(tagHtmlElemenet)
      })

      projects.forEach(project => {
        const option = document.createElement('option')
        option.value = project.getId()
        option.innerHTML = project.getTitle()
        projectsHtmlElement?.appendChild(option)
      })

      const addTodoButtonHtml = document.querySelector('#addTodo')!
      addTodoButtonHtml.addEventListener('click', () => {
        const titleHtml = document.querySelector('#title') as HTMLInputElement
        const descriptionHtml = document.querySelector('#description') as HTMLInputElement
        const dueDateHtml = document.querySelector('#dueDate') as HTMLInputElement
        const priorityHtml = document.querySelector('#priority') as HTMLInputElement
        const projectHtml = document.querySelector('#project') as HTMLInputElement

        interactionHandler.addTodo(
          titleHtml.value,
          descriptionHtml.value,
          dueDateHtml.value,
          priorityHtml.value,
          projectHtml.value,
          document.querySelectorAll('.tag-button')
        )
        displayMain(project)
      })


      popupHtmlElement.classList.toggle('hidden')
      // TODO: add rendering of pop up to add new todo.
      // then call interactionHandler.addTodo('tile', etc...)
    })
    todosHtmlElement.append(addTodoHtmlElement)
  }

  function displayTodos() {
    todosHtmlElement.innerHTML = ``
    const todos = stateManager.getCurrentProject().getTodos()

    todos.forEach(todo => displayTodo(todo))
    togglePopup()
  }

  function displayProjectTitle() {
    selectedProjectHtmlElement.textContent = ''
    selectedProjectHtmlElement.textContent = stateManager.getCurrentProject().getTitle()
  }

  function displaySidebar() {
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
        displaySidebar()
        displayMain(null)
      })
      projectsHtmlElement.append(li)
    })

    const liAddProjectHtml = document.createElement('li')

    liAddProjectHtml.textContent = `New Project`
    liAddProjectHtml.addEventListener('click', () => {
      interactionHandler.addProject()
      displaySidebar()
    })

    projectsHtmlElement.append(liAddProjectHtml)
  }

  function displayMain() {
    displayProjectTitle()
    displayTodos()
  }

  displayMain()
  displaySidebar()
}

export default DomRenderer
