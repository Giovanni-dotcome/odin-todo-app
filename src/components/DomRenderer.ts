import { interactionHandler } from "..";
import IStateManager from "../interfaces/IStateManager";
import displaySidebar from "../ui/DisplaySidebar"
import displayMain from "../ui/displayMain";
import hideSidebar from "../utils/hideSidebar";
import { addTodoButtonHtml, overlay } from "../ui/htmlElements";

const DomRenderer = (stateManager: IStateManager) => {
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

    titleHtml.value = ``
    descriptionHtml.value = ``
    dueDateHtml.value = ``
    displayMain(stateManager)
    hideSidebar()
  })

  overlay.addEventListener('click', () => hideSidebar())

  displayMain(stateManager)
  displaySidebar(stateManager)
}

export default DomRenderer
