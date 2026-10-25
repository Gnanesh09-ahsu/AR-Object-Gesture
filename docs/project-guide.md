# AR Object Gesture — Project Guide

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:5173/`. Choose the no-camera mode for keyboard and synthetic browser controls, or allow camera access at startup for hands-only gesture input. The visible camera monitor has been removed to keep the particle workspace uncluttered.

## Interaction model

The main stage is a pure-black WebGL2 particle canvas. Camera frames are processed locally for optional gesture input but are not displayed in a camera panel. The catalog includes the Elements group with **Atom** and **Vibranium**.

The snap control now uses **🤘 Snap**. Fist forms the selected object, open hand controls ordinary exploded views, and point-plus-pinch opens or pulls out labeled parts.

For Atom and Vibranium, use the custom atomic-lattice mapping:

- Hold a pinch and drag horizontally to rotate.
- Drag vertically while pinching to tilt.
- Widen the thumb-index gap while keeping the pinch to increase explosion.
- Close the gap to reassemble.
- Release the pinch to keep the current exploded amount.

Each Atom and Vibranium part has an interactive explanation in the part card and the optional read-aloud action.

## Performance defaults

The runtime detects small screens. A narrow phone uses 60k particles, larger mobile layouts use 90k, mobile DPR is capped at 1.35, and trails are disabled by default. Desktop retains the 200k default. Use `n`, `dpr`, and `trails` URL parameters when a device-specific override is needed.

## Browser preview checks

A useful live preview URL is:

```text
http://localhost:5173/?autostart=camera&model=18
```

The model index may change as the catalog grows; resolve it by name with `window.wonderSnap.CATALOG.findIndex(d => d.name === 'Atom')`.

The browser API supports deterministic hand testing:

```js
const W = window.wonderSnap;
const index = W.CATALOG.findIndex((d) => d.name === 'Vibranium');
W.select(index);
await W.advance(2.5, W.synth({ pose: 'fist' }));
await W.advance(1.2, W.synth({ pose: 'pinch', pinchGap: 0.24, cx: .42 }));
console.log(W.status());
```

The final `status()` output reports `pinch`, `pinchGap`, `yaw`, `pitch`, `explode`, camera state, particle count, and the selected explanation label.
