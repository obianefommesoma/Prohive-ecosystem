/* =========================================================================
   ✨ PROHIVE INTERACTION & ANIMATION ENGINE — CLEANED & ENHANCED
   Canvas background animation REMOVED. Scroll animations ADDED.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 🖼️ GALLERY ENGINE — Unique Masonry + Bento Hybrid Layout
    // Supports thousands of images via lazy loading and pagination
    // =========================================================================

    const galleryItems = [
        // Real images
        { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', title: 'Brand Identity Workshop', category: 'branding' },
        { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80', title: 'Creative Team Strategy', category: 'community' },
        { src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80', title: 'Industry Partnership Summit', category: 'impact' },
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', title: 'Corporate Systems Design', category: 'branding' },
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', title: 'SkillD\'Teen Initiative', category: 'community' },
        { src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80', title: 'Agro Solar Infrastructure', category: 'impact' },
        { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80', title: 'Digital Innovation Lab', category: 'branding' },
        { src: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80', title: 'Youth Empowerment Drive', category: 'community' },
        { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80', title: 'Impact Showcase Event', category: 'impact' },
        { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', title: 'Talent UpSkilling Program', category: 'community' },
        { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', title: 'Modern Office Culture', category: 'branding' },
        { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', title: 'Tech & Innovation Forum', category: 'impact' },
        { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', title: 'Leadership Bootcamp', category: 'community' },
        { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80', title: 'Creative Design Sprint', category: 'branding' },
        { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', title: 'Community Outreach Day', category: 'impact' },
        { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', title: 'Executive Partnership Meet', category: 'branding' },
        { src: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80', title: 'Agro Field Operations', category: 'impact' },
        { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', title: 'Student Workshop Series', category: 'community' },
        { src: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80', title: 'Brand Strategy Mapping', category: 'branding' },
        { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Real Estate Ventures', category: 'impact' },
        { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80', title: 'Digital Skills Academy', category: 'community' },
        { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', title: 'Branding Photoshoot', category: 'branding' },
    ];

    const galleryContainer = document.getElementById('automated-gallery-canvas');
    const ITEMS_PER_PAGE = 12; // Load 12 at a time for performance
    let currentFilter = 'all';
    let loadedCount = 0;
    let filteredItems = [...galleryItems];

    // Assign layout roles for the unique bento structure
    // Pattern: wide (2 cols), tall (2 rows), hero (2x2), standard, standard...
    const bentoPattern = ['hero', 'standard', 'wide', 'standard', 'standard', 'tall', 'standard', 'wide', 'standard', 'standard', 'standard', 'standard'];

    function getRole(index) {
        return bentoPattern[index % bentoPattern.length];
    }

    function renderGalleryBatch(items, append = false) {
        if (!galleryContainer) return;
        if (!append) {
            galleryContainer.innerHTML = '';
            loadedCount = 0;
        }

        const batch = items.slice(loadedCount, loadedCount + ITEMS_PER_PAGE);
        if (batch.length === 0) return;

        batch.forEach((item, batchIndex) => {
            const absoluteIndex = loadedCount + batchIndex;
            const role = getRole(absoluteIndex);
            const card = document.createElement('div');
            card.className = `bento-cell bento-${role} reveal-node filter-${item.category}`;
            card.style.setProperty('--reveal-delay', `${(batchIndex % 6) * 0.08}s`);

            card.innerHTML = `
                <div class="bento-inner">
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                    <div class="bento-overlay">
                        <div class="bento-tag">${item.category.toUpperCase()}</div>
                        <h4>${item.title}</h4>
                    </div>
                </div>
            `;
            galleryContainer.appendChild(card);
        });

        loadedCount += batch.length;

        // Reveal after paint
        requestAnimationFrame(() => {
            const newNodes = galleryContainer.querySelectorAll('.reveal-node:not(.in-view)');
            setTimeout(() => {
                newNodes.forEach(n => n.classList.add('in-view'));
            }, 50);
        });

        // Show or hide the "Load More" button
        const loadMoreBtn = document.getElementById('gallery-load-more');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = loadedCount >= filteredItems.length ? 'none' : 'flex';
        }
    }

    // Filter Logic
    const lensButtons = document.querySelectorAll('.lens-btn');
    lensButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            lensButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            currentFilter = filterValue;
            filteredItems = filterValue === 'all'
                ? [...galleryItems]
                : galleryItems.filter(i => i.category === filterValue);
            loadedCount = 0;
            renderGalleryBatch(filteredItems, false);
        });
    });

    // Load More Button
    const loadMoreBtn = document.getElementById('gallery-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            renderGalleryBatch(filteredItems, true);
        });
    }

    // Initial render
    renderGalleryBatch(filteredItems, false);


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

});