import IStateManager from "../interfaces/IStateManager"
import DisplayTodo from "./DisplayTodo"
import togglePopup from "./togglePopup"
import { todosHtmlElement, selectedProjectHtmlElement } from "./htmlElements"

function displayProjectTitle(stateManager: IStateManager) {
  selectedProjectHtmlElement.textContent = ''
  selectedProjectHtmlElement.textContent = stateManager.getCurrentProject().getTitle()
}

const DisplayTodos = (stateManager: IStateManager) => {
  todosHtmlElement.innerHTML = ``
  const todos = stateManager.getCurrentProject().getTodos()

  todos.forEach(todo => {
    const todoHtmlElement = DisplayTodo(todo, stateManager)
    todosHtmlElement.appendChild(todoHtmlElement)
  })
  togglePopup(stateManager)
}

export default function displayMain(stateManager: IStateManager) {
  displayProjectTitle(stateManager)
  DisplayTodos(stateManager)
}
