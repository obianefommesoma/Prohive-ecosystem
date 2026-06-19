document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Resize canvas dynamically
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Line configuration using ProHive palette
    const lineCount = 25; 
    const lines = [];
    const colors = ['#3D5E08', '#649120', '#99CC33']; 

    for (let i = 0; i < lineCount; i++) {
        lines.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 150 + 50,
            speed: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)],
            width: Math.random() * 1.5 + 0.5
        });
    }

    // Animation Loop
    function animate() {
        // Clear canvas with a slight trail effect
        ctx.fillStyle = 'rgba(17, 28, 1, 0.08)'; // #111C01 with alpha
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        lines.forEach(line => {
            ctx.beginPath();
            ctx.strokeStyle = line.color;
            ctx.globalAlpha = line.opacity;
            ctx.lineWidth = line.width;
            
            // Draw vertical line segment
            ctx.moveTo(line.x, line.y);
            ctx.lineTo(line.x, line.y + line.length);
            ctx.stroke();

            // Move downward
            line.y += line.speed;

            // Reset when line goes off screen
            if (line.y > canvas.height) {
                line.y = -line.length;
                line.x = Math.random() * canvas.width;
                line.speed = Math.random() * 1.5 + 0.5;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
});












// // our gallery

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 🛠️ MANAGE YOUR IMAGES HERE (SIMPLY ADD, REMOVE, OR UPDATE OBJECTS)
    // Ratios: "square" (600x600), "portrait" (500x750), "landscape" (900x500)
    // =========================================================================
    const galleryData = [
        { src: 'branding-01.jpg', title: 'Identity Architecture', category: 'branding', ratio: 'square', size: '600 × 600 px' },
        { src: 'community-01.jpg', title: 'Ecosystem Development', category: 'community', ratio: 'portrait', size: '500 × 750 px' },
        { src: 'impact-01.jpg', title: 'Scale Operations', category: 'impact', ratio: 'landscape', size: '900 × 500 px' },
        { src: 'branding-02.jpg', title: 'Collateral Matrix', category: 'branding', ratio: 'square', size: '600 × 600 px' },
        { src: 'community-02.jpg', title: 'Sustained Outreach', category: 'community', ratio: 'portrait', size: '500 × 750 px' },
        
        // Add your next image instantly like this whenever you want:
        // { src: 'your-new-image.jpg', title: 'Project Name', category: 'impact', ratio: 'landscape', size: '900 × 500 px' }
    ];

    const canvas = document.getElementById('automated-gallery-canvas');
    if (!canvas) return;

    // --- BUILD LAYOUT ELEMENT NODES AUTOMATICALLY ---
    const totalItems = galleryData.length;
    
    galleryData.forEach((item, index) => {
        const layer = document.createElement('div');
        layer.className = 'dynamic-layer';
        layer.setAttribute('data-category', item.category);

        // Algorithmic balance calculations to spread items across the 3D grid area smoothly
        const fraction = index / (totalItems - 1 || 1);
        const leftPercent = 5 + (fraction * 65); // Spreads left coords from 5% to 70%
        const topPercent = 10 + ((index % 3) * 25); // staggers cards top spacing clean
        
        // Math algorithms computing spatial 3D variations
        const zDepth = -150 + (index * 50); // Generates stepped depth layers from back to front
        const rotationY = -15 + (index * 7.5); // Elegant alternating visual fan angles
        const speedFactor = -4 + (index * 2); // Dynamic parallax scale movement factors

        layer.setAttribute('data-speed', speedFactor);
        
        // Custom dimensions setting based on the requested aspect asset ratio configuration
        let width = '300px';
        let height = '300px';
        if (item.ratio === 'portrait') { width = '260px'; height = '390px'; }
        if (item.ratio === 'landscape') { width = '420px'; height = '260px'; }

        // Set static inline spatial rules
        layer.style.width = width;
        layer.style.height = height;
        layer.style.left = `${leftPercent}%`;
        layer.style.top = `${topPercent}%`;
        layer.style.zIndex = index + 1;
        
        // Save base transformation state directly to memory storage on the element node 
        const baseTransform = `translateZ(${zDepth}px) rotateY(${rotationY}deg)`;
        layer.setAttribute('data-base-transform', baseTransform);
        layer.style.transform = baseTransform;

        // Structuring the inner HTML framework cleanly
        layer.innerHTML = `
            <div class="media-frame-dynamic">
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="frame-curator-dynamic">
                    <h4>${item.title}</h4>
                    <span>${item.size}</span>
                </div>
            </div>
        `;

        canvas.appendChild(layer);
    });

    // Capture newly injected layers
    const layers = document.querySelectorAll('.dynamic-layer');

    // --- INTERACTIVE MOUSE PARALLAX TRACKING ---
    if (window.innerWidth > 1100) {
        window.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = (e.clientX - centerX) / centerX;
            const deltaY = (e.clientY - centerY) / centerY;

            layers.forEach(layer => {
                if (layer.classList.contains('filtered-out')) return;

                const speed = parseFloat(layer.getAttribute('data-speed')) || 2;
                const baseTransform = layer.getAttribute('data-base-transform');

                const moveX = deltaX * speed * 10;
                const moveY = deltaY * speed * 10;
                const tiltX = deltaY * -4;
                const tiltY = deltaX * 4;

                layer.style.transform = `${baseTransform} translate(${moveX}px, ${moveY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
        });
    }

    // --- REFINED FILTER BUTTON TRIGGER SYSTEM ---
    const filterButtons = document.querySelectorAll('.lens-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedTarget = btn.getAttribute('data-filter');

            layers.forEach(layer => {
                const category = layer.getAttribute('data-category');
                
                if (selectedTarget === 'all' || category === selectedTarget) {
                    layer.classList.remove('filtered-out');
                    layer.style.transform = layer.getAttribute('data-base-transform'); 
                } else {
                    layer.classList.add('filtered-out');
                }
            });
        });
    });
});






document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CORE ANIMATION OBSERVER ---
    const animationOptions = {
        root: null,          // Binds tracking directly to the browser viewport window
        rootMargin: '0px',   // Triggers exactly at the pixel edge of the screen
        threshold: 0.12      // Requires 12% of the element to be visible before animating
    };

    const scrollTriggerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element enters viewport -> Activate the animation class
                entry.target.classList.add('reveal-now');
            } else {
                // Element leaves viewport -> Strip class so it can animate on next scroll
                entry.target.classList.remove('reveal-now');
            }
        });
    };

    const motionEngine = new IntersectionObserver(scrollTriggerCallback, animationOptions);

    // Elements targeted for premium scroll motion sequences
    const targets = [
        '.hero-content h1', '.hero-content p', '.cta-button',
        '.metric-pod-unique', '.strategy-card-unique',
        '.channel-card', '.matrix-node', '.hub-header-block'
    ];

    // Register all valid DOM elements into the observer tracking array
    targets.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('scroll-reveal-engine'); // Applies base hidden state styles
            motionEngine.observe(el);
        });
    });


    // --- 2. ODOMETER COUNTING EFFECT ---
    const counters = document.querySelectorAll('.counter-unique');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const rawText = el.textContent.trim();
                const targetVal = parseInt(rawText.replace(/[^\d]/g, ''), 10);
                const suffix = rawText.replace(/[0-9]/g, ''); // Extracts symbols like '+'
                
                let startVal = 0;
                const duration = 1800; // Total counting time in milliseconds
                const startTime = performance.now();

                const runCount = (timestamp) => {
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Deceleration curve (Cubic Ease-Out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentVal = Math.floor(easeOut * targetVal);
                    
                    el.textContent = `${currentVal}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(runCount);
                    } else {
                        el.textContent = rawText; // Fallback ensuring exact number string match
                    }
                };
                
                requestAnimationFrame(runCount);
                observer.unobserve(el); // Prevents counter from resetting mid-read
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});


/* =========================================================================
   ✨ PROHIVE INTERACTION & ANIMATION ENGINE
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // -----------------------------------------------------------------
    // 1. ABOUT SECTION: Liquid Shimmer Mouse Tracking & Reveal Control
    // -----------------------------------------------------------------
    const liquidCards = document.querySelectorAll('.liquid-card');
    
    liquidCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse coordinates relative to the card border position
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // Access the inner shimmer layer and update its focal tracking variables
            const shimmer = card.querySelector('.water-shimmer');
            if (shimmer) {
                shimmer.style.setProperty('--mouse-x', `${x}px`);
                shimmer.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    });

    // Intersection Observer to trigger scroll fade-in transformations
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Runs animation once
            }
        });
    }, revealOptions);

    // Track the About section wrappers
    const animTargets = document.querySelectorAll('.about-section, .pillar-card, .evolution-box');
    animTargets.forEach(target => sectionObserver.observe(target));


    // -----------------------------------------------------------------
    // 2. GALLERY SECTION: Automated Parallax Cascade Generation
    // -----------------------------------------------------------------
    const galleryContainer = document.getElementById('automated-gallery-canvas');
    
    // Check if gallery structure layer exists before firing engine configurations
    if (galleryContainer) {
        // Placeholder data simulating your project lifecycle visual assets
        const galleryItems = [
            { category: 'branding', title: 'Brand Architecture', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
            { category: 'community', title: 'SkillD’Teen Initiative', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80' },
            { category: 'impact', title: 'Agro Solar Infra Build', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80' },
            { category: 'branding', title: 'Corporate Systems Layout', img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80' },
            { category: 'impact', title: 'Industry Partnership Summit', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80' },
            { category: 'community', title: 'Talent UpSkilling Project', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80' }
        ];

        // Inject elements cleanly into the newly targeted DOM Node
        function renderGallery(items) {
            galleryContainer.innerHTML = '';
            items.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = `cascade-item reveal-node filter-${item.category}`;
                card.style.setProperty('--cascade-delay', `${index * 0.1}s`);
                
                card.innerHTML = `
                    <div class="inner-photo-wrapper">
                        <img src="${item.img}" alt="${item.title}" loading="lazy">
                        <div class="photo-overlay">
                            <h4>${item.title}</h4>
                            <span>${item.category.toUpperCase()}</span>
                        </div>
                    </div>
                `;
                galleryContainer.appendChild(card);
            });
            
            // Small pause timeout window to let elements bind safely before injecting class animations
            setTimeout(() => {
                const nodes = galleryContainer.querySelectorAll('.cascade-item');
                nodes.forEach(node => node.classList.add('in-view'));
            }, 50);
        }

        // Initialize display canvas array profile 
        renderGallery(galleryItems);

        // Category Interactive Lens Filter Engine Linkage
        const lensButtons = document.querySelectorAll('.lens-btn');
        lensButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Handle active class UI switching
                lensButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                if (filterValue === 'all') {
                    renderGallery(galleryItems);
                } else {
                    const filteredData = galleryItems.filter(item => item.category === filterValue);
                    renderGallery(filteredData);
                }
            });
        });
    }
});