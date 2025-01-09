import { tagsHtmlElement, sidebar, content, overlay, addTodoHtml } from "./htmlElements"
import TagsList from "../components/TagsList"
import IStateManager from "../interfaces/IStateManager"
import ITodo from "../interfaces/ITodo"
import { interactionHandler } from ".."
import displayMain from "./displayMain"
import hideSidebar from "../utils/hideSidebar"

export default function displayPopup(stateManager: IStateManager, todo?: ITodo) {
  addTodoHtml.innerHTML = ``
  const addTodobuttonElement = document.createElement('button')
  addTodobuttonElement.textContent = 'add todo'
  addTodoHtml.append(addTodobuttonElement)

  addTodobuttonElement.addEventListener('click', () => {
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

  if (todo) {
    console.log(`updating todo: ${todo}`)
  }
  const projectsHtmlElement = (sidebar.querySelector('#project') as HTMLSelectElement)!
  const projects = stateManager.getProjects()

  tagsHtmlElement.innerHTML = ``
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

  projectsHtmlElement.innerHTML = ``
  projects.forEach(project => {
    const option = document.createElement('option')
    option.value = project.getId()
    option.innerHTML = project.getTitle()
    if (stateManager.isCurrentProject(project))
      option.selected = true
    projectsHtmlElement.appendChild(option)
  })

  sidebar.style.right = '0'; // Show sidebar
  content.classList.add('blur'); // Blur the content
  overlay.classList.add('visible'); // Show overlay
}

