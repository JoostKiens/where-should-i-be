import { createSegments } from './createSegments'
import { Group } from 'three'
import { useCallback, useEffect } from 'react'
import { useThree } from '/machinery/ThreeJSManager/'
import { useStateValue } from '/machinery/state'

export const Ring = props => {
  const setup = useCallback(
    context => {
      const { scene } = context
      const ring = new Group()

      ring.position.set(0, -1, 0)
      ring.rotation.x = -Math.PI / 2.1
      ring.matrixAutoUpdate = false
      ring.updateMatrix()
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

  return null
}
