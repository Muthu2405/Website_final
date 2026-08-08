import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PLANETS } from './data';
import { generatePlanetTexture } from './textures';

// Ported 1:1 from onboarding.script.js's sun-surface granule/spot layout.
const SUN_GRANULES = [
    [15, 20, 12], [40, 10, 18], [55, 30, 14], [25, 45, 16],
    [50, 55, 10], [10, 60, 20], [65, 50, 15], [35, 70, 12],
    [70, 25, 10], [5, 40, 14], [45, 15, 18], [30, 65, 16],
];
const SUN_SPOTS = [
    [20, 30, 10], [60, 45, 8], [40, 60, 12], [75, 20, 6],
];

const ELLIPSE_RATIO = 0.42;
const MAX_RADIUS = 700;

function getScale() {
    const available = Math.min(window.innerWidth, window.innerHeight / ELLIPSE_RATIO) * 0.42;
    return Math.min(1, available / MAX_RADIUS);
}

// Planets shown in the orbit view (everything except the Moon, which orbits Earth).
const ORBIT_PLANETS = PLANETS.filter(p => p.id !== 'moon');
const MOON = PLANETS.find(p => p.id === 'moon');
const ROW_PLANETS = PLANETS.filter(p => p.id !== 'moon');

/**
 * Solar-system planet chooser — orbit intro (8s) that settles into a
 * clickable row of planets. Faithful port of buildSolarSystem /
 * animateOrbits / alignPlanets / selectPlanet from onboarding.script.js.
 *
 * onSelectPlanet(planet) fires after the select flash animation — the
 * registration wizard (portal) that used to open here isn't built yet,
 * so the parent decides what happens next.
 */
