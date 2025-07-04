export function generateHourlyStrings() {
  const hours = []

  for (let i = 0; i < 24; i++) {
    const hourString = i.toString().padStart(2, '0') + ':00'

    hours.push({ value: hourString })
  }

  return hours
}

export function getTimeOfDay() {
  const now = new Date()
  const hour = now.getHours()

  if (hour >= 5 && hour < 12) {
    return 'morning'
  } else if (hour >= 12 && hour < 15) {
    return 'afternoon'
  } else if (hour >= 15 && hour < 18) {
    return 'evening'
  } else {
    return 'night'
  }
}
