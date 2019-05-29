import { BREAKPOINTS } from '/constants'
import { useEffect, useState, useContext, useRef } from 'react'
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
  const mounted = useRef(false)
  const [viewport, setViewport] = useState(getViewport(mounted.current))

  useEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  }, [])

  useEffect(() => {
    const handleResize = debounce(() => {
      if (mounted.current) setViewport(getViewport(mounted.current))
    }, 160)

    crossBrowserResize.addListener(handleResize)
    return () => {
      crossBrowserResize.removeListener(handleResize)
      handleResize.cancel()
    }
  }, [])

  return viewport
}

const getViewport = isMounted => {
  const viewportWidth = isMounted ? document.body.clientWidth : 0
  return {
    viewportWidth,
    viewportHeight: isMounted ? window.innerHeight : 0,
    viewportSm: viewportWidth >= BREAKPOINTS.SM,
    viewportMd: viewportWidth >= BREAKPOINTS.MD,
    viewportLg: viewportWidth >= BREAKPOINTS.LG,
    viewportXl: viewportWidth >= BREAKPOINTS.XL,
  }
}
