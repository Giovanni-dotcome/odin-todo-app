import { todosHtmlElement, popupHtmlElement, tagsHtmlElement } from "./htmlElements"
import TagsList from "../components/TagsList"
import IStateManager from "../interfaces/IStateManager"

export default function togglePopup(stateManager: IStateManager) {
  const addTodoHtmlElement = document.createElement('div')
  addTodoHtmlElement.textContent = 'add todo'

  addTodoHtmlElement.addEventListener('click', () => {
    const projectsHtmlElement = (popupHtmlElement.querySelector('#project') as HTMLSelectElement)!
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

    popupHtmlElement.classList.toggle('hidden')
    // TODO: add rendering of pop up to add new todo.
    // then call interactionHandler.addTodo('tile', etc...)
  })

  todosHtmlElement.append(addTodoHtmlElement)
}

