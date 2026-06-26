/* =========================================================================
   ✨ PROHIVE INTERACTION & ANIMATION ENGINE — CLEANED & ENHANCED
   Canvas background animation REMOVED. Scroll animations ADDED.
   ========================================================================= */



    // =========================================================================
    // 🌊 LIQUID SHIMMER MOUSE TRACKING (About Section Cards)
    // =========================================================================
    const liquidCards = document.querySelectorAll('.liquid-card');
    liquidCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const shimmer = card.querySelector('.water-shimmer');
            if (shimmer) {
                shimmer.style.setProperty('--mouse-x', `${x}px`);
                shimmer.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    });


    // =========================================================================
    // 🚀 MASTER SCROLL REVEAL SYSTEM — Page comes alive on scroll
    // =========================================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            } else {
                // Allow re-animation when scrolling back up
                entry.target.classList.remove('reveal-active');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Track all scrollable sections and block elements
    const scrollTargets = document.querySelectorAll(
        '.about-section, .pillar-card, .evolution-box, .eco-pod, .metric-pod-unique, .strategy-card-unique, .channel-card, .matrix-node, .hub-header-block, .impact-header-unique, .ecosystem-header, .gallery-meta-block, .section-header, .evolution-box, .trusted-title, .marquee-wrapper'
    );
    scrollTargets.forEach(el => revealObserver.observe(el));


    // =========================================================================
    // 🔢 ODOMETER COUNTER ANIMATION
    // =========================================================================
    const counters = document.querySelectorAll('.counter-unique');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const rawText = el.textContent.trim();
                const targetVal = parseInt(rawText.replace(/[^\d]/g, ''), 10);
                const suffix = rawText.replace(/[0-9]/g, '');
                let startTime = null;
                const duration = 1800;

                const runCount = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    el.textContent = `${Math.floor(easeOut * targetVal)}${suffix}`;
                    if (progress < 1) requestAnimationFrame(runCount);
                    else el.textContent = rawText;
                };

                requestAnimationFrame(runCount);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));


    // =========================================================================
    // 🧭 NAVBAR SCROLL STATE — Adds glass blur on scroll
    // =========================================================================
    const navbar = document.querySelector('.navbar-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar?.classList.add('navbar-scrolled');
        } else {
            navbar?.classList.remove('navbar-scrolled');
        }
    }, { passive: true });


    // =========================================================================
    // 🖼️ HERO SLIDESHOW LOGIC
    // =========================================================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentHeroSlide = 0;
    const heroSlideDuration = 6000; // 6 seconds per slide

    if (heroSlides.length > 0) {
        function switchHeroSlide(index) {
            heroSlides[currentHeroSlide].classList.remove('active');
            heroSlides[currentHeroSlide].classList.add('prev');
            if (heroDots[currentHeroSlide]) heroDots[currentHeroSlide].classList.remove('active');

            const prevSlideIndex = currentHeroSlide;
            currentHeroSlide = index;

            heroSlides[currentHeroSlide].classList.add('active');
            heroSlides[currentHeroSlide].classList.remove('prev');
            if (heroDots[currentHeroSlide]) heroDots[currentHeroSlide].classList.add('active');
            
            setTimeout(() => {
                heroSlides[prevSlideIndex].classList.remove('prev');
            }, 1500); 
        }

        function nextHeroSlide() {
            let nextIndex = currentHeroSlide + 1;
            if (nextIndex >= heroSlides.length) nextIndex = 0;
            switchHeroSlide(nextIndex);
        }

        let heroSlideTimer = setInterval(nextHeroSlide, heroSlideDuration);

        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (currentHeroSlide === index) return;
                clearInterval(heroSlideTimer);
                switchHeroSlide(index);
                heroSlideTimer = setInterval(nextHeroSlide, heroSlideDuration);
            });
        });
    }

    // =========================================================================
    // 🎞️ HERO PARALLAX — Subtle depth shift on scroll
    // =========================================================================
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-slideshow');
    if (heroSection && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
        }, { passive: true });
    }


    // =========================================================================
    // 💡 METRIC POD MOUSE GLOW TRACKING
    // =========================================================================
    const metricPods = document.querySelectorAll('.metric-pod-unique');
    metricPods.forEach(pod => {
        pod.addEventListener('mousemove', (e) => {
            const rect = pod.getBoundingClientRect();
            const glow = pod.querySelector('.pod-glow-unique');
            if (glow) {
                glow.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                glow.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }
        });
    });
