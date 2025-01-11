import ITodo from "../interfaces/ITodo"
import GeneratePriorityColor from "../utils/GeneratePriorityColor"
import IStateManager from "../interfaces/IStateManager"
import InteractionHandler from "../components/InteractionHandler"
import displayTodos from "./displayMain"
import displayPopup from "./displayPopup"
import TagsList from "../components/TagsList"

function createPriorityElement(todo: ITodo): HTMLDivElement {
  const priorityHtmlElement = document.createElement('div')
  priorityHtmlElement.style.background = GeneratePriorityColor(todo.priority)
  priorityHtmlElement.classList.add('priority')
  return priorityHtmlElement
}

function createCheckboxElement(todo: ITodo, stateManager: IStateManager): HTMLDivElement {
  const checkboxHtmlElement = document.createElement('input')
  const interactionHandler = InteractionHandler(stateManager)

  checkboxHtmlElement.type = 'checkbox'
  checkboxHtmlElement.checked = false

  checkboxHtmlElement.addEventListener('click', (e) => {
    interactionHandler.deleteTodo(todo, stateManager.getSelectedProject())
    checkboxHtmlElement.checked = true
    displayTodos(stateManager)
    e.stopPropagation()
  })

  return checkboxHtmlElement
}

function createContentHtmlElement(todo: ITodo): HTMLDivElement {
  const contentHtmlElement = document.createElement('div')
  contentHtmlElement.textContent = todo.name
  return contentHtmlElement
}


function createDueDateHtmlElement(todo: ITodo): HTMLDivElement {
  const dueDateHtmlElement = document.createElement('input')

  dueDateHtmlElement.type = 'date'
  dueDateHtmlElement.value = todo.date

  return dueDateHtmlElement
}

function CreateTagHtml(id: string): HTMLDivElement {
  const tagHtml = document.createElement('div')
  const tagObject = TagsList.find(tag => tag.id === id)

  tagHtml.style.background = tagObject?.color || ''
  tagHtml.textContent = tagObject?.name || ''
  tagHtml.classList.add('tag')

  return tagHtml
}

function createTagsHtml(todo: ITodo): HTMLDivElement {
  const tagsHtmlElement = document.createElement('div')

  tagsHtmlElement.classList.add('tags')
  todo.tags.forEach((tagId: string) => tagsHtmlElement.append(CreateTagHtml(tagId)))

  return tagsHtmlElement
}

function createupperDivHtmlElement(
  priorityHtmlElement: HTMLElement, checkboxHtmlElement: HTMLElement, contentHtmlElement: HTMLElement, dueDateHtmlElement: HTMLElement
) {
  const upperDivHtmlElement = document.createElement('div')
  const leftDivHtmlElement = document.createElement('div')
  const rightDivHtmlElement = document.createElement('div')
  rightDivHtmlElement.classList.add('rightDiv')
  upperDivHtmlElement.classList.add('upperDiv')
  leftDivHtmlElement.append(priorityHtmlElement)
  leftDivHtmlElement.append(checkboxHtmlElement)
  rightDivHtmlElement.append(contentHtmlElement)
  rightDivHtmlElement.append(dueDateHtmlElement)
  upperDivHtmlElement.append(leftDivHtmlElement)
  upperDivHtmlElement.append(rightDivHtmlElement)

  return upperDivHtmlElement
}

function updateTodo(todo: ITodo, stateManager: IStateManager) {
  displayPopup(stateManager, todo)
}

const DisplayTodo = (todo: ITodo, stateManager: IStateManager): HTMLDivElement => {
  const todoHtmlElement = document.createElement('div')

  const priorityHtmlElement = createPriorityElement(todo)
  const checkboxHtmlElement = createCheckboxElement(todo, stateManager)
  const contentHtmlElement = createContentHtmlElement(todo)
  const dueDateHtmlElement = createDueDateHtmlElement(todo)
  const tagsHtmlElement = createTagsHtml(todo)
  const rightHtmlElement = document.createElement('div')
  const upperDivHtmlElement = createupperDivHtmlElement(
    priorityHtmlElement, checkboxHtmlElement, contentHtmlElement, dueDateHtmlElement
  )
  rightHtmlElement.append(upperDivHtmlElement)
  rightHtmlElement.append(tagsHtmlElement)

  todoHtmlElement.append(priorityHtmlElement)
  todoHtmlElement.append(rightHtmlElement)
  todoHtmlElement.classList.add('todo')
  todoHtmlElement.id = todo.id

  todoHtmlElement.addEventListener('click', () => updateTodo(todo, stateManager))

  return todoHtmlElement
}

export default DisplayTodo;

