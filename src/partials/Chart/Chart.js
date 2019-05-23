import { getCamera, getRenderer, getScene } from './threeSetup'
import { Ring } from './Ring'
import SceneManager from '/machinery/ThreeJSManager'

export const Chart = ({ docs, style }) => {
  return (
    <SceneManager
      getCamera={getCamera}
      getRenderer={getRenderer}
      getScene={getScene}
      canvasStyle={style}
    >
      <Ring docs={docs} />
    </SceneManager>
  )
}
