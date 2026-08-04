
        // ── BLACK PARTICLE FIELD ──
        (function() {
            const canvas = document.getElementById('stars-canvas');
            const ctx = canvas.getContext('2d');
            let width = 0;
            let height = 0;
            let dots = [];
            const DOT_COUNT = 1200;
            const FOCAL_LENGTH = 320;

            function resize() {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
            }

            function createDots() {
                dots = [];
                for (let i = 0; i < DOT_COUNT; i++) {
                    dots.push({
                        x: (Math.random() - 0.5) * width * 1.4,
                        y: (Math.random() - 0.5) * height * 1.4,
                        z: Math.random() * 1800 + 200,
                        size: Math.random() * 1.9 + 0.5,
                        speed: Math.random() * 0.8 + 0.35,
                    });
                }
            }

            function draw() {
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, width, height);

                const centerX = width / 2;
                const centerY = height / 2;

                dots.forEach(dot => {
                    dot.z -= dot.speed;

                    if (dot.z <= 60) {
                        dot.z = 1800 + Math.random() * 500;
                        dot.x = (Math.random() - 0.5) * width * 1.4;
                        dot.y = (Math.random() - 0.5) * height * 1.4;
                    }

                    const scale = FOCAL_LENGTH / (FOCAL_LENGTH + dot.z);
                    const x = centerX + dot.x * scale;
                    const y = centerY + dot.y * scale;
                    const radius = dot.size * scale;
                    const opacity = Math.min(1, 0.25 + scale * 0.75);

                    ctx.beginPath();
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                });

                requestAnimationFrame(draw);
            }

            window.addEventListener('resize', () => {
                resize();
                createDots();
            });

            resize();
            createDots();
            draw();
        })();

        // ── FLIPPING CARD CAROUSEL ──
        (function() {
            const wrapper = document.getElementById('flipCardWrapper');
            const indicators = document.querySelectorAll('#flipIndicators .dot');
            const backTitle = document.getElementById('backTitle');
            const backDesc = document.getElementById('backDesc');
            const backIcon = document.getElementById('backIcon');
            const backTags = document.getElementById('backTags');

            const slides = [{
                icon: '🌊',
                title: 'Deep Ocean Tech',
                desc: 'Cutting-edge marine technology solutions for exploration, surveillance, and sustainable ocean operations.',
                tags: ['Cybernautic', 'Marine Tech', 'Deep Ocean']
            }, {
                icon: '🦈',
                title: 'Predator Class',
                desc: 'High-performance autonomous underwater vehicles (AUVs) designed for extreme depth and precision missions.',
                tags: ['AUV', 'Autonomous', 'Deep Sea']
            }, {
                icon: '🔬',
                title: 'Marine Innovation',
                desc: 'Advanced sensor systems, AI-driven analytics, and next-gen communication for underwater ecosystems.',
                tags: ['Sensors', 'AI Analytics', 'Comms']
            }];

            let currentSlide = 0;
            let isFlipped = false;
            let flipTimer = null;
            let slideTimer = null;

            function updateSlide(index) {
                const s = slides[index % slides.length];
                backIcon.textContent = s.icon;
                backTitle.textContent = s.title;
                backDesc.textContent = s.desc;
                backTags.innerHTML = s.tags.map(t => `<span>${t}</span>`).join('');
                indicators.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }

            function flipCard() {
                isFlipped = !isFlipped;
                wrapper.classList.toggle('flipped', isFlipped);
                if (isFlipped) {
                    updateSlide(currentSlide);
                }
            }

            function startAutoPlay() {
                stopAutoPlay();
                flipTimer = setInterval(() => {
                    if (!isFlipped) {
                        updateSlide(currentSlide);
                        flipCard();
                    } else {
                        flipCard();
                        setTimeout(() => {
                            currentSlide = (currentSlide + 1) % slides.length;
                        }, 300);
                    }
                }, 3000);
            }

            function stopAutoPlay() {
                if (flipTimer) {
                    clearInterval(flipTimer);
                    flipTimer = null;
                }
                if (slideTimer) {
                    clearTimeout(slideTimer);
                    slideTimer = null;
                }
            }

            indicators.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    if (index === currentSlide && isFlipped) {
                        flipCard();
                        return;
                    }
                    if (isFlipped) {
                        wrapper.classList.remove('flipped');
                        isFlipped = false;
                        setTimeout(() => {
                            currentSlide = index;
                            updateSlide(index);
                            flipCard();
                        }, 400);
                    } else {
                        currentSlide = index;
                        updateSlide(index);
                        flipCard();
                    }
                    stopAutoPlay();
                    startAutoPlay();
                });
            });

            wrapper.addEventListener('click', (e) => {
                if (e.target.closest('.flip-card-indicators')) return;
                if (!isFlipped) {
                    updateSlide(currentSlide);
                }
                flipCard();
                stopAutoPlay();
                startAutoPlay();
            });

            updateSlide(0);
            startAutoPlay();

            const img = document.querySelector('.flip-card-front img');
            const fallback = document.getElementById('fallbackBrand');
            if (img) {
                img.addEventListener('error', function() {
                    this.style.display = 'none';
                    if (fallback) fallback.style.display = 'flex';
                });
                img.addEventListener('load', function() {
                    if (fallback) fallback.style.display = 'none';
                });
            }

            console.log('🔄 Flipping card carousel initialized');
        })();

        // ── SERVICES CAROUSEL ──
        (function() {
            const services = [{
                icon: 'fa-globe',
                title: 'Website Development',
                desc: 'Custom websites built with modern frameworks — responsive, fast, and SEO-friendly.',
                tags: ['React', 'Django', 'Tailwind'],
                price: '$499',
                time: '7-14 days'
            }, {
                icon: 'fa-layer-group',
                title: 'Web Application Development',
                desc: 'Complex, data-driven web apps with robust backends and intuitive interfaces.',
                tags: ['Django REST', 'React', 'PostgreSQL'],
                price: '$999',
                time: '14-28 days'
            }, {
                icon: 'fa-database',
                title: 'Backend Development',
                desc: 'Scalable, secure, and performant server-side logic with REST APIs and microservices.',
                tags: ['Django', 'Node.js', 'PostgreSQL'],
                price: '$799',
                time: '10-20 days'
            }, {
                icon: 'fa-paint-brush',
                title: 'Frontend Development',
                desc: 'Pixel-perfect, interactive UIs built with React and modern CSS frameworks.',
                tags: ['React', 'Tailwind', 'Framer'],
                price: '$399',
                time: '5-10 days'
            }, {
                icon: 'fa-robot',
                title: 'AI Integration',
                desc: 'Leverage AI/ML capabilities — chatbots, recommendation systems, and automation.',
                tags: ['OpenAI', 'Python', 'Django'],
                price: '$1,299',
                time: '14-30 days'
            }, {
                icon: 'fa-sync-alt',
                title: 'Website Redesign',
                desc: 'Modernize your existing website with fresh design, better UX, and improved performance.',
                tags: ['UI/UX', 'React', 'SEO'],
                price: '$599',
                time: '7-14 days'
            }];

            const track = document.getElementById('servicesTrack');
            const dotsContainer = document.getElementById('servicesDots');
            let currentIndex = 0;
            let totalCards = services.length;
            let autoSlideInterval;

            function renderCards() {
                track.innerHTML = '';
                services.forEach((service, index) => {
                    const card = document.createElement('div');
                    card.className = `service-card ${index === 0 ? 'active' : ''}`;
                    card.innerHTML = `
                        <div class="service-icon"><i class="fas ${service.icon}"></i></div>
                        <h4>${service.title}</h4>
                        <p>${service.desc}</p>
                        <div class="flex flex-wrap gap-1 mt-2">
                            ${service.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                        <div class="flex items-center justify-between text-sm mt-3">
                            <span class="font-semibold text-white">From ${service.price}</span>
                            <span class="text-gray-400">${service.time}</span>
                        </div>
                    `;
                    track.appendChild(card);
                });
            }

            function renderDots() {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalCards; i++) {
                    const dot = document.createElement('span');
                    dot.className = `dot ${i === 0 ? 'active' : ''}`;
                    dot.addEventListener('click', () => goToSlide(i));
                    dotsContainer.appendChild(dot);
                }
            }

            function goToSlide(index) {
                if (index < 0) index = totalCards - 1;
                if (index >= totalCards) index = 0;
                currentIndex = index;
                const cardWidth = track.children[0]?.offsetWidth || 300;
                const gap = 24;
                const offset = -(currentIndex * (cardWidth + gap));
                track.style.transform = `translateX(${offset}px)`;

                document.querySelectorAll('.service-card').forEach((card, i) => {
                    card.classList.toggle('active', i === index);
                });
                document.querySelectorAll('.services-dots .dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }

            function nextSlide() {
                goToSlide(currentIndex + 1);
            }

            function startAutoSlide() {
                if (autoSlideInterval) clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(nextSlide, 3000);
            }

            function stopAutoSlide() {
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                    autoSlideInterval = null;
                }
            }

            const container = document.getElementById('servicesCarousel');
            container.addEventListener('mouseenter', stopAutoSlide);
            container.addEventListener('mouseleave', startAutoSlide);

            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    goToSlide(currentIndex);
                }, 200);
            });

            renderCards();
            renderDots();
            setTimeout(() => goToSlide(0), 100);
            startAutoSlide();

            console.log('🔄 Services carousel initialized (continuous auto-slide)');
        })();

        // ── WHY US MARQUEE (SMALLER CARDS) ──
        (function() {
            const whyData = [{
                icon: '🖌️',
                title: 'Clean Code',
                desc: 'Well-structured, maintainable code following best practices.',
                tags: ['DRY', 'Tested', 'Documented']
            }, {
                icon: '📱',
                title: 'Responsive Design',
                desc: 'Perfect on every device — desktop, tablet, and mobile.',
                tags: ['Desktop', 'Tablet', 'Mobile']
            }, {
                icon: '⚡',
                title: 'Fast Delivery',
                desc: 'We respect deadlines and deliver on time, every time.',
                tags: ['On-Time', 'Agile', 'Tracking']
            }, {
                icon: '💰',
                title: 'Affordable Pricing',
                desc: 'Competitive rates without compromising on quality.',
                tags: ['Transparent', 'Flexible', 'No Hidden']
            }, {
                icon: '🛟',
                title: 'Post-launch Support',
                desc: "We're here to help even after your project goes live.",
                tags: ['24/7 Support', 'Bug Fixes', 'Enhancements']
            }, {
                icon: '🔄',
                title: 'Regular Updates',
                desc: 'Keep your site secure and up-to-date with our maintenance.',
                tags: ['Security', 'Performance', 'Content']
            }, {
                icon: '💬',
                title: 'Transparent Communication',
                desc: 'Clear, honest updates throughout the project lifecycle.',
                tags: ['Standups', 'Reports', 'Slack']
            }, {
                icon: '🚀',
                title: 'Modern Technologies',
                desc: 'We use the latest tools and frameworks for optimal results.',
                tags: ['React', 'Django', 'Tailwind', 'PostgreSQL']
            }];

            const track = document.getElementById('whyUsTrack');

            function renderCards() {
                const doubled = [...whyData, ...whyData, ...whyData];
                track.innerHTML = '';
                doubled.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'why-card-sm';
                    card.innerHTML = `
                        <div class="why-icon">${item.icon}</div>
                        <div class="why-title">${item.title}</div>
                        <div class="why-desc">${item.desc}</div>
                        <div class="marquee-track">
                            <div class="marquee-content">
                                ${item.tags.map(t => `<span><i class="fas fa-star text-primary"></i> ${t}</span>`).join('')}
                                ${item.tags.map(t => `<span><i class="fas fa-star text-primary"></i> ${t}</span>`).join('')}
                            </div>
                        </div>
                    `;
                    track.appendChild(card);
                });
            }

            renderCards();
            console.log('🔄 Why Us marquee initialized');
        })();

        // ── DEVELOPMENT PROCESS — ROPE-HUNG STAGE CARDS ──
        (function() {
            const PROCESS_STAGES = [
                { icon: 'fa-magnifying-glass', title: 'Discovery & Requirements', desc: 'Understanding your goals, users, and technical constraints before writing a line of code.' },
                { icon: 'fa-drafting-compass', title: 'Planning & Architecture', desc: 'Mapping the tech stack, data models, timeline, and project roadmap.' },
                { icon: 'fa-pen-ruler', title: 'UI/UX Design', desc: 'Wireframes and prototypes focused on clarity, accessibility, and usability.' },
                { icon: 'fa-code', title: 'Development', desc: 'Building the frontend and backend in parallel, tracked sprint by sprint.' },
                { icon: 'fa-vial', title: 'Testing & QA', desc: 'Manual and automated testing across devices, browsers, and edge cases.' },
                { icon: 'fa-rocket', title: 'Deployment', desc: 'Shipping to production with CI/CD pipelines and monitoring in place.' },
                { icon: 'fa-life-ring', title: 'Support & Maintenance', desc: 'Ongoing updates, bug fixes, and performance tuning after launch.' }
            ];

            const track = document.getElementById('processTrack');
            if (!track) return;

            PROCESS_STAGES.forEach((stage, i) => {
                const card = document.createElement('div');
                card.className = 'process-card reveal-scale';
                card.innerHTML = `
                    <div class="strings-row"><div class="string"></div><div class="string"></div></div>
                    <div class="process-box">
                        <div class="process-step-num">Stage 0${i + 1}</div>
                        <div class="process-icon"><i class="fas ${stage.icon}"></i></div>
                        <h4>${stage.title}</h4>
                        <p>${stage.desc}</p>
                    </div>
                `;
                track.appendChild(card);
            });

            console.log('🪢 Development process rope-cards initialized');
        })();

        // ── TECH UNIVERSE — ROCKET FLEET ──
        (function() {
            const TECH_DATA = {
                frontend: [
                    { id: 'html5', name: 'HTML5', category: 'Frontend', logo: '5', color: '#e34f26',
                        flameColor: '#f06529',
                        status: 'mastered', experience: 90, popularity: 5, difficulty: 'Beginner',
                        desc: 'Standard markup language.' },
                    { id: 'css3', name: 'CSS3', category: 'Frontend', logo: '3', color: '#2965f1',
                        flameColor: '#2965f1',
                        status: 'mastered', experience: 88, popularity: 5, difficulty: 'Beginner',
                        desc: 'Style sheet language.' },
                    { id: 'javascript', name: 'JavaScript', category: 'Frontend', logo: 'JS', color: '#f7df1e',
                        flameColor: '#f0db4f',
                        status: 'mastered', experience: 92, popularity: 5, difficulty: 'Intermediate',
                        desc: 'Dynamic programming language.' },
                    { id: 'typescript', name: 'TypeScript', category: 'Frontend', logo: 'TS', color: '#3178c6',
                        flameColor: '#3178c6',
                        status: 'learning', experience: 65, popularity: 5, difficulty: 'Intermediate',
                        desc: 'Typed JS superset.' },
                    { id: 'react', name: 'React', category: 'Frontend', logo: '⚛', color: '#61dafb',
                        flameColor: '#61dafb',
                        status: 'mastered', experience: 85, popularity: 5, difficulty: 'Intermediate',
                        desc: 'UI library.' },
                    { id: 'nextjs', name: 'Next.js', category: 'Frontend', logo: 'N', color: '#e2e8f0',
                        flameColor: '#94a3b8',
                        status: 'learning', experience: 55, popularity: 5, difficulty: 'Advanced',
                        desc: 'React framework.' },
                    { id: 'vuejs', name: 'Vue.js', category: 'Frontend', logo: 'V', color: '#42b883',
                        flameColor: '#42b883',
                        status: 'unlocked', experience: 30, popularity: 4, difficulty: 'Intermediate',
                        desc: 'Progressive framework.' },
                    { id: 'angular', name: 'Angular', category: 'Frontend', logo: 'A', color: '#dd0031',
                        flameColor: '#b52e31',
                        status: 'locked', experience: 10, popularity: 4, difficulty: 'Advanced',
                        desc: 'TypeScript framework.' },
                    { id: 'tailwind', name: 'Tailwind', category: 'Frontend', logo: '~', color: '#06b6d4',
                        flameColor: '#0ea5e9',
                        status: 'mastered', experience: 82, popularity: 5, difficulty: 'Beginner',
                        desc: 'Utility CSS framework.' },
                    { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend', logo: 'B', color: '#a78bfa',
                        flameColor: '#a78bfa',
                        status: 'mastered', experience: 78, popularity: 5, difficulty: 'Beginner',
                        desc: 'Responsive CSS framework.' },
                    { id: 'mui', name: 'MUI', category: 'Frontend', logo: 'M', color: '#38bdf8',
                        flameColor: '#38bdf8',
                        status: 'unlocked', experience: 40, popularity: 4, difficulty: 'Intermediate',
                        desc: 'Material-UI components.' },
                    { id: 'sass', name: 'SASS', category: 'Frontend', logo: 'S', color: '#f472b6',
                        flameColor: '#c6538c',
                        status: 'unlocked', experience: 45, popularity: 4, difficulty: 'Beginner',
                        desc: 'CSS preprocessor.' },
                    { id: 'jquery', name: 'jQuery', category: 'Frontend', logo: '$', color: '#38bdf8',
                        flameColor: '#0769ad',
                        status: 'mastered', experience: 70, popularity: 3, difficulty: 'Beginner',
                        desc: 'DOM manipulation.' },
                    { id: 'vite', name: 'Vite', category: 'Frontend', logo: '⚡', color: '#a78bfa',
                        flameColor: '#646cff',
                        status: 'learning', experience: 50, popularity: 4, difficulty: 'Intermediate',
                        desc: 'Frontend tooling.' },
                    { id: 'webpack', name: 'Webpack', category: 'Frontend', logo: 'W', color: '#60a5fa',
                        flameColor: '#1c78c0',
                        status: 'unlocked', experience: 35, popularity: 4, difficulty: 'Advanced',
                        desc: 'Module bundler.' }
                ],
                backend: [
                    { id: 'python', name: 'Python', category: 'Backend', logo: 'Py', color: '#3776ab',
                        flameColor: '#f9c000',
                        status: 'mastered', experience: 92, popularity: 5, difficulty: 'Beginner',
                        desc: 'High-level language.' },
                    { id: 'django', name: 'Django', category: 'Backend', logo: 'Dj', color: '#44b78b',
                        flameColor: '#44b78b',
                        status: 'mastered', experience: 88, popularity: 5, difficulty: 'Intermediate',
                        desc: 'Python web framework.' },
                    { id: 'drf', name: 'DRF', category: 'Backend', logo: 'DR', color: '#f87171',
                        flameColor: '#ff6b6b',
                        status: 'mastered', experience: 82, popularity: 4, difficulty: 'Intermediate',
                        desc: 'Django REST toolkit.' },
                    { id: 'fastapi', name: 'FastAPI', category: 'Backend', logo: 'Fa', color: '#009688',
                        flameColor: '#009688',
                        status: 'learning', experience: 55, popularity: 4, difficulty: 'Intermediate',
                        desc: 'Async Python API.' },
                    { id: 'flask', name: 'Flask', category: 'Backend', logo: 'Fl', color: '#e2e8f0',
                        flameColor: '#94a3b8',
                        status: 'unlocked', experience: 42, popularity: 4, difficulty: 'Beginner',
                        desc: 'Lightweight WSGI.' },
                    { id: 'nodejs', name: 'Node.js', category: 'Backend', logo: 'Nd', color: '#68a063',
                        flameColor: '#68a063',
                        status: 'learning', experience: 58, popularity: 5, difficulty: 'Intermediate',
                        desc: 'JS runtime.' },
                    { id: 'expressjs', name: 'Express', category: 'Backend', logo: 'Ex', color: '#cbd5e1',
                        flameColor: '#e2e8f0',
                        status: 'learning', experience: 52, popularity: 5, difficulty: 'Intermediate',
                        desc: 'Node.js framework.' },
                    { id: 'php', name: 'PHP', category: 'Backend', logo: 'Ph', color: '#8892bf',
                        flameColor: '#8892bf',
                        status: 'unlocked', experience: 30, popularity: 4, difficulty: 'Beginner',
                        desc: 'Scripting language.' },
                    { id: 'laravel', name: 'Laravel', category: 'Backend', logo: 'La', color: '#f9322c',
                        flameColor: '#f9322c',
                        status: 'locked', experience: 8, popularity: 4, difficulty: 'Intermediate',
                        desc: 'PHP framework.' },
                    { id: 'java', name: 'Java', category: 'Backend', logo: 'Jv', color: '#e76f00',
                        flameColor: '#e76f00',
                        status: 'unlocked', experience: 28, popularity: 5, difficulty: 'Intermediate',
                        desc: 'OOP language.' },
                    { id: 'springboot', name: 'Spring Boot', category: 'Backend', logo: 'Sp', color: '#6db33f',
                        flameColor: '#68bd45',
                        status: 'locked', experience: 5, popularity: 4, difficulty: 'Advanced',
                        desc: 'Java framework.' },
                    { id: 'graphql', name: 'GraphQL', category: 'Backend', logo: 'Gq', color: '#e10098',
                        flameColor: '#e10098',
                        status: 'learning', experience: 48, popularity: 4, difficulty: 'Advanced',
                        desc: 'Query language.' },
                    { id: 'mysql', name: 'MySQL', category: 'Database', logo: 'My', color: '#4479a1',
                        flameColor: '#00758f',
                        status: 'mastered', experience: 80, popularity: 5, difficulty: 'Beginner', desc: 'RDBMS.' },
                    { id: 'postgresql', name: 'PostgreSQL', category: 'Database', logo: 'Pg', color: '#6ba3d6',
                        flameColor: '#336791',
                        status: 'mastered', experience: 78, popularity: 5, difficulty: 'Intermediate',
                        desc: 'Advanced RDBMS.' },
                    { id: 'sqlite', name: 'SQLite', category: 'Database', logo: 'Sq', color: '#7dd3fc',
                        flameColor: '#0ea5e9',
                        status: 'mastered', experience: 72, popularity: 4, difficulty: 'Beginner',
                        desc: 'Embedded SQL.' },
                    { id: 'mongodb', name: 'MongoDB', category: 'Database', logo: 'Mo', color: '#47a248',
                        flameColor: '#4db33d',
                        status: 'learning', experience: 55, popularity: 5, difficulty: 'Intermediate',
                        desc: 'NoSQL document DB.' },
                    { id: 'redis', name: 'Redis', category: 'Database', logo: 'Rd', color: '#dc382d',
                        flameColor: '#d32f2f',
                        status: 'unlocked', experience: 38, popularity: 4, difficulty: 'Intermediate',
                        desc: 'In-memory data store.' },
                    { id: 'firebase', name: 'Firebase', category: 'Database', logo: 'Fb', color: '#ffca28',
                        flameColor: '#f57c00',
                        status: 'learning', experience: 48, popularity: 4, difficulty: 'Beginner',
                        desc: 'Google platform.' }
                ],
                cloud: [
                    { id: 'aws', name: 'AWS', category: 'Cloud', logo: 'Aw', color: '#ff9900',
                        flameColor: '#ff9900',
                        status: 'learning', experience: 52, popularity: 5, difficulty: 'Advanced',
                        desc: 'Cloud platform.' },
                    { id: 'ec2', name: 'EC2', category: 'Cloud', logo: 'E2', color: '#ff9900',
                        flameColor: '#ff9900',
                        status: 'learning', experience: 42, popularity: 4, difficulty: 'Advanced',
                        desc: 'Virtual servers.' },
                    { id: 's3', name: 'S3', category: 'Cloud', logo: 'S3', color: '#ff9900',
                        flameColor: '#ff9900',
                        status: 'unlocked', experience: 35, popularity: 4, difficulty: 'Intermediate',
                        desc: 'Object storage.' },
                    { id: 'lambda', name: 'Lambda', category: 'Cloud', logo: 'λ', color: '#ff9900',
                        flameColor: '#ff9900',
                        status: 'unlocked', experience: 30, popularity: 4, difficulty: 'Advanced',
                        desc: 'Serverless compute.' },
                    { id: 'rds', name: 'RDS', category: 'Cloud', logo: 'Rd', color: '#ff9900',
                        flameColor: '#ff9900',
                        status: 'learning', experience: 25, popularity: 3, difficulty: 'Advanced',
                        desc: 'Managed DB.' },
                    { id: 'cloudfront', name: 'CloudFront', category: 'Cloud', logo: 'Cf', color: '#ff9900',
                        flameColor: '#ff9900',
                        status: 'locked', experience: 8, popularity: 3, difficulty: 'Advanced',
                        desc: 'CDN service.' },
                    { id: 'route53', name: 'Route53', category: 'Cloud', logo: 'R53', color: '#ff9900',
                        flameColor: '#ff9900',
                        status: 'locked', experience: 5, popularity: 3, difficulty: 'Advanced',
                        desc: 'DNS service.' },
                    { id: 'docker', name: 'Docker', category: 'Cloud', logo: 'Do', color: '#2496ed',
                        flameColor: '#2496ed',
                        status: 'learning', experience: 55, popularity: 5, difficulty: 'Intermediate',
                        desc: 'Containerization.' },
                    { id: 'kubernetes', name: 'Kubernetes', category: 'Cloud', logo: 'K8', color: '#326ce5',
                        flameColor: '#326ce5',
                        status: 'locked', experience: 12, popularity: 4, difficulty: 'Advanced',
                        desc: 'Orchestration.' },
                    { id: 'render', name: 'Render', category: 'Cloud', logo: 'Rn', color: '#46e3b7',
                        flameColor: '#46e3b7',
                        status: 'unlocked', experience: 40, popularity: 3, difficulty: 'Intermediate',
                        desc: 'Cloud host.' },
                    { id: 'vercel', name: 'Vercel', category: 'Cloud', logo: 'V', color: '#e2e8f0',
                        flameColor: '#94a3b8',
                        status: 'mastered', experience: 72, popularity: 4, difficulty: 'Intermediate',
                        desc: 'Frontend cloud.' },
                    { id: 'netlify', name: 'Netlify', category: 'Cloud', logo: 'Nt', color: '#00c7b7',
                        flameColor: '#00c7b7',
                        status: 'unlocked', experience: 45, popularity: 4, difficulty: 'Beginner',
                        desc: 'Web automation.' },
                    { id: 'github', name: 'GitHub', category: 'Cloud', logo: 'Gh', color: '#cbd5e1',
                        flameColor: '#f5f5f5',
                        status: 'mastered', experience: 85, popularity: 5, difficulty: 'Beginner',
                        desc: 'Code hosting.' },
                    { id: 'git', name: 'Git', category: 'Cloud', logo: 'Gt', color: '#f05032',
                        flameColor: '#f05032',
                        status: 'mastered', experience: 80, popularity: 5, difficulty: 'Beginner',
                        desc: 'Version control.' },
                    { id: 'postman', name: 'Postman', category: 'Cloud', logo: 'Pm', color: '#ff6c37',
                        flameColor: '#ff6c37',
                        status: 'mastered', experience: 78, popularity: 4, difficulty: 'Beginner',
                        desc: 'API dev platform.' },
                    { id: 'figma', name: 'Figma', category: 'Cloud', logo: 'Fg', color: '#f24e1e',
                        flameColor: '#f24e1e',
                        status: 'unlocked', experience: 42, popularity: 4, difficulty: 'Intermediate',
                        desc: 'Design tool.' },
                    { id: 'linux', name: 'Linux', category: 'Cloud', logo: 'Lx', color: '#fcc624',
                        flameColor: '#fcc624',
                        status: 'learning', experience: 58, popularity: 5, difficulty: 'Intermediate',
                        desc: 'OS kernel.' }
                ]
            };

            let fleet = [];
            let selectedTechId = null;
            const fleetGrid = document.getElementById('fleetGrid');
            const fleetCount = document.getElementById('fleetCount');
            const clearFleetBtn = document.getElementById('clearFleetBtn');
            const infoOverlay = document.getElementById('infoPanelOverlay');
            const infoClose = document.getElementById('infoPanelClose');

            function findTech(id) {
                for (const items of Object.values(TECH_DATA)) {
                    const f = items.find(t => t.id === id);
                    if (f) return f;
                }
                return null;
            }

            function getStatusLabel(s) { return { unlocked: 'Unlocked', learning: 'Learning', mastered: 'Mastered',
                    locked: 'Locked' } [s] || 'Unknown'; }

            function getStatusEmoji(s) { return { unlocked: '🔓', learning: '📖', mastered: '🏆', locked: '🔒' } [s] ||
                    '❓'; }

            function getStars(v) { return '★'.repeat(v) + '☆'.repeat(5 - v); }

            function getExpLevel(v) { if (v >= 80) return 'Expert'; if (v >= 60) return 'Advanced'; if (v >= 40)
                    return 'Intermediate'; if (v >= 20) return 'Beginner'; return 'Novice'; }

            function createTechCard(tech) {
                const card = document.createElement('div');
                card.className = `tech-card status-${tech.status}`;
                card.dataset.id = tech.id;
                card.style.setProperty('--accent', tech.color);
                card.style.setProperty('--flame', tech.flameColor || tech.color);
                const label = tech.name.length > 6 ? tech.name.slice(0, 5) + '…' : tech.name;

                card.innerHTML = `
              <button class="card-check" aria-label="Toggle fleet"><i class="fas fa-check"></i></button>
              <div class="card-logo-badge" style="color:${tech.color};">${tech.logo}</div>
              <div class="rocket-visual">
                <div class="rocket-stack">
                  <div class="rocket-nose"></div>
                  <div class="rocket-body">
                    <div class="rocket-label">${label}</div>
                    <div class="rocket-stripe"></div>
                  </div>
                  <div class="rocket-fins"><div class="fin left"></div><div class="fin right"></div></div>
                  <div class="rocket-engine"></div>
                  <div class="rocket-flame">
                    <div class="flame-glow"></div>
                    <div class="flame-outer"></div>
                    <div class="flame-core"></div>
                    <div class="flame-sparks"></div>
                  </div>
                </div>
              </div>
              <div class="card-name">${tech.name}</div>
              <div class="card-category">${tech.category}</div>
              ${tech.status==='locked' ? '<div class="lock-overlay"><i class="fas fa-lock"></i></div>' : ''}
            `;

                card.addEventListener('click', (e) => {
                    if (e.target.closest('.card-check')) return;
                    openInfoPanel(tech.id);
                });

                card.querySelector('.card-check').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (tech.status === 'locked') return;
                    toggleFleet(tech.id);
                });

                card.addEventListener('dblclick', (e) => {
                    e.stopPropagation();
                    launchCard(card, tech);
                });

                card.addEventListener('mouseenter', () => {
                    if (tech.status !== 'locked') {
                        const rect = card.querySelector('.rocket-engine').getBoundingClientRect();
                        spawnParticles(rect.left + rect.width / 2, rect.bottom, tech.flameColor || tech
                            .color, 8);
                    }
                    const track = card.closest('.marquee-track-rl') || card.closest('.marquee-track-lr');
                    if (track) track.style.animationPlayState = 'paused';
                });

                card.addEventListener('mouseleave', () => {
                    const track = card.closest('.marquee-track-rl') || card.closest('.marquee-track-lr');
                    if (track) track.style.animationPlayState = 'running';
                });

                return card;
            }

            function toggleFleet(id) {
                const tech = findTech(id);
                if (!tech || tech.status === 'locked') return;
                const inFleet = fleet.some(f => f.id === id);
                if (inFleet) {
                    fleet = fleet.filter(f => f.id !== id);
                } else {
                    fleet.push({ ...tech });
                }
                document.querySelectorAll(`.tech-card[data-id="${id}"]`).forEach(card => {
                    if (inFleet) card.classList.remove('in-fleet');
                    else card.classList.add('in-fleet');
                });
                renderFleet();
                if (selectedTechId === id) refreshPanelFleetBtn(tech);
            }

            function launchCard(card, tech) {
                if (card.classList.contains('launching')) return;
                card.classList.add('launching');
                const rect = card.getBoundingClientRect();
                spawnParticles(rect.left + rect.width / 2, rect.bottom - 10, tech.flameColor || tech.color, 30);
                let frame = 0;
                const trail = setInterval(() => {
                    const r = card.getBoundingClientRect();
                    if (r.bottom < 0 || frame > 22) { clearInterval(trail); return; }
                    spawnParticles(r.left + r.width / 2, r.bottom - 6, tech.flameColor || tech.color, 5);
                    frame++;
                }, 40);
                setTimeout(() => { card.classList.remove('launching');
                    clearInterval(trail); }, 1050);
            }

            function spawnParticles(x, y, color, count = 8) {
                const container = document.getElementById('particlesContainer');
                for (let i = 0; i < count; i++) {
                    const p = document.createElement('div');
                    p.className = 'particle';
                    const size = 2 + Math.random() * 5;
                    const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.9;
                    const speed = 30 + Math.random() * 80;
                    const dx1 = Math.cos(angle) * speed;
                    const dy1 = Math.sin(angle) * speed + 20;
                    p.style.left = `${x + (Math.random() - 0.5) * 16}px`;
                    p.style.top = `${y}px`;
                    p.style.width = `${size}px`;
                    p.style.height = `${size}px`;
                    p.style.background = color;
                    p.style.boxShadow = `0 0 12px ${color}aa`;
                    p.style.setProperty('--dx1', `${dx1}px`);
                    p.style.setProperty('--dy1', `${dy1}px`);
                    p.style.animation = `particle-rise ${0.5 + Math.random() * 0.5}s ease-out forwards`;
                    container.appendChild(p);
                    setTimeout(() => p.remove(), 1200);
                }
            }

            function buildTrack(categoryKey, containerId) {
                const container = document.getElementById(containerId);
                if (!container) return;
                const techs = TECH_DATA[categoryKey] || [];
                const doubled = [...techs, ...techs];
                doubled.forEach(tech => container.appendChild(createTechCard(tech)));
            }
            buildTrack('frontend', 'frontend-track');
            buildTrack('backend', 'backend-track');
            buildTrack('cloud', 'cloud-track');

            function refreshPanelFleetBtn(tech) {
                const btn = document.getElementById('panelFleetBtn');
                const inFleet = fleet.some(f => f.id === tech.id);
                if (inFleet) { btn.innerHTML = '<i class="fas fa-minus"></i> Remove';
                    btn.className = 'btn-fleet in-fleet'; } else { btn.innerHTML =
                        '<i class="fas fa-plus"></i> Add to Fleet';
                    btn.className = 'btn-fleet'; }
                btn.onclick = () => {
                    toggleFleet(tech.id);
                    refreshPanelFleetBtn(tech);
                };
            }

            function openInfoPanel(id) {
                const tech = findTech(id);
                if (!tech) return;
                selectedTechId = id;
                document.getElementById('panelLogo').textContent = tech.logo;
                document.getElementById('panelLogo').style.color = tech.color;
                document.getElementById('panelTitle').textContent = tech.name;
                document.getElementById('panelCategory').textContent = tech.category;
                document.getElementById('panelDesc').textContent = tech.desc;
                document.getElementById('panelPopularity').textContent = getStars(tech.popularity);
                document.getElementById('panelDifficulty').textContent = tech.difficulty;
                document.getElementById('panelStatus').textContent = `${getStatusEmoji(tech.status)} ${getStatusLabel(tech.status)}`;
                document.getElementById('panelCatLabel').textContent = tech.category;
                document.getElementById('panelExpLabel').textContent = getExpLevel(tech.experience);
                document.getElementById('panelExpBar').style.width = tech.experience + '%';
                document.getElementById('panelDocs').onclick = e => { e.preventDefault();
                    alert(`📚 Docs for ${tech.name}`); };
                document.getElementById('panelSite').onclick = e => { e.preventDefault();
                    alert(`🌐 Site for ${tech.name}`); };
                refreshPanelFleetBtn(tech);
                infoOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeInfoPanel() { infoOverlay.classList.remove('active');
                document.body.style.overflow = '';
                selectedTechId = null; }
            infoClose.addEventListener('click', closeInfoPanel);
            infoOverlay.addEventListener('click', e => { if (e.target === infoOverlay) closeInfoPanel(); });
            document.addEventListener('keydown', e => { if (e.key === 'Escape') closeInfoPanel(); });

            function renderFleet() {
                fleetGrid.innerHTML = '';
                fleetCount.textContent = `(${fleet.length})`;
                if (fleet.length === 0) {
                    fleetGrid.innerHTML =
                        '<div class="empty-fleet">No rockets in your fleet yet. Click the checkmark on a rocket to add it.</div>';
                    return;
                }
                fleet.forEach(tech => {
                    const item = document.createElement('div');
                    item.className = 'fleet-item';
                    item.innerHTML =
                        `<div class="fleet-logo" style="color:${tech.color};">${tech.logo}</div><span class="fleet-name">${tech.name}</span><button class="fleet-remove" data-id="${tech.id}"><i class="fas fa-times"></i></button>`;
                    item.querySelector('.fleet-remove').addEventListener('click', (e) => {
                        e.stopPropagation();
                        toggleFleet(tech.id);
                    });
                    item.addEventListener('click', () => openInfoPanel(tech.id));
                    fleetGrid.appendChild(item);
                });
            }

            clearFleetBtn.addEventListener('click', () => {
                if (fleet.length === 0) return;
                if (confirm('Remove all rockets from your fleet?')) {
                    const ids = fleet.map(f => f.id);
                    fleet = [];
                    ids.forEach(id => {
                        document.querySelectorAll(`.tech-card[data-id="${id}"]`).forEach(c => c.classList
                            .remove('in-fleet'));
                    });
                    renderFleet();
                    if (selectedTechId) refreshPanelFleetBtn(findTech(selectedTechId));
                }
            });

            (function() {
                const container = document.querySelector('.tech-universe');
                if (!container) return;
                for (let i = 0; i < 20; i++) {
                    const el = document.createElement('div');
                    const s = 1 + Math.random() * 2;
                    el.style.cssText =
                        `position:absolute;width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;background:rgba(255,255,255,${0.05+Math.random()*0.08});border-radius:50%;pointer-events:none;animation:ambient-float ${18+Math.random()*22}s ease-in-out ${Math.random()*18}s infinite alternate;opacity:${0.1+Math.random()*0.15};z-index:1;`;
                    container.appendChild(el);
                }
            })();

        })();

        // ── PROJECTS SLIDE BOARD ──
        (function() {
            const PROJECTS = [
                { title: 'E-Commerce Platform', desc: 'Full-featured online store with payment gateway and inventory management.', longDesc: 'A comprehensive e-commerce solution built for scale, featuring a secure checkout flow, integrated payment gateway, real-time inventory tracking, and an admin panel for managing products, orders, and customers. Built with performance and SEO in mind so the store loads fast and ranks well.', tags: ['Django', 'React', 'PostgreSQL'], img: 'https://placehold.co/600x400/1e293b/ffffff?text=Project+1' },
                { title: 'AI Chatbot Dashboard', desc: 'Admin dashboard for managing AI-powered customer support chatbots.', longDesc: 'An admin dashboard that lets support teams configure, monitor, and fine-tune AI-powered chatbots. Includes conversation analytics, intent management, live handoff to human agents, and OpenAI-based response generation with guardrails for brand-safe replies.', tags: ['React', 'Django REST', 'OpenAI'], img: 'https://placehold.co/600x400/0f172a/ffffff?text=Project+2' },
                { title: 'Task Management App', desc: 'Collaborative task management with real-time updates and team workspaces.', longDesc: 'A Trello-style collaborative workspace with drag-and-drop boards, real-time updates via WebSockets, team permissions, and activity history — built to help distributed teams stay aligned without constant status meetings.', tags: ['Django', 'React', 'WebSockets'], img: 'https://placehold.co/600x400/1e293b/ffffff?text=Project+3' },
                { title: 'Booking & Scheduling App', desc: 'Real-time appointment booking system with calendar sync and reminders.', longDesc: 'A real-time booking system with two-way calendar sync, automated SMS/email reminders, buffer-time rules, and a customer-facing widget that can be embedded on any website to reduce no-shows and manual scheduling back-and-forth.', tags: ['Node.js', 'React', 'MongoDB'], img: 'https://placehold.co/600x400/0f172a/ffffff?text=Project+4' },
                { title: 'Analytics Dashboard', desc: 'Interactive data visualization dashboard for business intelligence.', longDesc: 'A business intelligence dashboard that pulls data from multiple sources into one interactive view — with drill-down charts, custom date ranges, and exportable reports built with D3.js on top of a Django REST backend.', tags: ['Django', 'D3.js', 'PostgreSQL'], img: 'https://placehold.co/600x400/1e293b/ffffff?text=Project+5' },
                { title: 'Learning Management System', desc: 'Course platform with video lessons, quizzes, and progress tracking.', longDesc: 'A full LMS platform supporting video lessons stored on AWS S3, auto-graded quizzes, per-student progress tracking, and certificates on completion — designed to be white-labeled for different course creators.', tags: ['React', 'Django REST', 'AWS S3'], img: 'https://placehold.co/600x400/0f172a/ffffff?text=Project+6' }
            ];

            function renderFace(face, project) {
                face.innerHTML = `
                    <img src="${project.img}" alt="${project.title}" />
                    <div class="flip-body">
                        <h4>${project.title}</h4>
                        <p>${project.desc}</p>
                        <div class="flip-tags">${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                        <div class="flip-links">
                            <a href="#" onclick="event.stopPropagation()"><i class="fab fa-github mr-1"></i> Code</a>
                            <a href="#" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt mr-1"></i> Demo</a>
                        </div>
                    </div>
                `;
            }

            const board = document.getElementById('projectsFlipBoard');
            if (!board) return;
            const slots = Array.from(board.querySelectorAll('.flip-slot'));
            const DURATION = 900;
            const EASE = 'cubic-bezier(.45,.05,.55,.95)';

            const state = slots.map((slot, i) => {
                const current = slot.querySelector('.slide-current');
                const incoming = slot.querySelector('.slide-incoming');
                const dir = slot.dataset.dir === 'b' ? 'b' : 'a';
                const startIndex = i % PROJECTS.length;

                current.style.transform = 'translateY(0%)';
                incoming.style.transform = dir === 'a' ? 'translateY(-100%)' : 'translateY(100%)';
                renderFace(current, PROJECTS[startIndex]);

                return { current, incoming, dir, index: startIndex };
            });

            function advance(s) {
                const nextIndex = (s.index + 3) % PROJECTS.length;
                renderFace(s.incoming, PROJECTS[nextIndex]);

                s.current.style.transition = `transform ${DURATION}ms ${EASE}`;
                s.incoming.style.transition = `transform ${DURATION}ms ${EASE}`;
                s.current.style.transform = s.dir === 'a' ? 'translateY(100%)' : 'translateY(-100%)';
                s.incoming.style.transform = 'translateY(0%)';

                setTimeout(() => {
                    const oldCurrent = s.current;
                    const oldIncoming = s.incoming;

                    oldCurrent.style.transition = 'none';
                    oldCurrent.style.transform = s.dir === 'a' ? 'translateY(-100%)' : 'translateY(100%)';
                    void oldCurrent.offsetHeight;

                    s.current = oldIncoming;
                    s.incoming = oldCurrent;
                    s.index = nextIndex;
                }, DURATION + 30);
            }

            setInterval(() => {
                state.forEach((s, i) => setTimeout(() => advance(s), i * 220));
            }, 3600);

            slots.forEach((slot, i) => {
                const viewport = slot.querySelector('.slide-viewport');
                viewport.addEventListener('click', () => {
                    const project = PROJECTS[state[i].index];
                    openProjectDetail(project);
                });
            });

            function openProjectDetail(project) {
                const content = document.getElementById('projectDetailContent');
                content.innerHTML = `
                    <span class="close-modal" onclick="closeModal('projectDetailModal')">&times;</span>
                    <img src="${project.img}" alt="${project.title}" />
                    <h3>${project.title}</h3>
                    <p>${project.longDesc || project.desc}</p>
                    <div class="flip-tags">${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                    <div class="flip-links">
                        <a href="#"><i class="fab fa-github mr-1"></i> View Code</a>
                        <a href="#"><i class="fas fa-external-link-alt mr-1"></i> Live Demo</a>
                    </div>
                `;
                openModal('projectDetailModal');
            }
        })();


        // ── SCROLL REVEAL ──
        (function() {
            const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

            reveals.forEach(el => observer.observe(el));
        })();

        // ── MOBILE MENU ──
        function toggleMobileMenu() {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        }

        function closeMobileMenu() {
            document.getElementById('mobileMenu').classList.add('hidden');
        }

        // ── FAQ TOGGLE ──
        function toggleFAQ(el) {
            const answer = el.nextElementSibling;
            const icon = el.querySelector('.fa-chevron-down');
            if (answer.classList.contains('hidden')) {
                document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
                document.querySelectorAll('.faq-question .fa-chevron-down').forEach(i => i.style.transform =
                    'rotate(0deg)');
                answer.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            }
        }

        // ── CONTACT FORM ──
        function handleContact(e) {
            e.preventDefault();
            const status = document.getElementById('formStatus');
            status.innerHTML = '✅ Message sent! We\'ll get back to you soon.';
            status.style.color = '#34d399';
            setTimeout(() => { status.innerHTML = ''; }, 5000);
            e.target.reset();
        }

        // ── MODALS ──
        function openModal(id) {
            document.getElementById(id).classList.remove('hidden');
        }

        function closeModal(id) {
            document.getElementById(id).classList.add('hidden');
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('#mobileMenu a').forEach(a => {
                a.addEventListener('click', closeMobileMenu);
            });
        });

        console.log('🚀 Space Agency website ready — with rocket showcase!');
    