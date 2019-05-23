import { useStateValue } from '/machinery/state'
import { useEffect, useState } from 'react'
import styles from './Hud.css'

export const Hud = ({ docs, style }) => {
  const [selected, setSelected] = useState()
  const [{ arc, snapArc }] = useStateValue()

  useEffect(() => {
    setSelected(determineSelected(snapArc, docs))
  }, [snapArc, docs])

  return (
    <div style={style} className={styles.main}>
      <h1>{selected && new Date(selected.NL.time).toDateString()}</h1>
      <h1>{arc}</h1>
    </div>
  )
}

const determineSelected = (arc, docs) => {
  const [NL, TH] = docs
    .filter(x => x.arc === arc)
    .sort((a, b) => (a.locationID < b.locationID ? -1 : 1))
  return { NL, TH }
}
