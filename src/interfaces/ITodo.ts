import IProject from './IProject'

export default interface ITodo {
  id: string;
  name: string;
  description: string;
  done: boolean;
  date: string;
  priority: string;
  project: IProject;
  tags: string[];
}
