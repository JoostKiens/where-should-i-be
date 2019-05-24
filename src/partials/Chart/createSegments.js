import { scaleLinear, scaleSequential } from 'd3-scale'
import { rgb2hex, shadeHexColor } from '/machinery/color'
import { interpolateRdYlBu } from 'd3-scale-chromatic'
import { extent, min, max } from 'd3-array'
import {
  Shape,
  ExtrudeBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector2,
} from 'three'

const SPACING = 0.005
const INNER_RADIUS = 11
const OUTER_RADIUS = 12
const SEGMENT_ARC = (Math.PI * 2) / 365 - SPACING
const HALF_SEGMENT_ARC = SEGMENT_ARC / 2
const CHART_HEIGHT = 4

export const createSegments = ({ docs }) => {
  const material = new MeshLambertMaterial({ flatShading: true })
  const geometry = createGeometry()
  const heightScale = createHeightScale(docs)
  const colorScale = createColorScale(docs)

  return docs.reduce((res, doc) => {
    const { temperatureMax, temperatureMin, arc, avg } = doc
    const segment = createMesh(
      {
        arc,
        color: rgb2hex(colorScale(avg)),
        height: heightScale(temperatureMax - temperatureMin),
        offset: heightScale(temperatureMin),
      },
      geometry,
      material
    )

    return [...res, segment]
  }, [])
}

const createMesh = ({ color, arc, height, offset }, geometry, material) => {
  const segMaterial = material.clone()
  const shadedColor = shadeHexColor(color, -0.7)
  segMaterial.setValues({
    color: parseInt(`0x${color}`, 16),
    emissive: parseInt(`0x${shadedColor}`, 16),
  })

  const mesh = new Mesh(geometry, segMaterial)

  mesh.rotation.z = arc
  mesh.position.set(0, 0, offset)
  mesh.scale.set(0.2, 0.2, 0.2 * height)
  mesh.visible = true
  return mesh
}

const createGeometry = () => {
  const vec2 = new Vector2()
  const halfInnerWidth = INNER_RADIUS * Math.atan(HALF_SEGMENT_ARC)
  const halfOuterWidth = OUTER_RADIUS * Math.atan(HALF_SEGMENT_ARC)
  const shape = new Shape([
    vec2.clone().set(-halfOuterWidth, OUTER_RADIUS),
    vec2.clone().set(halfOuterWidth, OUTER_RADIUS),
    vec2.clone().set(halfInnerWidth, INNER_RADIUS),
    vec2.clone().set(-halfInnerWidth, INNER_RADIUS),
    vec2.clone().set(-halfOuterWidth, OUTER_RADIUS),
  ])

  // Should we use InstancedBufferGeometry?
  return new ExtrudeBufferGeometry(shape, {
    bevelEnabled: false,
    depth: 1,
    steps: 1,
  })
}

const createColorScale = data => {
  const [min, max] = extent(
    data,
    ({ temperatureMax, temperatureMin }) =>
      (temperatureMax + temperatureMin) / 2
  ).reverse()
  return scaleSequential()
    .domain([min + 2, max + 5])
    .interpolator(interpolateRdYlBu)
}

const createHeightScale = docs => {
  const lowMin = min(docs, ({ temperatureMin }) => temperatureMin)
  const highMax = max(docs, ({ temperatureMax }) => temperatureMax)
  return scaleLinear()
    .domain([lowMin, highMax])
    .range([CHART_HEIGHT / 10, CHART_HEIGHT / 2])
}
