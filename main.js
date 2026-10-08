// Protagonist Ink — homepage behaviour. No dependencies.

// Mobile menu (below 900px): Work, Approach, About, Start a conversation.
(function () {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
  };
  btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || !nav.classList.contains('is-open')) return;
    setOpen(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', () => setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); btn.focus(); }
  });
})();

// How we work: the stages stack collapsed (CSS, under html.js). Hover previews one on
// fine pointers. Each name becomes a disclosure button: keyboard focus opens its stage,
// and click, tap, Enter or Space pins it open or shut. aria-expanded always matches
// what a sighted keyboard user sees.
(function () {
  document.querySelectorAll('.stage').forEach((stage) => {
    const name = stage.querySelector('.stage-name');
    const detail = stage.querySelector('.stage-detail');
    if (!name || !detail) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'stage-toggle';
    btn.textContent = name.textContent;
    btn.setAttribute('aria-controls', detail.id);
    name.replaceChildren(btn);
    let pinned = false, focused = false, dismissed = false;
    const update = () => {
      const open = pinned || (focused && !dismissed);
      btn.setAttribute('aria-expanded', String(open));
      stage.classList.toggle('is-open', open);
    };
    btn.addEventListener('focus', () => { focused = btn.matches(':focus-visible'); update(); });
    btn.addEventListener('blur', () => { focused = false; dismissed = false; update(); });
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      pinned = !open;
      dismissed = open;
      update();
    });
    update();
  });
})();

// The studio: the client strip is one button. Click, tap, Enter or Space pauses or resumes the loop
// (CSS also pauses it on hover). Under reduced motion and on phones it is a static list.
(function () {
  const strip = document.querySelector('.marquee');
  if (!strip) return;
  strip.addEventListener('click', () => {
    strip.setAttribute('aria-pressed', String(strip.getAttribute('aria-pressed') !== 'true'));
  });
})();

// Inquiry form: validation only. There is NO delivery route yet, so it never claims to have sent.
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstBad = null;
    form.querySelectorAll('[required]').forEach((el) => {
      const ok = el.value.trim() !== '' && (el.type !== 'email' || /.+@.+\..+/.test(el.value));
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) {
      status.textContent = 'Please add your name, a valid email and a sentence about the project.';
      firstBad.focus();
      return;
    }
    // TODO: send to a real endpoint (Formspree, Netlify Forms, a serverless function…) and only then confirm.
    status.textContent = 'Form not connected yet. Please email hello@protagonistink.com for now.';
  });
})();
