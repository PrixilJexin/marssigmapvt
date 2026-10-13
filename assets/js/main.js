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

});
