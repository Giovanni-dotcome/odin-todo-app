import ITag from "../interfaces/ITag";
import TagsList from "../components/TagsList";

export default function GenerateTag(id: string): ITag | undefined {
  const tag = TagsList.find(tag => tag.id === id)
  if (tag)
    return tag
}
