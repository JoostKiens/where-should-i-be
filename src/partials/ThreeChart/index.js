import React, { Component } from 'react'
import {
  AmbientLight,
  DirectionalLight,
  Fog,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import Chart from './Chart'

export default class ThreeChart extends Component {
  componentDidMount() {
    const {
      width,
      height,
      docsNL,
      docsTH,
      lowMin,
      highMax,
      colorScale,
    } = this.props

    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    this.camera.position.z = 4

    this.renderer = new WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    const directionalLight = new DirectionalLight(0xffffff, 1)
    directionalLight.position.set(0, 15, 20)

    this.scene = new Scene()
    this.scene.add(directionalLight)
    this.scene.add(new AmbientLight(0x404040))
    this.scene.add(
      new Chart({
        docs: docsTH,
        rotateX: -Math.PI / 2.1,
        lowMin,
        highMax,
        colorScale,
      })
    )
    this.scene.add(
      new Chart({
        docs: docsNL,
        rotateX: -Math.PI / 2.1,
        lowMin,
        highMax,
        colorScale,
      })
    )
    this.scene.fog = new Fog(0x000000, 1, 8)
    this.start()
  }

  componentDidUpdate() {
    const { width, height } = this.props
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  render() {
    const { width, height } = this.props

    return (
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }

  start = () => {
    if (!this.frameId) this.frameId = requestAnimationFrame(this.animate)
  }

  stop = () => cancelAnimationFrame(this.frameId)

  animate = () => {
    this.scene.children.forEach(x => {
      x.animate && x.animate()
    })
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => this.renderer.render(this.scene, this.camera)
}
