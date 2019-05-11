import config from '@kaliber/config'
import { LOCATIONS } from '/constants'

export const getWeather = ({ time, locationID }) => {
  const apiEndpoint = getApiEndpoint(time, locationID)
  return fetch(apiEndpoint, { method: 'GET' })
    .then(handleErrors)
    .then(res => res.json())
    .then(res => {
      const shared = { time, locationID }
      const formattedWeatherData = formatWeatherDate(res)
      return { ...shared, ...formattedWeatherData }
    })
    .catch(err => {
      throw new Error(err)
    })
}

function handleErrors(res) {
  if (!res.ok) {
    throw Error(`Failed to retrieve data from DarkSky API: ${res.statusText}`)
  }
  return res
}

function formatWeatherDate(res) {
  if (res && res.daily && res.daily.data && res.daily.data[0]) {
    const { time: localTime, ...rest } = res.daily.data[0]
    return { success: true, localTime, ...rest }
  }
  return { success: false }
}

function getApiEndpoint(time, locationID) {
  // DarkSky API doesn't accept milliseconds, so they are stripped.
  // https://darksky.net/dev/docs#time-machine-request
  // @TODO Is this OK???
  const formattedTime = Math.floor(time / 1000)
  const { apiKey } = config.server.darksky
  const { lat, lon } = LOCATIONS[locationID]
  return `https://api.darksky.net/forecast/${apiKey}/${lat},${lon},${formattedTime}?exclude=currently,hourly&units=si`
}
