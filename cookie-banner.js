'use strict';
(function() {
  var STORAGE_KEY = 'hermes-agency_cookies';
  var GA_ID = 'G-0YEV7C2NF1';

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function loadGoogleAnalytics() {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function hideBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) {
      b.classList.add('cookie-banner--hidden');
      setTimeout(function() { b.style.display = 'none'; }, 300);
    }
  }

  function showBanner() {
    setConsent('');
    var b = document.getElementById('cookie-banner');
    if (b) {
      b.style.display = 'flex';
      b.classList.remove('cookie-banner--hidden');
    }
  }

  function initBanner() {
    var existing = document.getElementById('cookie-banner');
    if (existing) return;

    var html = '<div id="cookie-banner" class="cookie-banner" role="dialog" aria-label="Cookie-Einstellungen" aria-live="polite">' +
      '<p class="cookie-banner__text">Wir nutzen Cookies – nur essenzielle, plus optional Google Analytics. Alles klar? ⚡</p>' +
      '<div class="cookie-banner__actions">' +
        '<button type="button" class="cookie-banner__btn cookie-banner__btn--decline" data-action="decline">Nur notwendige</button>' +
        '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-action="accept">Alle erlauben</button>' +
      '</div>' +
      '<a href="/datenschutz.html" class="cookie-banner__link">Mehr erfahren</a>' +
    '</div>';

    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var banner = wrap.firstElementChild;

    var style = document.createElement('style');
    style.textContent = '.cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:9999;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.6rem 1rem;padding:.85rem 1.25rem;background:rgba(15,16,22,.97);border-top:1px solid rgba(109,94,252,.25);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);font-family:\'Space Grotesk\',sans-serif;font-size:.8rem;line-height:1.4;color:#e8eaf0;transition:transform .3s ease,opacity .3s ease}.cookie-banner--hidden{transform:translateY(100%);opacity:0;pointer-events:none}.cookie-banner__text{margin:0;flex:1 1 200px}.cookie-banner__actions{display:flex;gap:.5rem;flex-shrink:0}.cookie-banner__btn{padding:.45rem .9rem;border-radius:9999px;font-family:inherit;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s ease;border:none}.cookie-banner__btn--decline{background:transparent;color:#8892a4;border:1px solid rgba(255,255,255,.15)}.cookie-banner__btn--decline:hover{color:#e8eaf0;border-color:rgba(255,255,255,.25)}.cookie-banner__btn--accept{background:#6d5efc;color:#fff;box-shadow:0 0 16px rgba(109,94,252,.3)}.cookie-banner__btn--accept:hover{background:#ff4d5a;transform:translateY(-1px)}.cookie-banner__link{font-size:.72rem;color:#4a5568;text-decoration:none;flex-basis:100%;text-align:center}.cookie-banner__link:hover{color:#8892a4}@media(min-width:480px){.cookie-banner__link{flex-basis:auto;order:3}}';
    document.head.appendChild(style);
    document.body.appendChild(banner);

    banner.querySelector('[data-action="accept"]').addEventListener('click', function() {
      setConsent('accept');
      loadGoogleAnalytics();
      hideBanner();
    });

    banner.querySelector('[data-action="decline"]').addEventListener('click', function() {
      setConsent('decline');
      hideBanner();
    });

    window.hermes-agencyShowCookieBanner = showBanner;
  }

  function init() {
    initBanner();
    var consent = getConsent();
    if (consent === 'accept') {
      loadGoogleAnalytics();
      hideBanner();
    } else if (consent === 'decline') {
      hideBanner();
    }
  }

  function bindCookieSettingsLink() {
    var link = document.getElementById('cookie-settings-link');
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        setConsent('');
        var b = document.getElementById('cookie-banner');
        if (b) {
          b.style.display = 'flex';
          b.classList.remove('cookie-banner--hidden');
          b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      init();
      bindCookieSettingsLink();
    });
  } else {
    init();
    bindCookieSettingsLink();
  }
})();
