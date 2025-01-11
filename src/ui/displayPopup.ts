import { tagsHtmlElement, sidebar, content, overlay, addTodoHtml } from "./htmlElements"
import TagsList from "../components/TagsList"
import IStateManager from "../interfaces/IStateManager"
import ITodo from "../interfaces/ITodo"
import { interactionHandler } from ".."
import displayMain from "./displayMain"
import hideSidebar from "../utils/hideSidebar"
import IsoDate from "../utils/IsoDate"

export default function displayPopup(stateManager: IStateManager, todo?: ITodo) {
  addTodoHtml.innerHTML = ``
  const titleHtml = document.querySelector('#title') as HTMLInputElement
  const descriptionHtml = document.querySelector('#description') as HTMLInputElement
  const dueDateHtml = document.querySelector('#dueDate') as HTMLInputElement
  const priorityHtml = document.querySelector('#priority') as HTMLInputElement
  const projectHtml = document.querySelector('#project') as HTMLInputElement
  const addTodobuttonElement = document.createElement('button') as HTMLButtonElement

  addTodobuttonElement.textContent = todo === undefined ? 'add todo' : 'update todo'
  addTodoHtml.append(addTodobuttonElement)

  if (todo === undefined) {
    titleHtml.value = ``
    descriptionHtml.value = ``
    dueDateHtml.value = IsoDate(new Date())
    priorityHtml.value = `low`
    projectHtml.value = ``
  } else {
    titleHtml.value = todo.name
    descriptionHtml.value = todo.description
    dueDateHtml.value = todo.date
    priorityHtml.value = todo.priority
    projectHtml.value = todo.project.id
  }

  addTodobuttonElement.addEventListener('click', () => {

    if (todo === undefined) {
      interactionHandler.addTodo(
        titleHtml.value,
        descriptionHtml.value,
        dueDateHtml.value,
        priorityHtml.value,
        projectHtml.value,
        [...document.querySelectorAll('.tag-checked')].map(element => element.id),
      )
    }
    else {
      interactionHandler.updateTodo(
        todo,
        titleHtml.value,
        descriptionHtml.value,
        dueDateHtml.value,
        priorityHtml.value,
        projectHtml.value,
        [...document.querySelectorAll('.tag-checked')].map(element => element.id),
      )
    }

    titleHtml.value = ``
    descriptionHtml.value = ``
    dueDateHtml.value = ``
    displayMain(stateManager)
    hideSidebar()
  })

  const projectsHtmlElement = (sidebar.querySelector('#project') as HTMLSelectElement)!
  const projects = stateManager.getProjects()

  tagsHtmlElement.innerHTML = ``
  TagsList.forEach(tag => { // TODO: refactor to use a single constructor: CreateTagHtml(id: string): HTMLDivElement (in DisplayTodo.ts there's a sample)
    const tagHtmlElemenet = document.createElement('button')
    tagHtmlElemenet.classList.add('tag-button')
    tagHtmlElemenet.innerText = `#${tag.name}`
    tagHtmlElemenet.value = tag.name
    tagHtmlElemenet.id = tag.id
    if (todo !== undefined && todo.tags.find(tagId => tagId === tag.id))
      tagHtmlElemenet.classList.add('tag-checked')
    tagHtmlElemenet.style.backgroundColor = tag.color
    tagHtmlElemenet.addEventListener('click', () => {
      tagHtmlElemenet.classList.toggle('tag-checked')
    })
    tagsHtmlElement.append(tagHtmlElemenet)
  })

  projectsHtmlElement.innerHTML = ``
  projects.forEach(project => {
    const option = document.createElement('option')
    option.value = project.id
    option.innerHTML = project.name
    if (project.isSelected)
      option.selected = true
    projectsHtmlElement.appendChild(option)
  })

  sidebar.style.right = '0'; // Show sidebar
  content.classList.add('blur'); // Blur the content
  overlay.classList.add('visible'); // Show overlay
}

