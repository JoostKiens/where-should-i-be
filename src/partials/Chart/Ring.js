import { createSegments } from './createSegments'
import { Group } from 'three'
import { useCallback, useEffect } from 'react'
import { useThree } from '/machinery/ThreeJSManager/'
import { useStateValue } from '/machinery/state'
import { useViewport } from '/machinery/useViewport'
import { ARCS } from '/constants'

export const Ring = props => {
  const { viewportSm } = useViewport()
  const setup = useCallback(
    context => {
      const { scene } = context
      const ring = new Group()
      ring.scale.set(0.2, 0.2, 0.8)
      ring.rotation.x = -Math.PI / 2
      ring.matrixAutoUpdate = false
      ring.updateMatrix()
      // @TODO make 2 groups for each country for animation purposes
      const segments = createSegments(props)
      segments.forEach(x => ring.add(x))
      scene.add(ring)
      return ring
    },
    [props]
  )

  const { getEntity } = useThree(setup)
  const [{ snapIndex }] = useStateValue()

  useEffect(() => {
    const ring = getEntity()
    ring.rotation.z = ARCS[snapIndex]
    ring.updateMatrix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapIndex])

  useEffect(() => {
    // @TODO handle different viewports, share with Indicator
    const ring = getEntity()
    // const scaleFactor = viewportSm ? 1 : 0.9
    // const scaleFactorZ = viewportSm ? 1 : 0.7
    const yOffset = viewportSm ? 1 : 0.45
    // // ring.scale.set(scaleFactor, scaleFactor, scaleFactorZ)
    ring.position.set(0, yOffset, 0)
    ring.updateMatrix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportSm])

  return null
}
