// Ported 1:1 from onboarding.script.js — canvas-based planet texture generation.
// Pure functions, no DOM globals beyond a throwaway <canvas>, so this is safe
// to call from React (e.g. lazily, memoized per planet id).

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
        if (h.length === 3) { r = parseInt(h[0] + h[0], 16); g = parseInt(h[1] + h[1], 16); b = parseInt(h[2] + h[2], 16); }
        else { r = parseInt(h.substring(0, 2), 16); g = parseInt(h.substring(2, 4), 16); b = parseInt(h.substring(4, 6), 16); }
        if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(255,255,255,${a})`;
        return `rgba(${r},${g},${b},${a})`;
    }
    return `rgba(255,255,255,${a})`;
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
        const x = Math.random() * S, y = Math.random() * S;
        const rad = 18 + Math.random() * 35;
        ctx.beginPath();
        for (let j = 0; j < 12; j++) {
            const ang = (j / 12) * Math.PI * 2;
            const r2 = rad * (0.6 + Math.random() * 0.5);
            const px = x + Math.cos(ang) * r2, py = y + Math.sin(ang) * r2 * 0.8;
            if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fill();
    }
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 12; i++) {
        const x = Math.random() * S, y = Math.random() * S;
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
        const x = Math.random() * S, y = Math.random() * S;
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
        const x = Math.random() * S, y = Math.random() * S;
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
    const cx = S / 2, cy = S / 2;
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
    const cx = S / 2, cy = S / 2;
    for (let arm = 0; arm < 3; arm++) {
        ctx.beginPath();
        for (let t = 0; t <= 1; t += 0.015) {
            const ang = t * Math.PI * 3 + arm * (Math.PI * 2 / 3);
            const rad = t * S * 0.48;
            const x = cx + Math.cos(ang) * rad, y = cy + Math.sin(ang) * rad;
            if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = hexA(base, 0.3);
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * S, y = Math.random() * S;
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
        const x = Math.random() * S, y = Math.random() * S;
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

function drawSun(ctx, S, base) {
    ctx.globalCompositeOperation = 'overlay';
    // Turbulent flare cells across the whole disc (no shaded side — it emits its own light).
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
    // Bright core.
    ctx.globalCompositeOperation = 'screen';
    const core = ctx.createRadialGradient(S * 0.5, S * 0.5, 0, S * 0.5, S * 0.5, S * 0.55);
    core.addColorStop(0, 'rgba(255,255,240,0.55)');
    core.addColorStop(1, 'rgba(255,255,240,0)');
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, S, S);
    ctx.globalCompositeOperation = 'source-over';
}

// ── realistic texture generation ── (verbatim port)
export function generatePlanetTexture(p) {
    const S = 260;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = S;
    const ctx = canvas.getContext('2d');
    const cx = S / 2, cy = S / 2, r = S / 2;
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
        case 'sun': drawSun(ctx, S, base); break;
        case 'gas': drawGasBands(ctx, S, base); break;
        case 'earth': drawEarth(ctx, S); break;
        case 'moon': drawMoon(ctx, S, base); break;
        case 'ice': drawIce(ctx, S, base); break;
        case 'comet': drawComet(ctx, S); break;
        case 'galaxy': drawGalaxy(ctx, S, base); break;
        case 'swirl': drawSwirl(ctx, S, base); break;
        case 'rocky':
        default: drawRocky(ctx, S, base); break;
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
