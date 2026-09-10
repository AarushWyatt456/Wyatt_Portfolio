/* =========================================
   WAI LIN AUNG PORTFOLIO — MAIN JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ============ MOBILE NAV TOGGLE ============
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.classList.toggle('is-open');
            nav.classList.toggle('is-open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('is-open');
                nav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    // ============ NAVBAR SCROLL SHADOW ============
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('is-scrolled', window.scrollY > 10);
        }
    }, { passive: true });


    // ============ ACTIVE NAV LINK (Scroll Spy) ============
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle(
                        'is-active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));


    // ============ REVEAL ON SCROLL ============
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ============ BACK TO TOP BUTTON ============
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('is-visible', window.scrollY > 500);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#' || targetId === '#home') return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});