import { BREAKPOINTS } from '/constants'
import crossBrowserResize from 'cross-browser-resize'
import { debounce } from '/machinery/debounce'
import { useEffect, useState, useRef } from 'react'

export const useViewport = () => {
  const mounted = useRef(false)
  const [viewport, setViewport] = useState(getViewport(mounted))

  useEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  }, [mounted])

  useEffect(() => {
    const handleResize = debounce(() => {
      if (mounted.current) setViewport(getViewport(mounted))
    }, 160)

    crossBrowserResize.addListener(handleResize)
    return () => crossBrowserResize.removeListener(handleResize)
  }, [mounted])

  return viewport
}

const getViewport = mounted => {
  const viewportWidth = mounted ? document.body.clientWidth : 0
  return {
    viewportHeight: mounted ? window.innerHeight : 0,
    viewportLg: viewportWidth >= BREAKPOINTS.LG,
    viewportMd: viewportWidth >= BREAKPOINTS.MD,
    viewportSm: viewportWidth >= BREAKPOINTS.SM,
    viewportWidth,
    viewportXl: viewportWidth >= BREAKPOINTS.XL,
  }
}
