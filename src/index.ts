import './styles/style.sass'

import Todo from "./components/Todo";
import Priority from "./components/Priority";
import Project from "./components/Project";
import TagsList from "./components/TagsList";

const defaultProject = Project('Work stuff');

const todoCleanBathroom = Todo('clean bathroom', 'needs to wash the floor and the wc', Priority.LOW, defaultProject, TagsList.filter(tag => tag.name === 'Personal' || tag.name === 'Maintenance'));

const projectHouseChores = Project('House Chores');

todoCleanBathroom.setProject(projectHouseChores);
projectHouseChores.deleteTodo(todoCleanBathroom.getId());

//console.log(projectHouseChores.getTodos());
console.log('new test');

const ul = document.querySelector('ul')
const h1 = document.querySelector('h1')
const main = document.querySelector('main')
const mainUl = main?.querySelector('ul')

if (ul)
  ul.innerHTML = `<li>${defaultProject.getTitle()}</li>`;
if (h1)
  h1.innerHTML = `${defaultProject.getTitle()}`;
if (mainUl)
  mainUl.innerHTML = `${todoCleanBathroom.getTitle()}`;
