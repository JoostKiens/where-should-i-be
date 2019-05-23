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
      const segments = createSegments(props)

      segments.forEach(x => ring.add(x))

      ring.position.set(0, -1, 0)
      ring.rotation.x = props.rotateX
      ring.matrixAutoUpdate = false
      ring.updateMatrix()

      scene.add(ring)
      return ring
    },
    [props]
  )

  const { getEntity } = useThree(setup)
  const [{ angle }] = useStateValue()

  useEffect(() => {
    const ring = getEntity()
    ring.rotation.z = angle
    ring.updateMatrix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [angle])

  // useEffect(() => {
  //   const ring = getEntity()
  //   //console.log(ring)
  //   // const oscillator = Math.sin(timer / 1000) * Math.PI - Math.PI
  //   // ring.rotation.y = oscillator
  //   // ring.rotation.z = -oscillator
  // }, [getEntity])

  return null
}
