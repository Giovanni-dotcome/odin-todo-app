import ITag from './ITag'
import IProject from './IProject'
import Priority from "../components/Priority";

export default interface ITodo {
    getId(): string;

    getTitle(): string;
    setTitle(title: string): void;

    getDescription(): string;
    setDescription(description: string): void;

    getDueDate(): Date | null;
    setDueDate(dueDate: Date | null): void;

    getPriority(): Priority;
    setPriority(priority: Priority): void;

    isDone(): boolean;
    toggleDone(): void;

    getProject(): IProject;
    setProject(project: IProject): void;

    getTags(): ITag[];
    addTag(tagId: string): void;
    deleteTag(tagId: string): void;
}