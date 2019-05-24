import { BREAKPOINTS } from '/constants'
import crossBrowserResize from 'cross-browser-resize'
import { debounce } from '/machinery/debounce'
import { useEffect, useState } from 'react'

export const useViewport = () => {
  const [mounted, setMounted] = useState(null)
  const [viewport, setViewport] = useState(getViewport(mounted))

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const handleResize = debounce(() => {
      if (mounted) setViewport(getViewport(mounted))
    }, 250)

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
