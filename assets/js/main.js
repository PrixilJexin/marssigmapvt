// Mars Sigma Solutions — shared site scripts
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = toggle && document.getElementById(toggle.getAttribute('aria-controls'));

  if (toggle && menu) {
    function setMenuOpen(open) {
      menu.classList.toggle('nav-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setMenuOpen(!menu.classList.contains('nav-menu-open'));
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('nav-menu-open')) {
        setMenuOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!toggle.contains(event.target) && !menu.contains(event.target)) {
        setMenuOpen(false);
      }
    });
  }

  // Dropdown menu handling for desktop hover
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function (dropdown) {
    var link = dropdown.querySelector('.nav-link');
    var menu = dropdown.querySelector('.dropdown-menu');
    if (!link || !menu) return;

    // Desktop hover
    dropdown.addEventListener('mouseenter', function () {
      menu.style.display = 'block';
      dropdown.classList.add('dropdown-open');
    });

    dropdown.addEventListener('mouseleave', function () {
      menu.style.display = 'none';
      dropdown.classList.remove('dropdown-open');
    });

    // Mobile tap toggle
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        var currentDisplay = menu.style.display;
        menu.style.display = currentDisplay === 'block' ? 'none' : 'block';
      }
    });
  });

  // Section-scoped reveal and one-time process-step highlighting for the homepage services.
  var services = document.getElementById('core-services');
  if (services) {
    services.classList.add('wwd-motion-ready');
    var serviceCards = services.querySelectorAll('[data-wwd-card]');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      serviceCards.forEach(function (card) { card.classList.add('wwd-visible'); });
    } else {
      var serviceObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var card = entry.target;
          card.classList.add('wwd-visible');
          card.style.transitionDelay = (Array.prototype.indexOf.call(serviceCards, card) % 3) * 90 + 'ms';
          var steps = card.querySelectorAll('.wwd-cycle-list li, .wwd-flow li');
          steps.forEach(function (step, index) {
            window.setTimeout(function () { step.classList.add('wwd-step-active'); }, 220 + index * 180);
          });
          if (card.classList.contains('wwd-featured')) {
            window.setTimeout(function () { card.classList.add('wwd-cycle-running'); }, 1250);
          }
          observer.unobserve(card);
        });
      }, { threshold: 0.15 });
      serviceCards.forEach(function (card) { serviceObserver.observe(card); });
    }
  }

  // Turnaround phase reveal and implementation-cycle motion, scoped to its page section.
  var turnaround = document.getElementById('turnaround');
  if (turnaround) {
    var phases = turnaround.querySelectorAll('.turn-phase');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      phases.forEach(function (phase) { phase.classList.add('turn-phase-visible'); });
    } else {
      turnaround.classList.add('turn-motion-ready');
      var turnaroundObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          turnaround.classList.add('turn-in-view');
          phases.forEach(function (phase, index) {
            window.setTimeout(function () {
              phase.classList.add('turn-phase-visible');
              phase.querySelectorAll('.turn-cycle-list li').forEach(function (step, stepIndex) {
                window.setTimeout(function () { step.classList.add('turn-step-active'); }, stepIndex * 320);
              });
            }, index * 220);
          });
          window.setTimeout(function () { turnaround.classList.add('turn-loop-running'); }, 1500);
          observer.unobserve(turnaround);
        });
      }, { threshold: 0.12 });
      turnaroundObserver.observe(turnaround);
    }
  }

  // One-time credibility count-up. Static HTML keeps the final values visible without JS.
  var credibility = document.getElementById('credibility');
  if (credibility) {
    var credCards = Array.prototype.slice.call(credibility.querySelectorAll('.cred-card'));
    var credReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!credReduceMotion && 'IntersectionObserver' in window) {
      credibility.classList.add('cred-ready');
      var credibilityObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          credCards.forEach(function (card, index) {
            var delay = index * 150;
            var count = card.querySelector('.cred-count');
            var target = Number(card.getAttribute('data-value'));
            var useGrouping = card.getAttribute('data-format') === 'comma';
            card.style.setProperty('--cred-delay', delay + 'ms');
            window.setTimeout(function () {
              var started = null;
              var duration = 2000;
              function animateCount(timestamp) {
                if (started === null) started = timestamp;
                var progress = Math.min((timestamp - started) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 4);
                var current = progress === 1 ? target : Math.floor(target * eased);
                count.textContent = useGrouping ? current.toLocaleString('en-US') : String(current);
                card.style.setProperty('--cred-progress', String(progress));
                if (progress < 1) {
                  window.requestAnimationFrame(animateCount);
                } else {
                  card.classList.add('cred-complete');
                }
              }
              count.textContent = '0';
              card.style.setProperty('--cred-progress', '0');
              window.requestAnimationFrame(animateCount);
            }, delay);
          });
          credibility.classList.add('cred-visible');
          observer.unobserve(credibility);
        });
      }, { threshold: 0.35 });
      credibilityObserver.observe(credibility);
    }
  }

});
