import ITodo from "../interfaces/ITodo";
import ITag from "../interfaces/ITag";
import IProject from "../interfaces/IProject";
import TagsList from "./TagsList";
import Priority from "./Priority";
import { v4 } from "uuid";

const Todo = (title: string, description: string, date: Date, priority: string, project: IProject, tags: ITag[]): ITodo => {
  const id = v4();
  let dueDate = date ? date : new Date();
  let done = false;
  const todo: ITodo = {
    emptyTags() {
      tags = []
    },
    addTag(tagId: string): void {
      if (tags.filter(tag => tag.id === tagId).length > 0) return;
      const tag = TagsList.filter(tag => tag.id === tagId)[0];
      if (tag)
        tags.push(tag);
    },
    getDescription(): string {
      return description;
    },
    getDueDate(): Date | null {
      return dueDate;
    },
    getId(): string {
      return id;
    },
    getPriority(): string {
      return priority;
    },
    getProject(): IProject {
      return project;
    },
    getTags(): ITag[] {
      return tags;
    },
    getTitle(): string {
      return title;
    },
    isDone(): boolean {
      return done;
    },
    deleteTag(tagId: string): void {
      tags = tags.filter(tag => tag.id !== tagId)
    },
    setDescription(newDescription: string): void {
      description = newDescription;
    },
    setDueDate(newDueDate: Date): void {
      dueDate = newDueDate;
    },
    setPriority(newPriority: Priority): void {
      priority = newPriority;
    },
    setProject(newProject: IProject): void {
      newProject.addTodo(todo);
      project = newProject;
    },
    setTitle(newTitle: string): void {
      title = newTitle;
    },
    toggleDone(): void {
      done = !done;
    }
  }

  return todo;
}

export default Todo;
