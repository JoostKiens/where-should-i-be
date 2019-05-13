import { BREAKPOINTS } from '/constants'
import crossBrowserResize from 'cross-browser-resize'
import { debounce } from '/utils/debounce'
import { isServer } from '/checks'
import { useEffect, useState } from 'react'
import useRefMounted from 'react-use/lib/useRefMounted'

export const useViewport = () => {
  const refMounted = useRefMounted()
  const [viewport, setViewport] = useState(getViewport(isServer()))

  useEffect(() => {
    crossBrowserResize.addListener(handleResize)
    return () => crossBrowserResize.removeListener(handleResize)
  })

  const handleResize = debounce(
    () => refMounted.current && setViewport(getViewport()),
    250
  )

  return viewport
}

const getViewport = (isServer = false) => {
  const viewportWidth = !isServer ? document.body.clientWidth : 0
  return {
    viewportHeight: !isServer ? window.innerHeight : 0,
    viewportLg: viewportWidth >= BREAKPOINTS.LG,
    viewportMd: viewportWidth >= BREAKPOINTS.MD,
    viewportSm: viewportWidth >= BREAKPOINTS.SM,
    viewportWidth,
    viewportXl: viewportWidth >= BREAKPOINTS.XL,
  }
}
