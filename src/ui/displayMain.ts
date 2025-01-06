import IStateManager from "../interfaces/IStateManager"
import DisplayTodo from "./DisplayTodo"
import displayPopup from "./displayPopup"
import { todosHtmlElement, selectedProjectHtmlElement } from "./htmlElements"

function displayProjectTitle(stateManager: IStateManager) {
  selectedProjectHtmlElement.textContent = stateManager.getCurrentProject().getTitle()
}

function displayPopupHtmlButton(stateManager: IStateManager) {
  const popupHtmlButton = document.createElement('div')
  popupHtmlButton.textContent = 'add todo'

  popupHtmlButton.addEventListener('click', e => {
    e.stopPropagation()
    displayPopup(stateManager)
  })

  todosHtmlElement.append(popupHtmlButton)
}

const DisplayTodos = (stateManager: IStateManager) => {
  todosHtmlElement.innerHTML = ``
  const todos = stateManager.getCurrentProject().getTodos()

  todos.forEach(todo => {
    const todoHtmlElement = DisplayTodo(todo, stateManager)
    todosHtmlElement.appendChild(todoHtmlElement)
  })

  displayPopupHtmlButton(stateManager)

}

export default function displayMain(stateManager: IStateManager) {
  displayProjectTitle(stateManager)
  DisplayTodos(stateManager)
}
