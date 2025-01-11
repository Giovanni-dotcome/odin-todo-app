import ITodo from "../interfaces/ITodo";
import IProject from "../interfaces/IProject";
import { v4 } from "uuid";
import IsoDate from "../utils/IsoDate"

const Todo = (name: string, description: string, date: Date, priority: string, project: IProject, tags: string[], idInput?: string): ITodo => {
  const id = idInput ? idInput : v4();
  let isoDate = IsoDate(date);
  let done = false;

  return {
    id, name, description, done, date: isoDate, priority, project, tags
  }
}

export default Todo
