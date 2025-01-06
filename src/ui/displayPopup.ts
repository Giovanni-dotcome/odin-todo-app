import { popupHtmlElement, tagsHtmlElement, navHtmlElement, mainHtmlElement } from "./htmlElements"
import TagsList from "../components/TagsList"
import IStateManager from "../interfaces/IStateManager"

export default function displayPopup(stateManager: IStateManager) {
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

  popupHtmlElement.classList.remove('hidden')
  mainHtmlElement.classList.add('blur')
  navHtmlElement.classList.add('hidden')
}

