import { createSegments } from './createSegments'
import { Group } from 'three'
import { useCallback, useEffect, useState } from 'react'
import { useThree } from '/machinery/ThreeJSManager/'

export const Ring = props => {
  const setup = useCallback(
    context => {
      const { scene } = context
      const ring = new Group()
      console.time('create segments')
      const segments = createSegments(props)
      console.timeEnd('create segments')

      segments.forEach(x => ring.add(x))
      ring.position.set(0, -1, 0)
      ring.rotation.x = props.rotateX
      scene.add(ring)

      return ring
    },
    [props]
  )

  useThree(setup)

  // useEffect(() => {
  //   const ring = getEntity()
  //   //console.log(ring)
  //   // const oscillator = Math.sin(timer / 1000) * Math.PI - Math.PI
  //   // ring.rotation.y = oscillator
  //   // ring.rotation.z = -oscillator
  // }, [getEntity])

  return null
}
