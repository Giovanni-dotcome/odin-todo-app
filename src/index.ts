import './styles/style.sass'

import Todo from "./components/Todo";
import Priority from "./components/Priority";
import Project from "./components/Project";
import TagsList from "./components/TagsList";

const defaultProject = Project('default');

const todo1 = Todo('clean bathroom', 'needs to wash the floor and the wc', Priority.LOW, defaultProject, TagsList.filter(tag => tag.name === 'Personal' || tag.name === 'Maintenance'));

console.log(todo1.getId())