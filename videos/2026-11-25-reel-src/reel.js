document.querySelectorAll('[data-ic]').forEach(el => { el.innerHTML = ICONS[el.dataset.ic] || ''; });
document.querySelectorAll('svg').forEach(s => { if (!s.getAttribute('width') || s.getAttribute('width') === '24') { s.setAttribute('width', '100%'); s.setAttribute('height', '100%'); } });

function words(sel) {
  document.querySelectorAll(sel).forEach(el => {
    const walk = node => [...node.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) frag.append(p); else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.append(s); } });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && !c.classList.contains('mark') && c.tagName !== 'I' && c.tagName !== 'BR') walk(c);
    });
    walk(el);
  });
}
words('.cap,#r12t1,#r12t2');

gsap.defaults({ ease: 'power3.out', duration: 0.5 });
const tl = gsap.timeline({ paused: true });
const END = 62.6;
const E = { pop: 'back.out(1.8)', snap: 'expo.out', inq: 'power2.in' };
const bn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

function scene(id, a, b) {
  tl.set('#' + id, { autoAlpha: 1 }, a);
  tl.to('#' + id, { autoAlpha: 0, duration: 0.25, ease: E.inq }, b - 0.25);
}
function wordsIn(sel, t, st = 0.07) { tl.from(sel + ' .w', { y: 70, opacity: 0, rotate: 4, duration: 0.55, stagger: st, ease: E.snap }, t); }
function markIn(sel, t) {
  tl.to(sel + ' > i', { scaleX: 1, duration: 0.45, ease: 'power4.out' }, t);
  tl.from(sel + ' > b', { opacity: 0, y: 30, duration: 0.4, ease: E.snap }, t + 0.08);
}
function capIn(sel, t, markT) { tl.to(sel, { opacity: 1, duration: 0.01 }, t); wordsIn(sel, t); if (markT) markIn(sel + ' .mark', markT); }
function capOut(sel, t) { tl.to(sel, { opacity: 0, y: -50, duration: 0.25, ease: E.inq }, t); }

