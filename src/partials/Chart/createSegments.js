import {
  Shape,
  ExtrudeBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Color,
} from 'three'
import { createHeightScale } from '/partials/createChartScales'

const SPACING = 0.001
const INNER_RADIUS = 10
const OUTER_RADIUS = 11

export const createSegments = ({ docs, lowMin, highMax, colorScale }) => {
  const heightScale = createHeightScale(lowMin, highMax, 4)

  const segmentAngle = (Math.PI * 2) / docs.length
  const material = createSegmentMaterial()
  const geometry = createSegmentGeometry(
    segmentAngle - SPACING,
    INNER_RADIUS,
    OUTER_RADIUS
  )

  const res = docs.reduce((res, { temperatureMax, temperatureMin }, index) => {
    const avg = (temperatureMax + temperatureMin) / 2
    const startAngle = index * segmentAngle + Math.PI

    const segment = createSegment(
      {
        alpha: segmentAngle - SPACING,
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
  return res
}

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

const createSegmentGeometry = (alpha, INNER_RADIUS, OUTER_RADIUS) => {
  const halfAlpha = alpha / 2
  const halfInnerWidth = INNER_RADIUS * Math.atan(halfAlpha)
  const halfOuterWidth = OUTER_RADIUS * Math.atan(halfAlpha)
  const shape = new Shape()
  shape.moveTo(-halfOuterWidth, OUTER_RADIUS)
  shape.lineTo(halfOuterWidth, OUTER_RADIUS)
  shape.lineTo(halfInnerWidth, INNER_RADIUS)
  shape.lineTo(-halfInnerWidth, INNER_RADIUS)
  shape.lineTo(-halfOuterWidth, OUTER_RADIUS)

  return new ExtrudeBufferGeometry(shape, {
    bevelEnabled: false,
    depth: 1,
    steps: 1,
  })
}

const createSegmentMaterial = () =>
  new MeshLambertMaterial({ flatShading: true })

const getEmissive = color => {
  const hslColor = new Color()
  new Color(color).getHSL(hslColor)
  return new Color().setHSL(hslColor.h, hslColor.s, hslColor.l - 0.5)
}
