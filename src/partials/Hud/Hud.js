import { useStateValue } from '/machinery/state'
import { useDebounce } from 'use-debounce'
import { useEffect, useState } from 'react'
import { findDocWithClosestArc } from '/utils/findDocWithClosestArc'
import styles from './Hud.css'

export const Hud = ({ docs, style }) => {
  const [selected, setSelected] = useState()
  const [{ arc }] = useStateValue()
  const [debouncedArc] = useDebounce(arc, 6)

  useEffect(() => {
    setSelected(determineSelected(debouncedArc, docs))
  }, [debouncedArc, docs])

  return (
    <div style={style} className={styles.main}>
      <h1>{selected && new Date(selected.NL.time).toDateString()}</h1>
    </div>
  )
}

function determineSelected(arc, docs) {
  const doc = findDocWithClosestArc(arc, docs)
  const otherDoc = docs.find(
    x => x.time === doc.time && x.locationID !== doc.locationID
  )
  return {
    NL: doc.locationID === 'NL' ? doc : otherDoc,
    TH: doc.locationID === 'TH' ? doc : otherDoc,
  }
}
