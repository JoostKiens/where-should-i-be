import {
  Shape,
  Group,
  ExtrudeBufferGeometry,
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
  const innerRadius = 10
  const outerRadius = 11
  const segmentAngle = (Math.PI * 2) / docs.length
  const material = createSegmentMaterial()
  const geometry = createSegmentGeometry(
    segmentAngle - spacing,
    innerRadius,
    outerRadius
  )

  return docs.reduce((res, { temperatureMax, temperatureMin }, index) => {
    const avg = (temperatureMax + temperatureMin) / 2
    const startAngle = index * segmentAngle + Math.PI

    const segment = createSegment(
      {
        alpha: segmentAngle - spacing,
        color: colorScale(avg),
        depth: heightScale(temperatureMax - temperatureMin),
        startAngle,
        translateZ: heightScale(temperatureMin),
      },
      geometry,
      material
    )

    return [...res, segment]
  }, [])
}

const createSegmentGeometry = (alpha, innerRadius, outerRadius) => {
  const halfAlpha = alpha / 2
  const halfInnerWidth = innerRadius * Math.atan(halfAlpha)
  const halfOuterWidth = outerRadius * Math.atan(halfAlpha)
  const shape = new Shape()
  shape.moveTo(-halfOuterWidth, outerRadius)
  shape.lineTo(halfOuterWidth, outerRadius)
  shape.lineTo(halfInnerWidth, innerRadius)
  shape.lineTo(-halfInnerWidth, innerRadius)
  shape.lineTo(-halfOuterWidth, outerRadius)

  return new ExtrudeBufferGeometry(shape, {
    bevelEnabled: false,
    depth: 1,
    steps: 1,
  })
}

const createSegmentMaterial = () =>
  new MeshLambertMaterial({ flatShading: true })

const createSegment = (
  { color, alpha, startAngle, depth, translateZ },
  geometry,
  material
) => {
  const segMaterial = material.clone()
  segMaterial.setValues({
    color,
    emissive: getEmissive(color),
  })

  const mesh = new Mesh(geometry, segMaterial)

  mesh.rotation.z = startAngle + alpha / 2
  mesh.position.set(0, 0, translateZ)
  mesh.scale.set(0.2, 0.2, 0.2 * depth)
  mesh.visible = true
  return mesh
}

const getEmissive = color => {
  const hslColor = new Color()
  new Color(color).getHSL(hslColor)
  return new Color().setHSL(hslColor.h, hslColor.s, hslColor.l - 0.5)
}
