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

  function updateTodo(todo: ITodo, newName: string, newDescription: string, newDate: string, newPriority: string, newProjectId: string, tags: string[]) {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === todo.project.id)
        deleteTodo(project.id, todo.id)
      if (project.id === newProjectId) {
        console.log(`adding todo inside: ${project.name}`)
        const newTodo = Todo(newName, newDescription, new Date(newDate), newPriority, getProject(newProjectId), tags, todo.id)
        addTodo(project.id, newTodo)
      }
    })
  }

  function deleteTodo(projectId: string, todoId: string) {
    Object.keys(localStorage).forEach(key => {
      const project: IProject = JSON.parse(localStorage.getItem(key) || '{}')
      if (project.id === projectId) {
        console.log(`deleting todo inside: ${project.name}`)
        const index = project.todos.findIndex(todo => todo.id === todoId)
        project.todos.splice(index, 1)
        localStorage.setItem(key, JSON.stringify(project))
      }
    })
  }

  return {
    getProjects,

    getProject,
    addProject,
    deleteProject,

    getDefaultProject,

    getSelectedProject,
    setSelectedProject,

    addTodo,
    updateTodo,
    deleteTodo,
  }
}

export default StateManager
