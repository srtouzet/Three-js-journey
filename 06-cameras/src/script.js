import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


// Cursor

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove',(event) => {
    cursor.x = event.clientX / sizes.width - 0.5,
    cursor.y = -(event.clientY / sizes.height - 0.5)
    console.log(cursor.x,cursor.y);

})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// First paramater is Field of view como base son 75, y ese numero es representado en grados y es el angulo de visión vertical, no el horizontal

// El segundo parametros es el ASPECT RATIO que divide el width y el height para dar el tamaño del render

// El tercero y cuarto parametro se llaman "near" y "far", corresponde a como cierra y como lejos se ve la camara 
// Cualquier objeto más cercano que el "near" o más lejano que el "far" no aparecera, y si un objeto está entre visible y no visible.. bueno, veras solo una parte del objeto
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100)

// OrthographicCamera
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio,1,-1,0.1,100)
// camera.position.x = cursor.x
// camera.position.y = cursor.y
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)


// Controls

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
// controls.target.y = 1
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera

    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(new THREE.Vector3())

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()