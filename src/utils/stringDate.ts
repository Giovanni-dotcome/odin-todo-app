export default function stringDate(dateString: string | null): Date {
  if (!dateString)
    return new Date()
  return new Date(dateString)
}
