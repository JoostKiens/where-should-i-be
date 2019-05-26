import { useEffect, useRef, useState } from 'react'
import { useStateValue } from '/machinery/state'
import { clamp } from '/machinery/clamp'
const Hammer = typeof window !== 'undefined' ? require('hammerjs') : undefined

const ACCELERATION = 0.975
const PAN_FACTOR = 0.00004
const MAX_PAN_VELOCITY = 200
const SWIPE_FACTOR = 0.01
const BRAKE_VELOCITY = 0.07

export const Toucher = ({ style }) => {
  const [, dispatch] = useStateValue()
  const [mc, setMc] = useState(null)
  const el = useRef(null)

  useEffect(() => {
    if (!mc && el.current) {
      setMc(new Hammer(el.current, { direction: Hammer.DIRECTION_HORIZONTAL }))
    }
  }, [setMc, mc, el])

  useEffect(() => {
    function handlePan({ deltaX }) {
      const velocity = clamp(-MAX_PAN_VELOCITY, MAX_PAN_VELOCITY, deltaX)
      dispatch({ type: 'incrementArc', value: velocity * PAN_FACTOR })
      dispatch({ type: 'snapTo' })
    }

    function handleSwipe({ velocityX }) {
      updateVelocity(velocityX)
    }

    function updateVelocity(velocity) {
      let id
      if (Math.abs(velocity) > BRAKE_VELOCITY) {
        dispatch({ type: 'incrementArc', value: velocity * SWIPE_FACTOR })
        dispatch({ type: 'isPanning', value: true })
        dispatch({ type: 'snapTo' })
        id = window.requestAnimationFrame(() =>
          updateVelocity(velocity * ACCELERATION)
        )
      } else {
        window.cancelAnimationFrame(id)
        dispatch({ type: 'isPanning', value: false })
      }
    }

    if (mc) {
      mc.on('pan', handlePan)
      mc.on('swipe', handleSwipe)
    }

    return () => {
      if (mc) {
        mc.off('pan', handlePan)
        mc.off('pan', handleSwipe)
      }
    }
  }, [mc, dispatch])

  return <div style={style} ref={el} />
}
