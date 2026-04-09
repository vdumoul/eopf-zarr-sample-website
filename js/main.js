/* ─────────────────────────────────────────────
   EOPF Sentinel Zarr Samples — main.js
   ───────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── SPA Navigation ── */
  function initNav() {
    const navLinks = document.querySelectorAll('.nav-links a[data-page]');
    const pages    = document.querySelectorAll('.page');
    const toggle   = document.querySelector('.nav-toggle');
    const navList  = document.querySelector('.nav-links');
    const heroButtons = document.querySelectorAll('[data-goto]');

    function showPage(id) {
      pages.forEach(p => p.classList.remove('active'));
      navLinks.forEach(a => a.classList.remove('active'));

      const target = document.getElementById('page-' + id);
      if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const activeLink = document.querySelector(`.nav-links a[data-page="${id}"]`);
      if (activeLink) activeLink.classList.add('active');

      // Update URL hash without full reload
      history.pushState(null, '', '#' + id);

      // Close mobile nav if open
      if (navList) navList.classList.remove('open');
    }

    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        showPage(link.dataset.page);
      });
    });

    heroButtons.forEach(btn => {
      btn.addEventListener('click', () => showPage(btn.dataset.goto));
    });

    // Mobile toggle
    if (toggle && navList) {
      toggle.addEventListener('click', () => navList.classList.toggle('open'));
    }

    // Handle hash on load
    const hash = window.location.hash.replace('#', '');
    const validPages = ['home', 'data', 'learn', 'about'];
    showPage(validPages.includes(hash) ? hash : 'home');

    // STAC CTA in nav
    const stacCta = document.querySelector('.btn-nav-cta');
    if (stacCta) {
      stacCta.addEventListener('click', () => {
        window.open('https://stac.browser.user.eopf.eodc.eu/', '_blank');
      });
    }
  }

  /* ── Code tabs ── */
  function initCodeTabs() {
    const tabs   = document.querySelectorAll('.code-tab');
    const panels = document.querySelectorAll('.code-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById('code-' + tab.dataset.lang);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ── Copy button ── */
  function initCopyBtn() {
    const btn = document.querySelector('.copy-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const activePanel = document.querySelector('.code-panel.active');
      if (!activePanel) return;

      // Strip HTML tags to get plain text
      const text = activePanel.innerText || activePanel.textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }).catch(() => {
        btn.textContent = 'Error';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    });
  }

  /* ── STAC filter pills (cosmetic demo) ── */
  function initStacPills() {
    const pills = document.querySelectorAll('.stac-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  }

  /* ── Newsletter form ── */
  function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('button');
      if (input && input.value) {
        btn.textContent = 'Subscribed!';
        btn.disabled = true;
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initCodeTabs();
    initCopyBtn();
    initStacPills();
    initNewsletter();
  });
})();
