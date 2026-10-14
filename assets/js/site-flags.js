// Client-controlled visibility flags for statistics and ISO 9001:2026 content.
window.MS_SITE_FLAGS = { SHOW_STATS: true, SHOW_ISO_2026: false };
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-requires]').forEach(function (element) {
    var requirement = element.getAttribute('data-requires');
    var enabled = requirement === 'stats' ? window.MS_SITE_FLAGS.SHOW_STATS :
      requirement === 'iso-2026' ? window.MS_SITE_FLAGS.SHOW_ISO_2026 : false;
    if (enabled) element.hidden = false;
  });
});
