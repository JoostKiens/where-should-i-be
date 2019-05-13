import { ThreeChart } from '/partials/ThreeChart/index'
import { useViewport } from '/partials/useViewport'

export default function ChartWrapper(props) {
  const { viewportWidth, viewportHeight } = useViewport()
  return <ThreeChart {...props} width={viewportWidth} height={viewportHeight} />
}
