// Roadmap interactions are limited to the three ISO consulting lanes.
document.addEventListener('DOMContentLoaded', function () {
  var section = document.querySelector('.iso-roadmaps');
  if (!section) return;

  var lanes = Array.prototype.slice.call(section.querySelectorAll('.iso-lane'));
  var navLinks = Array.prototype.slice.call(section.querySelectorAll('.iso-nav-link'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    lanes.forEach(function (lane) { lane.classList.add('iso-visible'); });
  } else {
    section.classList.add('iso-motion-ready');

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var lane = entry.target;
        lane.classList.add('iso-visible');
        window.setTimeout(function () {
          lane.querySelectorAll('animateMotion').forEach(function (motion) {
            if (typeof motion.beginElement === 'function') motion.beginElement();
          });
        }, 2100);
        observer.unobserve(lane);
      });
    }, { threshold: 0.2 });
    lanes.forEach(function (lane) { revealObserver.observe(lane); });

    var activeObserver = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      setActive(visible[0].target.id);
    }, { rootMargin: '-28% 0px -48% 0px', threshold: [0, 0.15, 0.35, 0.6] });
    lanes.forEach(function (lane) { activeObserver.observe(lane); });

    if (window.matchMedia('(pointer: fine)').matches) {
      lanes.forEach(function (lane) {
        lane.addEventListener('pointermove', function (event) {
          if (event.pointerType !== 'mouse') return;
          var bounds = lane.getBoundingClientRect();
          var x = (event.clientX - bounds.left) / bounds.width - 0.5;
          var y = (event.clientY - bounds.top) / bounds.height - 0.5;
          lane.style.setProperty('--iso-tilt-x', (-y * 4).toFixed(2) + 'deg');
          lane.style.setProperty('--iso-tilt-y', (x * 4).toFixed(2) + 'deg');
        });
        lane.addEventListener('pointerleave', function () {
          lane.style.setProperty('--iso-tilt-x', '0deg');
          lane.style.setProperty('--iso-tilt-y', '0deg');
        });
      });
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var targetId = link.getAttribute('href').slice(1);
      setActive(targetId);
    });
  });
});
