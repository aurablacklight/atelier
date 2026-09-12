import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createLobby, WEEK_00 } from './lobby.js';
import { createFlythrough } from './cameraPath.js';
import { exhibits } from './exhibits.js';

const canvas = document.querySelector('#scene');
const replayBtn = document.querySelector('#replay-path');
const weekLabel = document.querySelector('.week');

weekLabel.textContent = `Week ${String(exhibits[exhibits.length - 1]?.week ?? 0).padStart(2, '0')} · ${WEEK_00.title}`;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05060d);
scene.fog = new THREE.FogExp2(0x05060d, 0.035);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2.2, 10.5);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(0, 1.55, 0);
controls.maxPolarAngle = Math.PI * 0.49;
controls.minDistance = 3;
controls.maxDistance = 16;
controls.enabled = false;

const { pedestal } = createLobby(scene);

// Placeholder "waiting for next exhibit" ember above the pedestal
const ember = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.28, 1),
  new THREE.MeshStandardMaterial({
    color: 0x101820,
    emissive: 0x39f3ff,
    emissiveIntensity: 2.2,
    metalness: 0.7,
    roughness: 0.25,
    wireframe: true,
  }),
);
ember.position.set(0, 2.15, 0);
pedestal.add(ember);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.7, 0.85, 0.25);
composer.addPass(bloom);

const flythrough = createFlythrough(camera, controls);
replayBtn?.addEventListener('click', () => flythrough.replay());

const clock = new THREE.Clock();

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.setSize(w, h);
}

window.addEventListener('resize', onResize);

function tick() {
  const dt = clock.getDelta();
  ember.rotation.y += dt * 0.7;
  ember.rotation.x += dt * 0.35;
  ember.position.y = 2.15 + Math.sin(clock.elapsedTime * 1.6) * 0.08;

  flythrough.update(dt);
  if (!flythrough.playing) controls.update();
  composer.render();
  requestAnimationFrame(tick);
}

tick();

console.info('[atelier]', WEEK_00, exhibits);
