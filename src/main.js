import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createLobby, WEEK_00 } from './lobby.js';
import { createFlythrough } from './cameraPath.js';
import { exhibits } from './exhibits.js';
import { createSynthHalo, WEEK_01 } from './exhibits/synthHalo.js';

const canvas = document.querySelector('#scene');
const replayBtn = document.querySelector('#replay-path');
const weekLabel = document.querySelector('.week');
const titleGlow = document.querySelector('.title-float__glow');

const latest = exhibits[exhibits.length - 1];
weekLabel.textContent = `Week ${String(latest?.week ?? 0).padStart(2, '0')} · ${latest?.title ?? WEEK_00.title}`;
if (titleGlow) titleGlow.textContent = latest?.title ?? WEEK_00.title;

const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const isNarrow = () => window.innerWidth < 640;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: !isCoarsePointer,
  powerPreference: 'high-performance',
  alpha: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarsePointer ? 1.5 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05060d);
scene.fog = new THREE.FogExp2(0x05060d, 0.035);

const camera = new THREE.PerspectiveCamera(
  isNarrow() ? 60 : 55,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(0, 2.2, 10.5);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(0, 1.55, 0);
controls.maxPolarAngle = Math.PI * 0.49;
controls.minDistance = 3;
controls.maxDistance = 16;
controls.enablePan = !isCoarsePointer;
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.DOLLY_PAN,
};
controls.enabled = false;

const { pedestal } = createLobby(scene);
const halo = createSynthHalo();
pedestal.add(halo.group);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomStrength = isCoarsePointer ? 0.45 : 0.7;
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  bloomStrength,
  0.85,
  0.25,
);
composer.addPass(bloom);

const flythrough = createFlythrough(camera, controls);
replayBtn?.addEventListener('click', () => flythrough.replay());

const clock = new THREE.Clock();

function viewportSize() {
  const vv = window.visualViewport;
  return {
    w: Math.floor(vv?.width ?? window.innerWidth),
    h: Math.floor(vv?.height ?? window.innerHeight),
  };
}

function onResize() {
  const { w, h } = viewportSize();
  camera.aspect = w / h;
  camera.fov = isNarrow() ? 60 : 55;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarsePointer ? 1.5 : 2));
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  bloom.setSize(w, h);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

window.addEventListener('resize', onResize);
window.visualViewport?.addEventListener('resize', onResize);
window.addEventListener('orientationchange', () => {
  window.setTimeout(onResize, 120);
});
onResize();

function tick() {
  const dt = clock.getDelta();
  halo.update(clock.elapsedTime);

  // Living lobby: title pulse tied to the halo rings
  if (titleGlow) {
    const pulse = 0.5 + Math.sin(clock.elapsedTime * 2.4) * 0.3;
    titleGlow.style.opacity = String(0.72 + pulse * 0.22);
  }

  flythrough.update(dt);
  if (!flythrough.playing) controls.update();
  composer.render();
  requestAnimationFrame(tick);
}

tick();

console.info('[atelier]', WEEK_00, WEEK_01, exhibits);
