import IProject from "../interfaces/IProject";
import ITodo from "../interfaces/ITodo";
import { v4 } from 'uuid';  // Use a library to generate UUIDs

const Project = (title: string): IProject => {
  const id = v4();
  let todos: ITodo[] = [];

  return {
    getId() {
      return id;
    },
    updateTodo(id, title, description, dueDate, priority, project, tags) {
      const index = todos.findIndex(todo => todo.getId() === id)

      if (index === -1)
        return

      todos[index].setTitle(title)
      todos[index].setDescription(description)
      todos[index].setDueDate(dueDate)
      todos[index].setPriority(priority)
      todos[index].setProject(project)
      todos[index].emptyTags()
      tags.forEach(tag => todos[index].addTag(tag.id))
      // TODO: after update generate more copies of Todo object, so updating add!!
    },
    getTitle() {
      return title;
    },
    setTitle(newTitle: string) {
      title = newTitle;
    },
    getTodos(): ITodo[] {
      return todos;
    },
    deleteTodo(todoId: string) {
      if (!todos) return;
      todos = todos.filter(todo => todo.getId() !== todoId)
    },
    addTodo(todo: ITodo) {
      todos.push(todo);
    }
  }
}

export default Project;
