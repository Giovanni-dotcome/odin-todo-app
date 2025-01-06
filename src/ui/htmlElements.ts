const projectsHtmlElement = document.querySelector('#projectsList')!
const todosHtmlElement = document.querySelector('#todosList')! as HTMLDivElement
const selectedProjectHtmlElement = document.querySelector('#selectedProject')!
const tagsHtmlElement = document.querySelector('#tags')!
const addTodoButtonHtml = document.querySelector('#addTodo')!
const navHtmlElement = document.querySelector('nav')!
const mainHtmlElement = document.querySelector('main')!
const sidebar = document.getElementById('sidebar')!
const content = document.getElementById('content')!
const overlay = document.getElementById('overlay')!

export {
  sidebar,
  content,
  overlay,
  addTodoButtonHtml,
  navHtmlElement,
  mainHtmlElement,
  projectsHtmlElement,
  tagsHtmlElement,
  todosHtmlElement,
  selectedProjectHtmlElement
}
