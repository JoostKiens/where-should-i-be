import { useStateValue } from '/machinery/state'
import { useEffect, useState } from 'react'
import { Card } from './Card'
import styles from './Hud.css'

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
    </div>
  )
}

const determineSelected = (index, docs) => ({
  NL: docs[index * 2],
  TH: docs[index * 2 + 1],
})
