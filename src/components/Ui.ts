import IProject from "../interfaces/IProject";

const ui = () => {
  const projectsHtml = document.querySelector('#projectsList')!

  function displayProjects(projects: IProject[]) {
    projects.forEach(project => {
      const li = document.createElement('li')
      li.textContent = project.getTitle()
      projectsHtml.append(li)
    })
  }

  return {
    displayProjects
  }
}

export default ui;
