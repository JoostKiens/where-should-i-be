import { LOCATIONS } from '/constants'
import styles from './Card.css'
import { icons } from './Icons'

export const Card = ({ data }) => {
  const Icon = icons[data.icon]
  const precip = Math.round(data.precipIntensity * 24 * 10) / 10

  // windBearing
  return (
    <article className={styles.main}>
      <h3>
        {LOCATIONS[data.locationID].name}, {data.locationID}
      </h3>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div>
        Min. Temp: {Math.round(data.temperatureMin)} <Degrees />
      </div>
      <div>
        Max. Temp: {Math.round(data.temperatureMax)} <Degrees />
      </div>
      <div>Cloud cover: {toPercentage(data.cloudCover)}</div>
      <div>Humidity: {toPercentage(data.humidity)}</div>
      <div>
        Windspeed: {Math.round(data.windSpeed)}{' '}
        <abbr className={styles.abbr} title="Meters per second">
          m/s
        </abbr>
      </div>
      <p className={styles.summary}>{data.summary}</p>
      {precip > 0 && <span>Rain fall {precip + ' mm'}</span>}
    </article>
  )
}

const Degrees = () => (
  <abbr className={styles.abbr} title="Degrees Celsius">
    °C
  </abbr>
)

const toPercentage = val => `${Math.round((val || 0) * 100)} %`
