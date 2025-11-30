import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const rotatingObjects = [];

// Create glowing Sun (emissive sphere)
function createSun() {
  const sunColor = 0x73430d;
  const sunGeo = new THREE.SphereGeometry(3, 64, 64);
  const sunMat = new THREE.MeshStandardMaterial({
    color: sunColor,
    emissive: sunColor,
    emissiveIntensity: 4,
    metalness: 0,
    roughness: 0.6
  });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.name = 'sun';
  return sun;
}

// Load GLTF model
function loadModel(path, scale = 1, position = { x:0, y:0, z:0 }) {
  return new Promise((resolve, reject) => {
    loader.load(path, (gltf) => {
      const model = gltf.scene;
      model.scale.set(scale, scale, scale);
      model.position.set(position.x, position.y, position.z);
      resolve(model);
    }, undefined, (err) => reject(err));
  });
}

// Toggle visibility based on marker
function toggleVisibility(markerUrl, id) {
  const markerEl = document.querySelector(`a-nft[url="${markerUrl}"]`);
  const objEl = document.querySelector(`#${id}`);
  if (!markerEl || !objEl) return;
  markerEl.addEventListener('markerFound', () => objEl.setAttribute('visible', true));
  markerEl.addEventListener('markerLost', () => objEl.setAttribute('visible', false));
}

// Initialize AR scene
async function init() {
  // Load models
  const sun = createSun();
  const mars = await loadModel('/models/mars/mars.gltf', 0.35, { x: 0, y: 0, z: -1 });
  const moon = await loadModel('/models/moon/moon.gltf', 0.25, { x: 0, y: 0, z: -0.8 });
  const phoenix = await loadModel('/models/planet_of_phoenix/planet_of_phoenix.gltf', 0.6, { x: 0, y: 0, z: -1.2 });

  // Attach models to entities
  document.querySelector('#sun').setObject3D('mesh', sun);
  document.querySelector('#mars').setObject3D('mesh', mars);
  document.querySelector('#moon').setObject3D('mesh', moon);
  document.querySelector('#phoenix').setObject3D('mesh', phoenix);

  // Initially hidden
  ['sun','mars','moon','phoenix'].forEach(id => {
    const el = document.querySelector(`#${id}`);
    if (el) el.setAttribute('visible', false);
  });

  // Setup marker visibility toggles
  toggleVisibility('assets/markers/1_sun', 'sun');
  toggleVisibility('assets/markers/2_star', 'mars');
  toggleVisibility('assets/markers/3_moon', 'moon');
  toggleVisibility('assets/markers/4_comet', 'phoenix');

  // Rotate objects
  rotatingObjects.push(sun, mars, moon, phoenix);

  // Animation loop
  const sceneEl = document.querySelector('a-scene');
  sceneEl.addEventListener('renderstart', () => {
    const renderer = sceneEl.renderer;
    const camera = sceneEl.camera;
    if (renderer && camera) {
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      // Reset camera FOV to normal
      camera.fov = 75;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      // Animation loop
      sceneEl.renderer.setAnimationLoop(() => {
        rotatingObjects.forEach(obj => {
          if (!obj) return;
          obj.rotation.y += 0.002;
        });
      });
    }
  });
}

// Start
init();
