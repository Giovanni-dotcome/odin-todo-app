function isNotValidDate(value: any): value is Date {
  return !(value instanceof Date && !isNaN(value.getTime()))
}

const IsoDate = (date: Date): string => {
  if (isNotValidDate(date))
    date = new Date()
  return date.toISOString().split('T')[0]
}

export default IsoDate
