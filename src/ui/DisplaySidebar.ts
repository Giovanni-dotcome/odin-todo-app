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
      // TODO: the ids below are different... they should be the same
      if (project.getId() === stateManager.getCurrentProject().getId()) {
        console.log('deleting current project');
        stateManager.setCurrentProject(stateManager.getDefaultProject())
      }

      console.log(project.getTitle(), project.getId());
      console.log(stateManager.getCurrentProject().getTitle(),
        stateManager.getCurrentProject().getId());

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
