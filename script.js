/* =========================================================================
   ✨ PROHIVE INTERACTION & ANIMATION ENGINE — CLEANED & ENHANCED
   Canvas background animation REMOVED. Scroll animations ADDED.
   ========================================================================= */


  document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("gallerySliderTrack");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    const slides = document.querySelectorAll(".gallery-slide");
    
    let currentIndex = 0;
    let autoPlayTimer = null;
    const slideDelay = 4000; // Time in milliseconds (4 seconds) per slide

    function getSlidesPerView() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function updateSliderPosition() {
        const slidesPerView = getSlidesPerView();
        const maxIndex = slides.length - slidesPerView;
        
        // Safeguard ranges
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        // Calculate translation movement amount
        const cardWidth = slides[0].getBoundingClientRect().width;
        const gap = 20; // Matches CSS track gap rule value
        const translateValue = currentIndex * (cardWidth + gap);
        
        track.style.transform = `translateX(-${translateValue}px)`;
        
        // Handle control button opacity states based on manual limits
        prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
        nextBtn.style.opacity = currentIndex === maxIndex ? "0.3" : "1";
    }

    // Auto-play Engine logic
    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing timers first
        autoPlayTimer = setInterval(() => {
            const slidesPerView = getSlidesPerView();
            const maxIndex = slides.length - slidesPerView;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Seamless reset loop back to the first image
            }
            updateSliderPosition();
        }, slideDelay);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
        }
    }

    // Direction Navigation Events (Resets timer on interaction)
    nextBtn.addEventListener("click", () => {
        const maxIndex = slides.length - getSlidesPerView();
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSliderPosition();
        startAutoPlay(); // Restart the timer cycle
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - getSlidesPerView(); // Jump to end if clicking back at start
        }
        updateSliderPosition();
        startAutoPlay(); // Restart the timer cycle
    });

    // Pause autoplay on desktop when hovering over the images
    track.addEventListener("mouseenter", stopAutoPlay);
    track.addEventListener("mouseleave", startAutoPlay);

    // Re-adjust slider dimensions safely on window resize
    window.addEventListener("resize", updateSliderPosition);

    // Initial setup invocation
    updateSliderPosition();
    startAutoPlay();
});

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
    // 🎞️ HERO PARALLAX — Subtle depth shift on scroll
    // =========================================================================
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg-image');
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
