import { interactionHandler } from "../index";
import IStateManager from "../interfaces/IStateManager";
import { projectsHtmlElement } from "./htmlElements";
import displayMain from "./displayMain";


function displayProjects(stateManager: IStateManager) {
  projectsHtmlElement.innerHTML = ``

  const projects = stateManager.getProjects()

  projects.forEach(project => {
    const li = document.createElement('li')
    const selectProject = document.createElement('div')
    const removeProject = document.createElement('div')
    selectProject.textContent = project.getTitle()
    removeProject.textContent = 'X'
    li.append(selectProject)
    li.append(removeProject)
    selectProject.addEventListener('click', () => {
      stateManager.setCurrentProject(project)
      displayMain(stateManager)
    });
    removeProject.addEventListener('click', () => {
      interactionHandler.deleteProject(project)
      // TODO: 
      // if deleting stateManager.setCurrentProject():
      //    if no other projcet in stateManager.getProjects():
      //        display nothing
      //    else: display stateManager.getProjects()[0]
      // else:
      //    don't rerender the main
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
