// Elements: educational particle models for material science and atomic structure.
import { torus, line } from '../lib/sampling.js';
import { sphere, dots } from '../lib/shapes.js';
import { G } from './engines.js';
import { TAU } from '../lib/sampling.js';

function atom() {
  const protons = [], neutrons = [], electrons = [], valence = [], shells = [];
  const nucleus = [0, 0, 0];
  const rng = (seed) => Math.sin(seed * 12.9898) * 43758.5453 % 1;

  // Compact nucleus: positive protons and neutral neutrons clustered at the centre.
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    const p = [Math.cos(a) * 34, Math.sin(a * 1.7) * 26, Math.sin(a) * 34];
    protons.push(sphere(p, 13, 1.2));
    const q = [Math.cos(a + 0.35) * 28, Math.sin(a * 1.3) * 30, Math.sin(a + 0.35) * 28];
    neutrons.push(sphere(q, 13, 1.1));
  }

  // Three quantized electron shells; the outer shell is the valence shell.
  const shellRadii = [92, 148, 204];
  shellRadii.forEach((r, si) => {
    shells.push(torus([0, 0, 0], r, 1.8, [0.15 * si, 1, 0.2], 2.5));
    const count = [2, 8, 6][si];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU + si * 0.38;
      const wobble = (rng(i + si * 11) - 0.5) * 8;
      const p = [Math.cos(a) * (r + wobble), Math.sin(a * 0.7 + si) * (r * 0.18), Math.sin(a) * (r + wobble)];
      const e = sphere(p, 8, 1.7);
      (si === shellRadii.length - 1 ? valence : electrons).push(e);
    }
  });

  // A sparse probability cloud makes the orbital regions visible as particles.
  const cloud = [];
  for (let i = 0; i < 260; i++) {
    const a = (i / 260) * TAU * 7;
    const r = 45 + (i % 17) * 9;
    cloud.push([Math.cos(a) * r, Math.sin(a * 1.7) * r * 0.58, Math.sin(a) * r]);
  }

  return [
    G('Protons (+)', [1.0, 0.25, 0.3], [-150, 20, 0], 0.1, protons, { info: 'positively charged particles in the nucleus' }),
    G('Neutrons (0)', [0.65, 0.7, 0.78], [-150, -70, 0], 0.1, neutrons, { info: 'neutral particles in the nucleus' }),
    G('Nucleus', [1.0, 0.45, 0.25], [0, 0, 0], 0.0, [sphere(nucleus, 54, 0.4)], { info: 'dense central core containing protons and neutrons' }),
    G('Electron shells', [0.35, 0.75, 1.0], [0, 150, 0], 0.15, shells, { info: 'quantized energy levels around the nucleus' }),
    G('Electron cloud', [0.45, 0.8, 1.0], [0, 0, 120], 0.25, [dots(cloud, 2.2, 0.7)], { info: 'probability region where electrons are likely to be found' }),
    G('Electrons (-)', [0.2, 0.55, 1.0], [170, -20, 0], 0.25, electrons, { info: 'negatively charged particles occupying shells' }),
    G('Valence electrons', [0.95, 0.85, 0.25], [210, 100, 0], 0.35, valence, { info: 'outermost electrons that control bonding and reactions' }),
  ];
}

function vibranium() {
  const core = [sphere([0, 0, 0], 118, 0.55), torus([0, 0, 0], 135, 3.5, [0, 1, 0], 3)];
  const rings = [];
  for (let i = 0; i < 3; i++) rings.push(torus([0, 0, 0], 70 + i * 34, 2.4, [1, i * 0.35 + 0.25, 0.2], 2.5));
  const veins = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU;
    veins.push(line([0, 0, 0], [Math.cos(a) * 135, Math.sin(a * 1.7) * 55, Math.sin(a) * 135], 0.5, 3));
  }
  return [
    G('Vibranium core', [0.3, 0.85, 1.0], [0, 0, 0], 0.0, core, { info: 'fictional ultra-strong metal inspired by Iron Man 3' }),
    G('Energy lattice', [0.4, 0.95, 0.75], [130, 40, 0], 0.2, rings, { info: 'glowing crystalline energy pattern' }),
    G('Resonance veins', [0.9, 0.65, 0.2], [-130, -50, 0], 0.35, veins, { info: 'stylized channels representing stored kinetic energy' }),
  ];
}

export const ELEMENTS = [
  { name: 'Vibranium', groups: vibranium, color: [0.25, 0.9, 1.0], tilt: 10, viewYaw: 0.35, fact: 'Fictional metal · inspired by Iron Man 3 · high-energy lattice' },
  { name: 'Atom', groups: atom, color: [0.35, 0.75, 1.0], tilt: 0, viewYaw: 0.35, fact: 'Nucleus, protons, neutrons, electron shells, electron cloud and valence electrons' },
];
