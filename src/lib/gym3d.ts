import {
  ACESFilmicToneMapping,
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  LatheGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export type ModelKind = 'dumbbell' | 'barbell' | 'stack' | 'plate';

const steel = new MeshStandardMaterial({ color: 0xc4c8cf, metalness: 1, roughness: 0.25 });
const darkSteel = new MeshStandardMaterial({ color: 0x5a5f68, metalness: 1, roughness: 0.4 });
const redRubber = new MeshStandardMaterial({ color: 0xd2202a, metalness: 0.05, roughness: 0.5 });
const blackRubber = new MeshStandardMaterial({ color: 0x1b1e23, metalness: 0.1, roughness: 0.6 });

/** Bumper plate revolved from a profile, axis along X, radius 1. */
function plate(material: MeshStandardMaterial, radius = 1, thickness = 0.28) {
  const h = thickness / 2;
  const profile = [
    [0.2, -h], [0.94, -h], [1, -h * 0.7], [1, h * 0.7], [0.94, h],
    [0.62, h], [0.58, h * 0.55], [0.3, h * 0.55], [0.26, h], [0.2, h],
  ].map(([r, y]) => new Vector2(r * radius, y));
  const mesh = new Mesh(new LatheGeometry(profile, 72), material);
  mesh.rotation.z = Math.PI / 2;
  return mesh;
}

function rod(radius: number, length: number, material: MeshStandardMaterial) {
  const mesh = new Mesh(new CylinderGeometry(radius, radius, length, 48), material);
  mesh.rotation.z = Math.PI / 2;
  return mesh;
}

function dumbbell() {
  const group = new Group();
  group.add(rod(0.13, 2.2, steel));
  for (const side of [-1, 1]) {
    [0.62, 0.92].forEach((x, index) => {
      // Black and steel so it reads on the red hero field.
      const disc = plate(index === 0 ? blackRubber : darkSteel, index === 0 ? 0.95 : 0.8, 0.26);
      disc.position.x = side * x;
      group.add(disc);
    });
    const collar = rod(0.19, 0.12, darkSteel);
    collar.position.x = side * 0.43;
    group.add(collar);
  }
  return group;
}

function barbell() {
  const group = new Group();
  group.add(rod(0.06, 5.2, steel));
  for (const side of [-1, 1]) {
    const sleeve = rod(0.11, 1.3, steel);
    sleeve.position.x = side * 2.3;
    group.add(sleeve);
    [1.85, 2.15, 2.4].forEach((x, index) => {
      const disc = plate(index === 0 ? redRubber : blackRubber, index === 0 ? 1.15 : 1.05, 0.24);
      disc.position.x = side * x;
      group.add(disc);
    });
  }
  return group;
}

/** Selectorized weight stack: plates on two guide rods, the top one in red. */
function stack() {
  const group = new Group();
  const count = 9;
  for (let index = 0; index < count; index++) {
    const block = new Mesh(new BoxGeometry(2.2, 0.2, 1), index === count - 1 ? redRubber : blackRubber);
    block.position.y = index * 0.24 - 1;
    group.add(block);
  }
  for (const x of [-0.75, 0.75]) {
    const guide = new Mesh(new CylinderGeometry(0.05, 0.05, 3.4, 24), steel);
    guide.position.set(x, 0, 0);
    group.add(guide);
  }
  const pin = rod(0.05, 1.4, darkSteel);
  pin.rotation.set(0, Math.PI / 2, Math.PI / 2);
  pin.position.set(0, 0.2, 0.5);
  group.add(pin);
  return group;
}

const builders: Record<ModelKind, () => Group> = {
  dumbbell,
  barbell,
  stack,
  plate: () => {
    const group = new Group();
    group.add(plate(blackRubber, 1.2, 0.32));
    group.add(rod(0.3, 0.36, steel));
    return group;
  },
};

// Long objects sway around a three-quarter view instead of spinning, so they never show up end-on.
const views: Record<ModelKind, { distance: number; tilt: number; sway: boolean }> = {
  dumbbell: { distance: 4.4, tilt: 0.35, sway: false },
  barbell: { distance: 8, tilt: 0.25, sway: true },
  stack: { distance: 6.6, tilt: 0.2, sway: true },
  plate: { distance: 3.8, tilt: 0.3, sway: false },
};

export interface Mounted {
  dispose(): void;
}

/** Renders one model into the element; turns slowly, follows the pointer and the scroll, pauses offscreen. */
export function mountModel(host: HTMLElement, kind: ModelKind, reduced: boolean): Mounted {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  host.append(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const rim = new DirectionalLight(0xff3b3b, 2.5);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const model = builders[kind]();
  model.rotation.x = views[kind].tilt;
  scene.add(model);

  const camera = new PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0.4, views[kind].distance);
  camera.lookAt(0, 0, 0);

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the whole object in frame on narrow, tall boxes.
    camera.position.z = views[kind].distance * Math.max(1, 1.1 / camera.aspect);
    camera.updateProjectionMatrix();
    // Resizing clears the canvas; paint at once instead of waiting for the next frame.
    renderer.render(scene, camera);
  };
  const sizer = new ResizeObserver(resize);
  sizer.observe(host);
  resize();

  const pointer = { x: 0, y: 0 };
  const onPointer = (event: PointerEvent) => {
    pointer.x = event.clientX / innerWidth - 0.5;
    pointer.y = event.clientY / innerHeight - 0.5;
  };
  addEventListener('pointermove', onPointer, { passive: true });

  let visible = false;
  let frame = 0;
  let spin = 0;
  const draw = () => {
    const box = host.getBoundingClientRect();
    const scroll = (innerHeight - box.top) / (innerHeight + box.height);
    if (!reduced) spin += 0.004;
    const turn = views[kind].sway ? -0.45 + Math.sin(spin * 2) * 0.35 + scroll * 0.5 : spin + scroll * Math.PI * 0.8;
    model.rotation.y = turn + pointer.x * 0.6;
    model.rotation.x += (views[kind].tilt + pointer.y * 0.3 - model.rotation.x) * 0.06;
    renderer.render(scene, camera);
    if (visible && !reduced) frame = requestAnimationFrame(draw);
  };

  const watcher = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(frame);
    if (visible) draw();
  });
  watcher.observe(host);
  if (reduced) addEventListener('scroll', draw, { passive: true });

  return {
    dispose() {
      cancelAnimationFrame(frame);
      watcher.disconnect();
      sizer.disconnect();
      removeEventListener('pointermove', onPointer);
      removeEventListener('scroll', draw);
      renderer.dispose();
    },
  };
}
