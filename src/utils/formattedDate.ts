export default function formatteDate(date: Date | null) {
  if (!date)
    date = new Date()
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let formattedDate = date.getFullYear() + "-" + (month) + "-" + (day);

  return formattedDate
}
