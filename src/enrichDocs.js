import { min, max } from 'd3-array'
import { createTimeToAngleScale } from '/partials/Chart/createChartScales'

const addArcToDocs = docs => {
  const arcScale = createTimeToAngleScale(
    min(docs, x => x.time),
    max(docs, x => x.time)
  )
  return docs.map((doc, index) => ({
    ...doc,
    arc: arcScale(doc.time),
  }))
}

export const enrichDocs = addArcToDocs
