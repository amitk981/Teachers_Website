/* =====================================================
   MAIN JAVASCRIPT - Archana Ma'am Teaching Website
   Enhanced UI/UX Version
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // =====================================================
    // MOBILE NAVIGATION TOGGLE
    // =====================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // =====================================================
    // FAQ ACCORDION
    // =====================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current FAQ
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // =====================================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // ENHANCED NAVBAR SCROLL EFFECT
    // =====================================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    let ticking = false;

    function updateNavbar() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 4px 30px rgba(114, 47, 55, 0.08)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // =====================================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================================
    const revealElements = document.querySelectorAll(
        '.section-header, .card, .about-content, .about-image, ' +
        '.stat-item, .step-card, .contact-method, .contact-form-wrapper, ' +
        '.problem-column, .solution-column'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element position
                setTimeout(() => {
                    entry.target.classList.add('reveal-active');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Add reveal-active styles dynamically
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                        transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);

    // =====================================================
    // STATS COUNTER ANIMATION
    // =====================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    function animateNumber(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const number = parseInt(text.replace(/\D/g, ''));

        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 40;
        const duration = 2000;
        const stepTime = duration / 40;

        element.style.opacity = '1';

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        }, stepTime);
    }

    // =====================================================
    // ENHANCED CARD INTERACTIONS
    // =====================================================
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // 3D tilt effect on mousemove
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // =====================================================
    // FORM HANDLING WITH VISUAL FEEDBACK
    // =====================================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            // Add loading animation
            submitButton.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 8px;">⏳ Sending...</span>';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.8';

            // Add success animation after form submit
            setTimeout(() => {
                submitButton.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 8px;">✅ Sent Successfully!</span>';
                submitButton.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            }, 1500);
        });

        // Enhanced input focus effects
        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea, .form-select');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('input-focused');
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
    }

    // =====================================================
    // PHONE NUMBER FORMATTING
    // =====================================================
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 12) {
                value = value.substring(0, 12);
            }

            if (value.length > 0) {
                if (value.startsWith('91') && value.length > 2) {
                    value = '+91 ' + value.substring(2, 7) + (value.length > 7 ? ' ' + value.substring(7) : '');
                } else if (value.length > 5) {
                    value = value.substring(0, 5) + ' ' + value.substring(5);
                }
            }

            e.target.value = value;
        });
    }

    // =====================================================
    // PARALLAX EFFECT FOR BLOBS
    // =====================================================
    const blobs = document.querySelectorAll('.blob');

    if (blobs.length > 0 && window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 0.1;
                blob.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // =====================================================
    // WHATSAPP BUTTON ANIMATION
    // =====================================================
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
        // Add entrance animation
        setTimeout(() => {
            whatsappBtn.style.animation = 'none';
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.transform = 'scale(1)';
        }, 2000);

        // Track clicks
        whatsappBtn.addEventListener('click', function () {
            console.log('WhatsApp button clicked at ' + new Date().toISOString());
        });
    }

    // =====================================================
    // TYPING ANIMATION FOR HERO (Optional)
    // =====================================================
    const heroTitle = document.querySelector('.hero-title span');
    if (heroTitle) {
        const text = heroTitle.textContent;
        // Text is already set, just add shimmer effect
        heroTitle.style.animation = 'gradientFlow 4s ease infinite';
    }

    // =====================================================
    // CURSOR GLOW EFFECT (Desktop only)
    // =====================================================
    if (window.innerWidth > 1024) {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        cursorGlow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(114, 47, 55, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease-out;
            opacity: 0;
        `;
        document.body.appendChild(cursorGlow);

        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX - 150 + 'px';
            cursorGlow.style.top = e.clientY - 150 + 'px';
            cursorGlow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // =====================================================
    // PRELOADER (if needed)
    // =====================================================
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
        console.log('🎓 Archana Ma\'am Teaching Website loaded with enhanced UI/UX!');
    });

    // =====================================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // =====================================================
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    // Add active link styles
    const activeNavStyle = document.createElement('style');
    activeNavStyle.textContent = `
        .nav-link.active {
            color: var(--primary) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(activeNavStyle);
});
