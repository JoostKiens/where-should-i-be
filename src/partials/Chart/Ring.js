import {
  Shape,
  Group,
  ExtrudeGeometry,
  MeshLambertMaterial,
  Mesh,
  Color,
} from 'three'
import { useCallback } from 'react'
import { useThree } from '/machinery/ThreeJSManager/'
import { createHeightScale } from '/partials/createChartScales'

export const Ring = props => {
  const setup = useCallback(
    context => {
      const { scene } = context
      const ring = new Group()
      const segments = createSegments(props)

      segments.forEach(x => ring.add(x))
      ring.position.set(0, -1, 0)
      ring.rotation.x = props.rotateX
      scene.add(ring)

      return ring
    },
    [props]
  )

  useThree(setup)

  // useEffect(() => {
  //   const ring = getEntity()
  //   //console.log(ring)
  //   // const oscillator = Math.sin(timer / 1000) * Math.PI - Math.PI
  //   // ring.rotation.y = oscillator
  //   // ring.rotation.z = -oscillator
  // }, [getEntity])

  return null
}

const createSegments = ({ docs, lowMin, highMax, colorScale }) => {
  const heightScale = createHeightScale(lowMin, highMax, 4)
  const spacing = 0.001

  return docs.reduce((res, { temperatureMax, temperatureMin }, index, arr) => {
    const avg = (temperatureMax + temperatureMin) / 2
    const segmentAngle = (Math.PI * 2) / arr.length
    const startAngle = index * segmentAngle + Math.PI

    const segment = createSegment({
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

const createSegment = props => {
  const {
    color = 0x00ff00,
    innerRadius = 10,
    outerRadius = 11,
    startAngle = 0,
    endAngle = 1,
    depth = 1,
    translateZ = 0,
  } = props

  const halfAlpha = (endAngle - startAngle) / 2
  const halfInnerWidth = innerRadius * Math.atan(halfAlpha)
  const halfOuterWidth = outerRadius * Math.atan(halfAlpha)
  const shape = new Shape()

  shape.moveTo(-halfOuterWidth, outerRadius)
  shape.lineTo(halfOuterWidth, outerRadius)
  shape.lineTo(halfInnerWidth, innerRadius)
  shape.lineTo(-halfInnerWidth, innerRadius)
  shape.lineTo(-halfOuterWidth, outerRadius)

  const geometry = new ExtrudeGeometry(shape, {
    bevelEnabled: false,
    depth,
    steps: 1,
  })

  const material = new MeshLambertMaterial({
    color,
    emissive: getEmissive(color),
  })

  const mesh = new Mesh(geometry, material)

  mesh.rotation.z = startAngle + halfAlpha
  mesh.position.set(0, 0, translateZ)
  mesh.scale.set(0.2, 0.2, 0.2)
  mesh.visible = true
  return mesh
}

const getEmissive = color => {
  const hslColor = new Color()
  new Color(color).getHSL(hslColor)
  return new Color().setHSL(hslColor.h, hslColor.s, hslColor.l - 0.5)
}
