import * as THREE from 'three';

/**
 * Scripted flythrough for demo recordings / PR evidence.
 * Keep total duration near ~12s so weekly clips stay cheap and watchable.
 */
export function createFlythrough(camera, controls = null) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2.2, 10.5),
    new THREE.Vector3(-5.5, 3.4, 5.5),
    new THREE.Vector3(-3.2, 2.6, -1.5),
    new THREE.Vector3(2.8, 2.4, -3.8),
    new THREE.Vector3(5.2, 3.0, 2.2),
    new THREE.Vector3(0.0, 2.3, 7.5),
  ]);

  const look = new THREE.Vector3(0, 1.55, 0);
  const duration = 12;
  let elapsed = 0;
  let playing = true;
  const tmp = new THREE.Vector3();

  function replay() {
    elapsed = 0;
    playing = true;
    if (controls) controls.enabled = false;
  }

  function update(dt) {
    if (!playing) return;
    elapsed += dt;
    const t = Math.min(elapsed / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    curve.getPointAt(eased, tmp);
    camera.position.copy(tmp);
    camera.lookAt(look);

    if (t >= 1) {
      playing = false;
      if (controls) controls.enabled = true;
    }
  }

  replay();

  return { update, replay, duration, get playing() { return playing; } };
}
