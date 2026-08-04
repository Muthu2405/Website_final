
        /* ============================================================
               DATA — includes Sun as a selectable planet with Food & Beverage
            ============================================================ */
        const PLANETS = [{
            id: 'sun',
            name: 'Sun',
            emoji: '☀️',
            cat: 'Food & Beverage',
            color: '#ff9d42',
            glow: '#ff9d42',
            size: 48,
            radius: 0,
            period: 0,
            sub: ['Restaurants', 'Cafés', 'Bakeries', 'Catering'],
            fx: 'food',
            types: [
                'Restaurants', 'Cafés', 'Bakeries', 'Fast Food', 'Fine Dining',
                'Food Trucks', 'Cloud Kitchens', 'Catering Services', 'Juice Bars',
                'Ice Cream Shops', 'Sweet Shops', 'Tea & Coffee Shops',
                'Pizza Stores', 'BBQ & Grill', 'Organic Food Stores'
            ],
            desc: 'Just as the Sun provides energy to every planet, your food business brings people together through unforgettable flavors and experiences.',
            texture: 'sun',
            isSun: true
        }, {
            id: 'mercury',
            name: 'Mercury',
            emoji: '☿',
            cat: 'Logistics',
            color: '#b7bcc6',
            glow: '#b9c2cc',
            size: 28,
            radius: 150,
            period: 22,
            sub: ['Shipping', 'Supply Chain'],
            fx: 'logistics',
            types: ['Courier Service', 'Trucking & Freight', 'Last-mile Delivery', 'Warehousing', 'Cargo Agency'],
            desc: 'The logistics universe powers global trade — from last-mile delivery to freight and warehousing.',
            texture: 'rocky'
        }, {
            id: 'venus',
            name: 'Venus',
            emoji: '♀',
            cat: 'Beauty',
            color: '#eeb5cf',
            glow: '#e8a9c9',
            size: 32,
            radius: 188,
            period: 26,
            sub: ['Salon', 'Skincare', 'Cosmetics'],
            fx: 'beauty',
            types: ['Salon', 'Spa', 'Bridal Studio', 'Makeup Artist', 'Boutique'],
            desc: 'The beauty universe celebrates self-care — salons, spas, bridal studios, and cosmetic brands.',
            texture: 'swirl'
        }, {
            id: 'earth',
            name: 'Earth',
            emoji: '🌏',
            cat: 'Hospitality',
            color: '#3fae7a',
            glow: '#3fae7a',
            size: 34,
            radius: 263,
            period: 34,
            sub: ['Hotels', 'Resorts', 'Homestays'],
            fx: 'hospitality',
            types: ['Hotel', 'Resort', 'Homestay', 'Villa', 'Guest House'],
            desc: 'The hospitality universe welcomes travelers — hotels, resorts, villas, and homestays.',
            texture: 'earth'
        }, {
            id: 'mars',
            name: 'Mars',
            emoji: '♂',
            cat: 'Fitness',
            color: '#e2603f',
            glow: '#e2543a',
            size: 30,
            radius: 300,
            period: 38,
            sub: ['Gym', 'Sports'],
            fx: 'fitness',
            types: ['Gym', 'Yoga Studio', 'Sports Club', 'Martial Arts', 'Wellness Center'],
            desc: 'The fitness universe is about strength and wellness — gyms, yoga, sports clubs, and wellness centers.',
            texture: 'rocky'
        }, {
            id: 'jupiter',
            name: 'Jupiter',
            emoji: '♃',
            cat: 'Finance',
            color: '#deb45f',
            glow: '#d4af37',
            size: 42,
            radius: 338,
            period: 42,
            sub: ['Banking', 'Fintech'],
            fx: 'finance',
            types: ['Financial Services', 'Consultancy', 'Investment Firm', 'Fintech Startup'],
            desc: 'The finance universe manages wealth — banking, fintech, investment, and consultancy.',
            texture: 'gas'
        }, {
            id: 'saturn',
            name: 'Saturn',
            emoji: '🪐',
            cat: 'Construction',
            color: '#d8bd85',
            glow: '#c9a66b',
            size: 38,
            radius: 375,
            period: 46,
            sub: ['Buildings', 'Infrastructure'],
            fx: 'construction',
            ring: true,
            types: ['Builder / Contractor', 'Real Estate Agency', 'Architecture Firm', 'Interior Design'],
            desc: 'The construction universe builds the future — contractors, real estate, architecture, and interiors.',
            texture: 'gas'
        }, {
            id: 'uranus',
            name: 'Uranus',
            emoji: '⛢',
            cat: 'Software',
            color: '#63dcd2',
            glow: '#4fd1c5',
            size: 32,
            radius: 413,
            period: 50,
            sub: ['IT Services', 'SaaS'],
            fx: 'software',
            types: ['Software Agency', 'IT Services', 'SaaS Product', 'Web Dev Studio'],
            desc: 'The software universe powers digital transformation — IT services, SaaS, and web development.',
            texture: 'ice'
        }, {
            id: 'neptune',
            name: 'Neptune',
            emoji: '♆',
            cat: 'Water',
            color: '#3f7cf0',
            glow: '#2f6fed',
            size: 32,
            radius: 450,
            period: 54,
            sub: ['Water Supply', 'Marine'],
            fx: 'water',
            types: ['Water Supply', 'Bottling Plant', 'Purification Service', 'Aquaculture'],
            desc: 'The water universe sustains life — supply, purification, bottling, and aquaculture.',
            texture: 'ice'
        }, {
            id: 'comet',
            name: 'Comet',
            emoji: '☄️',
            cat: 'Freelancers',
            color: '#bda0ee',
            glow: '#b98ce8',
            size: 26,
            radius: 525,
            period: 62,
            sub: ['Creators', 'Designers'],
            fx: 'freelancers',
            types: ['Freelance Designer', 'Content Creator', 'Photographer', 'Consultant'],
            desc: 'The freelancer universe is for independent creators — designers, photographers, and consultants.',
            texture: 'comet'
        }, {
            id: 'galaxy',
            name: 'Galaxy',
            emoji: '🌌',
            cat: 'Enterprise',
            color: '#9c8ef0',
            glow: '#8f7fe8',
            size: 36,
            radius: 563,
            period: 66,
            sub: ['Large Scale', 'Solutions'],
            fx: 'enterprise',
            types: ['Enterprise Group', 'Chain Business', 'Franchise', 'Holding Company'],
            desc: 'The enterprise universe handles large-scale operations — groups, chains, franchises, and holdings.',
            texture: 'galaxy'
        }, {
            id: 'moon',
            name: 'Moon',
            emoji: '🌕',
            cat: 'Satellite',
            color: '#c7cad6',
            glow: '#6fcf97',
            size: 20,
            radius: 80,
            period: 4,
            parent: 'earth',
            sub: ['Orbits Earth'],
            fx: 'healthcare',
            types: ['Lunar Base', 'Space Tourism'],
            desc: 'The Moon orbits Earth — a small but vital companion.',
            texture: 'moon'
        }, ];

        // Satellite flyer data (not a selectable planet, just a moving object)
        const SATELLITE = {
            emoji: '🛰️',
            name: 'Satellite',
            speed: 0.012,
            pathRadius: 320
        };

        const EFFECTS = {
            logistics: { type: 'square', color: 'rgba(200,200,210,0.35)' },
            beauty: { type: 'sparkle', color: 'rgba(255,190,225,0.4)' },
            food: { type: 'circle', color: 'rgba(255,160,70,0.4)' },
            hospitality: { type: 'leaf', color: 'rgba(120,200,150,0.35)' },
            fitness: { type: 'spark', color: 'rgba(255,110,70,0.45)' },
            finance: { type: 'coin', color: 'rgba(255,210,90,0.4)' },
            construction: { type: 'square', color: 'rgba(200,170,120,0.35)' },
            software: { type: 'square', color: 'rgba(90,230,210,0.35)' },
            water: { type: 'wave', color: 'rgba(90,170,255,0.4)' },
            freelancers: { type: 'sparkle', color: 'rgba(200,150,240,0.4)' },
            enterprise: { type: 'sparkle', color: 'rgba(200,200,255,0.35)' },
            healthcare: { type: 'circle', color: 'rgba(110,220,150,0.4)' },
        };

        /* ── data stores ── */
        let registeredUsers = [];
        let services = [];
        let projects = [];
        let teamMembers = [];
        let testimonials = [];
        let enquiries = [];
        let pricingPlans = [];
        let currentUser = null;
        let activePlanet = null;
        let aligned = false;
        let orbitsRunning = true;
        let dashFxId = null;
        let editingId = null;
        let editingType = null;
        const timers = [];
        let satAngle = 0;
        let satX = 0,
            satY = 0;
        let satActive = false;

        try { registeredUsers = JSON.parse(localStorage.getItem('bu_users') || '[]'); } catch (_) { registeredUsers = []; }
        try { services = JSON.parse(localStorage.getItem('bu_services') || '[]'); } catch (_) { services = []; }
        try { projects = JSON.parse(localStorage.getItem('bu_projects') || '[]'); } catch (_) { projects = []; }
        try { teamMembers = JSON.parse(localStorage.getItem('bu_team') || '[]'); } catch (_) { teamMembers = []; }
        try { testimonials = JSON.parse(localStorage.getItem('bu_testimonials') || '[]'); } catch (_) { testimonials = []; }
        try { enquiries = JSON.parse(localStorage.getItem('bu_enquiries') || '[]'); } catch (_) { enquiries = []; }
        try { pricingPlans = JSON.parse(localStorage.getItem('bu_pricing') || '[]'); } catch (_) { pricingPlans = []; }

        function saveStore() {
            try { localStorage.setItem('bu_users', JSON.stringify(registeredUsers)); } catch (_) {}
            try { localStorage.setItem('bu_services', JSON.stringify(services)); } catch (_) {}
            try { localStorage.setItem('bu_projects', JSON.stringify(projects)); } catch (_) {}
            try { localStorage.setItem('bu_team', JSON.stringify(teamMembers)); } catch (_) {}
            try { localStorage.setItem('bu_testimonials', JSON.stringify(testimonials)); } catch (_) {}
            try { localStorage.setItem('bu_enquiries', JSON.stringify(enquiries)); } catch (_) {}
            try { localStorage.setItem('bu_pricing', JSON.stringify(pricingPlans)); } catch (_) {}
        }

        function toast(msg, type = '') {
            const el = document.getElementById('toast');
            el.textContent = msg;
            el.className = 'toast show ' + type;
            clearTimeout(el._hide);
            el._hide = setTimeout(() => { el.className = 'toast'; }, 2800);
        }

        function at(ms, fn) { timers.push(setTimeout(fn, ms)); }

        /* ── stars ── */
        (function() {
            const layer = document.getElementById('stars-layer');
            const count = Math.floor((window.innerWidth * window.innerHeight) / 4200);
            for (let i = 0; i < count; i++) {
                const s = document.createElement('div');
                s.className = 'star';
                const size = Math.random() * 1.8 + 0.5;
                s.style.width = s.style.height = size + 'px';
                s.style.left = Math.random() * 100 + '%';
                s.style.top = Math.random() * 100 + '%';
                s.style.animationDelay = (Math.random() * 4) + 's';
                s.style.opacity = 0.25 + Math.random() * 0.6;
                layer.appendChild(s);
            }
        })();

        /* ── intro ── */
        function runIntro() {
            at(300, () => document.body.classList.add('stars-on'));
            at(1600, () => document.getElementById('phase-logo').classList.add('visible'));
            at(4600, () => {
                document.getElementById('phase-logo').classList.remove('visible');
                document.getElementById('phase-caption').classList.add('visible');
            });
            at(7600, () => liftoff());
        }

        function liftoff() {
            document.body.classList.add('rocket-fly');
            document.getElementById('phase-caption').classList.add('lift-away');
            at(2000, () => startSolarSystem());
            at(2700, () => {
                document.body.classList.remove('rocket-fly');
                document.getElementById('phase-caption').classList.remove('visible', 'lift-away');
            });
        }

        /* ── solar system ── */
        const ELLIPSE_RATIO = 0.42;
        const MAX_RADIUS = 700;
        let SCALE = 1;
        const liveOrbits = [];
        const orbitsEl = document.getElementById('orbits');

        function getScale() {
            const available = Math.min(window.innerWidth, window.innerHeight / ELLIPSE_RATIO) * 0.42;
            return Math.min(1, available / MAX_RADIUS);
        }

        function shade(hex, amt) {
            if (!hex || typeof hex !== 'string') return 'rgb(200,200,200)';
            let h = hex.replace('#', '');
            if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
            const r = parseInt(h.substring(0, 2), 16);
            const g = parseInt(h.substring(2, 4), 16);
            const b = parseInt(h.substring(4, 6), 16);
            if (isNaN(r) || isNaN(g) || isNaN(b)) return 'rgb(200,200,200)';
            const f = amt > 0 ? 255 : 0;
            const p = Math.abs(amt) / 100;
            return `rgb(${Math.round((f - r) * p + r)},${Math.round((f - g) * p + g)},${Math.round((f - b) * p + b)})`;
        }

        function hexA(color, a) {
            if (typeof color !== 'string') return `rgba(255,255,255,${a})`;
            const t = color.trim();
            if (t.startsWith('#')) {
                const h = t.replace('#', '');
                let r, g, b;
                if (h.length === 3) { r = parseInt(h[0] + h[0], 16);
                    g = parseInt(h[1] + h[1], 16);
                    b = parseInt(h[2] + h[2], 16); } else { r = parseInt(h.substring(0, 2), 16);
                    g = parseInt(h.substring(2, 4), 16);
                    b = parseInt(h.substring(4, 6), 16); }
                if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(255,255,255,${a})`;
                return `rgba(${r},${g},${b},${a})`;
            }
            return `rgba(255,255,255,${a})`;
        }

        // ── realistic texture generation ──
        function generatePlanetTexture(p) {
            const S = 260;
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = S;
            const ctx = canvas.getContext('2d');
            const cx = S / 2,
                cy = S / 2,
                r = S / 2;
            const base = p.texColor || p.color;

            const grad = ctx.createRadialGradient(S * 0.3, S * 0.25, S * 0.02, S * 0.5, S * 0.5, S * 0.72);
            grad.addColorStop(0, shade(base, 50));
            grad.addColorStop(0.6, base);
            grad.addColorStop(1, shade(base, -40));
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, S, S);

            const tex = p.texture || 'rocky';
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.clip();

            switch (tex) {
                case 'sun':
                    drawSun(ctx, S, base);
                    break;
                case 'gas':
                    drawGasBands(ctx, S, base);
                    break;
                case 'earth':
                    drawEarth(ctx, S);
                    break;
                case 'moon':
                    drawMoon(ctx, S, base);
                    break;
                case 'ice':
                    drawIce(ctx, S, base);
                    break;
                case 'comet':
                    drawComet(ctx, S);
                    break;
                case 'galaxy':
                    drawGalaxy(ctx, S, base);
                    break;
                case 'swirl':
                    drawSwirl(ctx, S, base);
                    break;
                case 'rocky':
                default:
                    drawRocky(ctx, S, base);
                    break;
            }

            if (tex !== 'sun') {
                const sh = ctx.createRadialGradient(S * 0.65, S * 0.7, S * 0.02, S * 0.6, S * 0.6, S * 0.6);
                sh.addColorStop(0, 'rgba(0,0,0,0)');
                sh.addColorStop(1, 'rgba(0,0,0,0.55)');
                ctx.fillStyle = sh;
                ctx.fillRect(0, 0, S, S);

                const hi = ctx.createRadialGradient(S * 0.28, S * 0.22, 0, S * 0.3, S * 0.25, S * 0.3);
                hi.addColorStop(0, 'rgba(255,255,255,0.6)');
                hi.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = hi;
                ctx.fillRect(0, 0, S, S);
            }

            ctx.restore();
            return canvas.toDataURL('image/png');
        }

        function drawSun(ctx, S, base) {
            ctx.globalCompositeOperation = 'overlay';
            for (let i = 0; i < 26; i++) {
                const x = Math.random() * S, y = Math.random() * S;
                const rad = 10 + Math.random() * 34;
                const c = Math.random() > 0.5 ? shade(base, 35) : shade(base, -15);
                const grad2 = ctx.createRadialGradient(x, y, 0, x, y, rad);
                grad2.addColorStop(0, hexA(c, 0.45));
                grad2.addColorStop(1, hexA(c, 0));
                ctx.fillStyle = grad2;
                ctx.beginPath();
                ctx.arc(x, y, rad, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'screen';
            const core = ctx.createRadialGradient(S * 0.5, S * 0.5, 0, S * 0.5, S * 0.5, S * 0.55);
            core.addColorStop(0, 'rgba(255,255,240,0.55)');
            core.addColorStop(1, 'rgba(255,255,240,0)');
            ctx.fillStyle = core;
            ctx.fillRect(0, 0, S, S);
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawGasBands(ctx, S, base) {
            ctx.globalCompositeOperation = 'overlay';
            for (let i = 0; i < 12; i++) {
                const y = (S / 12) * i;
                const h = S / 14;
                ctx.beginPath();
                ctx.moveTo(0, y);
                for (let x = 0; x <= S; x += 10) {
                    const wave = Math.sin((x / S) * Math.PI * 4 + i * 0.5) * 5;
                    ctx.lineTo(x, y + wave);
                }
                ctx.lineTo(S, y + h);
                for (let x = S; x >= 0; x -= 10) {
                    const wave = Math.sin((x / S) * Math.PI * 4 + i * 0.5) * 5;
                    ctx.lineTo(x, y + h + wave);
                }
                ctx.closePath();
                const c = i % 2 === 0 ? shade(base, 20) : shade(base, -20);
                ctx.fillStyle = hexA(c, 0.35);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawEarth(ctx, S) {
            ctx.globalCompositeOperation = 'source-atop';
            const colors = ['#2d7d46', '#3a9d5a', '#4cb16a', '#1a5a32'];
            for (let i = 0; i < 8; i++) {
                const x = Math.random() * S,
                    y = Math.random() * S;
                const rad = 18 + Math.random() * 35;
                ctx.beginPath();
                for (let j = 0; j < 12; j++) {
                    const ang = (j / 12) * Math.PI * 2;
                    const r2 = rad * (0.6 + Math.random() * 0.5);
                    const px = x + Math.cos(ang) * r2,
                        py = y + Math.sin(ang) * r2 * 0.8;
                    if (j === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'screen';
            for (let i = 0; i < 12; i++) {
                const x = Math.random() * S,
                    y = Math.random() * S;
                const rad = 8 + Math.random() * 20;
                const grad2 = ctx.createRadialGradient(x, y, 0, x, y, rad);
                grad2.addColorStop(0, 'rgba(255,255,255,0.35)');
                grad2.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grad2;
                ctx.beginPath();
                ctx.arc(x, y, rad, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawMoon(ctx, S, base) {
            ctx.globalCompositeOperation = 'source-atop';
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * S,
                    y = Math.random() * S;
                const rad = 2 + Math.random() * 10;
                ctx.beginPath();
                ctx.arc(x, y, rad, 0, Math.PI * 2);
                ctx.fillStyle = shade(base, -30 - Math.random() * 40);
                ctx.fill();
                if (Math.random() > 0.6) {
                    ctx.beginPath();
                    ctx.arc(x - rad * 0.2, y - rad * 0.2, rad * 0.3, 0, Math.PI * 2);
                    ctx.fillStyle = shade(base, 40);
                    ctx.fill();
                }
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawIce(ctx, S, base) {
            ctx.globalCompositeOperation = 'overlay';
            for (let i = 0; i < 10; i++) {
                const x = Math.random() * S,
                    y = Math.random() * S;
                const rad = 10 + Math.random() * 30;
                const grad2 = ctx.createRadialGradient(x, y, 0, x, y, rad);
                grad2.addColorStop(0, hexA(shade(base, 40), 0.3));
                grad2.addColorStop(1, hexA(shade(base, -30), 0.1));
                ctx.fillStyle = grad2;
                ctx.beginPath();
                ctx.arc(x, y, rad, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawComet(ctx, S) {
            ctx.save();
            const cx = S / 2,
                cy = S / 2;
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, S * 0.6);
            grad.addColorStop(0, 'rgba(200,220,255,0.5)');
            grad.addColorStop(0.4, 'rgba(150,180,255,0.2)');
            grad.addColorStop(1, 'rgba(100,120,200,0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, S * 0.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.translate(cx, cy);
            ctx.rotate(-0.3);
            const tail = ctx.createRadialGradient(0, 0, 0, S * 0.7, 0, S * 0.9);
            tail.addColorStop(0, 'rgba(180,210,255,0)');
            tail.addColorStop(0.5, 'rgba(160,190,255,0.25)');
            tail.addColorStop(1, 'rgba(130,160,255,0)');
            ctx.fillStyle = tail;
            ctx.beginPath();
            ctx.ellipse(0, 0, S * 0.8, S * 0.12, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            const core = ctx.createRadialGradient(cx - 10, cy - 10, 0, cx, cy, S * 0.2);
            core.addColorStop(0, '#ffffff');
            core.addColorStop(0.6, '#c8d8ff');
            core.addColorStop(1, '#8a9ecf');
            ctx.fillStyle = core;
            ctx.beginPath();
            ctx.arc(cx, cy, S * 0.18, 0, Math.PI * 2);
            ctx.fill();
        }

        function drawGalaxy(ctx, S, base) {
            ctx.fillStyle = 'rgba(10,8,30,0.4)';
            ctx.fillRect(0, 0, S, S);
            ctx.globalCompositeOperation = 'screen';
            const cx = S / 2,
                cy = S / 2;
            for (let arm = 0; arm < 3; arm++) {
                ctx.beginPath();
                for (let t = 0; t <= 1; t += 0.015) {
                    const ang = t * Math.PI * 3 + arm * (Math.PI * 2 / 3);
                    const rad = t * S * 0.48;
                    const x = cx + Math.cos(ang) * rad,
                        y = cy + Math.sin(ang) * rad;
                    if (t === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.strokeStyle = hexA(base, 0.3);
                ctx.lineWidth = 8;
                ctx.stroke();
            }
            for (let i = 0; i < 40; i++) {
                const x = Math.random() * S,
                    y = Math.random() * S;
                ctx.beginPath();
                ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawSwirl(ctx, S, base) {
            ctx.globalCompositeOperation = 'overlay';
            ctx.lineCap = 'round';
            for (let i = 0; i < 8; i++) {
                const y = S * (0.1 + 0.8 * Math.random());
                ctx.beginPath();
                ctx.moveTo(-10, y);
                ctx.bezierCurveTo(S * 0.3, y - 30 + Math.random() * 60, S * 0.7, y + 30 - Math.random() * 60, S + 10, y);
                const c = shade(base, Math.random() > 0.5 ? 30 : -20);
                ctx.strokeStyle = hexA(c, 0.3);
                ctx.lineWidth = 6 + Math.random() * 12;
                ctx.stroke();
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function drawRocky(ctx, S, base) {
            ctx.globalCompositeOperation = 'overlay';
            for (let i = 0; i < 16; i++) {
                const x = Math.random() * S,
                    y = Math.random() * S;
                const rad = 8 + Math.random() * 40;
                const c = Math.random() > 0.5 ? shade(base, 25) : shade(base, -25);
                const grad2 = ctx.createRadialGradient(x, y, 0, x, y, rad);
                grad2.addColorStop(0, hexA(c, 0.3));
                grad2.addColorStop(1, hexA(c, 0));
                ctx.fillStyle = grad2;
                ctx.beginPath();
                ctx.arc(x, y, rad, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        /* ── build solar system ── */
        function buildSolarSystem() {
            orbitsEl.innerHTML = '';
            liveOrbits.length = 0;
            SCALE = getScale();

            // Enhanced Sun with realistic plasma effect (center)
            const sunWrap = document.createElement('div');
            sunWrap.className = 'sun-wrap';
            const sun = document.createElement('div');
            sun.className = 'sun';

            const surface = document.createElement('div');
            surface.className = 'sun-surface';
            const granulePositions = [
                [15, 20, 12],
                [40, 10, 18],
                [55, 30, 14],
                [25, 45, 16],
                [50, 55, 10],
                [10, 60, 20],
                [65, 50, 15],
                [35, 70, 12],
                [70, 25, 10],
                [5, 40, 14],
                [45, 15, 18],
                [30, 65, 16]
            ];
            granulePositions.forEach(([x, y, r]) => {
                const g = document.createElement('div');
                g.className = 'granule';
                g.style.left = x + '%';
                g.style.top = y + '%';
                g.style.width = r + 'px';
                g.style.height = r + 'px';
                g.style.animationDelay = (Math.random() * 2) + 's';
                surface.appendChild(g);
            });
            const spots = [
                [20, 30, 10],
                [60, 45, 8],
                [40, 60, 12],
                [75, 20, 6]
            ];
            spots.forEach(([x, y, r]) => {
                const s = document.createElement('div');
                s.className = 'spot';
                s.style.left = x + '%';
                s.style.top = y + '%';
                s.style.width = r + 'px';
                s.style.height = r + 'px';
                surface.appendChild(s);
            });
            sun.appendChild(surface);
            sunWrap.appendChild(sun);
            orbitsEl.appendChild(sunWrap);

            // non-moon planets (skip moon for orbit rings, but add later)
            PLANETS.forEach((p, idx) => {
                if (p.id === 'sun' || p.id === 'moon') return;
                const rx = p.radius * SCALE,
                    ry = rx * ELLIPSE_RATIO;
                const ring = document.createElement('div');
                ring.className = 'orbit-ring';
                ring.style.width = (rx * 2) + 'px';
                ring.style.height = (ry * 2) + 'px';
                orbitsEl.appendChild(ring);

                const wrap = document.createElement('div');
                wrap.className = 'planet-wrap';
                const planet = document.createElement('div');
                planet.className = 'planet';
                planet.style.width = planet.style.height = p.size + 'px';
                if (!p.texDataUrl) p.texDataUrl = generatePlanetTexture(p);
                planet.style.backgroundImage = `url(${p.texDataUrl})`;
                if (p.ring) {
                    const sr = document.createElement('div');
                    sr.className = 'saturn-ring';
                    sr.style.width = (p.size * 2.05) + 'px';
                    sr.style.height = (p.size * 0.66) + 'px';
                    wrap.appendChild(sr);
                }
                const label = document.createElement('div');
                label.className = 'p-label';
                label.textContent = p.emoji + ' ' + p.name + ' · ' + p.cat;
                wrap.appendChild(planet);
                wrap.appendChild(label);
                orbitsEl.appendChild(wrap);

                liveOrbits.push({ rx, ry, wrap, ring, speed: (Math.PI * 2) / p.period, phase: Math.random() * Math.PI * 2,
                    planet: p, parent: null });
                p.wrap = wrap;
            });

            // moon
            const moonData = PLANETS.find(p => p.id === 'moon');
            if (moonData) {
                const wrap = document.createElement('div');
                wrap.className = 'planet-wrap';
                const planet = document.createElement('div');
                planet.className = 'planet';
                const size = moonData.size || 20;
                planet.style.width = planet.style.height = size + 'px';
                if (!moonData.texDataUrl) moonData.texDataUrl = generatePlanetTexture(moonData);
                planet.style.backgroundImage = `url(${moonData.texDataUrl})`;
                wrap.appendChild(planet);
                const label = document.createElement('div');
                label.className = 'p-label';
                label.textContent = moonData.emoji + ' ' + moonData.name + ' · ' + moonData.cat;
                wrap.appendChild(label);
                orbitsEl.appendChild(wrap);

                const moonOrbitRadius = moonData.radius * SCALE * 0.9;
                const moonOrbitRy = moonOrbitRadius * 0.7;
                liveOrbits.push({
                    rx: moonOrbitRadius,
                    ry: moonOrbitRy,
                    wrap: wrap,
                    ring: null,
                    speed: (Math.PI * 2) / moonData.period,
                    phase: Math.random() * Math.PI * 2,
                    planet: moonData,
                    parent: 'earth'
                });
                moonData.wrap = wrap;
            }

            // start satellite animation
            satActive = true;
            animateSatellite();

            animateOrbits();
        }

        /* ── satellite flyer ── */
        function animateSatellite() {
            if (!satActive) return;
            const sv = document.getElementById('solar-view');
            if (!sv.classList.contains('on') && !sv.classList.contains('active')) {
                requestAnimationFrame(animateSatellite);
                return;
            }

            const rect = sv.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const time = performance.now() / 1000;
            const angle = time * 0.25;

            const rx = Math.min(rect.width * 0.38, 380);
            const ry = Math.min(rect.height * 0.35, 280);

            const xOff = Math.sin(time * 0.1) * 30;
            const yOff = Math.cos(time * 0.13) * 20;

            const x = centerX + Math.cos(angle) * rx + xOff;
            const y = centerY + Math.sin(angle * 0.7) * ry + yOff;

            const satEl = document.getElementById('satellite-flyer');
            const trailEl = document.getElementById('satellite-trail');
            if (satEl) {
                satEl.style.left = x + 'px';
                satEl.style.top = y + 'px';
            }
            if (trailEl) {
                trailEl.style.left = x + 'px';
                trailEl.style.top = y + 'px';
            }

            satX = x;
            satY = y;
            satAngle = angle;

            requestAnimationFrame(animateSatellite);
        }

        function animateOrbits() {
            if (orbitsRunning) {
                const t = performance.now() / 1000;
                const positions = {};
                liveOrbits.forEach(o => {
                    if (o.parent === 'earth') return;
                    const angle = o.phase + t * o.speed;
                    const x = Math.cos(angle) * o.rx;
                    const y = Math.sin(angle) * o.ry;
                    positions[o.planet.id] = { x, y };
                    o.wrap.style.left = `calc(50% + ${x}px)`;
                    o.wrap.style.top = `calc(50% + ${y}px)`;
                    o.wrap.style.zIndex = Math.round(50 + y);
                });

                const moonOrbit = liveOrbits.find(o => o.parent === 'earth');
                if (moonOrbit && positions['earth']) {
                    const earthPos = positions['earth'];
                    const angle = moonOrbit.phase + t * moonOrbit.speed;
                    const moonX = Math.cos(angle) * moonOrbit.rx;
                    const moonY = Math.sin(angle) * moonOrbit.ry;
                    const finalX = earthPos.x + moonX;
                    const finalY = earthPos.y + moonY;
                    moonOrbit.wrap.style.left = `calc(50% + ${finalX}px)`;
                    moonOrbit.wrap.style.top = `calc(50% + ${finalY}px)`;
                    moonOrbit.wrap.style.zIndex = Math.round(50 + finalY);
                }
            }
            requestAnimationFrame(animateOrbits);
        }

        window.addEventListener('resize', () => {
            if (!aligned) {
                SCALE = getScale();
                liveOrbits.forEach(o => {
                    if (o.parent === 'earth') {
                        const base = o.planet.radius;
                        o.rx = base * SCALE * 0.9;
                        o.ry = o.rx * 0.7;
                    } else {
                        const base = o.planet.radius;
                        o.rx = base * SCALE;
                        o.ry = o.rx * ELLIPSE_RATIO;
                        if (o.ring) { o.ring.style.width = (o.rx * 2) + 'px';
                            o.ring.style.height = (o.ry * 2) + 'px'; }
                    }
                });
            }
        });

        document.addEventListener('mousemove', e => {
            if (aligned) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 8;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;
            orbitsEl.style.transform = `translate(${x}px, ${y}px)`;
        });

        function startSolarSystem() {
            buildSolarSystem();
            const sv = document.getElementById('solar-view');
            sv.classList.add('active');
            requestAnimationFrame(() => sv.classList.add('on'));

            let t = 8;
            document.getElementById('timer-badge').classList.add('show');
            document.getElementById('timer-count').textContent = t;
            const tickInt = setInterval(() => {
                t -= 1;
                document.getElementById('timer-count').textContent = Math.max(t, 0);
                if (t <= 0) clearInterval(tickInt);
            }, 1000);
            at(600, () => document.getElementById('choose-heading').classList.add('show'));
            at(8500, () => {
                document.getElementById('timer-badge').classList.remove('show');
                document.getElementById('choose-heading').classList.remove('show');
                alignPlanets();
            });
        }

        function alignPlanets() {
            aligned = true;
            orbitsRunning = false;
            satActive = false;
            const stage = document.getElementById('app');
            const rect = stage.getBoundingClientRect();

            const solar = document.getElementById('solar-view');
            solar.style.transition = 'opacity .8s ease';
            solar.style.opacity = '0';

            const rowLayer = document.getElementById('row-layer');
            rowLayer.innerHTML = '';

            // Filter out moon for row (it's small and we want clean layout)
            const rowPlanets = PLANETS.filter(p => p.id !== 'moon');
            const count = rowPlanets.length;
            // Add 2 extra slots: one for admin satellite at the start, one for visual satellite at the end
            const totalSlots = count + 2;
            const margin = Math.min(60, rect.width * 0.05);
            const usable = rect.width - margin * 2;
            const spacing = totalSlots > 1 ? usable / (totalSlots - 1) : 0;
            const yPos = rect.height * 0.52;

            // ── Admin Satellite (clickable, at the beginning) ──
            const adminX = margin;
            const adminDiv = document.createElement('div');
            adminDiv.className = 'row-satellite admin-satellite';
            adminDiv.style.left = adminX + 'px';
            adminDiv.style.top = yPos + 'px';
            adminDiv.textContent = '🛰️';
            rowLayer.appendChild(adminDiv);

            const adminLabel = document.createElement('div');
            adminLabel.className = 'row-sat-label admin-sat-label';
            adminLabel.style.left = adminX + 'px';
            adminLabel.style.top = (yPos + 34) + 'px';
            adminLabel.textContent = '🔑 Admin';
            rowLayer.appendChild(adminLabel);
            at(300, () => { adminLabel.classList.add('show'); });

            adminDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentUser) {
                    toast('Please log out of your account to access admin.', 'error');
                    return;
                }
                const pass = prompt('Enter Admin Password:');
                if (pass === 'admin123') {
                    document.getElementById('admin-toggle').click();
                    toast('Admin access granted.', 'success');
                } else if (pass !== null) {
                    toast('Incorrect password.', 'error');
                }
            });

            // ── Planets ──
            rowPlanets.forEach((p, i) => {
                const x = margin + spacing * (i + 1); // +1 because admin satellite is at index 0
                const isSun = p.isSun === true;

                if (isSun) {
                    // ── Sun (special clickable) ──
                    const wrap = document.createElement('div');
                    wrap.className = 'row-sun-wrap';
                    wrap.style.left = x + 'px';
                    wrap.style.top = yPos + 'px';
                    wrap.dataset.index = i;

                    const sunEl = document.createElement('div');
                    sunEl.className = 'sun';
                    const surface = document.createElement('div');
                    surface.className = 'sun-surface';
                    const granulePositions = [
                        [15, 20, 8],
                        [40, 10, 12],
                        [55, 30, 10],
                        [25, 45, 11],
                        [50, 55, 7],
                        [10, 60, 14],
                        [65, 50, 10],
                        [35, 70, 8],
                        [70, 25, 7],
                        [5, 40, 10]
                    ];
                    granulePositions.forEach(([gx, gy, gr]) => {
                        const g = document.createElement('div');
                        g.className = 'granule';
                        g.style.left = gx + '%';
                        g.style.top = gy + '%';
                        g.style.width = gr + 'px';
                        g.style.height = gr + 'px';
                        g.style.animationDelay = (Math.random() * 2) + 's';
                        surface.appendChild(g);
                    });
                    const spots = [
                        [20, 30, 6],
                        [60, 45, 5],
                        [40, 60, 8]
                    ];
                    spots.forEach(([sx, sy, sr]) => {
                        const s = document.createElement('div');
                        s.className = 'spot';
                        s.style.left = sx + '%';
                        s.style.top = sy + '%';
                        s.style.width = sr + 'px';
                        s.style.height = sr + 'px';
                        surface.appendChild(s);
                    });
                    sunEl.appendChild(surface);
                    wrap.appendChild(sunEl);
                    rowLayer.appendChild(wrap);

                    const cap = document.createElement('div');
                    cap.className = 'row-caption';
                    cap.style.left = x + 'px';
                    cap.style.top = (yPos + 34) + 'px';
                    cap.innerHTML = `
                        <div class="rname">☀️ Sun</div>
                        <div class="rcat">${p.cat}</div>
                        <div class="rsub">${p.sub ? p.sub.join(' · ') : ''}</div>
                    `;
                    rowLayer.appendChild(cap);

                    p.rowWrap = wrap;
                    p.capEl = cap;

                    wrap.addEventListener('click', () => selectPlanet(p));
                    wrap.style.pointerEvents = 'auto';

                    at(300, () => {
                        if (cap) cap.classList.add('show');
                    });

                } else {
                    // ── Regular planet ──
                    const wrap = document.createElement('div');
                    wrap.className = 'row-planet-wrap';
                    wrap.style.left = x + 'px';
                    wrap.style.top = yPos + 'px';
                    wrap.dataset.index = i;

                    const planet = document.createElement('div');
                    planet.className = 'planet';
                    if (!p.texDataUrl) p.texDataUrl = generatePlanetTexture(p);
                    planet.style.backgroundImage = `url(${p.texDataUrl})`;
                    const size = Math.min(38, 24 + (p.size || 30) * 0.4);
                    planet.style.width = planet.style.height = size + 'px';
                    wrap.appendChild(planet);

                    if (p.ring) {
                        const sr = document.createElement('div');
                        sr.className = 'saturn-ring';
                        const sz = parseFloat(planet.style.width) * 1.8;
                        sr.style.width = sz + 'px';
                        sr.style.height = (sz * 0.45) + 'px';
                        wrap.appendChild(sr);
                    }

                    rowLayer.appendChild(wrap);

                    const cap = document.createElement('div');
                    cap.className = 'row-caption';
                    cap.style.left = x + 'px';
                    cap.style.top = (yPos + parseFloat(planet.style.width) * 0.5 + 16) + 'px';
                    cap.innerHTML = `
                        <div class="rname">${p.name}</div>
                        <div class="rcat">${p.cat}</div>
                        <div class="rsub">${p.sub ? p.sub.join(' · ') : ''}</div>
                    `;
                    rowLayer.appendChild(cap);

                    p.rowWrap = wrap;
                    p.rowPlanet = planet;
                    p.capEl = cap;

                    wrap.addEventListener('click', () => selectPlanet(p));
                    wrap.style.pointerEvents = 'auto';

                    at(300, () => {
                        if (cap) cap.classList.add('show');
                    });
                }
            });

            // ── Visual Satellite (decorative, at the end) ──
            const satXPos = margin + spacing * (count + 1);
            const satDiv = document.createElement('div');
            satDiv.className = 'row-satellite';
            satDiv.style.left = satXPos + 'px';
            satDiv.style.top = yPos + 'px';
            satDiv.textContent = '🛰️';
            rowLayer.appendChild(satDiv);

            const satLabel = document.createElement('div');
            satLabel.className = 'row-sat-label';
            satLabel.style.left = satXPos + 'px';
            satLabel.style.top = (yPos + 28) + 'px';
            satLabel.textContent = 'Satellite';
            rowLayer.appendChild(satLabel);
            at(300, () => { satLabel.classList.add('show'); });

            at(300, () => {
                document.getElementById('footer-line').classList.add('show');
                document.getElementById('skip-intro').classList.add('hide');
            });

            at(600, () => {
                document.getElementById('solar-view').classList.remove('active', 'on');
                document.getElementById('satellite-flyer').style.display = 'none';
                document.getElementById('satellite-trail').style.display = 'none';
            });
        }

        document.getElementById('skip-intro').addEventListener('click', () => {
            timers.forEach(t => clearTimeout(t));
            document.body.classList.add('stars-on');
            document.getElementById('phase-logo').classList.remove('visible');
            document.getElementById('phase-caption').classList.remove('visible', 'lift-away');
            document.body.classList.remove('rocket-fly');
            if (!document.getElementById('solar-view').classList.contains('active')) {
                startSolarSystem();
                setTimeout(() => {
                    document.getElementById('timer-badge').classList.remove('show');
                    document.getElementById('choose-heading').classList.remove('show');
                    alignPlanets();
                }, 700);
            }
        });

        /* ── SELECT PLANET ── */
        function selectPlanet(p) {
            if (currentUser) return;
            if (document.body.dataset.locked === '1') return;
            document.body.dataset.locked = '1';
            activePlanet = p;

            // Dim all planets
            const allWraps = document.querySelectorAll('.row-planet-wrap, .row-sun-wrap');
            allWraps.forEach(w => {
                const idx = parseInt(w.dataset.index);
                const planet = rowPlanets[idx];
                if (planet && planet !== p) {
                    w.classList.add('dimmed');
                    if (planet.capEl) planet.capEl.style.opacity = '0.15';
                } else if (planet === p) {
                    w.classList.add('selected');
                }
            });

            at(650, () => {
                const flash = document.getElementById('flash');
                flash.classList.remove('go');
                void flash.offsetWidth;
                flash.classList.add('go');
                setTimeout(() => openPortal(p), 280);
            });
        }

        // Store rowPlanets for selection dimming
        let rowPlanets = [];

        function resetSelection() {
            document.body.dataset.locked = '';
            const allWraps = document.querySelectorAll('.row-planet-wrap, .row-sun-wrap');
            allWraps.forEach(w => {
                w.classList.remove('dimmed', 'selected');
                const idx = parseInt(w.dataset.index);
                const planet = rowPlanets[idx];
                if (planet && planet.capEl) planet.capEl.style.opacity = '1';
            });
        }

        /* ── PORTAL with multi-step ── */
        let currentStep = 0;

        function openPortal(p) {
            currentStep = 0;
            document.documentElement.style.setProperty('--pcol', p.glow || '#ff9d42');
            document.getElementById('portal-eyebrow').textContent = `Join the ${p.cat} universe`;
            document.getElementById('portal-title').textContent = `${p.emoji} ${p.name} Portal`;
            document.getElementById('portal-sub').textContent = `Create your account to begin your journey in the ${p.cat} world.`;

            document.getElementById('step-planet-emoji').textContent = p.emoji;
            document.getElementById('step-planet-name').textContent = p.name + ' · ' + p.cat;
            document.getElementById('step-planet-cat').textContent = p.cat + ' Universe';
            document.getElementById('step-planet-desc').textContent = p.desc || 'This universe is dedicated to ' + p.cat +
                ' businesses.';
            const typesContainer = document.getElementById('step-planet-types');
            typesContainer.innerHTML = '';
            if (p.types) {
                p.types.forEach(t => {
                    const span = document.createElement('span');
                    span.style.cssText =
                        'padding:3px 12px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid var(--glass-border);font-size:11px;color:var(--dim);';
                    span.textContent = t;
                    typesContainer.appendChild(span);
                });
            }

            const regType = document.getElementById('regType');
            regType.innerHTML = '<option value="">Select business type…</option>' + (p.types || []).map(t =>
                `<option value="${t}">${t}</option>`).join('');

            const regCategory = document.getElementById('regCategory');
            regCategory.innerHTML = '<option value="">Select category…</option>' +
                `<option value="${p.cat}">${p.cat}</option>` +
                '<option value="Retail">Retail</option><option value="Service">Service</option><option value="Tech">Tech</option><option value="Other">Other</option>';

            ['regName', 'regPhone', 'regEmail', 'regReferral', 'regRole', 'regBusiness', 'regLocation', 'regCity',
                'regState', 'regCountry', 'regPincode', 'regWebsite', 'regUsername', 'regPass', 'regPass2'
            ].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
            ['agreeTerms', 'agreePrivacy', 'agreeMarketing'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = false; });
            updatePwStrength();

            showStep(0);
            document.getElementById('portal-view').classList.add('show');
        }

        function showStep(idx) {
            currentStep = idx;
            document.querySelectorAll('.step-content').forEach(el => el.style.display = 'none');
            document.getElementById('step-' + idx).style.display = 'block';
            document.querySelectorAll('.step-item').forEach((item, i) => {
                item.className = 'step-item';
                if (i < idx) item.classList.add('done');
                else if (i === idx) item.classList.add('active');
                const circle = item.querySelector('.step-circle');
                circle.textContent = i < idx ? '✓' : (i + 1);
            });
            const steps = ['Choose Domain', 'Your Details', 'Business Info', 'Set Password'];
            document.getElementById('portal-eyebrow').textContent = 'Step ' + (idx + 1) + ' of 4 · ' + steps[idx];
        }

        function updatePwStrength() {
            const val = (document.getElementById('regPass') || {}).value || '';
            let score = 0;
            if (val.length >= 6) score++;
            if (val.length >= 10) score++;
            if (/[0-9]/.test(val) && /[a-zA-Z]/.test(val)) score++;
            if (/[^a-zA-Z0-9]/.test(val)) score++;
            const colors = ['#f87171', '#f87171', '#fbbf24', '#4ade80', '#4ade80'];
            const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
            for (let i = 1; i <= 4; i++) {
                const seg = document.getElementById('pwseg' + i);
                if (!seg) continue;
                seg.style.background = i <= score ? colors[score] : 'rgba(255,255,255,.1)';
            }
            const label = document.getElementById('pwStrengthLabel');
            if (label) {
                label.textContent = val ? (labels[score] || 'Weak') : 'Password strength';
                label.style.color = val ? colors[score] : 'var(--dim)';
            }
        }

        document.getElementById('step-0-next').addEventListener('click', () => {
            if (activePlanet) showStep(1);
        });
        document.getElementById('step-0-change').addEventListener('click', () => {
            document.getElementById('portal-view').classList.remove('show');
            resetSelection();
        });
        document.getElementById('step-1-back').addEventListener('click', () => showStep(0));
        document.getElementById('step-1-next').addEventListener('click', () => {
            const name = document.getElementById('regName').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const role = document.getElementById('regRole').value;
            if (!name || !phone || !email || !role) { toast('Please fill in all required fields.', 'error'); return; }
            if (!email.includes('@')) { toast('Please enter a valid email.', 'error'); return; }
            showStep(2);
        });
        document.getElementById('step-2-back').addEventListener('click', () => showStep(1));
        document.getElementById('step-2-next').addEventListener('click', () => {
            const business = document.getElementById('regBusiness').value.trim();
            const type = document.getElementById('regType').value;
            const category = document.getElementById('regCategory').value;
            const location = document.getElementById('regLocation').value.trim();
            const city = document.getElementById('regCity').value.trim();
            const state = document.getElementById('regState').value.trim();
            const country = document.getElementById('regCountry').value;
            const pincode = document.getElementById('regPincode').value.trim();
            if (!business || !type || !category || !location || !city || !state || !country || !pincode) {
                toast('Please fill in all required fields.', 'error'); return;
            }
            showStep(3);
        });
        document.getElementById('step-3-back').addEventListener('click', () => showStep(2));

        let redirectTimer = null;

        document.getElementById('portal-form').addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const referral = document.getElementById('regReferral').value.trim();
            const role = document.getElementById('regRole').value;
            const business = document.getElementById('regBusiness').value.trim();
            const type = document.getElementById('regType').value;
            const category = document.getElementById('regCategory').value;
            const location = document.getElementById('regLocation').value.trim();
            const city = document.getElementById('regCity').value.trim();
            const state = document.getElementById('regState').value.trim();
            const country = document.getElementById('regCountry').value;
            const pincode = document.getElementById('regPincode').value.trim();
            const website = document.getElementById('regWebsite').value.trim();
            const username = document.getElementById('regUsername').value.trim();
            const pass = document.getElementById('regPass').value;
            const pass2 = document.getElementById('regPass2').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const agreePrivacy = document.getElementById('agreePrivacy').checked;
            const agreeMarketing = document.getElementById('agreeMarketing').checked;

            if (!name || !email || !phone || !role || !business || !type || !category || !location || !city ||
                !state || !country || !pincode || !pass) { toast('Please fill in all required fields.', 'error'); return; }
            if (pass.length < 6) { toast('Password must be at least 6 characters.', 'error'); return; }
            if (pass !== pass2) { toast('Passwords do not match.', 'error'); return; }
            if (!agreeTerms || !agreePrivacy) { toast('Please agree to the Terms and Privacy Policy.', 'error'); return; }
            if (registeredUsers.find(u => u.email === email)) { toast('An account with this email already exists.',
                    'error'); return; }
            const user = { name, email, phone, referral, role, business, type, category, location, city, state,
                country, pincode, website, username, password: pass, agreeMarketing,
                planetId: activePlanet.id, createdAt: new Date().toISOString() };
            registeredUsers.push(user);
            saveStore();
            document.getElementById('portal-view').classList.remove('show');
            document.getElementById('success-title').textContent = `Welcome to ${activePlanet.name}! 🎉`;
            document.getElementById('success-sub').textContent = 'Your account has been created successfully. You can now log in and explore your Business Universe.';
            document.getElementById('success-view').classList.add('show');
            renderAdminUsers();

            let count = 3;
            const countEl = document.getElementById('redirectCount');
            countEl.textContent = count;
            clearInterval(redirectTimer);
            redirectTimer = setInterval(() => {
                count -= 1;
                countEl.textContent = Math.max(count, 0);
                if (count <= 0) {
                    clearInterval(redirectTimer);
                    document.getElementById('success-continue').click();
                }
            }, 1000);
        });

        document.getElementById('success-continue').addEventListener('click', () => {
            clearInterval(redirectTimer);
            document.getElementById('success-view').classList.remove('show');
            document.getElementById('login-eyebrow').textContent = 'Login to your Business Universe';
            document.getElementById('login-icon-badge').textContent = activePlanet ? activePlanet.emoji : '🚪';
            document.getElementById('loginEmail').value = document.getElementById('regEmail').value || '';
            document.getElementById('login-view').classList.add('show');
        });

        document.getElementById('portal-to-login').addEventListener('click', () => {
            document.getElementById('portal-view').classList.remove('show');
            document.getElementById('login-eyebrow').textContent = 'Login to your Business Universe';
            document.getElementById('login-icon-badge').textContent = activePlanet ? activePlanet.emoji : '🚪';
            document.getElementById('login-view').classList.add('show');
        });
        document.getElementById('login-to-portal').addEventListener('click', () => {
            document.getElementById('login-view').classList.remove('show');
            if (activePlanet) openPortal(activePlanet);
        });
        document.getElementById('forgot-pass-link').addEventListener('click', () => {
            toast('Password reset coming soon in the full version.', '');
        });

        document.getElementById('login-form').addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const pass = document.getElementById('loginPass').value;
            const found = registeredUsers.find(u => u.email === email && u.password === pass);
            if (!found) { toast('Invalid email or password.', 'error'); return; }
            currentUser = found;
            try {
                localStorage.setItem('bu_current_user', JSON.stringify(found));
            } catch (_) {}
            document.getElementById('login-view').classList.remove('show');
            toast('Login successful. Redirecting to your full experience...', 'success');
            window.location.href = '/full.html';
        });

        document.getElementById('portal-back').addEventListener('click', () => {
            document.getElementById('portal-view').classList.remove('show');
            resetSelection();
        });
        document.getElementById('login-back').addEventListener('click', () => {
            document.getElementById('login-view').classList.remove('show');
            resetSelection();
        });

        /* ── DASHBOARD ── */
        function openDashboard(user, p) {
            document.documentElement.style.setProperty('--pcol', p.glow || '#ff9d42');
            document.getElementById('dash-dot').style.background = p.glow || '#ff9d42';
            document.getElementById('dash-dot').textContent = user.name.charAt(0).toUpperCase();
            document.getElementById('dash-who-name').textContent = `${p.emoji} ${user.name}`;
            document.getElementById('dash-tag').textContent = `${p.cat} Universe · Dashboard`;
            document.getElementById('dash-h1').textContent = `Welcome back to your ${p.name} world`;
            document.getElementById('dash-p').textContent =
                `Every dashboard shares the same structure — the tone, colour and motion adapt to ${p.cat.toLowerCase()}. Manage your business, showcase your work, and grow your universe.`;
            const grid = document.getElementById('dash-grid');
            grid.innerHTML = '';
            const cards = [
                ['01', 'Overview', 'Key stats and activity for your business at a glance.'],
                ['02', 'Services', 'Manage what you offer, pricing and delivery time.'],
                ['03', 'Portfolio', 'Showcase completed work and client projects.'],
                ['04', 'Team', 'Introduce the people behind the work.'],
                ['05', 'Enquiries', 'See and respond to new contact requests.'],
                ['06', 'Testimonials', 'Track client reviews and ratings.'],
                ['07', 'Pricing', 'View and manage your pricing plans.'],
            ];
            cards.forEach(([n, t, d]) => {
                const c = document.createElement('div');
                c.className = 'dash-card';
                c.innerHTML = `<div class="n">${n}</div><h4>${t}</h4><p>${d}</p>`;
                c.addEventListener('click', () => {
                    toast(`📂 ${t} — coming soon in the full version!`, 'success');
                });
                grid.appendChild(c);
            });
            document.getElementById('dash-view').classList.add('show');
            startDashFx(p.fx);
            document.getElementById('admin-toggle').style.display = 'none';
        }

        function startDashFx(fx) {
            const canvas = document.getElementById('dash-fx');
            const ctx = canvas.getContext('2d');
            let w, h;

            function resize() { w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight; }
            window.addEventListener('resize', resize);
            resize();
            if (dashFxId) cancelAnimationFrame(dashFxId);
            const conf = EFFECTS[fx] || EFFECTS.enterprise;
            const particles = [];
            for (let i = 0; i < 70; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (fx === 'water' ? 0.3 : (Math.random() - 0.5)) * 0.5,
                    r: Math.random() * 3 + 1.4,
                    a: Math.random() * 0.35 + 0.08,
                });
            }

            function draw() {
                ctx.clearRect(0, 0, w, h);
                ctx.fillStyle = conf.color;
                for (const p of particles) {
                    p.x += p.vx;
                    p.y -= Math.abs(p.vy) * 0.6 + 0.1;
                    if (p.x < 0) p.x = w;
                    if (p.x > w) p.x = 0;
                    if (p.y < -10) p.y = h + 10;
                    ctx.globalAlpha = p.a;
                    ctx.beginPath();
                    if (conf.type === 'sparkle') {
                        const s = p.r * 2.2;
                        ctx.moveTo(p.x, p.y - s);
                        ctx.lineTo(p.x + s * 0.3, p.y - s * 0.3);
                        ctx.lineTo(p.x + s, p.y);
                        ctx.lineTo(p.x + s * 0.3, p.y + s * 0.3);
                        ctx.lineTo(p.x, p.y + s);
                        ctx.lineTo(p.x - s * 0.3, p.y + s * 0.3);
                        ctx.lineTo(p.x - s, p.y);
                        ctx.lineTo(p.x - s * 0.3, p.y - s * 0.3);
                        ctx.closePath();
                        ctx.fill();
                    } else if (conf.type === 'square') {
                        ctx.fillRect(p.x, p.y, p.r * 2, p.r * 2);
                    } else {
                        ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                ctx.globalAlpha = 1;
                dashFxId = requestAnimationFrame(draw);
            }
            draw();
        }

        document.getElementById('dash-logout').addEventListener('click', () => {
            currentUser = null;
            activePlanet = null;
            document.getElementById('dash-view').classList.remove('show');
            if (dashFxId) { cancelAnimationFrame(dashFxId);
                dashFxId = null; }
            document.getElementById('admin-toggle').style.display = 'block';
            resetSelection();
            toast('Logged out successfully.', 'success');
        });

        document.getElementById('dash-brand-click').addEventListener('click', () => {
            toast('🌌 Business Universe · v2.0', 'success');
        });

        /* ── ADMIN PANEL ── */
        const adminToggle = document.getElementById('admin-toggle');
        const adminView = document.getElementById('admin-view');
        let adminOpen = false;

        adminToggle.addEventListener('click', () => {
            if (currentUser) {
                toast('Please log out of your account to access admin.', 'error');
                return;
            }
            adminOpen = !adminOpen;
            adminView.classList.toggle('show', adminOpen);
            if (adminOpen) {
                renderAdminUsers();
                renderAdminServices();
                renderAdminProjects();
                renderAdminTeam();
                renderAdminTestimonials();
                renderAdminEnquiries();
                renderAdminPricing();
                document.getElementById('admin-toggle').textContent = '✕ Close Admin';
            } else {
                document.getElementById('admin-toggle').textContent = '⚙ Admin';
            }
        });

        document.getElementById('admin-close').addEventListener('click', () => {
            adminOpen = false;
            adminView.classList.remove('show');
            document.getElementById('admin-toggle').textContent = '⚙ Admin';
        });

        document.querySelectorAll('#admin-tabs button[data-tab]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#admin-tabs button[data-tab]').forEach(b => b.classList.remove(
                    'active-tab'));
                btn.classList.add('active-tab');
                const tab = btn.dataset.tab;
                document.querySelectorAll('.admin-section').forEach(el => el.classList.remove('active'));
                document.getElementById('section-' + tab).classList.add('active');
                if (tab === 'users') renderAdminUsers();
                if (tab === 'services') renderAdminServices();
                if (tab === 'projects') renderAdminProjects();
                if (tab === 'team') renderAdminTeam();
                if (tab === 'testimonials') renderAdminTestimonials();
                if (tab === 'enquiries') renderAdminEnquiries();
                if (tab === 'pricing') renderAdminPricing();
            });
        });

        /* ── RENDER FUNCTIONS ── */

        function renderAdminUsers() {
            const tbody = document.getElementById('users-table-body');
            if (!registeredUsers.length) {
                tbody.innerHTML = '<tr><td colspan="6" class="admin-empty">No users registered yet.</td></tr>';
                return;
            }
            tbody.innerHTML = registeredUsers.map(u => {
                const p = PLANETS.find(pl => pl.id === u.planetId);
                return `<tr>
                    <td><strong>${u.name}</strong></td>
                    <td>${u.email}</td>
                    <td>${u.phone}</td>
                    <td>${u.business}</td>
                    <td><span class="user-badge">${p ? p.emoji + ' ' + p.cat : u.planetId}</span></td>
                    <td style="font-size:11px;color:var(--dim);">${new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>`;
            }).join('');
        }

        function renderAdminServices() {
            const tbody = document.getElementById('services-table-body');
            if (!services.length) {
                tbody.innerHTML = '<tr><td colspan="5" class="admin-empty">No services added yet.</td></tr>';
                return;
            }
            tbody.innerHTML = services.map((s, i) => `<tr>
                <td><strong>${s.name}</strong></td>
                <td>${s.category || '-'}</td>
                <td>$${s.price || '0'}</td>
                <td>${s.time || '-'}</td>
                <td class="actions">
                    <button onclick="editService(${i})">✎</button>
                    <button class="danger" onclick="deleteService(${i})">✕</button>
                </td>
            </tr>`).join('');
        }

        function renderAdminProjects() {
            const tbody = document.getElementById('projects-table-body');
            if (!projects.length) {
                tbody.innerHTML = '<tr><td colspan="4" class="admin-empty">No projects added yet.</td></tr>';
                return;
            }
            tbody.innerHTML = projects.map((p, i) => `<tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.client || '-'}</td>
                <td style="font-size:11px;color:var(--dim);">${p.tech || '-'}</td>
                <td class="actions">
                    <button onclick="editProject(${i})">✎</button>
                    <button class="danger" onclick="deleteProject(${i})">✕</button>
                </td>
            </tr>`).join('');
        }

        function renderAdminTeam() {
            const tbody = document.getElementById('team-table-body');
            if (!teamMembers.length) {
                tbody.innerHTML = '<tr><td colspan="4" class="admin-empty">No team members added yet.</td></tr>';
                return;
            }
            tbody.innerHTML = teamMembers.map((m, i) => `<tr>
                <td><strong>${m.name}</strong></td>
                <td>${m.role || '-'}</td>
                <td style="font-size:11px;color:var(--dim);">${m.skills || '-'}</td>
                <td class="actions">
                    <button onclick="editTeam(${i})">✎</button>
                    <button class="danger" onclick="deleteTeam(${i})">✕</button>
                </td>
            </tr>`).join('');
        }

        function renderAdminTestimonials() {
            const tbody = document.getElementById('testimonials-table-body');
            if (!testimonials.length) {
                tbody.innerHTML = '<tr><td colspan="4" class="admin-empty">No testimonials added yet.</td></tr>';
                return;
            }
            tbody.innerHTML = testimonials.map((t, i) => `<tr>
                <td><strong>${t.name}</strong></td>
                <td>${t.company || '-'}</td>
                <td>${'⭐'.repeat(Math.min(5, Math.round(t.rating || 0)))}</td>
                <td class="actions">
                    <button onclick="editTestimonial(${i})">✎</button>
                    <button class="danger" onclick="deleteTestimonial(${i})">✕</button>
                </td>
            </tr>`).join('');
        }

        function renderAdminEnquiries() {
            const tbody = document.getElementById('enquiries-table-body');
            if (!enquiries.length) {
                tbody.innerHTML = '<tr><td colspan="4" class="admin-empty">No enquiries yet.</td></tr>';
                return;
            }
            tbody.innerHTML = enquiries.map(e => `<tr>
                <td><strong>${e.name}</strong></td>
                <td>${e.email}</td>
                <td style="max-width:200px;font-size:12px;color:var(--dim);">${e.message || '-'}</td>
                <td style="font-size:11px;color:var(--dim);">${new Date(e.date).toLocaleDateString()}</td>
            </tr>`).join('');
        }

        function renderAdminPricing() {
            const tbody = document.getElementById('pricing-table-body');
            if (!pricingPlans.length) {
                tbody.innerHTML = '<tr><td colspan="4" class="admin-empty">No pricing plans added yet.</td></tr>';
                return;
            }
            tbody.innerHTML = pricingPlans.map((p, i) => `<tr>
                <td><strong>${p.name}</strong></td>
                <td>$${p.price || '0'}</td>
                <td style="font-size:11px;color:var(--dim);">${p.features || '-'}</td>
                <td class="actions">
                    <button onclick="editPricing(${i})">✎</button>
                    <button class="danger" onclick="deletePricing(${i})">✕</button>
                </td>
            </tr>`).join('');
        }

        /* ── CRUD OPERATIONS ── */

        // Services
        document.getElementById('svc-save').addEventListener('click', () => {
            const name = document.getElementById('svc-name').value.trim();
            const category = document.getElementById('svc-cat').value.trim();
            const price = document.getElementById('svc-price').value.trim();
            const time = document.getElementById('svc-time').value.trim();
            const desc = document.getElementById('svc-desc').value.trim();
            const tech = document.getElementById('svc-tech').value.trim();
            if (!name) { toast('Service name is required.', 'error'); return; }
            if (editingType === 'service' && editingId !== null) {
                services[editingId] = { name, category, price, time, desc, tech };
                toast('Service updated.', 'success');
                editingId = null;
                editingType = null;
                document.getElementById('svc-cancel').style.display = 'none';
                document.getElementById('svc-save').textContent = 'Add Service';
            } else {
                services.push({ name, category, price, time, desc, tech });
                toast('Service added.', 'success');
            }
            saveStore();
            renderAdminServices();
            clearServiceForm();
        });

        document.getElementById('svc-cancel').addEventListener('click', () => {
            clearServiceForm();
            editingId = null;
            editingType = null;
            document.getElementById('svc-cancel').style.display = 'none';
            document.getElementById('svc-save').textContent = 'Add Service';
        });

        window.editService = function(idx) {
            const s = services[idx];
            document.getElementById('svc-name').value = s.name || '';
            document.getElementById('svc-cat').value = s.category || '';
            document.getElementById('svc-price').value = s.price || '';
            document.getElementById('svc-time').value = s.time || '';
            document.getElementById('svc-desc').value = s.desc || '';
            document.getElementById('svc-tech').value = s.tech || '';
            editingId = idx;
            editingType = 'service';
            document.getElementById('svc-cancel').style.display = 'inline-block';
            document.getElementById('svc-save').textContent = 'Update Service';
            document.querySelector('#section-services .admin-form-row').scrollIntoView({ behavior: 'smooth' });
        };

        window.deleteService = function(idx) {
            if (!confirm('Delete this service?')) return;
            services.splice(idx, 1);
            saveStore();
            renderAdminServices();
            toast('Service deleted.', 'success');
        };

        function clearServiceForm() {
            ['svc-name', 'svc-cat', 'svc-price', 'svc-time', 'svc-desc', 'svc-tech'].forEach(id => document.getElementById(id)
                .value = '');
        }

        // Projects
        document.getElementById('proj-save').addEventListener('click', () => {
            const name = document.getElementById('proj-name').value.trim();
            const client = document.getElementById('proj-client').value.trim();
            const tech = document.getElementById('proj-tech').value.trim();
            const url = document.getElementById('proj-url').value.trim();
            const desc = document.getElementById('proj-desc').value.trim();
            const img = document.getElementById('proj-img').value.trim();
            if (!name) { toast('Project name is required.', 'error'); return; }
            if (editingType === 'project' && editingId !== null) {
                projects[editingId] = { name, client, tech, url, desc, img };
                toast('Project updated.', 'success');
                editingId = null;
                editingType = null;
                document.getElementById('proj-cancel').style.display = 'none';
                document.getElementById('proj-save').textContent = 'Add Project';
            } else {
                projects.push({ name, client, tech, url, desc, img });
                toast('Project added.', 'success');
            }
            saveStore();
            renderAdminProjects();
            clearProjectForm();
        });

        document.getElementById('proj-cancel').addEventListener('click', () => {
            clearProjectForm();
            editingId = null;
            editingType = null;
            document.getElementById('proj-cancel').style.display = 'none';
            document.getElementById('proj-save').textContent = 'Add Project';
        });

        window.editProject = function(idx) {
            const p = projects[idx];
            document.getElementById('proj-name').value = p.name || '';
            document.getElementById('proj-client').value = p.client || '';
            document.getElementById('proj-tech').value = p.tech || '';
            document.getElementById('proj-url').value = p.url || '';
            document.getElementById('proj-desc').value = p.desc || '';
            document.getElementById('proj-img').value = p.img || '';
            editingId = idx;
            editingType = 'project';
            document.getElementById('proj-cancel').style.display = 'inline-block';
            document.getElementById('proj-save').textContent = 'Update Project';
            document.querySelector('#section-projects .admin-form-row').scrollIntoView({ behavior: 'smooth' });
        };

        window.deleteProject = function(idx) {
            if (!confirm('Delete this project?')) return;
            projects.splice(idx, 1);
            saveStore();
            renderAdminProjects();
            toast('Project deleted.', 'success');
        };

        function clearProjectForm() {
            ['proj-name', 'proj-client', 'proj-tech', 'proj-url', 'proj-desc', 'proj-img'].forEach(id => document
                .getElementById(id).value = '');
        }

        // Team
        document.getElementById('team-save').addEventListener('click', () => {
            const name = document.getElementById('team-name').value.trim();
            const role = document.getElementById('team-role').value.trim();
            const skills = document.getElementById('team-skills').value.trim();
            const exp = document.getElementById('team-exp').value.trim();
            const bio = document.getElementById('team-bio').value.trim();
            const photo = document.getElementById('team-photo').value.trim();
            if (!name) { toast('Name is required.', 'error'); return; }
            if (editingType === 'team' && editingId !== null) {
                teamMembers[editingId] = { name, role, skills, exp, bio, photo };
                toast('Team member updated.', 'success');
                editingId = null;
                editingType = null;
                document.getElementById('team-cancel').style.display = 'none';
                document.getElementById('team-save').textContent = 'Add Member';
            } else {
                teamMembers.push({ name, role, skills, exp, bio, photo });
                toast('Team member added.', 'success');
            }
            saveStore();
            renderAdminTeam();
            clearTeamForm();
        });

        document.getElementById('team-cancel').addEventListener('click', () => {
            clearTeamForm();
            editingId = null;
            editingType = null;
            document.getElementById('team-cancel').style.display = 'none';
            document.getElementById('team-save').textContent = 'Add Member';
        });

        window.editTeam = function(idx) {
            const m = teamMembers[idx];
            document.getElementById('team-name').value = m.name || '';
            document.getElementById('team-role').value = m.role || '';
            document.getElementById('team-skills').value = m.skills || '';
            document.getElementById('team-exp').value = m.exp || '';
            document.getElementById('team-bio').value = m.bio || '';
            document.getElementById('team-photo').value = m.photo || '';
            editingId = idx;
            editingType = 'team';
            document.getElementById('team-cancel').style.display = 'inline-block';
            document.getElementById('team-save').textContent = 'Update Member';
            document.querySelector('#section-team .admin-form-row').scrollIntoView({ behavior: 'smooth' });
        };

        window.deleteTeam = function(idx) {
            if (!confirm('Delete this team member?')) return;
            teamMembers.splice(idx, 1);
            saveStore();
            renderAdminTeam();
            toast('Team member deleted.', 'success');
        };

        function clearTeamForm() {
            ['team-name', 'team-role', 'team-skills', 'team-exp', 'team-bio', 'team-photo'].forEach(id => document
                .getElementById(id).value = '');
        }

        // Testimonials
        document.getElementById('test-save').addEventListener('click', () => {
            const name = document.getElementById('test-name').value.trim();
            const company = document.getElementById('test-company').value.trim();
            const rating = parseFloat(document.getElementById('test-rating').value);
            const review = document.getElementById('test-review').value.trim();
            if (!name) { toast('Client name is required.', 'error'); return; }
            if (isNaN(rating) || rating < 1 || rating > 5) { toast('Rating must be between 1 and 5.', 'error'); return; }
            if (editingType === 'testimonial' && editingId !== null) {
                testimonials[editingId] = { name, company, rating, review };
                toast('Testimonial updated.', 'success');
                editingId = null;
                editingType = null;
                document.getElementById('test-cancel').style.display = 'none';
                document.getElementById('test-save').textContent = 'Add Testimonial';
            } else {
                testimonials.push({ name, company, rating, review });
                toast('Testimonial added.', 'success');
            }
            saveStore();
            renderAdminTestimonials();
            clearTestimonialForm();
        });

        document.getElementById('test-cancel').addEventListener('click', () => {
            clearTestimonialForm();
            editingId = null;
            editingType = null;
            document.getElementById('test-cancel').style.display = 'none';
            document.getElementById('test-save').textContent = 'Add Testimonial';
        });

        window.editTestimonial = function(idx) {
            const t = testimonials[idx];
            document.getElementById('test-name').value = t.name || '';
            document.getElementById('test-company').value = t.company || '';
            document.getElementById('test-rating').value = t.rating || '';
            document.getElementById('test-review').value = t.review || '';
            editingId = idx;
            editingType = 'testimonial';
            document.getElementById('test-cancel').style.display = 'inline-block';
            document.getElementById('test-save').textContent = 'Update Testimonial';
            document.querySelector('#section-testimonials .admin-form-row').scrollIntoView({ behavior: 'smooth' });
        };

        window.deleteTestimonial = function(idx) {
            if (!confirm('Delete this testimonial?')) return;
            testimonials.splice(idx, 1);
            saveStore();
            renderAdminTestimonials();
            toast('Testimonial deleted.', 'success');
        };

        function clearTestimonialForm() {
            ['test-name', 'test-company', 'test-rating', 'test-review'].forEach(id => document.getElementById(id).value = '');
        }

        // Pricing
        document.getElementById('price-save').addEventListener('click', () => {
            const name = document.getElementById('price-name').value.trim();
            const price = document.getElementById('price-amount').value.trim();
            const features = document.getElementById('price-features').value.trim();
            const desc = document.getElementById('price-desc').value.trim();
            if (!name) { toast('Plan name is required.', 'error'); return; }
            if (!price) { toast('Price is required.', 'error'); return; }
            if (editingType === 'pricing' && editingId !== null) {
                pricingPlans[editingId] = { name, price, features, desc };
                toast('Plan updated.', 'success');
                editingId = null;
                editingType = null;
                document.getElementById('price-cancel').style.display = 'none';
                document.getElementById('price-save').textContent = 'Add Plan';
            } else {
                pricingPlans.push({ name, price, features, desc });
                toast('Plan added.', 'success');
            }
            saveStore();
            renderAdminPricing();
            clearPricingForm();
        });

        document.getElementById('price-cancel').addEventListener('click', () => {
            clearPricingForm();
            editingId = null;
            editingType = null;
            document.getElementById('price-cancel').style.display = 'none';
            document.getElementById('price-save').textContent = 'Add Plan';
        });

        window.editPricing = function(idx) {
            const p = pricingPlans[idx];
            document.getElementById('price-name').value = p.name || '';
            document.getElementById('price-amount').value = p.price || '';
            document.getElementById('price-features').value = p.features || '';
            document.getElementById('price-desc').value = p.desc || '';
            editingId = idx;
            editingType = 'pricing';
            document.getElementById('price-cancel').style.display = 'inline-block';
            document.getElementById('price-save').textContent = 'Update Plan';
            document.querySelector('#section-pricing .admin-form-row').scrollIntoView({ behavior: 'smooth' });
        };

        window.deletePricing = function(idx) {
            if (!confirm('Delete this pricing plan?')) return;
            pricingPlans.splice(idx, 1);
            saveStore();
            renderAdminPricing();
            toast('Plan deleted.', 'success');
        };

        function clearPricingForm() {
            ['price-name', 'price-amount', 'price-features', 'price-desc'].forEach(id => document.getElementById(id).value =
                '');
        }

        /* ── sample data ── */
        if (!services.length) {
            services = [
                { name: 'Website Development', category: 'Development', price: '499', time: '2 weeks',
                    desc: 'Full custom website built to your needs.', tech: 'React, Django, PostgreSQL' },
                { name: 'Backend Development', category: 'Development', price: '799', time: '3 weeks',
                    desc: 'Scalable backend APIs and services.', tech: 'Python, Django REST, PostgreSQL' },
                { name: 'Bug Fixing & Maintenance', category: 'Support', price: '199', time: '1 week',
                    desc: 'Quick fixes and ongoing maintenance.', tech: 'Various' },
            ];
            saveStore();
        }
        if (!projects.length) {
            projects = [
                { name: 'Ecom Store', client: 'Acme Inc', tech: 'React, Django', url: 'https://demo.com',
                    desc: 'Full-featured e-commerce platform with payment gateway.', img: '' },
                { name: 'Portfolio Pro', client: 'Creative Studio', tech: 'React, Tailwind', url: 'https://demo.com',
                    desc: 'Modern portfolio for a design agency.', img: '' },
            ];
            saveStore();
        }
        if (!teamMembers.length) {
            teamMembers = [
                { name: 'Jane Doe', role: 'Lead Developer', skills: 'React, Python, Django', exp: '5',
                    bio: 'Full-stack developer with a passion for clean code.', photo: '' },
                { name: 'John Smith', role: 'UI/UX Designer', skills: 'Figma, Adobe XD', exp: '3',
                    bio: 'Designing beautiful and functional interfaces.', photo: '' },
            ];
            saveStore();
        }
        if (!testimonials.length) {
            testimonials = [
                { name: 'Alice Johnson', role: 'Founder, TechStart', rating: 5,
                    text: 'Amazing work! They delivered beyond our expectations.', highlight: 'delivered beyond our expectations' },
                { name: 'Bob Williams', role: 'Creative Director, Creative Labs', rating: 4,
                    text: 'Great communication and quality delivery.', highlight: 'quality delivery' },
                { name: 'Carla Mendes', role: 'CEO, Northline', rating: 5,
                    text: 'They understood our vision and shipped ahead of schedule.', highlight: 'ahead of schedule' },
                { name: 'David Kim', role: 'CTO, Fintra', rating: 5,
                    text: 'Rock-solid engineering and clear communication throughout.', highlight: 'Rock-solid engineering' },
            ];
            saveStore();
        }
        if (!pricingPlans.length) {
            pricingPlans = [
                { name: 'Basic', price: '299', features: '1 page, responsive, 1 revision',
                    desc: 'Simple and effective for small businesses.' },
                { name: 'Standard', price: '599', features: '5 pages, responsive, 3 revisions, SEO',
                    desc: 'The perfect middle ground for growing businesses.' },
                { name: 'Premium', price: '999', features: 'Unlimited pages, custom design, 10 revisions, SEO, hosting',
                    desc: 'Full-service package for businesses ready to scale.' },
            ];
            saveStore();
        }

        // Store rowPlanets for selection dimming
        rowPlanets = PLANETS.filter(p => p.id !== 'moon');

        /* ── GO ── */
        runIntro();
        console.log('🌌 Business Universe loaded!');
        console.log('👥 Users:', registeredUsers.length);
        console.log('📦 Services:', services.length);
        console.log('🖼 Projects:', projects.length);
        console.log('👥 Team:', teamMembers.length);
        console.log('⭐ Testimonials:', testimonials.length);
        console.log('💰 Pricing:', pricingPlans.length);
    