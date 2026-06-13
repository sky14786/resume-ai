import * as THREE from 'three';

// ─────────────────────────────────────────
// SCENE SETUP
// ─────────────────────────────────────────
const canvas  = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x050510, 1);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
camera.position.set(0, 0, 6);

// ─────────────────────────────────────────
// FOG
// ─────────────────────────────────────────
scene.fog = new THREE.FogExp2(0x050510, 0.045);

// ─────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────
const PARTICLE_COUNT = 800;
const particleGeo = new THREE.BufferGeometry();
const positions   = new Float32Array(PARTICLE_COUNT * 3);
const basePos     = new Float32Array(PARTICLE_COUNT * 3); // original positions

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const i3 = i * 3;
  const x = (Math.random() - 0.5) * 30;
  const y = (Math.random() - 0.5) * 20;
  const z = (Math.random() - 0.5) * 18;
  positions[i3]     = x;
  positions[i3 + 1] = y;
  positions[i3 + 2] = z;
  basePos[i3]       = x;
  basePos[i3 + 1]   = y;
  basePos[i3 + 2]   = z;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// random sizes per particle via custom attribute
const sizes = new Float32Array(PARTICLE_COUNT);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  sizes[i] = Math.random() * 1.6 + 0.4;
}
particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const particleMat = new THREE.ShaderMaterial({
  uniforms: {
    uTime:  { value: 0 },
    uColor: { value: new THREE.Color(0x6366f1) },
  },
  vertexShader: /* glsl */`
    attribute float size;
    uniform float uTime;
    varying float vAlpha;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      // flicker
      float flicker = 0.55 + 0.45 * sin(uTime * 1.2 + position.x * 3.7 + position.y * 2.1);
      vAlpha = flicker;
      gl_PointSize = size * (200.0 / -mvPosition.z);
      gl_Position  = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */`
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
      // soft circular point
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ─────────────────────────────────────────
// WIREFRAME ICOSAHEDRON (central object)
// ─────────────────────────────────────────
const icoGeo   = new THREE.IcosahedronGeometry(1.55, 1);
const edgesGeo = new THREE.EdgesGeometry(icoGeo);
const lineMat  = new THREE.LineBasicMaterial({
  color: 0x6366f1,
  transparent: true,
  opacity: 0.85,
  blending: THREE.AdditiveBlending,
});
const wireframe = new THREE.LineSegments(edgesGeo, lineMat);
scene.add(wireframe);

// inner (smaller) icosahedron — for depth
const icoGeo2   = new THREE.IcosahedronGeometry(0.85, 0);
const edgesGeo2 = new THREE.EdgesGeometry(icoGeo2);
const lineMat2  = new THREE.LineBasicMaterial({
  color: 0x818cf8,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
});
const wireframe2 = new THREE.LineSegments(edgesGeo2, lineMat2);
scene.add(wireframe2);

// outer ring glow (torus)
const torusGeo = new THREE.TorusGeometry(2.2, 0.008, 4, 80);
const torusMat = new THREE.MeshBasicMaterial({
  color: 0x4f52d0,
  transparent: true,
  opacity: 0.3,
});
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.rotation.x = Math.PI * 0.35;
scene.add(torus);

// ─────────────────────────────────────────
// NEBULA / GLOW SPRITE in background
// ─────────────────────────────────────────
function makeGlowSprite(color, size, opacity) {
  const canvas2 = document.createElement('canvas');
  canvas2.width  = 256;
  canvas2.height = 256;
  const ctx = canvas2.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0,   color.replace(')', `, ${opacity})`).replace('rgb', 'rgba'));
  grad.addColorStop(1,   color.replace(')', ', 0)').replace('rgb', 'rgba'));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas2);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(size, size, 1);
  return sprite;
}

const glow1 = makeGlowSprite('rgb(99, 102, 241)', 9, 0.25);
glow1.position.set(0, 0, -4);
scene.add(glow1);

const glow2 = makeGlowSprite('rgb(139, 92, 246)', 6, 0.15);
glow2.position.set(3, -2, -5);
scene.add(glow2);

// ─────────────────────────────────────────
// MOUSE TRACKING
// ─────────────────────────────────────────
const mouse    = { x: 0, y: 0 };
const mouseNDC = { x: 0, y: 0 }; // -1..1