tl.to('#bg .b1', { x: 150, y: 120, duration: END / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
tl.to('#bg .b2', { x: -160, y: -100, duration: END / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
tl.from('#brand', { y: -40, opacity: 0, duration: 0.5 }, 0.1);

/* R1 0-4.82: 9 AM, 50 messages */
scene('r1', 0, 4.82);
wordsIn('#r1a', 0.05, 0.15);
tl.from('#clk', { scale: 0, rotate: -60, duration: 0.6, ease: 'back.out(2)' }, 0.7);
tl.fromTo('#hh', { rotate: 180 }, { rotate: 270, duration: 0.8, ease: 'power2.out' }, 0.8);
tl.fromTo('#mm', { rotate: -180 }, { rotate: 0, duration: 0.8, ease: 'power2.out' }, 0.8);
tl.from('#digi', { scale: 0, duration: 0.45, ease: E.pop }, 1.07);
tl.from('#r1p', { y: 700, duration: 0.6, ease: E.snap }, 2.2);
tl.from('#r1b', { scale: 0, duration: 0.4, ease: 'back.out(3)' }, 2.5);
const cnt = { n: 0 };
tl.to(cnt, { n: 50, duration: 1.7, ease: 'power2.in', onUpdate: () => { document.getElementById('r1n').textContent = bn(Math.round(cnt.n)); } }, 2.5);
capIn('#r1c', 2.35, 3.2);
tl.to('#r1p', { rotate: 4, duration: 0.07, yoyo: true, repeat: 9 }, 3.7);

/* R2 4.86-8.25: questions -> 1 PM */
scene('r2', 4.86, 8.28);
tl.from('#r2 .qb', { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2.2)', stagger: 0.32, transformOrigin: 'left bottom' }, 4.88);
tl.to('#r2 .qb', { y: -18, duration: 0.5, yoyo: true, repeat: 3, stagger: 0.1, ease: 'sine.inOut' }, 5.6);
tl.from('#r2d', { rotateX: 90, opacity: 0, duration: 0.5, ease: E.snap }, 6.9);
capIn('#r2c', 7.0, 7.6);

/* R3 8.3-14.85: notebook, courier tabs */
scene('r3', 8.3, 14.85);
capIn('#r3a', 8.3, 8.75);
tl.from('#paper', { y: 900, rotate: 6, duration: 0.65, ease: E.snap }, 8.35);
tl.to('#paper div', { width: 600, duration: 0.45, ease: 'none', stagger: 0.4 }, 8.9);
capOut('#r3a', 10.55);
tl.to('#paper', { x: -1100, rotate: -10, duration: 0.45, ease: E.inq }, 10.55);
capIn('#r3b', 10.76, 11.3);
document.querySelectorAll('#r3 .t3').forEach((t, i) => {
  tl.from(t, { y: -900, opacity: 0, rotate: i % 2 ? 4 : -4, duration: 0.5, ease: E.snap }, 11.0 + i * 0.8);
  tl.to(t.querySelector('.btn'), { scale: 0.9, backgroundColor: '#0f7a35', duration: 0.12, yoyo: true, repeat: 1 }, 11.55 + i * 0.8);
});

/* R4 14.9-19.18: screenshots -> evening */
scene('r4', 14.9, 19.18);
capIn('#r4a', 14.9, 15.35);
tl.from('#r4 .s4', { y: 900, duration: 0.6, ease: E.snap, stagger: 0.18 }, 15.0);
tl.from('#r4mag', { scale: 0, duration: 0.4, ease: E.pop }, 15.6);
tl.to('#r4mag', { left: 560, top: 720, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 15.9);
tl.to('#sky', { opacity: 1, duration: 1.0, ease: 'power1.inOut' }, 16.7);
tl.to('#r4d', { opacity: 1, duration: 0.01 }, 16.86);
tl.from('#r4d', { rotateX: 90, duration: 0.5, ease: E.snap }, 16.86);
capIn('#r4b', 17.0, 17.6);

/* R5 19.22-22.82: day over */
tl.to('#gray', { opacity: 1, duration: 0.5 }, 19.0);
tl.to('#sky', { opacity: 0, duration: 0.5 }, 19.3);
tl.to('#brand', { color: '#ffffff', duration: 0.4 }, 19.0);
scene('r5', 19.22, 22.82);
wordsIn('#r5a', 19.22, 0.2);
wordsIn('#r5b', 20.22, 0.09);
tl.from('#r5q', { scale: 0, rotate: -30, duration: 0.5, ease: E.pop }, 21.4);
tl.to('#r5a', { opacity: 0.45, duration: 0.6 }, 20.2);

/* R6 22.85-26.0: rewind */
scene('r6', 22.85, 26.0);
tl.to('#gray', { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, 22.85);
tl.to('#brand', { color: '#1b1f6e', duration: 0.4 }, 23.0);
tl.fromTo('#r6 .vhs', { opacity: 0.8, x: -200 }, { opacity: 0, x: 200, duration: 0.18, repeat: 5, stagger: 0.05, ease: 'none', immediateRender: false }, 22.85);
tl.from('#r6rw', { scale: 0, duration: 0.4, ease: E.pop }, 22.9);
tl.to('#r6rw', { x: -40, duration: 0.15, yoyo: true, repeat: 7, ease: 'sine.inOut' }, 23.2);
wordsIn('#r6a', 22.95, 0.12);
tl.from('#r6logo', { scale: 0, rotate: -45, duration: 0.6, ease: 'back.out(2)' }, 24.25);
tl.to('#r6b', { opacity: 1, duration: 0.01 }, 24.42);
wordsIn('#r6b', 24.42);
markIn('#r6b .mark', 24.42);

/* R7 26.04-33.92: AI answered overnight, orders */
tl.to('#morning', { opacity: 1, duration: 0.6 }, 25.8);
scene('r7', 26.04, 33.92);
capIn('#r7a', 26.04);
tl.from('#r7p', { y: 1300, duration: 0.7, ease: E.snap }, 26.3);
tl.from('#r7 .r7m', { scale: 0.6, opacity: 0, duration: 0.4, ease: E.pop, stagger: 0.75 }, 27.8);
tl.from('#r7t1', { x: -400, opacity: 0, duration: 0.5, ease: E.pop }, 28.6);
tl.from('#r7t2', { x: 400, opacity: 0, duration: 0.5, ease: E.pop }, 31.21);
tl.to('#r7p,#r7t1,#r7t2', { opacity: 0, y: -100, duration: 0.3, ease: E.inq }, 31.85);
tl.from('#r7orders .ordc', { x: 1100, duration: 0.55, ease: E.snap, stagger: 0.35 }, 32.11);
capIn('#r7b', 32.2, 32.75);

/* R8 33.94-40.82: dashboard, courier, SMS */
scene('r8', 33.94, 40.82);
capIn('#r8a', 33.94, 34.45);
tl.from('#r8d', { y: 1200, duration: 0.65, ease: E.snap }, 34.0);
tl.from('#r8d .drow', { x: 200, opacity: 0, stagger: 0.15, duration: 0.45 }, 34.5);
capOut('#r8a', 36.3);
capIn('#r8b', 36.48, 36.9);
tl.to('#cur3', { left: 860, top: 815, duration: 0.7, ease: 'power2.inOut' }, 36.55);
tl.set('#rip3', { left: 815, top: 765 }, 37.3);
tl.fromTo('#rip3', { scale: 0.2, opacity: 1 }, { scale: 1.5, opacity: 0, duration: 0.5, immediateRender: false }, 37.3);
['#bk1', '#bk2', '#bk3'].forEach((b, i) => {
  tl.set(b, { textContent: '✓ বুকড', backgroundColor: '#16a34a' }, 37.35 + i * 0.3);
  tl.from(b, { scale: 1.3, duration: 0.3, ease: E.pop }, 37.35 + i * 0.3);
});
tl.to('#cur3', { left: 1100, top: 1700, duration: 0.5 }, 38.2);
tl.to('#r8sms', { opacity: 1, duration: 0.01 }, 38.5);
tl.from('#r8sms', { y: 300, scale: 0.8, duration: 0.55, ease: E.pop }, 38.5);

/* R9 40.86-46.6: payment */
scene('r9', 40.86, 46.62);
capIn('#r9a', 40.86, 41.4);
tl.from('#r9sms', { y: -500, duration: 0.55, ease: E.pop }, 41.2);
tl.to('#r9sms', { boxShadow: '0 0 0 10px #e2136e44, 0 20px 50px #1b1f6e33', duration: 0.3, yoyo: true, repeat: 1 }, 42.0);
capOut('#r9a', 43.5);
capIn('#r9b', 43.7, 43.75);
tl.from('#r9 .ck2', { x: -900, duration: 0.45, ease: E.pop, stagger: 0.4 }, 44.0);
tl.from('#r9ok', { scale: 0, duration: 0.55, ease: 'back.out(2.2)' }, 45.4);

/* R10 46.79-51.9: you relax */
scene('r10', 46.79, 51.92);
wordsIn('#r10a', 46.79, 0.15);
tl.from('#r10cup', { scale: 0, y: 200, duration: 0.6, ease: E.pop }, 47.9);
tl.fromTo('#r10 .steam', { opacity: 0, y: 40 }, { opacity: 0.9, y: -60, duration: 1.0, stagger: 0.25, repeat: 2, ease: 'sine.out', immediateRender: false }, 48.2);
capIn('#r10b', 48.02, 48.5);
tl.to('#r10a', { scale: 0.75, y: -60, duration: 0.5 }, 48.0);
tl.to('#r10cup,#r10b,#r10 .steam', { opacity: 0, y: 300, duration: 0.35, ease: E.inq }, 49.35);
tl.to('#r10t', { opacity: 1, duration: 0.01 }, 49.6);
tl.from('#r10t', { scale: 0.3, duration: 0.55, ease: 'back.out(1.8)' }, 49.6);
tl.from('#r10t .p', { scale: 0, rotate: -30, stagger: 0.18, duration: 0.45, ease: E.pop }, 49.85);
capIn('#r10c', 49.75, 50.35);

/* R11 51.96-57.95: system works, CTA */
scene('r11', 51.96, 57.95);
tl.from('#g1,#g2', { scale: 0, duration: 0.5, ease: E.pop, stagger: 0.1 }, 51.96);
tl.to('#g1', { rotate: 360, duration: 3.3, ease: 'none' }, 51.96);
tl.to('#g2', { rotate: -480, duration: 3.3, ease: 'none' }, 51.96);
wordsIn('#r11a', 52.0, 0.12);
tl.from('#r11up', { scale: 0, y: 200, duration: 0.6, ease: E.pop }, 53.4);
capIn('#r11b', 53.7, 54.1);
tl.to('#g1,#g2,#r11a,#r11up,#r11b', { opacity: 0, y: -120, duration: 0.3, ease: E.inq }, 55.05);
tl.to('#r11cta', { opacity: 1, duration: 0.01 }, 55.3);
tl.from('#r11rib', { scale: 0, rotate: -12, duration: 0.5, ease: E.pop }, 55.33);
wordsIn('#r11c', 55.4, 0.1);
tl.from('#r11btn', { scale: 0, duration: 0.6, ease: 'back.out(2)' }, 56.4);
tl.to('#cur4', { left: 700, top: 1010, duration: 0.55, ease: 'power2.inOut' }, 56.7);
tl.set('#rip4', { left: 670, top: 970 }, 57.25);
tl.fromTo('#rip4', { scale: 0.2, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.5, immediateRender: false }, 57.25);
tl.to('#r11btn', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 }, 57.25);

/* R12 57.98-END */
tl.to('#brand', { autoAlpha: 0, duration: 0.3 }, 57.7);
tl.to('#endbg', { opacity: 1, duration: 0.5 }, 57.7);
scene('r12', 57.98, END + 1);
tl.from('#r12logo', { scale: 0, rotate: -40, duration: 0.7, ease: 'back.out(2)' }, 58.0);
tl.fromTo('#r12ring', { scale: 0.5, opacity: 1 }, { scale: 1.7, opacity: 0, duration: 1.2, ease: 'power2.out', immediateRender: false }, 58.15);
tl.from('#r12name span', { y: 70, opacity: 0, stagger: 0.12, duration: 0.55, ease: E.snap }, 58.25);
wordsIn('#r12t1', 59.23, 0.12);
wordsIn('#r12t2', 60.2, 0.14);
tl.from('#r12row', { opacity: 0, y: 30, duration: 0.6 }, 61.0);
tl.set({}, {}, END);

window.DURATION = END;
window.seek = t => { tl.seek(t, false); };
window.ready = document.fonts.ready.then(() => true);
