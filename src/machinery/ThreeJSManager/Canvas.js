import { forwardRef, useEffect } from 'react'
import crossBrowserResize from 'cross-browser-resize'
import debounce from 'lodash/debounce'

const Canvas = ({ style }, ref) => {
  useEffect(() => {
    const handleResize = debounce(() => {
      if (ref.current) setSize()
    }, 160)

    crossBrowserResize.addListener(handleResize)
    return () => {
      crossBrowserResize.removeListener(handleResize)
      handleResize.cancel()
    }

    function setSize() {
      ref.current.style.width = style.width
      ref.current.style.height = style.height
    }
  }, [ref, style.width, style.height])

  return (
    <canvas ref={ref} height={style.height} width={style.width} style={style} />
  )
}

export default forwardRef(Canvas)
