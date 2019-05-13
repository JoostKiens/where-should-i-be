import { Group } from 'three'
import { createHeightScale } from '/partials/createChartScales'
import { Segment } from './Segment'
import { tween, stagger, parallel, easing } from 'popmotion'

export class Chart extends Group {
  constructor(props) {
    super(props)
    this.segments = createSegments(props)
    this.segments.forEach(x => this.add(x))
    this.position.set(0, -1, 0)
    this.rotation.x = props.rotateX
    this.show()
  }

  show = () => {
    parallel(
      this.tweenRotateIn(),
      stagger(this.segments.reverse().map(this.showSegment), 2)
    ).start(([tweenOutput, staggerOutput]) => {
      if (tweenOutput) this.rotation.z = tweenOutput

      if (staggerOutput) {
        staggerOutput.forEach((v = 0, i) => {
          this.segments[i].visible = true
          this.segments[i].position.set(0, 0, v)
        })
      }
    })
  }

  tweenRotateIn = () =>
    tween({
      from: Math.PI,
      to: 0,
      duration: 1400,
      delay: 400,
      ease: easing.cubicBezier(0, 0.3, 0, 1),
    })

  showSegment = segment =>
    tween({
      from: 0,
      to: segment.position.z,
      ease: easing.backOut,
      duration: 40,
    })

  state = { isReady: false }
}

const createSegments = ({ docs, lowMin, highMax, colorScale }) => {
  const heightScale = createHeightScale(lowMin, highMax, 4)
  const spacing = 0.001

  return docs.reduce((res, { temperatureMax, temperatureMin }, index, arr) => {
    const avg = (temperatureMax + temperatureMin) / 2
    const segmentAngle = (Math.PI * 2) / arr.length
    const startAngle = index * segmentAngle + Math.PI

    const segment = new Segment({
      color: colorScale(avg),
      depth: heightScale(temperatureMax - temperatureMin),
      endAngle: startAngle + segmentAngle - spacing,
      innerRadius: 10,
      outerRadius: 11,
      startAngle,
      translateZ: heightScale(temperatureMin),
    })

    return [...res, segment]
  }, [])
}
