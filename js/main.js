/* ─────────────────────────────────────────────
   EOPF Sentinel Zarr Samples — main.js
   ───────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── SPA Navigation ── */
  function initNav() {
    const navLinks    = document.querySelectorAll('.nav-links a[data-page]');
    const pageLinks   = document.querySelectorAll('a[data-page]');
    const pages       = document.querySelectorAll('.page');
    const toggle      = document.querySelector('.nav-toggle');
    const navList     = document.querySelector('.nav-links');
    const heroButtons = document.querySelectorAll('[data-goto]');

    function showPage(id, learnTab) {
      pages.forEach(p => p.classList.remove('active'));
      navLinks.forEach(a => a.classList.remove('active'));

      const target = document.getElementById('page-' + id);
      if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const activeLink = document.querySelector(`.nav-links a[data-page="${id}"]`);
      if (activeLink) activeLink.classList.add('active');

      // If navigating to learn with a specific tab requested
      if (id === 'learn' && learnTab) {
        switchLearnPanel(learnTab);
      }

      history.pushState(null, '', '#' + id);
      if (navList) navList.classList.remove('open');
    }

    // Nav link clicks
    pageLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const learnTab = link.dataset.learn || null;
        showPage(link.dataset.page, learnTab);
      });
    });

    // Hero / section button clicks (data-goto)
    heroButtons.forEach(btn => {
      btn.addEventListener('click', () => showPage(btn.dataset.goto));
    });

    // Inline learn-panel links inside step descriptions
    document.addEventListener('click', e => {
      const btn = e.target.closest('.link-btn[data-learn]');
      if (btn) {
        showPage('learn', btn.dataset.learn);
      }
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

  /* ── Learn sub-navigation ── */
  function initLearnTabs() {
    const tabs = document.querySelectorAll('.learn-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => switchLearnPanel(tab.dataset.learn));
    });
  }

  function switchLearnPanel(id) {
    const tabs   = document.querySelectorAll('.learn-tab');
    const panels = document.querySelectorAll('.learn-panel');

    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.learn === id);
      t.setAttribute('aria-selected', t.dataset.learn === id ? 'true' : 'false');
    });
    panels.forEach(p => {
      p.classList.toggle('active', p.id === 'learn-' + id);
    });
  }

  // Expose globally so inline onclick handlers in the widget mockup still work
  window.switchLearnPanel = switchLearnPanel;

  /* ── FAQ accordion ── */
  function initFaq() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.faq-question');
      if (!btn) return;

      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-answer').hidden = true;
      });

      // Open clicked one if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
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

  /* ── STAC filter pills (cosmetic) ── */
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
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const btn   = form.querySelector('button[type="submit"]');
        if (input && input.value && btn) {
          btn.textContent = 'Subscribed!';
          btn.disabled = true;
          input.value = '';
          setTimeout(() => {
            btn.textContent = 'Subscribe';
            btn.disabled = false;
          }, 3000);
        }
      });
    });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initLearnTabs();
    initFaq();
    initCodeTabs();
    initCopyBtn();
    initStacPills();
    initNewsletter();
  });
})();

