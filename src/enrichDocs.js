import { min, max } from 'd3-array'
import { scaleTime } from 'd3-scale'

const addExtraToDocs = docs => {
  const arcScale = scaleTime()
    .domain([min(docs, x => x.time), max(docs, x => x.time)])
    .range([Math.PI * 2, 0])

  return docs.map((doc, index) => ({
    ...doc,
    arc: arcScale(doc.time),
    avg: (doc.temperatureMax + doc.temperatureMin) / 2,
  }))
}

export const enrichDocs = docs => {
  const docsWithExtra = addExtraToDocs(docs)
  return sortByTime(docsWithExtra)
}

const sortByTime = arr => arr.sort((a, b) => a.time - b.time)
