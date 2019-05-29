import {
  Group,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Matrix4,
} from 'three'
import { useCallback, useEffect } from 'react'
import { useThree } from '/machinery/ThreeJSManager/'
import { useViewport } from '/machinery/useViewport'
import { CHART_MAX_TEMP, CHART_MIN_TEMP } from '/constants'
import { times } from '/machinery/array'

const LINE_WIDTH = 0.02
const LINE_HEIGHT = 1
const POSITION_Z = 2.0001

export const RangeIndicator = props => {
  const { size } = useViewport()
  const setup = useCallback(context => {
    const { scene } = context
    const scale = new Group()
    const indicator = createIndicator()

    scale.add(indicator)

    // @TODO share scale with Ring
    scale.position.z = POSITION_Z
    indicator.scale.set(0.2, 0.2, 0.2)
    scale.matrixAutoUpdate = false
    scale.updateMatrix()
    scene.add(scale)
    return scale
  }, [])

  const { getEntity } = useThree(setup)

  useEffect(() => {
    const rangeIndicator = getEntity()
    rangeIndicator.position.y = size.SM ? 1 : 0.45
    rangeIndicator.updateMatrix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  return null
}

const createIndicator = () => {
  const heightScale = 4 // needs to match ring, 0.2 * 4
  const indicator = new Group()
  const mat = new MeshBasicMaterial({ color: 0xfefefe })
  mat.transparent = true
  mat.opacity = 0.6
  const geom = new PlaneBufferGeometry(1, 1, 1, 1)

  const triangleTop = createTriangle(mat, geom.clone())
  triangleTop.position.y = (heightScale * LINE_HEIGHT) / 2 + 0.24
  indicator.add(triangleTop)

  const line = createLine(mat, geom.clone())
  line.scale.set(1, heightScale, 1)
  indicator.add(line)

  const ticks = createTicks(mat, geom.clone(), heightScale)
  ticks.map(x => indicator.add(x))

  const triangleBottom = createTriangle(mat, geom)
  triangleBottom.position.y = (heightScale * LINE_HEIGHT) / -2 - 0.24
  triangleBottom.scale.set(1, -1, 1)
  indicator.add(triangleBottom)

  return indicator
}

function createLine(mat, geom) {
  return new Mesh(geom.clone().scale(LINE_WIDTH, LINE_HEIGHT + 0.14, 1), mat)
}

function createTicks(mat, geom, heightScale) {
  geom.applyMatrix(new Matrix4().makeTranslation(0.5, 0, 0))
  geom.scale(0.14, LINE_WIDTH, 1)

  return times(Math.ceil((CHART_MAX_TEMP - CHART_MIN_TEMP) / 10) + 1).map(
    (val, _, arr) => {
      const tick = new Mesh(geom, mat)
      tick.position.y =
        heightScale * (val * (LINE_HEIGHT / (arr.length - 1)) - LINE_HEIGHT / 2)
      return tick
    }
  )
}

function createTriangle(mat, geom) {
  const triangle = new Group()
  const line1 = new Mesh(geom.clone().scale(0.2, LINE_WIDTH, 1), mat)

  line1.position.y = 0.2

  const line2 = line1.clone()
  // @TODO remove magic numbers
  line2.rotateZ(Math.PI / 3)
  line2.position.x = 0.05
  line2.position.y = 0.12

  const line3 = line1.clone()
  line3.rotateZ(Math.PI / -3)
  line3.position.x = -0.05
  line3.position.y = 0.12

  triangle.add(line1)
  triangle.add(line2)
  triangle.add(line3)
  return triangle
}
