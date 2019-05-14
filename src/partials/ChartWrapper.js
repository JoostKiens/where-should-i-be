import { ThreeChart } from '/partials/ThreeChart/index'
import { useViewport } from '/hooks/useViewport'

export default function ChartWrapper(props) {
  const { viewportWidth, viewportHeight } = useViewport()

  return (
    <ThreeChart
      {...props}
      viewportWidth={viewportWidth}
      viewportHeight={viewportHeight}
    />
  )
}
