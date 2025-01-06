import { tagsHtmlElement, sidebar, content, overlay } from "./htmlElements"
import TagsList from "../components/TagsList"
import IStateManager from "../interfaces/IStateManager"

export default function displayPopup(stateManager: IStateManager) {
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