export default function PlanetChooser({ onSelectPlanet, skipToRow = false }) {
    const [phase, setPhase] = useState(skipToRow ? 'row' : 'orbit'); // 'orbit' | 'aligning' | 'row'
    const [countdown, setCountdown] = useState(8);
    const [selectedId, setSelectedId] = useState(null);
    const [locked, setLocked] = useState(false);
    const [flash, setFlash] = useState(false);

    const orbitsElRef = useRef(null);
    const satFlyerRef = useRef(null);
    const satTrailRef = useRef(null);
    const rafRef = useRef(null);
    const timersRef = useRef([]);
    const scaleRef = useRef(getScale());

    // Texture cache — canvas generation is expensive, only do it once per planet.
    const textures = useMemo(() => {
        const map = {};
        PLANETS.forEach(p => { map[p.id] = generatePlanetTexture(p); });
        return map;
    }, []);

    const orbitMeta = useMemo(() => {
        const scale = scaleRef.current;
        const meta = {};
        ORBIT_PLANETS.forEach(p => {
            if (p.id === 'sun') return;
            const rx = p.radius * scale;
            const ry = rx * ELLIPSE_RATIO;
            meta[p.id] = { rx, ry, speed: (Math.PI * 2) / p.period, phase: Math.random() * Math.PI * 2 };
        });
        if (MOON) {
            const rx = MOON.radius * scale * 0.9;
            const ry = rx * 0.7;
            meta.moon = { rx, ry, speed: (Math.PI * 2) / MOON.period, phase: Math.random() * Math.PI * 2, parent: 'earth' };
        }
        return meta;
    }, []);

    const at = (ms, fn) => { timersRef.current.push(setTimeout(fn, ms)); };

    // ── orbit + satellite animation loop ──
    useEffect(() => {
        if (phase !== 'orbit') return undefined;
        let running = true;

        function tick() {
            if (!running) return;
            const t = performance.now() / 1000;
            const orbitsEl = orbitsElRef.current;
            if (orbitsEl) {
                const positions = {};
                Object.entries(orbitMeta).forEach(([id, o]) => {
                    if (o.parent) return;
                    const angle = o.phase + t * o.speed;
                    const x = Math.cos(angle) * o.rx;
                    const y = Math.sin(angle) * o.ry;
                    positions[id] = { x, y };
                    const el = orbitsEl.querySelector(`[data-planet-id="${id}"]`);
                    if (el) {
                        el.style.left = `calc(50% + ${x}px)`;
                        el.style.top = `calc(50% + ${y}px)`;
                        el.style.zIndex = Math.round(50 + y);
                    }
                });
                if (orbitMeta.moon && positions.earth) {
                    const angle = orbitMeta.moon.phase + t * orbitMeta.moon.speed;
                    const mx = positions.earth.x + Math.cos(angle) * orbitMeta.moon.rx;
                    const my = positions.earth.y + Math.sin(angle) * orbitMeta.moon.ry;
                    const el = orbitsEl.querySelector('[data-planet-id="moon"]');
                    if (el) {
                        el.style.left = `calc(50% + ${mx}px)`;
                        el.style.top = `calc(50% + ${my}px)`;
                        el.style.zIndex = Math.round(50 + my);
                    }
                }
            }

            // satellite flyer
            const sv = orbitsEl?.parentElement;
            if (sv) {
                const rect = sv.getBoundingClientRect();
                const cx = rect.width / 2, cy = rect.height / 2;
                const angle = t * 0.25;
                const rx = Math.min(rect.width * 0.38, 380);
                const ry = Math.min(rect.height * 0.35, 280);
                const xOff = Math.sin(t * 0.1) * 30;
                const yOff = Math.cos(t * 0.13) * 20;
                const x = cx + Math.cos(angle) * rx + xOff;
                const y = cy + Math.sin(angle * 0.7) * ry + yOff;
                if (satFlyerRef.current) { satFlyerRef.current.style.left = x + 'px'; satFlyerRef.current.style.top = y + 'px'; }
                if (satTrailRef.current) { satTrailRef.current.style.left = x + 'px'; satTrailRef.current.style.top = y + 'px'; }
            }

            rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);
        return () => { running = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [phase, orbitMeta]);

    // ── 8s countdown -> align into row ──
    useEffect(() => {
        if (phase !== 'orbit') return undefined;
        setCountdown(8);
        const tickInt = setInterval(() => {
            setCountdown(c => Math.max(c - 1, 0));
        }, 1000);
        timersRef.current.push(tickInt);
        at(8500, () => setPhase('row'));
        return () => {
            clearInterval(tickInt);
            timersRef.current.forEach(t => clearTimeout(t));
            timersRef.current = [];
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase]);

    function skipToRowNow() {
        timersRef.current.forEach(t => clearTimeout(t));
        timersRef.current = [];
        setPhase('row');
    }

    function handleSelect(planet) {
        if (locked) return;
        setLocked(true);
        setSelectedId(planet.id);
        at(650, () => {
            setFlash(true);
            setTimeout(() => {
                setFlash(false);
                onSelectPlanet?.(planet);
                // Selection is momentary UI feedback — release the lock so the
                // row is usable again if the parent doesn't navigate away.
                setLocked(false);
            }, 280);
        });
    }

    // Row-layout planet count includes an empty leading slot (keeps the Sun
    // from sitting flush against the left edge) and a decorative satellite
    // at the end, matching the original spacing math.
    const totalSlots = ROW_PLANETS.length + 2;

    return (
        <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
            {phase === 'orbit' && (
                <div id="solar-view" className="active on">
                    <div id="orbits" ref={orbitsElRef}>
                        <div className="sun-wrap">
                            <div className="sun">
                                <div className="sun-surface">
                                    {SUN_GRANULES.map(([x, y, r], i) => (
                                        <div key={i} className="granule" style={{ left: `${x}%`, top: `${y}%`, width: r, height: r, animationDelay: `${(i * 37 % 200) / 100}s` }} />
                                    ))}
                                    {SUN_SPOTS.map(([x, y, r], i) => (
                                        <div key={i} className="spot" style={{ left: `${x}%`, top: `${y}%`, width: r, height: r }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {ORBIT_PLANETS.filter(p => p.id !== 'sun').map(p => (
                            <React.Fragment key={p.id}>
                                <div
                                    className="orbit-ring"
                                    style={{ width: orbitMeta[p.id].rx * 2, height: orbitMeta[p.id].ry * 2 }}
                                />
                                <div className="planet-wrap" data-planet-id={p.id}>
                                    <div
                                        className="planet"
                                        style={{ width: p.size, height: p.size, backgroundImage: `url(${textures[p.id]})` }}
                                    />
                                    {p.ring && <div className="saturn-ring" style={{ width: p.size * 2.05, height: p.size * 0.66 }} />}
                                    <div className="p-label">{p.emoji} {p.name} · {p.cat}</div>
                                </div>
                            </React.Fragment>
                        ))}
                        {MOON && (
                            <div className="planet-wrap" data-planet-id="moon">
                                <div className="planet" style={{ width: MOON.size, height: MOON.size, backgroundImage: `url(${textures.moon})` }} />
                                <div className="p-label">{MOON.emoji} {MOON.name} · {MOON.cat}</div>
                            </div>
                        )}
                    </div>
                    <div id="satellite-trail" ref={satTrailRef} />
                    <div id="satellite-flyer" ref={satFlyerRef}>🛰️</div>
                </div>
            )}

            {phase === 'orbit' && (
                <div id="choose-heading" className="show">
                    <div className="eyebrow">Twelve worlds. One decision.</div>
                    <h2>Choose your <em>Business Universe</em></h2>
                </div>
            )}
            {phase === 'orbit' && (
                <div id="timer-badge" className="show">⏱ <span id="timer-count">{countdown}</span>s</div>
            )}

            {phase === 'orbit' && (
                <button id="skip-intro" onClick={skipToRowNow}>Skip intro</button>
            )}

            {phase === 'row' && (
                <RowLayer
                    textures={textures}
                    selectedId={selectedId}
                    locked={locked}
                    onSelect={handleSelect}
                    totalSlots={totalSlots}
                />
            )}

            <div id="flash" className={flash ? 'go' : ''} />
        </div>
    );
}

function RowLayer({ textures, selectedId, locked, onSelect, totalSlots }) {
    const [showCaptions, setShowCaptions] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setShowCaptions(true), 300);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <div id="row-layer" style={{ position: 'absolute', inset: 0 }}>
                {ROW_PLANETS.map((p, i) => {
                    const leftPct = (100 / (totalSlots - 1)) * (i + 1);
                    const isSun = p.isSun === true;
                    const isSelected = selectedId === p.id;
                    const isDimmed = locked && selectedId && !isSelected;
                    const size = isSun ? 76 : Math.min(38, 24 + (p.size || 30) * 0.4);
                    return (
                        <React.Fragment key={p.id}>
                            <div
                                className={`${isSun ? 'row-sun-wrap' : 'row-planet-wrap'} ${isDimmed ? 'dimmed' : ''} ${isSelected ? 'selected' : ''}`}
                                style={{ left: `${leftPct}%`, top: '52%', pointerEvents: 'auto', cursor: 'pointer' }}
                                onClick={() => onSelect(p)}
                            >
                                {isSun ? (
                                    <div className="sun" />
                                ) : (
                                    <div className="planet" style={{ width: size, height: size, backgroundImage: `url(${textures[p.id]})` }} />
                                )}
                                {p.ring && <div className="saturn-ring" style={{ width: size * 1.8, height: size * 1.8 * 0.45 }} />}
                            </div>
                            <div
                                className={`row-caption ${showCaptions ? 'show' : ''}`}
                                style={{ left: `${leftPct}%`, top: `calc(52% + ${isSun ? 34 : size * 0.5 + 16}px)`, opacity: isDimmed ? 0.15 : 1 }}
                            >
                                <div className="rname">{isSun ? '☀️ Sun' : p.name}</div>
                                <div className="rcat">{p.cat}</div>
                                <div className="rsub">{p.sub ? p.sub.join(' · ') : ''}</div>
                            </div>
                        </React.Fragment>
                    );
                })}

                <div className="row-satellite" style={{ left: `${100 / (totalSlots - 1) * (ROW_PLANETS.length + 1)}%`, top: '52%' }}>🛰️</div>
                <div className={`row-sat-label ${showCaptions ? 'show' : ''}`} style={{ left: `${100 / (totalSlots - 1) * (ROW_PLANETS.length + 1)}%`, top: 'calc(52% + 28px)' }}>
                    Satellite
                </div>
            </div>
            <div id="footer-line" className="show">Your universe. Your business. Your world.</div>
        </>
    );
}
