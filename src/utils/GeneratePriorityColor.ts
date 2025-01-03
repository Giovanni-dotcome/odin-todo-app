import Priority from "../components/Priority";

export default function GeneratePriorityColor(priority: string): string {
  switch (priority) {
    case Priority.HIGH:
      return 'red'

    case Priority.MEDIUM:
      return 'yellow'

    case Priority.LOW:
      return 'green'
  }
  return ''
}
