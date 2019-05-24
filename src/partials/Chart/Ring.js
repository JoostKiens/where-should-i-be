import { createSegments } from './createSegments'
import { Group } from 'three'
import { useCallback, useEffect } from 'react'
import { useThree } from '/machinery/ThreeJSManager/'
import { useStateValue } from '/machinery/state'
import { useViewport } from '/machinery/useViewport'

export const Ring = props => {
  const { viewportSm } = useViewport()
  const setup = useCallback(
    context => {
      const { scene } = context
      const ring = new Group()
      ring.position.set(0, -1, 0)
      ring.rotation.x = -Math.PI / 2.1
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
  const [{ arc }] = useStateValue()

  useEffect(() => {
    const ring = getEntity()
    ring.rotation.z = arc
    ring.updateMatrix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arc])

  useEffect(() => {
    const ring = getEntity()
    const scaleFactor = viewportSm ? 1 : 0.8
    ring.scale.set(scaleFactor, scaleFactor, scaleFactor)
    ring.translateY = -200
    ring.updateMatrix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportSm])

  return null
}
