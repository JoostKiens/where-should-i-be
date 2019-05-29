import { useEffect, useRef, useState } from 'react'
import { useStoreValue } from '/store'
import { clamp } from '/machinery/clamp'
const Hammer = typeof window !== 'undefined' ? require('hammerjs') : undefined

const ACCELERATION = 0.975
const PAN_FACTOR = 0.00004
const MAX_PAN_VELOCITY = 100
const SWIPE_FACTOR = 0.01
const MIN_VELOCITY = 0.07

export const Toucher = ({ style }) => {
  const [, dispatch] = useStoreValue()
  const [mc, setMc] = useState(null)
  const [velocity, setVelocity] = useState(false)
  const el = useRef(null)
  const frameID = useRef(0)

  useEffect(() => {
    if (!mc && el.current) {
      setMc(new Hammer(el.current, { direction: Hammer.DIRECTION_HORIZONTAL }))
    }
  }, [setMc, mc, el])

  useEffect(() => {
    function handlePan({ deltaX, isFinal }) {
      if (!isFinal) stop()
      const velocityX = clamp(-MAX_PAN_VELOCITY, MAX_PAN_VELOCITY, deltaX)
      dispatch({ type: 'incrementArc', value: velocityX * PAN_FACTOR })
      dispatch({ type: 'snapTo' })
    }

    function handleSwipe({ velocityX }) {
      setVelocity(velocityX)
    }

    function stop() {
      setVelocity(0)
      window.cancelAnimationFrame(frameID.current)
    }

    if (mc) {
      mc.on('pan', handlePan)
      mc.on('press', stop)
      mc.on('tap', stop)
      mc.on('swipe', handleSwipe)
    }

    return () => {
      if (mc) {
        mc.off('pan', handlePan)
        mc.off('pan', handleSwipe)
        mc.off('press', stop)
        mc.off('tap', stop)
      }
    }
  }, [mc, dispatch])

  useEffect(() => {
    if (Math.abs(velocity) > MIN_VELOCITY) {
      dispatch({ type: 'incrementArc', value: velocity * SWIPE_FACTOR })
      dispatch({ type: 'snapTo' })
      frameID.current = window.requestAnimationFrame(() =>
        setVelocity(velocity * ACCELERATION)
      )
    } else {
      setVelocity(0)
      dispatch({ type: 'snapTo' })
      window.cancelAnimationFrame(frameID.current)
    }
  }, [dispatch, velocity])

  return <div style={style} ref={el} />
}
