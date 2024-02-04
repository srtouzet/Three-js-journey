import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

// Particles

const particlesRandomGeometry = new THREE.BufferGeometry()

const count = 20000

const positions = new Float32Array(count * 6)
const colors = new Float32Array(count * 6)
console.log(positions);

for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}
particlesRandomGeometry.setAttribute(
    'position',
    // El 3 especifica que necesitamos decirle que sera un valor de 3 posiciones (x,y,z)

    new THREE.BufferAttribute(positions,3)
)

particlesRandomGeometry.setAttribute(
    'color',
    // El 3 especifica que necesitamos decirle que sera un valor de 3 posiciones (x,y,z)

    new THREE.BufferAttribute(colors,3)
)

// Geometry
const particlesGeometry = new THREE.SphereGeometry(1,32,32)
// Material
const particlesMaterial = new THREE.PointsMaterial()
    // size:0.2,sizeAttenuation:true
particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true
particlesMaterial.color = new THREE.Color('#ff88cc')
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
// Puede tener baja de frame rates
particlesMaterial.blending = THREE.AdditiveBlending
particlesMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particlesRandomGeometry,particlesMaterial)
scene.add(particles)


// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Particles
    // particles.rotation.y = -elapsedTime * 0.2
    // Is a bad idea best idea is using shader
    for(let i = 0; i < count; i++){
        const i3 = i * 3
        const x =  particlesGeometry.attributes.position.array[i3]
        // console.log(x)
        particlesRandomGeometry.attributes.position.array[i3 + 1] =  Math.sin(elapsedTime + x)
        // particlesGeometry.attributes.position.array[i3 + 1] =  Math.sin(elapsedTime)
    }
    particlesRandomGeometry.attributes.position.needsUpdate = true
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()