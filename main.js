import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const rotatingObjects = [];

// Create Sun
function createSun() {
  const color = 0x73430d;
  const geo = new THREE.SphereGeometry(1.5, 64, 64);
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 4,
    metalness: 0,
    roughness: 0.6
  });
  const sun = new THREE.Mesh(geo, mat);
  return sun;
}

// Load GLTF
function loadModel(path, scale = 1) {
  return new Promise((resolve, reject) => {
    loader.load(path, (gltf) => {
      const model = gltf.scene;
      model.scale.set(scale, scale, scale);
      resolve(model);
    }, undefined, reject);
  });
}

// Initialize scene
async function init() {
  const sun = createSun();
  const mars = await loadModel('/models/mars/mars.gltf', 0.35);
  const moon = await loadModel('/models/moon/moon.gltf', 0.25);
  const phoenix = await loadModel('/models/planet_of_phoenix/planet_of_phoenix.gltf', 0.6);

  // Attach models
  document.querySelector('#sun').setObject3D('mesh', sun);
  document.querySelector('#mars').setObject3D('mesh', mars);
  document.querySelector('#moon').setObject3D('mesh', moon);
  document.querySelector('#phoenix').setObject3D('mesh', phoenix);

  rotatingObjects.push(sun, mars, moon, phoenix);

  // Video background
  const video = document.getElementById('video');
  const videoEl = document.querySelector('#video-bg');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    video.srcObject = stream;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    videoEl.getObject3D('mesh').material.map = videoTexture;
    videoEl.getObject3D('mesh').material.needsUpdate = true;
  } catch(err) {
    console.warn('Could not access camera:', err);
  }

  // Animate rotation
  const sceneEl = document.querySelector('a-scene');
  sceneEl.addEventListener('renderstart', () => {
    sceneEl.renderer.setAnimationLoop(() => {
      rotatingObjects.forEach(obj => {
        if (!obj) return;
        obj.rotation.y += 0.002;
      });
    });
  });
}

init();
