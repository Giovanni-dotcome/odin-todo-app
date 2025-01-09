import IStateManager from "../interfaces/IStateManager"
import DisplayTodo from "./DisplayTodo"
import displayPopup from "./displayPopup"
import { todosHtmlElement, selectedProjectHtmlElement } from "./htmlElements"

function displayProjectTitle(stateManager: IStateManager) {
  selectedProjectHtmlElement.textContent = stateManager.getCurrentProject().getTitle()
}

function displayButtonToOpenPopup(stateManager: IStateManager) {
  const buttonToOpenPopupHtml = document.createElement('div')
  buttonToOpenPopupHtml.classList.add('new-todo-button')
  buttonToOpenPopupHtml.textContent = 'New Todo'

  buttonToOpenPopupHtml.addEventListener('click', e => {
    e.stopPropagation()
    console.log('inside display main')
    displayPopup(stateManager)
  })

  todosHtmlElement.append(buttonToOpenPopupHtml)
}

const DisplayTodos = (stateManager: IStateManager) => {
  todosHtmlElement.innerHTML = ``
  const todos = stateManager.getCurrentProject().getTodos()

  todos.forEach(todo => {
    const todoHtmlElement = DisplayTodo(todo, stateManager)
    todosHtmlElement.appendChild(todoHtmlElement)
  })

  displayButtonToOpenPopup(stateManager)

}

export default function displayMain(stateManager: IStateManager) {
  displayProjectTitle(stateManager)
  DisplayTodos(stateManager)
}
