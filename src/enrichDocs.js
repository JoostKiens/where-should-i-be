import { ARCS } from '/constants'

const addExtraToDocs = docs => {
  return docs.map((doc, index) => {
    // map indices of 730 docs to 365 arcs
    const arcIndex = Math.floor(index / 2)

    return {
      ...doc,
      arc: ARCS[arcIndex],
      avg: (doc.temperatureMax + doc.temperatureMin) / 2,
    }
  })
}

export const enrichDocs = docs => {
  // @TODO custom props go in data object
  const docsWithExtra = addExtraToDocs(docs)
  return sortByTime(docsWithExtra)
}

const sortByTime = arr => arr.sort((a, b) => a.time - b.time)
