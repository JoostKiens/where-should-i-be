import { forwardRef, useEffect } from 'react'
import { debounce } from '/machinery/debounce'

const Canvas = ({ style }, ref) => {
  useEffect(() => {
    const onWindowResize = debounce(() => {
      if (ref.current) {
        ref.current.style.width = style.width
        ref.current.style.height = style.height
      }
    }, 160)

    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [ref, style.width, style.height])

  return (
    <canvas ref={ref} height={style.height} width={style.width} style={style} />
  )
}

export default forwardRef(Canvas)
