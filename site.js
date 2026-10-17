'use strict';

const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');

function closeMenu(returnFocus = false) {
  menu.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = 'Menu <span aria-hidden="true">☰</span>';
  if (returnFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
  const opening = menu.hidden;
  menu.hidden = !opening;
  toggle.setAttribute('aria-expanded', String(opening));
  toggle.innerHTML = opening
    ? 'Close <span aria-hidden="true">×</span>'
    : 'Menu <span aria-hidden="true">☰</span>';
  if (opening) menu.querySelector('a').focus();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  });
});

matchMedia('(min-width:761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#service').value = link.dataset.service;
  });
});

const form = document.querySelector('#appointment');
const replyMethod = document.querySelector('#reply-method');

function updateReplyFields() {
  const phone = replyMethod.value === 'phone';
  for (const method of ['email', 'phone']) {
    const active = (method === 'phone') === phone;
    const input = document.querySelector('#reply-' + method);
    document.querySelector('#' + method + '-field').hidden = !active;
    input.disabled = !active;
    input.required = active;
  }
}

replyMethod.addEventListener('change', updateReplyFields);
// Formspree resets the form after success; sync controls after native reset completes.
form.addEventListener('reset', () => setTimeout(updateReplyFields, 0));
updateReplyFields();
document.querySelector('#year').textContent = new Date().getFullYear();

// Leave usable guidance in place if the third-party signup never loads.
const newsletterEmbed = document.querySelector('#newsletter-embed');
const newsletterFallback = document.querySelector('#newsletter-fallback');
function newsletterReady() {
  const email = newsletterEmbed.querySelector('input[type="email"]');
  const submit = newsletterEmbed.querySelector('button[type="submit"], input[type="submit"]');
  return Boolean(email && submit);
}
if (newsletterReady()) {
  newsletterFallback.hidden = true;
} else {
  const newsletterObserver = new MutationObserver(() => {
    if (newsletterReady()) {
      newsletterFallback.hidden = true;
      newsletterObserver.disconnect();
    }
  });
  newsletterObserver.observe(newsletterEmbed, { childList: true, subtree: true });
}
