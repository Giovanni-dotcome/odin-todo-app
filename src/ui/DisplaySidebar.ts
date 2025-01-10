import { interactionHandler } from "../index";
import IStateManager from "../interfaces/IStateManager";
import { projectsHtmlElement } from "./htmlElements";
import displayMain from "./displayMain";


function displayProjects(stateManager: IStateManager) {
  projectsHtmlElement.innerHTML = ``

  const projects = stateManager.getProjects()

  projects.forEach(project => {
    const li = document.createElement('li')
    const projectTitle = document.createElement('div')
    const removeProject = document.createElement('div')
    projectTitle.textContent = project.getTitle()
    removeProject.textContent = 'X'
    li.append(projectTitle)
    if (!stateManager.isDefaultProject(project))
      li.append(removeProject)
    li.addEventListener('click', () => {
      stateManager.setCurrentProject(project)
      displayMain(stateManager)
    });
    removeProject.addEventListener('click', (e) => {
      e.stopPropagation()
      interactionHandler.deleteProject(project)
      stateManager.setCurrentProject(stateManager.getDefaultProject())

      displaySidebar(stateManager)
      displayMain(stateManager)
    })
    projectsHtmlElement.append(li)
  })
}

function displayAddProjectButton(stateManager: IStateManager) {
  const liAddProjectHtml = document.createElement('button')

  liAddProjectHtml.textContent = `New Project`
  liAddProjectHtml.addEventListener('click', () => {
    interactionHandler.addProject()
    displayMain(stateManager)
    displaySidebar(stateManager)
  })

  projectsHtmlElement.append(liAddProjectHtml)
}

export default function displaySidebar(stateManager: IStateManager) {
  displayProjects(stateManager)
  displayAddProjectButton(stateManager)
}
