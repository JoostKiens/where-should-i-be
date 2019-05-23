import { ChartWithTouch } from '/partials/Chart/ChartWithTouch'
import { Hud } from '/partials/Hud/Hud'
import { useEffect, useState } from 'react'
import { StateProvider } from '/machinery/state'
import { reducer, initialState } from '/store'

import { min, max } from 'd3-array'
import { createTimeToAngleScale } from '/partials/Chart/createChartScales'

export default function Main({ docs }) {
  const [isMounted, setIsMounted] = useState(false)

  // also need to add weights for niceness
  // @TODO we should do this before we store on server
  const docsWithArc = addArcToDocs(docs)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [setIsMounted])

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <h1>Charts</h1>
      <Hud docs={docsWithArc} />
      {!isMounted ? null : <ChartWithTouch docs={docsWithArc} />}
    </StateProvider>
  )
}

function addArcToDocs(docs) {
  const arcScale = createTimeToAngleScale(
    min(docs, x => x.time),
    max(docs, x => x.time)
  )
  return docs.map((doc, index) => ({
    ...doc,
    arc: arcScale(doc.time),
  }))
}
