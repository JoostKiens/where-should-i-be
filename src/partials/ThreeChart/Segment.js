import { Mesh, Shape, Color, MeshLambertMaterial, ExtrudeGeometry } from 'three'

export default class Segment extends Mesh {
  constructor({
    color,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    depth,
    translateZ,
  }) {
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

    super(geometry, material)
    this.rotation.z = startAngle + halfAlpha
    this.position.set(0, 0, translateZ)
    this.scale.set(0.2, 0.2, 0.2)
    this.visible = false
  }
}

const getEmissive = color => {
  const hslColor = new Color()
  new Color(color).getHSL(hslColor)
  return new Color().setHSL(hslColor.h, hslColor.s, hslColor.l - 0.5)
}