window.addEventListener('mousemove', (e) => {
  mouseNDC.x = (e.clientX / window.innerWidth)  * 2 - 1;
  mouseNDC.y = (e.clientY / window.innerHeight) * 2 - 1;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// touch support
window.addEventListener('touchmove', (e) => {
  const t = e.touches[0];
  mouseNDC.x = (t.clientX / window.innerWidth)  * 2 - 1;
  mouseNDC.y = (t.clientY / window.innerHeight) * 2 - 1;
}, { passive: true });

// ─────────────────────────────────────────
// SCROLL FADE
// ─────────────────────────────────────────
let heroVisible = 1;
window.addEventListener('scroll', () => {
  const scrollY   = window.scrollY;
  const heroH     = document.getElementById('hero').offsetHeight;
  const fadeStart = heroH * 0.3;
  const fadeEnd   = heroH * 0.85;
  heroVisible = 1 - Math.max(0, Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart)));
  canvas.style.opacity = heroVisible;
});

// ─────────────────────────────────────────
// RESIZE
// ─────────────────────────────────────────
function resize() {
  const hero = document.getElementById('hero');
  const w = hero.offsetWidth;
  const h = hero.offsetHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener('resize', resize);

// ─────────────────────────────────────────
// SMOOTH LERP VALUES
// ─────────────────────────────────────────
const smoothMouse = { x: 0, y: 0 };

// ─────────────────────────────────────────
// ANIMATION LOOP
// ─────────────────────────────────────────
const clock = new THREE.Clock();
const posAttr = particleGeo.attributes.position;

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();
  particleMat.uniforms.uTime.value = elapsed;

  // smooth mouse
  smoothMouse.x += (mouseNDC.x - smoothMouse.x) * 0.04;
  smoothMouse.y += (mouseNDC.y - smoothMouse.y) * 0.04;

  // ── wireframe rotation ──
  wireframe.rotation.x  = elapsed * 0.18 + smoothMouse.y * 0.25;
  wireframe.rotation.y  = elapsed * 0.28 + smoothMouse.x * 0.35;
  wireframe2.rotation.x = -elapsed * 0.22 + smoothMouse.y * 0.15;
  wireframe2.rotation.y =  elapsed * 0.35 - smoothMouse.x * 0.20;

  // torus spin
  torus.rotation.z = elapsed * 0.12;
  torus.rotation.x = Math.PI * 0.35 + smoothMouse.y * 0.1;

  // ── particle mouse push ──
  const pushRadius = 4.0;
  const pushStr    = 0.55;
  // world-space mouse position (approx. at z=0)
  const mwx = smoothMouse.x * (camera.aspect * Math.tan(THREE.MathUtils.degToRad(30)) * 6);
  const mwy = -smoothMouse.y * (Math.tan(THREE.MathUtils.degToRad(30)) * 6);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const bx = basePos[i3];
    const by = basePos[i3 + 1];
    const bz = basePos[i3 + 2];

    // slow drift
    const dx = bx + Math.sin(elapsed * 0.2 + bz * 0.5) * 0.3;
    const dy = by + Math.cos(elapsed * 0.15 + bx * 0.4) * 0.3;

    // mouse push
    const rx = dx - mwx;
    const ry = dy - mwy;
    const dist = Math.sqrt(rx * rx + ry * ry);

    if (dist < pushRadius) {
      const force = (1 - dist / pushRadius) * pushStr;
      posAttr.array[i3]     = dx + (rx / (dist + 0.0001)) * force;
      posAttr.array[i3 + 1] = dy + (ry / (dist + 0.0001)) * force;
    } else {
      posAttr.array[i3]     = dx;
      posAttr.array[i3 + 1] = dy;
    }
    posAttr.array[i3 + 2] = bz;
  }
  posAttr.needsUpdate = true;

  // ── slow camera drift ──
  camera.position.x = smoothMouse.x * 0.35;
  camera.position.y = smoothMouse.y * -0.25;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

// ─────────────────────────────────────────
// SCROLL REVEAL for content sections
// ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.career-card, .project-card, .skill-group, .about-text, .contact-wrapper'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));
