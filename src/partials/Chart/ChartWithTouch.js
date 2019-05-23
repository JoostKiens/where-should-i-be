import { Chart } from 'partials/Chart/Chart'
import { Toucher } from '/partials/Toucher'
import { Hud } from '/partials/Hud/Hud'

const coverStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
}

export const ChartWithTouch = ({ docs }) => {
  return (
    <div style={{ position: 'relative', width: `100vw`, height: `100vh` }}>
      <Chart docs={docs} coverStyle={coverStyle} />
      <Toucher coverStyle={coverStyle} />
    </div>
  )
}
