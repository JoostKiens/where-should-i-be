import { useRef, useEffect, useLayoutEffect } from 'react'

export const useAnimationFrame = callback => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const frameRef = useRef()

  useLayoutEffect(() => {
    const loop = time => {
      frameRef.current = requestAnimationFrame(loop)
      const cb = callbackRef.current
      cb(time)
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])
}
