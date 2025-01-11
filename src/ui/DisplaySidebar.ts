import { interactionHandler } from "../index";
import IStateManager from "../interfaces/IStateManager";
import { projectsHtmlElement as projectsHtml } from "./htmlElements";
import displayMain from "./displayMain";
import IProject from "../interfaces/IProject";

function displayProject(project: IProject, stateManager: IStateManager): HTMLElement {
  const projectHtml = document.createElement('li')
  const nameHtml = document.createElement('div')
  const removeButton = document.createElement('div')

  nameHtml.textContent = project.name
  removeButton.textContent = 'X'
  projectHtml.append(nameHtml)

  if (!project.isDefault)
    projectHtml.append(removeButton)

  projectHtml.addEventListener('click', () => {
    stateManager.setSelectedProject(project.id)
    displayMain(stateManager)
  });

  removeButton.addEventListener('click', () => {
    stateManager.deleteProject(project.id)
    displaySidebar(stateManager)
  })

  return projectHtml
}

function displayProjects(stateManager: IStateManager) {
  projectsHtml.innerHTML = ``

  // TODO: default project needs to be rendered before the other projects
  Object.keys(localStorage).forEach((key) => {
    const project = JSON.parse(localStorage.getItem(key) || '');
    const projectHtml = displayProject(project, stateManager)
    projectsHtml.append(projectHtml)

  })
}

function displayAddProjectButton(stateManager: IStateManager) {
  const newProjectButton = document.createElement('button')

  newProjectButton.textContent = `New Project`
  newProjectButton.classList.add('new-button')
  newProjectButton.addEventListener('click', () => {
    interactionHandler.addProject()
    displayMain(stateManager)
    displaySidebar(stateManager)
  })

  projectsHtml.append(newProjectButton)
}

export default function displaySidebar(stateManager: IStateManager) {
  displayProjects(stateManager)
  displayAddProjectButton(stateManager)
}
