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

// @TODO rename and refactor
export const Scale = props => {
  const { viewportSm } = useViewport()
  const setup = useCallback(context => {
    const { scene } = context
    const scale = new Group()
    const indicator = createIndicator()

    scale.add(indicator)

    // @TODO share scale with Ring
    scale.position.z = 2.0001
    indicator.scale.set(0.2, 0.2, 0.2)
    scale.matrixAutoUpdate = false
    scale.updateMatrix()
    scene.add(scale)
    return scale
  }, [])

  const { getEntity } = useThree(setup)

  useEffect(() => {
    const scale = getEntity()
    // We need to share these values with ring, move to own file?
    const yOffset = viewportSm ? 1 : 0.45
    scale.translateY(yOffset)
    scale.updateMatrix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportSm])

  return null
}

const createIndicator = () => {
  const heightScale = 4
  const lineHeight = 1
  const indicator = new Group()
  const mat = new MeshBasicMaterial({ color: 0xfefefe })
  mat.transparent = true
  mat.opacity = 0.6
  const geom = new PlaneBufferGeometry(1, 1, 1, 1)

  const triangleTop = createIndicatorTriangle(mat, geom)
  triangleTop.position.y = (heightScale * lineHeight) / 2 + 0.24
  indicator.add(triangleTop)

  const line = new Mesh(
    geom.clone().scale(LINE_WIDTH, lineHeight + 0.14, 1),
    mat
  )
  line.scale.set(1, heightScale, 1)
  indicator.add(line)

  const tickGeom = geom.clone()
  tickGeom.applyMatrix(new Matrix4().makeTranslation(0.5, 0, 0))
  tickGeom.scale(0.14, LINE_WIDTH, 1)

  times(Math.ceil((CHART_MAX_TEMP - CHART_MIN_TEMP) / 10) + 1).forEach(
    (val, _, arr) => {
      const tick = new Mesh(tickGeom, mat)
      tick.position.y =
        heightScale * (val * (lineHeight / (arr.length - 1)) - lineHeight / 2)
      indicator.add(tick)
    }
  )

  const triangleBottom = createIndicatorTriangle(mat, geom)
  triangleBottom.position.y = (heightScale * lineHeight) / -2 - 0.24
  triangleBottom.scale.set(1, -1, 1)
  indicator.add(triangleBottom)

  return indicator
}

const createIndicatorTriangle = (mat, geom) => {
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
