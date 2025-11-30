import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ----- Scene reference -----
// Use the A-Frame scene's three.js renderer
const sceneEl = document.querySelector('a-scene');

// ----- GLTF Loader -----
const loader = new GLTFLoader();

// ----- Sun: glowing sphere -----
const sunColor = 0x73430d; // dark orange-brown
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial({
    color: sunColor,
    emissive: sunColor,
    emissiveIntensity: 5.5,
    metalness: 0,
    roughness: 0.6
  })
);

// Sun halo
const sunLight = new THREE.PointLight(sunColor, 2.5, 100, 2);
sunLight.position.set(0, 0, 0);

// Add to rotating objects for animation
const rotatingObjects = [sun];

// ----- Helper function to load models -----
function loadModel(path, scale = 1, position = { x: 0, y: 0, z: 0 }) {
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(scale, scale, scale);
        model.position.set(position.x, position.y, position.z);
        rotatingObjects.push(model);

        // Add to scene
        sceneEl.object3D.add(model);

        resolve(model);
      },
      undefined,
      (err) => {
        console.error('Error loading', path, err);
        reject(err);
      }
    );
  });
}

// ----- Load planets -----
async function loadAllModels() {
  await loadModel('/models/mars/mars.gltf', 0.7, { x: 15, y: 0, z: 0 });
  await loadModel('/models/moon/moon.gltf', 0.6, { x: 8, y: 0, z: 0 });
  await loadModel('/models/planet_of_phoenix/planet_of_phoenix.gltf', 1, { x: 22, y: 0, z: 0 });

  // Add sun last
  sceneEl.object3D.add(sun);
  sceneEl.object3D.add(sunLight);
}

// Start loading
loadAllModels();

// ----- Animation loop -----
function animate() {
  requestAnimationFrame(animate);

  // Rotate objects on Y-axis
  rotatingObjects.forEach(obj => {
    obj.rotation.y += 0.002; 
  });
}

// Start animation
animate();
