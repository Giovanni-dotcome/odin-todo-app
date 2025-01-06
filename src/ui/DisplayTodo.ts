import ITag from "../interfaces/ITag"
import ITodo from "../interfaces/ITodo"
import GeneratePriorityColor from "../utils/GeneratePriorityColor"
import IStateManager from "../interfaces/IStateManager"
import InteractionHandler from "../components/InteractionHandler"
import displayTodos from "./displayMain"

function createPriorityElement(todo: ITodo): HTMLDivElement {
  const priorityHtmlElement = document.createElement('div')
  priorityHtmlElement.style.background = GeneratePriorityColor(todo.getPriority())
  priorityHtmlElement.classList.add('priority')
  return priorityHtmlElement
}

function createCheckboxElement(todo: ITodo, stateManager: IStateManager): HTMLDivElement {
  const checkboxHtmlElement = document.createElement('input')
  const interactionHandler = InteractionHandler(stateManager)

  checkboxHtmlElement.type = 'checkbox'
  checkboxHtmlElement.checked = todo.isDone()

  checkboxHtmlElement.addEventListener('input', () => {
    interactionHandler.deleteTodo(todo, stateManager.getCurrentProject())
    displayTodos(stateManager)
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
  tagsHtmlElement.classList.add('tags')
  todo.getTags().forEach((tag: ITag) => {
    const tagHtmlElement = document.createElement('div')
    tagHtmlElement.classList.add('tag')
    tagHtmlElement.style.background = tag.color
    tagHtmlElement.textContent = tag.name
    tagsHtmlElement.append(tagHtmlElement)
  })

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
const DisplayTodo = (todo: ITodo, stateManager: IStateManager): HTMLDivElement => {
  const todoHtmlElement = document.createElement('div')

  const priorityHtmlElement = createPriorityElement(todo)
  const checkboxHtmlElement = createCheckboxElement(todo, stateManager)
  const contentHtmlElement = createContentHtmlElement(todo)
  const dueDateHtmlElement = createDueDateHtmlElement(todo)
  const tagsHtmlElement = createTagsHtmlElement(todo)
  const rightHtmlElement = document.createElement('div')
  const upperDivHtmlElement = createupperDivHtmlElement(
    priorityHtmlElement, checkboxHtmlElement, contentHtmlElement, dueDateHtmlElement
  )
  rightHtmlElement.append(upperDivHtmlElement)
  rightHtmlElement.append(tagsHtmlElement)

  todoHtmlElement.append(priorityHtmlElement)
  todoHtmlElement.append(rightHtmlElement)
  todoHtmlElement.classList.add('todo')

  return todoHtmlElement
}

export default DisplayTodo;

