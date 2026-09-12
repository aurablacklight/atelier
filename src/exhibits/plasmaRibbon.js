import * as THREE from 'three';

/**
 * Week 01 — Plasma Ribbon
 * Living-lobby morph: twisting emissive ribbon above the pedestal + soft title pulse.
 * Procedural only — no textures.
 */
export function createPlasmaRibbon() {
  const group = new THREE.Group();
  group.name = 'week-01-plasma-ribbon';

  const count = 180;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cyan = new THREE.Color(0x39f3ff);
  const magenta = new THREE.Color(0xff2bd6);

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const angle = t * Math.PI * 4;
    const radius = 0.35 + Math.sin(t * Math.PI) * 0.25;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = t * 1.6;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    const c = cyan.clone().lerp(magenta, t);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const ribbon = new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );

  const core = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.18, 0.045, 96, 12, 2, 3),
    new THREE.MeshStandardMaterial({
      color: 0x0a0e18,
      emissive: 0xff2bd6,
      emissiveIntensity: 2.4,
      metalness: 0.7,
      roughness: 0.25,
    }),
  );
  core.position.y = 0.85;

  group.add(ribbon, core);
  group.position.set(0, 1.85, 0);

  function update(elapsed) {
    const pos = geo.attributes.position;
    for (let i = 0; i < count; i += 1) {
      const t = i / (count - 1);
      const angle = t * Math.PI * 4 + elapsed * 0.9;
      const radius = 0.35 + Math.sin(t * Math.PI + elapsed * 1.4) * 0.28;
      pos.setXYZ(
        i,
        Math.cos(angle) * radius,
        t * 1.6 + Math.sin(elapsed * 2 + t * 6) * 0.04,
        Math.sin(angle) * radius,
      );
    }
    pos.needsUpdate = true;
    core.rotation.x = elapsed * 0.6;
    core.rotation.y = elapsed * 0.85;
    group.rotation.y = elapsed * 0.25;
  }

  return { group, update };
}

export const WEEK_01 = {
  id: 'week-01',
  title: 'PLASMA RIBBON',
  subtitle: 'Living lobby morph',
  notes: 'Twisting emissive ribbon + torus-knot core above the pedestal. Procedural only.',
};
