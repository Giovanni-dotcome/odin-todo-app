import IStateManager from "../interfaces/IStateManager"
import DisplayTodo from "./DisplayTodo"
import displayPopup from "./displayPopup"
import { todosHtmlElement, selectedProjectHtmlElement } from "./htmlElements"

function displayProjectName(stateManager: IStateManager) {
  const project = stateManager.getSelectedProject()
  selectedProjectHtmlElement.textContent = project.name
}

function displayButtonToOpenPopup(stateManager: IStateManager) {
  const buttonToOpenPopupHtml = document.createElement('div')
  buttonToOpenPopupHtml.classList.add('new-todo-button')
  buttonToOpenPopupHtml.textContent = 'New Todo'

  buttonToOpenPopupHtml.addEventListener('click', e => {
    e.stopPropagation()
    displayPopup(stateManager)
  })

  todosHtmlElement.append(buttonToOpenPopupHtml)
}

const DisplayTodos = (stateManager: IStateManager) => {
  todosHtmlElement.innerHTML = ``
  const todos = stateManager.getSelectedProject().todos

  todos.forEach(todo => {
    const todoHtmlElement = DisplayTodo(todo, stateManager)
    todosHtmlElement.appendChild(todoHtmlElement)
  })

  displayButtonToOpenPopup(stateManager)

}

export default function displayMain(stateManager: IStateManager) {
  displayProjectName(stateManager)
  DisplayTodos(stateManager)
}
