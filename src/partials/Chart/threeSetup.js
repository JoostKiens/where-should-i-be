import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'

export const getCamera = ({ offsetWidth, offsetHeight }) => {
  const camera = new PerspectiveCamera(
    75,
    offsetWidth / offsetHeight,
    0.1,
    1000
  )
  camera.position.z = 4
  return camera
}

export const getRenderer = canvas => {
  const context = canvas.getContext('webgl')
  const renderer = new WebGLRenderer({
    canvas,
    context,
  })

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  return renderer
}

export const getScene = () => {
  const directionalLight = new DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 15, 20)
  const scene = new Scene()
  scene.add(directionalLight)
  scene.add(new AmbientLight(0x404040))
  scene.background = new Color(0x000000)
  scene.fog = new Fog(0x000000, 1, 8)

  return scene
}
