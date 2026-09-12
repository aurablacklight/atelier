import * as THREE from 'three';

/**
 * Week 01 — Synth Halo
 * Neon orrery above the pedestal: tilted torus rings + wireframe crystal core.
 * Procedural only — no textures.
 */
export function createSynthHalo() {
  const group = new THREE.Group();
  group.name = 'week-01-synth-halo';

  const cyan = new THREE.Color(0x39f3ff);
  const magenta = new THREE.Color(0xff2bd6);
  const gold = new THREE.Color(0xffc14a);

  const core = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.22, 0)),
    new THREE.LineBasicMaterial({
      color: 0x39f3ff,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  core.position.y = 0.9;

  const glow = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.12, 1),
    new THREE.MeshStandardMaterial({
      color: 0x05070f,
      emissive: 0xff2bd6,
      emissiveIntensity: 2.8,
      metalness: 0.75,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    }),
  );
  glow.position.y = 0.9;

  const ringSpecs = [
    { r: 0.55, tube: 0.014, tilt: 0.35, speed: 0.55, hue: cyan },
    { r: 0.72, tube: 0.011, tilt: -0.55, speed: -0.38, hue: magenta },
    { r: 0.88, tube: 0.009, tilt: 0.12, speed: 0.28, hue: gold },
  ];

  const rings = ringSpecs.map((spec, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(spec.r, spec.tube, 8, 64),
      new THREE.MeshStandardMaterial({
        color: 0x05070f,
        emissive: spec.hue,
        emissiveIntensity: 3.2 - i * 0.4,
        metalness: 0.85,
        roughness: 0.18,
        transparent: true,
        opacity: 0.88,
      }),
    );
    ring.rotation.x = Math.PI / 2 + spec.tilt;
    ring.rotation.z = i * 0.9;
    ring.position.y = 0.9;
    ring.userData.speed = spec.speed;
    return ring;
  });

  const sparkCount = 48;
  const sparkPos = new Float32Array(sparkCount * 3);
  const sparkCol = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount; i += 1) {
    const t = i / sparkCount;
    const angle = t * Math.PI * 2;
    const r = 0.35 + (i % 5) * 0.08;
    sparkPos[i * 3] = Math.cos(angle) * r;
    sparkPos[i * 3 + 1] = 0.9 + Math.sin(angle * 3) * 0.15;
    sparkPos[i * 3 + 2] = Math.sin(angle) * r;
    const c = cyan.clone().lerp(magenta, (Math.sin(t * 6) + 1) * 0.5);
    sparkCol[i * 3] = c.r;
    sparkCol[i * 3 + 1] = c.g;
    sparkCol[i * 3 + 2] = c.b;
  }
  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
  sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkCol, 3));
  const sparks = new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );

  group.add(core, glow, ...rings, sparks);
  group.position.set(0, 1.85, 0);

  function update(elapsed) {
    core.rotation.x = elapsed * 0.35;
    core.rotation.y = elapsed * 0.62;
    glow.rotation.y = -elapsed * 0.48;
    glow.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.06);

    rings.forEach((ring, i) => {
      ring.rotation.z += ring.userData.speed * 0.016;
      ring.position.y = 0.9 + Math.sin(elapsed * 1.6 + i * 1.4) * 0.04;
    });

    const pos = sparkGeo.attributes.position;
    for (let i = 0; i < sparkCount; i += 1) {
      const t = i / sparkCount;
      const angle = t * Math.PI * 2 + elapsed * (0.4 + (i % 3) * 0.12);
      const r = 0.35 + (i % 5) * 0.08 + Math.sin(elapsed * 1.8 + i) * 0.03;
      pos.setXYZ(
        i,
        Math.cos(angle) * r,
        0.9 + Math.sin(angle * 3 + elapsed * 1.2) * 0.18,
        Math.sin(angle) * r,
      );
    }
    pos.needsUpdate = true;
    group.rotation.y = elapsed * 0.12;
  }

  return { group, update };
}

export const WEEK_01 = {
  id: 'week-01',
  title: 'SYNTH HALO',
  subtitle: 'Neon orrery',
  notes: 'Tilted torus rings + wireframe icosahedron core above the pedestal. Procedural only.',
};
