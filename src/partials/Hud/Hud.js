import { useStateValue } from '/machinery/state'
import { useEffect, useState } from 'react'
import { Card } from './Card'
import styles from './Hud.css'

export const Hud = ({ docs, style }) => {
  const [selected, setSelected] = useState()
  const [{ snapArc }] = useStateValue()

  useEffect(() => {
    setSelected(determineSelected(snapArc, docs))
  }, [snapArc, docs])

  return !selected ? null : (
    <div style={style} className={styles.main}>
      <div className={styles.cardTH}>
        <Card data={selected.TH} />
      </div>
      <div className={styles.cardNL}>
        <Card data={selected.NL} />
      </div>
    </div>
  )
}

const determineSelected = (arc, docs) => {
  const [NL, TH] = docs
    .filter(x => x.arc === arc)
    .sort((a, b) => (a.locationID < b.locationID ? -1 : 1))
  return { NL, TH }
}
