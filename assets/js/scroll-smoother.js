(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LenisConstructor = window.Lenis;

  if (reduceMotion || typeof LenisConstructor !== 'function') {
    document.documentElement.style.scrollBehavior = reduceMotion ? 'auto' : 'smooth';
    return;
  }

  var lenis = new LenisConstructor({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    window.requestAnimationFrame(raf);
  }
  window.requestAnimationFrame(raf);

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    var target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: -72 });
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
  });
})();
