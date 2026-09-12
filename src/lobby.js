import * as THREE from 'three';

const NEON = 0x39f3ff;
const NEON_HOT = 0xff2bd6;
const FLOOR = 0x0b1020;

function makeNeonBar(width, height, depth, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshStandardMaterial({
      color: 0x05070f,
      emissive: color,
      emissiveIntensity: 4.2,
      roughness: 0.35,
      metalness: 0.8,
    }),
  );
  return mesh;
}

function makeGridFloor(size = 40) {
  const geo = new THREE.PlaneGeometry(size, size, 40, 40);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const ripple = Math.sin(x * 0.45) * Math.cos(y * 0.35) * 0.04;
    pos.setZ(i, ripple);
  }
  geo.computeVertexNormals();

  const mat = new THREE.MeshPhysicalMaterial({
    color: FLOOR,
    metalness: 0.95,
    roughness: 0.18,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.4,
  });

  const floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  return floor;
}

function makePedestal() {
  const group = new THREE.Group();
  group.name = 'pedestal';

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.35, 1.55, 0.28, 48),
    new THREE.MeshStandardMaterial({
      color: 0x121826,
      metalness: 0.85,
      roughness: 0.28,
    }),
  );
  base.position.y = 0.14;

  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.9, 1.35, 48),
    new THREE.MeshStandardMaterial({
      color: 0x171e2e,
      metalness: 0.9,
      roughness: 0.22,
    }),
  );
  column.position.y = 0.95;

  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.95, 0.95, 0.12, 48),
    new THREE.MeshStandardMaterial({
      color: 0x0d1322,
      metalness: 0.92,
      roughness: 0.16,
      emissive: NEON,
      emissiveIntensity: 0.35,
    }),
  );
  top.position.y = 1.68;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.98, 0.035, 16, 80),
    new THREE.MeshStandardMaterial({
      color: 0x05070f,
      emissive: NEON_HOT,
      emissiveIntensity: 3.5,
      roughness: 0.3,
      metalness: 0.7,
    }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 1.74;

  const plaque = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.28, 0.04),
    new THREE.MeshStandardMaterial({
      color: 0x070b14,
      emissive: NEON,
      emissiveIntensity: 1.8,
      metalness: 0.6,
      roughness: 0.4,
    }),
  );
  plaque.position.set(0, 0.85, 0.78);

  group.add(base, column, top, ring, plaque);
  return group;
}

function makeArcadeFrame() {
  const group = new THREE.Group();
  group.name = 'arcade-frame';

  const back = new THREE.Mesh(
    new THREE.BoxGeometry(18, 7, 0.4),
    new THREE.MeshStandardMaterial({
      color: 0x090d18,
      metalness: 0.7,
      roughness: 0.45,
    }),
  );
  back.position.set(0, 3.2, -8);

  const left = back.clone();
  left.position.set(-9, 3.2, -2);
  left.rotation.y = Math.PI / 2;
  left.scale.set(0.7, 1, 1);

  const right = left.clone();
  right.position.x = 9;

  const ceilingBar = makeNeonBar(18, 0.08, 0.08, NEON);
  ceilingBar.position.set(0, 6.2, -4);

  const floorBarA = makeNeonBar(16, 0.06, 0.06, NEON);
  floorBarA.position.set(0, 0.04, -7.4);
  const floorBarB = makeNeonBar(16, 0.06, 0.06, NEON_HOT);
  floorBarB.position.set(0, 0.04, 4.2);

  const pillarL = makeNeonBar(0.12, 6.2, 0.12, NEON);
  pillarL.position.set(-7.2, 3.1, -7.5);
  const pillarR = makeNeonBar(0.12, 6.2, 0.12, NEON_HOT);
  pillarR.position.set(7.2, 3.1, -7.5);

  group.add(back, left, right, ceilingBar, floorBarA, floorBarB, pillarL, pillarR);
  return group;
}

function makeCityBleed() {
  const group = new THREE.Group();
  group.name = 'city-bleed';

  for (let i = 0; i < 18; i += 1) {
    const h = 1.5 + (i % 5) * 0.85;
    const tower = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, h, 0.55),
      new THREE.MeshStandardMaterial({
        color: 0x0a0f1c,
        emissive: i % 2 === 0 ? NEON : NEON_HOT,
        emissiveIntensity: 0.55 + (i % 3) * 0.2,
        metalness: 0.8,
        roughness: 0.35,
      }),
    );
    const x = -8 + (i % 9) * 2;
    const z = -10.5 - Math.floor(i / 9) * 1.4;
    tower.position.set(x, h / 2, z);
    group.add(tower);
  }

  return group;
}

/**
 * Week 00 lobby: neon arcade loft foundations.
 * Future weeks should import createLobby and add exhibits beside the pedestal.
 */
export function createLobby(scene) {
  const lobby = new THREE.Group();
  lobby.name = 'lobby';

  const floor = makeGridFloor(42);
  const pedestal = makePedestal();
  pedestal.position.set(0, 0, 0);

  const frame = makeArcadeFrame();
  const city = makeCityBleed();

  const hemi = new THREE.HemisphereLight(0x6ecbff, 0x12081a, 0.55);
  const key = new THREE.SpotLight(NEON, 40, 30, Math.PI / 5, 0.4, 1);
  key.position.set(4, 8, 6);
  key.target.position.set(0, 1.5, 0);
  const fill = new THREE.PointLight(NEON_HOT, 18, 20);
  fill.position.set(-5, 3.5, 2);

  lobby.add(floor, pedestal, frame, city, hemi, key, key.target, fill);
  scene.add(lobby);

  return {
    lobby,
    pedestal,
    lights: { hemi, key, fill },
  };
}

export const WEEK_00 = {
  id: 'week-00',
  title: 'NEON LOFT',
  subtitle: 'Lobby foundations',
  notes: 'Procedural neon arcade loft with reflective floor, bloom-ready materials, and the first pedestal.',
};
