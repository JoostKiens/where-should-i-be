import { forwardRef, useEffect } from 'react'

const Canvas = ({ style }, ref) => {
  useEffect(() => {
    const onWindowResize = () => {
      ref.current.style.width = style.width
      ref.current.style.height = style.height
    }

    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [ref, style.width, style.height])

  return (
    <canvas ref={ref} height={style.height} width={style.width} style={style} />
  )
}

export default forwardRef(Canvas)
