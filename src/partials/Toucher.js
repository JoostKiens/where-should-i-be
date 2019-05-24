import { useEffect, useRef, useState } from 'react'
import { useStateValue } from '/machinery/state'
const Hammer = typeof window !== 'undefined' ? require('hammerjs') : undefined

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
      // @TODO clamp deltaX
      dispatch({ type: 'incrementArc', value: deltaX * 0.0001 })
      dispatch({ type: 'snapTo' })
    }

    function handleSwipe({ velocityX }) {
      updateVelocity(velocityX)
    }

    function updateVelocity(vel) {
      let id
      if (Math.abs(vel) > 0.02) {
        dispatch({ type: 'incrementArc', value: vel * 0.01 })
        dispatch({ type: 'isPanning', value: true })
        dispatch({ type: 'snapTo' })
        id = window.requestAnimationFrame(() => updateVelocity(vel * 0.95))
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
