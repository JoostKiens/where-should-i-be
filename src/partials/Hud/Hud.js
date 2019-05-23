import { useStateValue } from '/machinery/state'
import { useDebounce } from 'use-debounce'
import { useEffect, useState } from 'react'

export const Hud = ({ docs }) => {
  const [selected, setSelected] = useState()
  const [{ angle }] = useStateValue()
  const [debouncedAngle] = useDebounce(angle, 15)

  useEffect(() => {
    setSelected(determineSelected(debouncedAngle, docs))
  }, [debouncedAngle, docs])

  return (
    <div>
      <h1>
        {selected && new Date(selected.NL.time).toDateString()}
        <br />
        {debouncedAngle}
      </h1>
    </div>
  )
}

function determineSelected(debouncedAngle, docs) {
  const doc = findDocWithClosestArc(debouncedAngle, docs)
  const otherDoc = docs.find(
    x => x.time === doc.time && x.locationID !== doc.locationID
  )
  return {
    NL: doc.locationID === 'NL' ? doc : otherDoc,
    TH: doc.locationID === 'TH' ? doc : otherDoc,
  }
}

function findDocWithClosestArc(debouncedAngle, docs) {
  return docs.reduce((res, curr) =>
    Math.abs(curr.arc - debouncedAngle) < Math.abs(res.arc - debouncedAngle)
      ? curr
      : res
  )
}
