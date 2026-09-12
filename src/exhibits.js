/**
 * Registry of exhibits hung in the gallery.
 * Weekly Cloud Agent runs append an entry here and mount content near the pedestal.
 */
export const exhibits = [
  {
    week: 0,
    slug: 'lobby',
    title: 'NEON LOFT',
    summary: 'Lobby foundations — reflective floor, procedural neon, first pedestal.',
    merged: true,
  },
  {
    week: 1,
    slug: 'synth-halo',
    title: 'SYNTH HALO',
    summary: 'Living-lobby morph — tilted neon rings and wireframe crystal orrery above the pedestal.',
    merged: true,
  },
];

export function nextWeekNumber() {
  return exhibits.reduce((max, e) => Math.max(max, e.week), -1) + 1;
}
