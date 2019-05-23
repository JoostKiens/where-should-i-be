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
      dispatch({ type: 'incrementArc', increment: deltaX * 0.0001 })
    }

    function handleSwipe({ velocityX }) {
      updateVelocity(velocityX)
    }

    function updateVelocity(vel) {
      let id
      if (Math.abs(vel) > 0.02) {
        dispatch({ type: 'incrementArc', increment: vel * 0.01 })
        id = window.requestAnimationFrame(() => updateVelocity(vel * 0.95))
      } else {
        window.cancelAnimationFrame(id)
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
