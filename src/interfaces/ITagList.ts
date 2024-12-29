import ITag from "./ITag";

export default interface ITagList {
    tags: ITag[];
    addTag: (tagName: string) => void;
    removeTag: (tagName: string) => void;
}