import IProject from "../interfaces/IProject"
import ITodo from "../interfaces/ITodo"
import Project from "./Project"
import Todo from "./Todo"

const StateManager = () => {
  function getProjects(): IProject[] {
    const projects: IProject[] = []
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      projects.push(project)
    })
    return projects;
  }

  // TODO: check if necessary, is used in addTodo, to put the project object in the todo. but I suspect the project todo is useless in the todo object
  function getProject(id: string): IProject {
    for (const key of Object.keys(localStorage)) {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === id)
        return project
    }
    return getDefaultProject();
  }

  function addProject(project: IProject): void {
    localStorage.setItem(project.id, JSON.stringify(project))
  }

  function deleteProject(id: string): void {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === id)
        localStorage.removeItem(id)
    })
  }

  // TODO: check if this is ever used
  function isDefaultProject(id: string): boolean {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === id && project.isDefault)
        return true
    })
    return false
  }

  function getDefaultProject(): IProject {
    for (const key of Object.keys(localStorage)) {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.isDefault)
        return project
    }

    const defaultProject = Project('Default', true, true)
    localStorage.setItem(defaultProject.id, JSON.stringify(defaultProject || '{}'))

    return defaultProject
  }

  // TODO: check if this is ever used
  function isSelectedProject(id: string): boolean {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === id && project.isSelected)
        return true
    })
    return false
  }

  function getSelectedProject(): IProject {
    for (const key of Object.keys(localStorage)) {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.isSelected) {
        return project
      }
    }
    return getDefaultProject()
  }

  function setSelectedProject(id: string): void {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')

      if (project.isSelected) {
        project.isSelected = false
        localStorage.setItem(key, JSON.stringify(project))
      }
      if (project.id === id) {
        project.isSelected = true
        localStorage.setItem(key, JSON.stringify(project))
      }
    })
  }

  function addTodo(projectId: string, todo: ITodo) {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === projectId) {
        project.todos.push(todo)
        localStorage.setItem(key, JSON.stringify(project))
      }
    })
  }

  function updateTodo(projectId: string, todoId: string, newName: string, newDescription: string, newDate: string, newPriority: string, newProjectId: string, tags: string[]) {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === projectId)
        deleteTodo(project.id, todoId)
      if (project.id === newProjectId) {
        const newTodo = Todo(newName, newDescription, new Date(newDate), newPriority, getProject(newProjectId), tags, todoId)
        addTodo(project.id, newTodo)
      }
    })
  }

  function deleteTodo(projectId: string, todoId: string) {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === projectId) {
        const index = project.todos.findIndex(todo => todo.id === todoId)
        project.todos.splice(index, 1)
      }
    })
  }

  return {
    getProjects,

    getProject,
    addProject,
    deleteProject,

    isDefaultProject,
    getDefaultProject,

    isSelectedProject,
    getSelectedProject,
    setSelectedProject,

    addTodo,
    updateTodo,
    deleteTodo,
  }
}

export default StateManager
