import { scaleLinear, scaleSequential } from 'd3-scale'
import { rgb2hex, shadeHexColor } from '/machinery/color'
import { interpolateRdYlBu } from 'd3-scale-chromatic'
import { extent } from 'd3-array'
import { CHART_MAX_TEMP, CHART_MIN_TEMP } from '/constants'
import {
  Shape,
  ExtrudeBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector2,
  Matrix4,
} from 'three'

const SPACING = 0.005
const INNER_RADIUS = 9
const OUTER_RADIUS = 10
const SEGMENT_ARC = (Math.PI * 2) / 365 - SPACING
const HALF_SEGMENT_ARC = SEGMENT_ARC / 2

// @TODO triple check temp scale (do not make a circle, hold next to scale)
export const createSegments = ({ docs }) => {
  const material = new MeshLambertMaterial({ flatShading: true })
  const geometry = createGeometry()
  geometry.applyMatrix(new Matrix4().makeTranslation(0, 0, -0.5))
  const heightScale = createHeightScale()
  const colorScale = createColorScale(docs)
  const chartTempRange = CHART_MAX_TEMP - CHART_MIN_TEMP

  return docs.reduce((res, doc) => {
    const { temperatureMax, temperatureMin, arc, avg } = doc
    const segment = createMesh(
      {
        arc,
        color: rgb2hex(colorScale(avg)),
        height: (temperatureMax - temperatureMin) / chartTempRange,
        offset: heightScale(avg),
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
  mesh.scale.set(1, 1, height)
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

const createHeightScale = () =>
  scaleLinear()
    .domain([CHART_MIN_TEMP, CHART_MAX_TEMP])
    .range([-0.5, 0.5])
