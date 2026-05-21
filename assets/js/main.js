(function() {
  "use strict";

  const header = document.querySelector('#header');
  const navOverlay = document.querySelector('.nav-overlay');
  const headerToggleBtns = document.querySelectorAll('.header-toggle');
  const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
  const navMenuLinks = document.querySelectorAll('#navmenu a');

  function setMenuOpen(isOpen) {
    header.classList.toggle('header-show', isOpen);
    navOverlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    headerToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i') || btn;
      icon.classList.toggle('bi-list', !isOpen);
      icon.classList.toggle('bi-x', isOpen);
    });
  }

  function headerToggle() {
    setMenuOpen(!header.classList.contains('header-show'));
  }

  headerToggleBtns.forEach(btn => {
    btn.addEventListener('click', headerToggle);
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', () => setMenuOpen(false));
  }

  navMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (header.classList.contains('header-show')) {
        setMenuOpen(false);
      }
    });
  });

  mobileNavItems.forEach(link => {
    link.addEventListener('click', () => {
      if (header.classList.contains('header-show')) {
        setMenuOpen(false);
      }
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    const typed_strings = selectTyped.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  window.addEventListener('load', function() {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop, 10),
          behavior: 'smooth'
        });
      }, 100);
    }
  });

  function setActiveNav(hash) {
    document.querySelectorAll('.navmenu a.active, .mobile-bottom-nav .mobile-nav-item.active')
      .forEach(link => link.classList.remove('active'));

    document.querySelectorAll(`.navmenu a[href="${hash}"], .mobile-bottom-nav .mobile-nav-item[href="${hash}"]`)
      .forEach(link => link.classList.add('active'));
  }

  function navmenuScrollspy() {
    const scrollPosition = window.scrollY + 120;
    let currentHash = '#hero';

    document.querySelectorAll('section[id]').forEach(section => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        currentHash = `#${section.id}`;
      }
    });

    setActiveNav(currentHash);
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
