import './styles/style.sass'

import Todo from "./components/Todo";
import Priority from "./components/Priority";
import Project from "./components/Project";
import TagsList from "./components/TagsList";
import Ui from "./components/Ui"

const projectWorkout = Project('Workout');
const projectHouseChores = Project('House Chores');

let projects = [projectWorkout, projectHouseChores]

const todoCleanBathroom = Todo(
  'clean bathroom',
  'needs to wash the floor and the wc',
  Priority.LOW, projectHouseChores,
  TagsList.filter(tag => tag.name === 'Personal' || tag.name === 'Maintenance')
);

const todoTakeAWalk = Todo(
  'Take a walk',
  'Do 10.000 steps in less than 2 hours',
  Priority.MEDIUM, projectWorkout,
  TagsList.filter(tag => tag.name === 'Personal' || tag.name === 'Maintenance')
);

todoCleanBathroom.setProject(projectHouseChores);
projectHouseChores.deleteTodo(todoCleanBathroom.getId());

const ui = Ui();
ui.displayProjects(projects);
// ui.displayProjects();
// ui.displayTodos();
//

//const ul = document.querySelector('ul')
//const h1 = document.querySelector('h1')
//const main = document.querySelector('main')
//const mainUl = main?.querySelector('ul')

//if (ul)
//  ul.innerHTML = `<li>${defaultProject.getTitle()}</li>`;
//if (h1)
//  h1.innerHTML = `${defaultProject.getTitle()}`;
//if (mainUl)
//  mainUl.innerHTML = `${todoCleanBathroom.getTitle()}`;
