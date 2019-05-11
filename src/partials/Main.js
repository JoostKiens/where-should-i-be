import { min, max } from 'd3-array'
import { createColorScale } from '/partials/createChartScales'
import ChartWrapper from '/partials/ChartWrapper'

export default function Main({ docs }) {
  const lowMin = min(docs, ({ temperatureMin }) => temperatureMin)
  const highMax = max(docs, ({ temperatureMax }) => temperatureMax)
  const colorScale = createColorScale(docs)
  const [docsNL, docsTH] = splitByLocation(docs).map(sortByTime)

  return (
    <div>
      <h1>Charts</h1>
      <React.Fragment>
        <ChartWrapper
          colorScale={colorScale}
          docsNL={docsNL}
          docsTH={docsTH}
          highMax={highMax}
          lowMin={lowMin}
        />
      </React.Fragment>
    </div>
  )
}

function splitByLocation(docs) {
  return docs.reduce(
    (res, doc) => {
      res[doc.locationID === 'NL' ? 0 : 1].push(doc)
      return res
    },
    [[], []]
  )
}

function sortByTime(docs) {
  return docs.sort((a, b) => a.time - b.time)
}
