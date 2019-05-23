import { createColorScale } from './createChartScales'
import { getCamera, getRenderer, getScene } from './threeSetup'
import { min, max } from 'd3-array'
import { Ring } from './Ring'
import SceneManager from '/machinery/ThreeJSManager'

export const Chart = ({ docs, style }) => {
  const lowMin = min(docs, ({ temperatureMin }) => temperatureMin)
  const highMax = max(docs, ({ temperatureMax }) => temperatureMax)
  const colorScale = createColorScale(docs)
  const [docsNL, docsTH] = splitByLocation(docs).map(sortByTime)

  return (
    <SceneManager
      getCamera={getCamera}
      getRenderer={getRenderer}
      getScene={getScene}
      canvasStyle={style}
    >
      <Ring
        docs={docsNL}
        rotateX={-Math.PI / 2.1}
        lowMin={lowMin}
        highMax={highMax}
        colorScale={colorScale}
      />
      <Ring
        docs={docsTH}
        rotateX={-Math.PI / 2.1}
        lowMin={lowMin}
        highMax={highMax}
        colorScale={colorScale}
      />
    </SceneManager>
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

function sortByTime(arr) {
  return arr.sort((a, b) => a.time - b.time)
}
