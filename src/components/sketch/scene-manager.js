import * as THREE from 'three'
import { fragmentShader } from './shaders/fragment.js'
import { vertexShader } from './shaders/vertex.js'

let sceneInstance = null

class SceneManager {
  constructor() {
    if (sceneInstance) {
      return sceneInstance
    }
    this.scene = null
    this.camera = null
    this.renderer = null
    this.canvasElement = null
    this.materials = new Map() 
    this.meshes = []
    this.isInitialized = false
    this.textureLoader = new THREE.TextureLoader()
    sceneInstance = this
  }

  init(canvasElement, camera) {
    this.canvasElement = canvasElement
    this.camera = camera
    this.isInitialized = true
  }

  reset() {

    this.materials.forEach((material) => {
      material.dispose()
      if (material.uniforms.uTexture.value) {
        material.uniforms.uTexture.value.dispose()
      }
    })
    this.materials.clear()
    this.meshes = []
  }

  createMaterial(imageUrl) {

    if (this.materials.has(imageUrl)) {
      return this.materials.get(imageUrl)
    }


    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTexture: { value: null },
        uOpacity: { value: 0 }
      }
    })

    // Load texture
    this.textureLoader.load(imageUrl, (texture) => {
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      material.uniforms.uTexture.value = texture
    })

    this.materials.set(imageUrl, material)
    return material
  }

  screenToWorld(element) {
    if (!this.camera || !this.canvasElement) return { x: 0, y: 0, width: 1, height: 1 }

    const rect = element.getBoundingClientRect()
    const canvasRect = this.canvasElement.getBoundingClientRect()

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = ((centerX - canvasRect.left) / canvasRect.width) * 2 - 1
    const y = -((centerY - canvasRect.top) / canvasRect.height) * 2 + 1

    const vector = new THREE.Vector3(x, y, 0.5)
    vector.unproject(this.camera)

    const distance = -this.camera.position.z / (vector.z - this.camera.position.z)
    const worldX = this.camera.position.x + (vector.x - this.camera.position.x) * distance
    const worldY = this.camera.position.y + (vector.y - this.camera.position.y) * distance

    const worldWidth = (rect.width / canvasRect.width) * this.getVisibleWidth()
    const worldHeight = (rect.height / canvasRect.height) * this.getVisibleHeight()

    return {
      x: worldX,
      y: worldY,
      width: worldWidth,
      height: worldHeight,
    }
  }

  getVisibleWidth() {
    const distance = Math.abs(this.camera.position.z)
    const vFOV = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(vFOV / 2) * distance
    return height * this.camera.aspect
  }

  getVisibleHeight() {
    const distance = Math.abs(this.camera.position.z)
    const vFOV = (this.camera.fov * Math.PI) / 180
    return 2 * Math.tan(vFOV / 2) * distance
  }

  updateMeshes() {
    const imageElements = document.querySelectorAll(".img")
    this.meshes = []

    imageElements.forEach((element, index) => {
      const worldData = this.screenToWorld(element)
      const imageUrl = element.src
      
      this.meshes.push({
        id: `mesh-${index}`,
        element,
        imageUrl,
        material: this.createMaterial(imageUrl),
        ...worldData,
      })
    })
  }

  updateMeshPositions() {
    if (!this.isInitialized) return

    const imageElements = document.querySelectorAll(".img")

    imageElements.forEach((element, index) => {
      const worldData = this.screenToWorld(element)
      if (this.meshes[index]) {
        this.meshes[index] = {
          ...this.meshes[index],
          ...worldData,
        }
      }
    })
  }
}

const globalSceneManager = new SceneManager()
export default globalSceneManager 