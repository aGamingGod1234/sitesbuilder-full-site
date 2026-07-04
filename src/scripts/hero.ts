import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ViewportMode = 'wide-desktop' | 'portrait-desktop' | 'tablet' | 'mobile-tall' | 'mobile-short';

const root = document.documentElement;
const mobileModes = new Set<ViewportMode>(['mobile-tall', 'mobile-short']);
let mode: ViewportMode = 'wide-desktop';
let activeTile = 1;
let timelineContext: gsap.Context | null = null;
let resizeTimer = 0;

function getMode(width: number, height: number, aspect: number): ViewportMode {
  if (width < 640 && height < 680) return 'mobile-short';
  if (width < 640) return 'mobile-tall';
  if (width >= 860 && (aspect < 0.9 || height > width * 1.2)) return 'portrait-desktop';
  if (width < 980) return 'tablet';
  return 'wide-desktop';
}

function applyViewportMode() {
  const width = window.innerWidth;
  const height = window.visualViewport?.height || window.innerHeight;
  const aspect = width / Math.max(height, 1);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nextMode = getMode(width, height, aspect);

  root.dataset.viewportMode = nextMode;
  root.dataset.reducedMotion = reduced ? 'true' : 'false';
  root.style.setProperty('--vw', `${width}px`);
  root.style.setProperty('--vh', `${height}px`);
  root.style.setProperty('--aspect', aspect.toFixed(3));

  const changed = nextMode !== mode;
  mode = nextMode;
  updateMobileTiles();
  if (changed) rebuildMotion();
}

function updateMobileTiles() {
  const tiles = Array.from(document.querySelectorAll<HTMLElement>('[data-proof-tile]'));
  tiles.forEach((tile, index) => {
    const isActive = !mobileModes.has(mode) || index === activeTile;
    tile.classList.toggle('is-active', isActive);
    tile.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    tile.tabIndex = isActive ? 0 : -1;
    const link = tile.querySelector<HTMLElement>('a, button');
    if (link) link.tabIndex = isActive ? 0 : -1;
  });
}

function setActiveTile(index: number) {
  const count = document.querySelectorAll('[data-proof-tile]').length;
  activeTile = (index + count) % count;
  updateMobileTiles();
}

function rebuildMotion() {
  timelineContext?.revert();
  timelineContext = null;

  const reduced = root.dataset.reducedMotion === 'true';
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || reduced) {
    gsap.set('[data-hero-nav], [data-hero-title], [data-hero-copy], [data-hero-action], [data-proof-stage], [data-proof-tile]', { clearProps: 'all' });
    return;
  }

  timelineContext = gsap.context(() => {
    const opening = gsap.timeline({ defaults: { ease: 'power3.out' } });
    opening
      .from('[data-hero-nav]', { y: -18, autoAlpha: 0, duration: .52 }, 0)
      .from('[data-hero-title]', { y: 26, autoAlpha: 0, duration: .82 }, .08)
      .from('[data-hero-copy]', { y: 18, autoAlpha: 0, duration: .62 }, .20)
      .from('[data-hero-action]', { y: 16, autoAlpha: 0, duration: .5, stagger: .08 }, .30)
      .from('[data-proof-stage]', { y: mobileModes.has(mode) ? 24 : 46, autoAlpha: 0, duration: .92 }, .34)
      .from('[data-proof-tile]', { y: mobileModes.has(mode) ? 18 : 54, autoAlpha: 0, rotateX: mobileModes.has(mode) ? 0 : 5, duration: .82, stagger: .08 }, .52);

    if (!mobileModes.has(mode)) {
      gsap.to('[data-proof-stage]', {
        y: mode === 'portrait-desktop' ? -22 : -54,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('[data-proof-tile="center"]', {
        y: mode === 'portrait-desktop' ? -34 : -78,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '35% top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, document.body);
}

function wireTileControls() {
  document.querySelector<HTMLElement>('[data-step-prev]')?.addEventListener('click', () => setActiveTile(activeTile - 1));
  document.querySelector<HTMLElement>('[data-step-next]')?.addEventListener('click', () => setActiveTile(activeTile + 1));

  const stage = document.querySelector<HTMLElement>('[data-proof-stage]');
  if (!stage) return;

  let startX = 0;
  let startY = 0;

  stage.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    startX = touch.clientX;
    startY = touch.clientY;
  }, { passive: true });

  stage.addEventListener('touchend', (event) => {
    if (!mobileModes.has(mode)) return;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy) * 1.2) return;

    setActiveTile(activeTile + (dx < 0 ? 1 : -1));
  }, { passive: true });
}

function wireResize() {
  const schedule = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(applyViewportMode, 80);
  };
  window.addEventListener('resize', schedule, { passive: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
  new ResizeObserver(schedule).observe(document.body);
}

applyViewportMode();
wireTileControls();
wireResize();
rebuildMotion();
