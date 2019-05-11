import { times } from '/utils/array'

export const getUTCTimeForDaysAgo = daysAgo => {
  const now = new Date()
  const dueDate = new Date(now)
  dueDate.setUTCMilliseconds(0)
  dueDate.setUTCSeconds(0)
  dueDate.setUTCMinutes(0)
  dueDate.setUTCHours(0)
  dueDate.setUTCDate(now.getUTCDate() - daysAgo)
  return dueDate.getTime()
}

export const getTimesForDays = days =>
  times(days).map(i => getUTCTimeForDaysAgo(i + 1))
