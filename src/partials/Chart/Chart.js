import { createColorScale } from './createChartScales'
import { getCamera, getRenderer, getScene } from './threeSetup'
import { min, max } from 'd3-array'
import { Ring } from './Ring'
import SceneManager from '/machinery/ThreeJSManager'

export const Chart = props => {
  const lowMin = min(props.docs, ({ temperatureMin }) => temperatureMin)
  const highMax = max(props.docs, ({ temperatureMax }) => temperatureMax)
  const colorScale = createColorScale(props.docs)
  const [docsNL, docsTH] = splitByLocation(props.docs).map(sortByTime)

  return (
    <SceneManager
      getCamera={getCamera}
      getRenderer={getRenderer}
      getScene={getScene}
      canvasStyle={{
        width: '100%',
        height: '100%',
      }}
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

function sortByTime(docs) {
  return docs.sort((a, b) => a.time - b.time)
}
