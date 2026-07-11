/* =========================================================================
   ✨ PROHIVE INTERACTION & ANIMATION ENGINE — CLEANED & AUDITED v1.6
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 🌊 LIQUID SHIMMER MOUSE TRACKING (About Section Cards)
    // =========================================================================
    const liquidCards = document.querySelectorAll('.liquid-card');
    liquidCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const shimmer = card.querySelector('.water-shimmer');
            if (shimmer) {
                shimmer.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                shimmer.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }
        });
    });


    // =========================================================================
    // 🚀 MASTER SCROLL REVEAL SYSTEM
    // =========================================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            } else {
                entry.target.classList.remove('reveal-active');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const scrollTargets = document.querySelectorAll(
        '.about-section, .pillar-card, .evolution-box, .eco-pod, .metric-pod-unique, .strategy-card-unique, .channel-card, .matrix-node, .hub-header-block, .impact-header-unique, .ecosystem-header, .gallery-meta-block, .section-header, .trusted-title, .marquee-wrapper, .svc-left-pane, .svc-row'
    );
    scrollTargets.forEach(el => revealObserver.observe(el));


    // =========================================================================
    // 🔢 ODOMETER COUNTER ANIMATION
    // =========================================================================
    const counters = document.querySelectorAll('.counter-unique');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
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
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));


    // =========================================================================
    // 🧭 NAVBAR — Glass blur on scroll + HIDE on scroll-down / SHOW on scroll-up
    // =========================================================================
    const navbar = document.querySelector('.navbar-header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentY = window.scrollY;

                // Apply / remove scrolled glass style
                if (currentY > 60) {
                    navbar?.classList.add('navbar-scrolled');
                } else {
                    navbar?.classList.remove('navbar-scrolled');
                    navbar?.classList.remove('navbar-hidden'); // always show at top
                }

                // Hide on scroll-down, show on scroll-up (only past 150px)
                if (currentY > 150) {
                    if (currentY > lastScrollY) {
                        navbar?.classList.add('navbar-hidden');
                    } else {
                        navbar?.classList.remove('navbar-hidden');
                    }
                }

                lastScrollY = currentY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });


    // =========================================================================
    // 🖼️ HERO SLIDESHOW LOGIC — horizontal slide transition
    // =========================================================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentHeroSlide = 0;
    const heroSlideDuration = 4500;

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
            switchHeroSlide((currentHeroSlide + 1) % heroSlides.length);
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
            heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
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


    // =========================================================================
    // 🎠 INFINITE MARQUEE GALLERY — clone track for seamless loop
    // =========================================================================
    const galleryTrack = document.getElementById('galleryTrack');

    // The main gallery track no longer needs cloning because it is manually scrolled

    // --- BrandiTPro Marquee ---
    const branditTrack = document.getElementById('branditTrack');
    if (branditTrack) {
        const branditCards = Array.from(branditTrack.children);
        branditCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            branditTrack.appendChild(clone);
        });
    }

    // --- BrandiTPro Typing Text Effect ---
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const words = ['Businesses', 'Organizations', 'Entrepreneurs', 'Startups'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                dynamicText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                dynamicText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            dynamicText.classList.add('typing');
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect
        setTimeout(type, 1000);
    }

    // =========================================================================
    // ✉️ MAILTO PROTOCOL FALLBACK & CLIPBOARD ENGINE
    // =========================================================================
    // Create Toast Container
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> Email copied to clipboard!';
    document.body.appendChild(toast);

    let toastTimeout = null;

    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.getAttribute('href').replace('mailto:', '').split('?')[0];
            
            // Attempt to write to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show custom toast notification
                    toast.classList.add('toast-active');
                    clearTimeout(toastTimeout);
                    toastTimeout = setTimeout(() => {
                        toast.classList.remove('toast-active');
                    }, 3000);
                }).catch(err => {
                    console.error('Failed to copy email:', err);
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    toast.classList.add('toast-active');
                    clearTimeout(toastTimeout);
                    toastTimeout = setTimeout(() => {
                        toast.classList.remove('toast-active');
                    }, 3000);
                } catch (err) {
                    console.error('Fallback failed:', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });

}); // END DOMContentLoaded

// Global function for manual gallery scrolling
function scrollGallery(direction) {
    const marquee = document.getElementById('galleryMarquee');
    if (marquee) {
        const scrollAmount = 350; // approximate width of one card + gap
        marquee.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
}

// BrandiTPro contact modal toggle
(function() {
    const btn = document.getElementById('branditContactBtn');
    const modal = document.getElementById('branditContactModal');
    const closeBtn = document.getElementById('closeContactModal');

    if (btn && modal && closeBtn) {
        // Open modal
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('modal-active');
        });

        // Close modal on X click
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('modal-active');
        });

        // Close modal on background overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('modal-active');
            }
        });
    }
})();

