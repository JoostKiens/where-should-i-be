import { useStateValue } from '/machinery/state'
import { useEffect, useState } from 'react'
import { Card } from './Card'
import styles from './Hud.css'
import { CHART_MAX_TEMP, CHART_MIN_TEMP, MONTHS } from '/constants'

export const Hud = ({ docs, style }) => {
  const [selected, setSelected] = useState()
  const [{ snapIndex }] = useStateValue()

  useEffect(() => {
    setSelected(determineSelected(snapIndex, docs))
  }, [snapIndex, docs])

  return !selected ? null : (
    <div style={style} className={styles.main}>
      <div className={styles.cardTH}>
        <Card data={selected.TH} />
      </div>
      <div className={styles.cardNL}>
        <Card data={selected.NL} />
      </div>
      <span className={styles.maxTemp}>{CHART_MAX_TEMP}°</span>
      <span className={styles.minTemp}>{CHART_MIN_TEMP}°</span>
      <span className={styles.selectedDate}>
        {formatDate(selected.TH.time)}
      </span>
    </div>
  )
}

const determineSelected = (index, docs) => ({
  NL: docs[index * 2],
  TH: docs[index * 2 + 1],
})

const formatDate = timestamp => {
  const d = new Date(timestamp)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ’${d
    .getFullYear()
    .toString()
    .substring(2)}`
}
