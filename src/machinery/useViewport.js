import { BREAKPOINTS } from '/constants'
import { useEffect, useState, useContext } from 'react'
import crossBrowserResize from 'cross-browser-resize'
import debounce from 'lodash/debounce'

const ViewportContext = React.createContext(null)

export function useViewport() {
  const viewport = useContext(ViewportContext)
  if (!viewport) throw new Error('Please ensure ViewportContextProvider')
  return viewport
}

export function ViewportContextProvider({ children }) {
  const viewport = useRawViewport()
  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  )
}

export const useRawViewport = () => {
  const [viewportHeight, setViewportHeight] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)

  useEffect(() => {
    let cancelled = false
    const handleResize = debounce(() => {
      if (!cancelled) setViewport()
    }, 160)

    setViewport()
    crossBrowserResize.addListener(handleResize)
    return () => {
      cancelled = true
      handleResize.cancel()
      crossBrowserResize.removeListener(handleResize)
    }
  }, [])

  function setViewport() {
    setViewportHeight(window.innerHeight)
    setViewportWidth(document.body.clientWidth)
  }

  return {
    size: Object.keys(BREAKPOINTS).reduce(
      (res, bp) => (viewportWidth >= BREAKPOINTS[bp] ? bp : res),
      'xs'
    ),
    viewportWidth,
    viewportHeight,
    viewportSm: viewportWidth >= BREAKPOINTS.SM,
    viewportMd: viewportWidth >= BREAKPOINTS.MD,
    viewportLg: viewportWidth >= BREAKPOINTS.LG,
    viewportXl: viewportWidth >= BREAKPOINTS.XL,
  }
}
