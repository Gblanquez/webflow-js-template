import * as THREE from 'three'
import globalSceneManager from './scene-manager'
import { setOnScrollUpdate } from "../scroll"
import gsap from 'gsap'
import { Draggable } from "gsap/Draggable"
gsap.registerPlugin(Draggable)

let sm = null

class SketchManager {
  constructor() {
    if (sm) return sm
    sm = this

    this.scene = null
    this.camera = null
    this.renderer = null
    this.canvas = null
    this.rafId = null
    this.meshData = []
    this.isInitialized = false
  }

  init(container) {
    if (this.isInitialized) return

    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'fixed'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.pointerEvents = 'none'
    this.canvas.style.zIndex = '5'
    
    container.appendChild(this.canvas)

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 5)

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    globalSceneManager.init(this.canvas, this.camera)

    setOnScrollUpdate(() => {
      this.updateMeshPositions()
    })

    this.setupMeshes()

    window.addEventListener('resize', () => {
      this.handleResize()
    })

    this.isInitialized = true
    this.animate()
  }

  setupMeshes() {
    if (!globalSceneManager.isInitialized) {
      setTimeout(() => this.setupMeshes(), 100)
      return
    }

    globalSceneManager.updateMeshes()
    this.meshData = [...globalSceneManager.meshes]
    this.createThreeMeshes()
  }

  createThreeMeshes() {
    this.scene.children = this.scene.children.filter(child => !child.userData.isImageMesh)

    this.meshData.forEach((meshData) => {
      const geometry = new THREE.PlaneGeometry(1, 1)
      const material = meshData.material
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(meshData.x, meshData.y, 0)
      mesh.scale.set(meshData.width, meshData.height, 1)
      mesh.userData.isImageMesh = true
      mesh.userData.originalData = meshData
      
      this.scene.add(mesh)
    })
  }

  updateMeshPositions() {
    if (!this.isInitialized) return

    globalSceneManager.updateMeshPositions()
    this.meshData = [...globalSceneManager.meshes]

    this.scene.children.forEach((child) => {
      if (child.userData.isImageMesh && child.userData.originalData) {
        const updatedData = this.meshData.find(m => m.id === child.userData.originalData.id)
        if (updatedData) {
          child.position.set(updatedData.x, updatedData.y, 0)
          child.scale.set(updatedData.width, updatedData.height, 1)
          child.userData.originalData = updatedData
        }
      }
    })
  }

  refreshMeshes() {
    if (!this.isInitialized) return
  

    this.scene.children = this.scene.children.filter(child => !child.userData.isImageMesh)
  

    this.setupMeshes()
  }

  meshOut() {

    const tl = gsap.timeline()

    this.scene.children.forEach(mesh => {
      if (mesh.userData.isImageMesh && mesh.material && mesh.material.uniforms?.uOpacity) {
        tl.to(mesh.material.uniforms.uOpacity, 
          { value: 0,
            ease: 'linear',
            duration: 1.2

          }, 0);
        tl.to(mesh.position,
          { y: '-0.03',
            duration: 1.4,
            ease: 'linear',
            delay: 0.1

          }, 0);
      }
    });

  }


  meshIn() {
    const meshes = this.scene.children.filter(m => m.userData.isImageMesh)
    if (!meshes.length) return
  
    const tl = gsap.timeline()
  

    tl.to(meshes.map(m => m.material.uniforms.uOpacity), {
      value: 1,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.04
    }, 0)
  
  }
  

  enableDrag() {
    const container = document.querySelector('.work-swipe-container')
    const wrapper = document.querySelector('.work-swipe-wrapper')
    if (!container || !wrapper) return
  
    const dragMeshes = this.scene.children.filter(m =>
      m.userData.isImageMesh &&
      m.userData.originalData?.el?.dataset?.drag === "true"
    )
  
    const maxX = 0
    const minX = -window.innerWidth * 0.684
  
    const update = () => {
      const offset = gsap.getProperty(container, "x") * 0.005
      dragMeshes.forEach(mesh => {
        mesh.position.x = mesh.userData.originalData.x + offset
      })
    }
  
    Draggable.create(container, {
      type: "x",

      inertia: true,
      bounds: { minX, maxX },
      onDrag: update,
      onThrowUpdate: update,
    })
  }
  
  
  

  handleResize() {
    if (!this.camera || !this.renderer) return

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    
    setTimeout(() => {
      this.setupMeshes()
    }, 100)
  }

  animate() {
    this.rafId = requestAnimationFrame(() => this.animate())
    this.renderer.render(this.scene, this.camera)
  }

  cleanup() {
    if (!this.scene) return
  
    // Remove all existing image meshes from the scene
    this.scene.children = this.scene.children.filter(child => {
      if (child.userData.isImageMesh) {
        if (child.geometry) child.geometry.dispose()
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose())
          } else {
            child.material.dispose()
          }
        }
        return false
      }
      return true
    })
  
    this.meshData = []
  

    globalSceneManager.meshes = []
  }
  
  
}

const sketchManager = new SketchManager();
export default sketchManager;
