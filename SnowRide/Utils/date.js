export function formatDateTime(timeStampObj) {
  const date = timeStampObj.toDate();
  return date.toDateString() + " @" + date.getHours() + ":" + date.getMinutes();
}
