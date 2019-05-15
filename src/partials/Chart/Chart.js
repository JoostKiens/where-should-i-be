import SceneManager from '/machinery/ThreeJSManager'
import { getCamera, getRenderer, getScene } from './threeSetup'
import { Ring } from './Ring'

export const Chart = props => {
  console.log('Chart', props)
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
        docs={props.docsNL}
        rotateX={-Math.PI / 2.1}
        lowMin={props.lowMin}
        highMax={props.highMax}
        colorScale={props.colorScale}
      />
    </SceneManager>
  )
}
