import { Chart } from '/partials/Chart/Chart'

export default function ChartWrapper(props) {
  return (
    <div
      style={{
        width: `100vw`,
        height: `100vh`,
      }}
    >
      <Chart {...props} />
    </div>
  )
}
