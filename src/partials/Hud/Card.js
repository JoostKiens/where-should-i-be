import { LOCATIONS } from '/constants'
import styles from './Card.css'
import { icons } from './Icons'

export const Card = ({ data }) => {
  const Icon = data.icon ? icons[data.icon] : null
  const Compass = icons.compass
  const precip = Math.round(data.precipIntensity || 0 * 24 * 10) / 10

  return (
    <article className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.location}>
          {LOCATIONS[data.locationID].name}, {data.locationID}
        </h1>
        <div className={styles.weather}>
          <div className={styles.tempMin}>
            {Math.round(data.temperatureMin)}
            <Degrees />
          </div>
          <div className={styles.tempMax}>
            {Math.round(data.temperatureMax)}
            <Degrees />
          </div>
          <div className={styles.icon}>
            <Icon />
          </div>
        </div>
      </div>
      <footer className={styles.meta}>
        <div className={styles.metaItem}>
          <span>Cloud cover:</span> <span>{toPercentage(data.cloudCover)}</span>
        </div>
        <div className={styles.metaItem}>
          <span>Wind:</span>{' '}
          <span>
            <span className={styles.windCompass}>
              <Compass
                style={{ transform: `rotate(${data.windBearing}deg)` }}
              />
            </span>
            {Math.round(data.windSpeed)}{' '}
            <abbr className={styles.abbr} title="Meters per second">
              m/s
            </abbr>
          </span>
        </div>
        <div className={styles.metaItem}>
          <span>Rain fall: {precip + ' mm'}</span>
        </div>
      </footer>

      <p className={styles.summary}>{data.summary}</p>
    </article>
  )
}

const Degrees = () => (
  <abbr className={styles.abbr} title="Degrees Celsius">
    °
  </abbr>
)

const toPercentage = val => `${Math.round((val || 0) * 100)} %`
