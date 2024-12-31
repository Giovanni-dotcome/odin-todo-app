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

const ui = Ui(projects);
ui.displayProjects();
ui.displayProject(projectWorkout);
ui.displayTodos(projectWorkout)
