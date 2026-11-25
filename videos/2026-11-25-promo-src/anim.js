// Icons
document.querySelectorAll('[data-ic]').forEach(el => { el.innerHTML = ICONS[el.dataset.ic] || ''; });
document.querySelectorAll('[data-ic] svg').forEach(s => { s.setAttribute('width', '100%'); s.setAttribute('height', '100%'); });

// Title cards: one per product
const tcBase = document.getElementById('tc');
function makeTC(id, icon, name, sub, bg) {
  const n = tcBase.cloneNode(true); n.id = id;
  n.querySelector('#tcic').innerHTML = `<span style="width:120px;height:120px;display:block">${ICONS[icon]}</span>`;
  n.querySelector('#tcic').style.background = bg;
  n.querySelector('#tcname').textContent = name;
  n.querySelector('#tcsub').textContent = sub;
  n.querySelectorAll('[id]').forEach(e => { e.id = id + '_' + e.id; });
  tcBase.after(n); return n;
}
makeTC('tcA', 'store', 'Cloud Commerce', 'আপনার নিজের অনলাইন দোকান', '#3a3fd4');
makeTC('tcB', 'message-circle', 'Cloud Chat', 'AI সেলস সহকারী', '#3a3fd4');
makeTC('tcC', 'wallet', 'Cloud Pay', 'নিজের নম্বরে পেমেন্ট', '#16a34a');
document.querySelectorAll('svg').forEach(s => { if (!s.getAttribute('width')) { s.setAttribute('width', '100%'); s.setAttribute('height', '100%'); } });

// Split text into words for kinetic typing
function words(sel) {
  document.querySelectorAll(sel).forEach(el => {
    if (el.dataset.split) return; el.dataset.split = 1;
    const walk = node => {
      [...node.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const parts = c.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(p => { if (!p) return; if (/^\s+$/.test(p)) frag.append(p); else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.append(s); } });
          c.replaceWith(frag);
        } else if (c.nodeType === 1 && !c.classList.contains('mark') && c.tagName !== 'I') walk(c);
      });
    };
    walk(el);
  });
}
words('#s1a,#s1b,#s2t,#s4t,#s5a,#s10a,#s11a,#s12t1,#s12t2,.caption,#s7l1,#s7l3,#s8l1,#s8l2');

gsap.defaults({ ease: 'power3.out', duration: 0.5 });
const tl = gsap.timeline({ paused: true });
const END = 74.6;
const E = { pop: 'back.out(1.8)', snap: 'expo.out', inq: 'power2.in' };

function scene(id, a, b, out = 'fade') {
  tl.set('#' + id, { autoAlpha: 1 }, a);
  if (out === 'fade') tl.to('#' + id, { autoAlpha: 0, scale: 1.04, duration: 0.25, ease: E.inq }, b - 0.25);
  if (out === 'left') tl.to('#' + id, { autoAlpha: 0, x: -120, duration: 0.28, ease: E.inq }, b - 0.28);
  tl.set('#' + id, { autoAlpha: 0, x: 0, scale: 1 }, b);
}
function wordsIn(sel, t, st = 0.07) { tl.from(sel + ' .w', { y: 60, opacity: 0, rotate: 4, duration: 0.55, stagger: st, ease: E.snap }, t); }
function markIn(sel, t) {
  tl.to(sel + ' > i', { scaleX: 1, duration: 0.45, ease: 'power4.out' }, t);
  tl.from(sel + ' > b', { opacity: 0, y: 30, duration: 0.4, ease: E.snap }, t + 0.08);
}
function pill(name, icon, color, t) {
  tl.call(() => {}, null, t);
  tl.set('#pillt', { textContent: name }, t);
  tl.set('#pill .ic', { innerHTML: ICONS[icon], backgroundColor: color }, t);
  tl.fromTo('#pill', { autoAlpha: 0, y: -30 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: E.pop, immediateRender: false }, t);
}
function titleCard(id, a, b) {
  scene(id, a, b);
  tl.from(`#${id}_tcic`, { scale: 0, rotate: -25, duration: 0.6, ease: 'back.out(2)' }, a);
  tl.from(`#${id}_tcname`, { y: 80, opacity: 0, duration: 0.55, ease: E.snap }, a + 0.12);
  tl.to(`#${id}_tcline`, { scaleX: 1, duration: 0.5, ease: 'power4.out' }, a + 0.3);
  tl.from(`#${id}_tcsub`, { y: 30, opacity: 0, duration: 0.45 }, a + 0.35);
  tl.to(`#${id}_tcic`, { y: -10, duration: (b - a) / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, a + 0.6);
}

// ambient background drift
tl.to('#bg .b1', { x: 120, y: 80, duration: END / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
tl.to('#bg .b2', { x: -140, y: -60, duration: END / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
tl.from('#brand', { y: -40, opacity: 0, duration: 0.5 }, 0.1);

/* S1 0.00-4.20 */
scene('s1', 0, 4.2);
wordsIn('#s1a', 0.05, 0.12);
wordsIn('#s1b', 1.99, 0.09);
markIn('#s1m', 3.0);
tl.from('#s1 .chip', { scale: 0, rotate: () => gsap.utils.random(-60, 60), y: 120, duration: 0.55, ease: E.pop, stagger: 0.1 }, 2.0);
tl.to('#s1 .chip', { x: () => gsap.utils.random(-40, 40), y: () => gsap.utils.random(-30, 30), rotate: () => gsap.utils.random(-14, 14), duration: 0.35, repeat: 4, yoyo: true, ease: 'sine.inOut', stagger: 0.04 }, 2.7);
tl.to('#s1m', { rotate: -3, x: 6, duration: 0.08, repeat: 7, yoyo: true }, 3.4);

/* S2 4.24-8.75 */
scene('s2', 4.24, 8.75, 'left');
tl.from('#s2p', { x: 520, rotate: 12, duration: 0.7, ease: E.snap }, 4.24);
tl.from('#s2t .w2:nth-child(1) .w', { y: 60, opacity: 0, stagger: 0.08, duration: 0.5, ease: E.snap }, 4.3);
tl.from('#s2t .w2:nth-child(2) .w', { y: 60, opacity: 0, stagger: 0.08, duration: 0.5, ease: E.snap }, 5.5);
markIn('#s2m', 6.9);
tl.from('#s2 .bub', { x: -40, opacity: 0, scale: 0.8, transformOrigin: 'left bottom', stagger: 0.55, duration: 0.4, ease: E.pop }, 4.7);
['3:05', '4:12', '5:20', '6:47'].forEach((c, i) => tl.set('#s2clock', { textContent: c }, 5.6 + i * 0.6));
tl.to('#s2p .scr', { backgroundColor: '#3a2f55', duration: 1.6, ease: 'none' }, 6.5);
tl.to('#s2p', { y: -10, rotate: -2, duration: 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 4.9);

/* S3 8.86-13.55 */
scene('s3', 8.86, 13.55);
tl.from('#c1', { x: -700, rotate: -10, duration: 0.6, ease: E.snap }, 8.86);
tl.to('#c1', { rotate: -3, duration: 0.3 }, 9.3);
tl.from('#c2', { x: 700, rotate: 10, duration: 0.6, ease: E.snap }, 9.95);
tl.to('#c2', { rotate: 2.5, duration: 0.3 }, 10.4);
tl.from('#c3', { x: -700, rotate: -10, duration: 0.6, ease: E.snap }, 11.5);
tl.to('#c3', { rotate: -2, duration: 0.3 }, 11.95);
tl.to('#s3ring path', { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 12.35);
tl.to('#c1,#c2,#c3', { x: '+=8', duration: 0.06, repeat: 5, yoyo: true, stagger: 0.03 }, 12.9);

/* S4 13.73-17.05 */
scene('s4', 13.73, 17.05);
wordsIn('#s4t', 13.73, 0.09);
tl.from('#s4p', { y: 500, duration: 0.6, ease: E.snap }, 13.8);
tl.from('#s4mag', { scale: 0, opacity: 0, duration: 0.4, ease: E.pop }, 14.3);
tl.to('#s4mag', { x: 60, y: 120, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 14.6);
tl.from('#s4a', { x: 300, opacity: 0, duration: 0.45, ease: E.pop }, 14.0);
tl.from('#s4b', { x: 300, opacity: 0, duration: 0.45, ease: E.pop }, 15.3);
tl.from('#s4c', { x: 300, opacity: 0, duration: 0.45, ease: E.pop }, 16.1);

/* S5 17.22-19.10 */
scene('s5', 17.22, 19.1);
tl.from('#s5ring', { scale: 0.2, opacity: 0, duration: 1.2, ease: 'expo.out' }, 17.22);
tl.from('#s5ring2', { scale: 0, duration: 0.9, ease: 'expo.out' }, 17.3);
tl.from('#s5 .s5c', { scale: 0, duration: 0.3, ease: E.pop, stagger: 0.04 }, 17.22);
tl.to('#s5 .s5c', { left: 495, top: 495, scale: 0, rotate: 180, duration: 0.7, ease: 'power3.in', stagger: 0.05 }, 17.5);
wordsIn('#s5a', 17.25, 0.1);
markIn('#s5b .mark', 17.8);
tl.to('#s5b', { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1 }, 18.4);

/* Cloud Commerce 19.17-32.70 */
titleCard('tcA', 19.17, 20.33);
pill('Cloud Commerce', 'store', '#3a3fd4', 20.33);
scene('s6', 20.33, 32.75);
tl.from('#s6b', { y: 700, rotateX: 25, duration: 0.7, ease: E.snap }, 20.36);
wordsIn('#s6cap1', 20.4);
markIn('#s6cap1 .mark', 20.8);
tl.from('#shop .pr', { y: 40, opacity: 0, stagger: 0.08, duration: 0.4 }, 20.9);
// to dashboard
tl.to('#s6cap1', { opacity: 0, y: -40, duration: 0.25, ease: E.inq }, 22.3);
tl.to('#shop', { opacity: 0, scale: 0.96, duration: 0.3 }, 22.4);
tl.set('#s6url', { textContent: 'yourbrand.com/admin' }, 22.4);
tl.to('#dash', { opacity: 1, duration: 0.35 }, 22.55);
tl.from('#dash .st', { y: 30, opacity: 0, stagger: 0.08, duration: 0.4 }, 22.65);
tl.from('#dash .row', { x: 40, opacity: 0, stagger: 0.08, duration: 0.4 }, 22.9);
wordsIn('#s6cap2', 22.5);
markIn('#s6cap2 .mark', 23.1);
// courier booking
tl.to('#s6cap2', { opacity: 0, y: -40, duration: 0.25, ease: E.inq }, 25.25);
wordsIn('#s6cap3', 25.42);
markIn('#s6cap3 .mark', 25.8);
tl.to('#s6b', { scale: 1.12, x: -40, y: 20, duration: 0.7, ease: 'power2.inOut' }, 25.42);
tl.to('#cur1', { left: 830, top: 545, duration: 0.8, ease: 'power2.inOut' }, 25.6);
tl.set('#rip1', { left: 808, top: 520 }, 26.4);
tl.fromTo('#rip1', { scale: 0.2, opacity: 1 }, { scale: 1.4, opacity: 0, duration: 0.5, immediateRender: false }, 26.4);
tl.to('#cur1', { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 }, 26.4);
tl.set('#bookbtn', { textContent: '✓ Steadfast বুকড', backgroundColor: '#16a34a' }, 26.5);
tl.from('#bookbtn', { scale: 1.25, duration: 0.35, ease: E.pop }, 26.5);
tl.to('#s6truck', { left: 1150, duration: 1.3, ease: 'power1.in' }, 26.6);
tl.to('#cur1', { left: 1100, top: 1000, duration: 0.5 }, 27.2);
// SMS + fraud
tl.to('#s6cap3', { opacity: 0, y: -40, duration: 0.25, ease: E.inq }, 27.9);
tl.to('#s6b', { opacity: 0.12, scale: 1, x: 0, y: 0, filter: 'blur(4px)', duration: 0.4 }, 27.95);
tl.fromTo('#s6sms', { opacity: 0, x: -400 }, { opacity: 1, x: 0, duration: 0.55, ease: E.snap, immediateRender: false }, 28.11);
tl.fromTo('#s6fraud', { opacity: 0, x: 400 }, { opacity: 1, x: 0, duration: 0.55, ease: E.snap, immediateRender: false }, 29.6);
tl.fromTo('#s6auto', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: E.pop, immediateRender: false }, 31.26);
markIn('#s6auto .mark', 31.3);
tl.to('#s6sms,#s6fraud', { y: -60, duration: 0.5, ease: 'power2.out' }, 31.26);
tl.to('#s6auto [data-ic]', { rotate: 15, scale: 1.2, duration: 0.15, yoyo: true, repeat: 3 }, 31.6);

/* Cloud Chat 32.86-46.55 */
titleCard('tcB', 32.86, 34.05);
pill('Cloud Chat', 'message-circle', '#3a3fd4', 34.05);
scene('s7', 34.05, 46.6);
wordsIn('#s7cap0', 34.09);
markIn('#s7cap0 .mark', 34.6);
tl.from('#s7bot', { scale: 0, duration: 0.7, ease: 'back.out(2)' }, 34.3);
tl.fromTo('#s7halo', { scale: 0.7, opacity: 1 }, { scale: 1.3, opacity: 0, duration: 1.1, repeat: 1, ease: 'power1.out', immediateRender: false }, 34.6);
tl.from('#s7t1', { x: -200, opacity: 0, duration: 0.45, ease: E.pop }, 35.0);
tl.from('#s7t2', { x: 200, opacity: 0, duration: 0.45, ease: E.pop }, 35.3);
tl.from('#s7t3', { x: 200, opacity: 0, duration: 0.45, ease: E.pop }, 35.6);
tl.to('#s7intro', { opacity: 0, scale: 0.92, duration: 0.3, ease: E.inq }, 36.45);
tl.to('#s7chat', { opacity: 1, duration: 0.01 }, 36.74);
tl.from('#s7p', { x: 500, rotate: 10, duration: 0.65, ease: E.snap }, 36.74);
wordsIn('#s7l1', 36.8);
markIn('#s7l1 .mark', 37.4);
['#m2', '#m3', '#m4', '#m5', '#mty'].forEach(s => tl.set(s, { display: 'none' }, 0));
tl.from('#m1', { x: -40, opacity: 0, scale: 0.8, transformOrigin: 'left bottom', duration: 0.4, ease: E.pop }, 37.1);
tl.set('#mty', { display: 'block' }, 37.6);
tl.to('#mty .dot', { y: -6, duration: 0.18, stagger: 0.1, yoyo: true, repeat: 3 }, 37.6);
tl.set('#mty', { display: 'none' }, 38.25);
tl.set('#m2', { display: 'block' }, 38.25);
tl.from('#m2', { x: 40, opacity: 0, scale: 0.8, transformOrigin: 'right bottom', duration: 0.4, ease: E.pop }, 38.25);
tl.from('#s7badges', { y: 40, opacity: 0, duration: 0.45, ease: E.pop }, 38.85);
// photo, price, order
tl.to('#s7l1,#s7badges', { opacity: 0, x: -60, duration: 0.25, ease: E.inq }, 40.05);
tl.to('#s7l2', { opacity: 1, duration: 0.01 }, 40.26);
tl.from('#s7l2 .li', { x: -80, opacity: 0, stagger: 0.95, duration: 0.45, ease: E.snap }, 40.26);
markIn('#s7l2 .mark', 42.25);
tl.set('#m3', { display: 'block' }, 40.5);
tl.from('#m3', { x: 40, opacity: 0, scale: 0.7, transformOrigin: 'right bottom', duration: 0.45, ease: E.pop }, 40.5);
tl.set('#m1,#m2', { display: 'none' }, 41.7);
tl.set('#m4', { display: 'block' }, 41.7);
tl.from('#m4', { x: -40, opacity: 0, scale: 0.8, transformOrigin: 'left bottom', duration: 0.4, ease: E.pop }, 41.7);
tl.set('#m5', { display: 'block' }, 42.7);
tl.from('#m5', { x: 40, opacity: 0, scale: 0.6, transformOrigin: 'right bottom', duration: 0.45, ease: E.pop }, 42.7);
// order to dashboard
tl.to('#s7l2', { opacity: 0, x: -60, duration: 0.25, ease: E.inq }, 43.85);
tl.to('#s7l3', { opacity: 1, duration: 0.01 }, 44.07);
tl.from('#s7l3 .w', { y: 50, opacity: 0, stagger: 0.08, duration: 0.45, ease: E.snap }, 44.07);
markIn('#s7l3 .mark', 44.5);
tl.fromTo('#s7order', { opacity: 0, x: 620, y: -120, scale: 0.4 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.75, ease: 'power3.inOut', immediateRender: false }, 44.6);
tl.to('#s7order', { boxShadow: '0 0 0 8px #16a34a55, 0 22px 50px #1b1f6e1f', duration: 0.3, yoyo: true, repeat: 1 }, 45.4);

/* Cloud Pay 46.66-56.85 */
titleCard('tcC', 46.62, 47.68);
pill('Cloud Pay', 'wallet', '#16a34a', 47.68);
scene('s8', 47.68, 56.9);
tl.from('#s8p', { x: 500, rotate: 10, duration: 0.6, ease: E.snap }, 47.7);
wordsIn('#s8l1', 47.75);
markIn('#s8l1 .mark', 48.4);
tl.from('#s8pills .tag', { y: 40, opacity: 0, stagger: 0.15, duration: 0.45, ease: E.pop }, 49.2);
// SMS & matching
tl.to('#s8l1,#s8pills', { opacity: 0, x: -60, duration: 0.25, ease: E.inq }, 50.95);
tl.fromTo('#sms', { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.45, ease: E.pop, immediateRender: false }, 51.2);
tl.to('#s8l2', { opacity: 1, duration: 0.01 }, 51.19);
tl.from('#s8l2 .w', { y: 50, opacity: 0, stagger: 0.07, duration: 0.45, ease: E.snap }, 51.19);
markIn('#s8l2 .mark', 51.6);
tl.from('#s8checks .ck', { x: -200, opacity: 0, stagger: 0.45, duration: 0.45, ease: E.pop }, 51.7);
// success
tl.to('#sms', { opacity: 0, y: -60, duration: 0.25 }, 53.0);
tl.to('#pay2', { opacity: 1, duration: 0.3 }, 53.1);
tl.from('#okc', { scale: 0, rotate: -90, duration: 0.6, ease: 'back.out(2.2)' }, 53.15);
tl.to('#s8checks .ck', { scale: 1.06, duration: 0.15, stagger: 0.08, yoyo: true, repeat: 1 }, 53.2);
// no screenshot
tl.to('#s8p,#s8l2,#s8checks', { opacity: 0, scale: 0.9, duration: 0.3, ease: E.inq }, 54.85);
tl.to('#s8no', { opacity: 1, duration: 0.01 }, 55.07);
tl.from('#s8no > .abs:first-child', { y: 300, rotate: -8, duration: 0.5, ease: E.snap }, 55.07);
tl.from('#s8x', { scale: 0, rotate: -120, duration: 0.5, ease: 'back.out(2.4)' }, 55.45);
tl.from('#s8no .caption .w', { y: 50, opacity: 0, stagger: 0.07, duration: 0.45, ease: E.snap }, 55.3);
markIn('#s8no .caption .mark', 55.8);

/* Confetti for payment success */
const cf = document.getElementById('confetti');
for (let i = 0; i < 26; i++) { const d = document.createElement('i'); d.style.cssText = `position:absolute;width:${10 + (i % 3) * 4}px;height:${14 + (i % 2) * 6}px;border-radius:3px;background:${['#ff8a3d', '#3a3fd4', '#16a34a', '#f59e0b', '#e5484d'][i % 5]};opacity:0`; cf.appendChild(d); }
tl.fromTo('#confetti i', { x: 0, y: 0, opacity: 1, rotate: 0 }, { x: () => gsap.utils.random(-260, 260), y: () => gsap.utils.random(-320, 120), rotate: () => gsap.utils.random(-360, 360), opacity: 0, duration: 1.3, ease: 'power2.out', immediateRender: false }, 53.25);

/* S9 one system 56.95-63.25 */
tl.to('#pill', { autoAlpha: 0, y: -30, duration: 0.3 }, 56.7);
scene('s9', 56.95, 63.25);
tl.from('#s9logo', { scale: 0, rotate: -40, duration: 0.6, ease: 'back.out(2)' }, 56.95);
tl.from('#orb1,#orb2', { scale: 0.3, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out' }, 56.95);
tl.to('#orb1', { rotate: 120, duration: 6, ease: 'none' }, 56.95);
const R = 270, ang = [-90, 30, 150];
['#o1', '#o2', '#o3'].forEach((s, i) => {
  const a = ang[i] * Math.PI / 180;
  const el = document.querySelector(s); el.style.left = (Math.cos(a) * R) + 'px'; el.style.top = (Math.sin(a) * R) + 'px';
  tl.from(s, { scale: 0, duration: 0.5, ease: 'back.out(2.2)' }, 57.0 + i * 0.75);
});
tl.to('#o1', { y: -14, duration: 1.1, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 57.5);
tl.to('#o2', { y: 14, duration: 1.0, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 58.0);
tl.to('#o3', { y: -12, duration: 0.9, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 58.6);
tl.from('#s9a .w', { y: 50, opacity: 0, stagger: 0.08, duration: 0.45, ease: E.snap }, 60.1);
tl.to('#s9strike i', { scaleX: 1, duration: 0.35, ease: 'power4.out' }, 60.85);
tl.to('#s9rot .orbi', { left: 0, top: 0, scale: 0.2, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: 0.08 }, 61.62);
tl.to('#s9logo', { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, 62.2);
tl.from('#s9b .mark > b', { opacity: 0, y: 40, duration: 0.4 }, 61.7);
tl.to('#s9b .mark > i', { scaleX: 1, duration: 0.45, ease: 'power4.out' }, 61.65);

/* S10 calm 63.33-66.65 */
scene('s10', 63.33, 66.65);
wordsIn('#s10a', 63.33, 0.1);
markIn('#s10b .mark', 64.82);
tl.from('#s10cup', { scale: 0, y: 80, duration: 0.6, ease: E.pop }, 63.6);
tl.to('#s10cup', { y: -14, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 64.2);
tl.from('#s10 .n1', { y: 120, opacity: 0, stagger: 0.35, duration: 0.6, ease: E.snap }, 64.0);
tl.to('#s10 .n1', { y: '-=40', duration: 2, ease: 'sine.inOut' }, 64.6);

/* S11 CTA 66.72-69.75 */
scene('s11', 66.72, 69.75);
tl.from('#s11rib', { scale: 0, rotate: -12, duration: 0.5, ease: E.pop }, 66.72);
wordsIn('#s11a', 66.8, 0.1);
tl.from('#s11btn', { scale: 0, duration: 0.6, ease: 'back.out(2)' }, 68.2);
tl.to('#cur2', { left: 690, top: 615, duration: 0.6, ease: 'power2.inOut' }, 68.5);
tl.set('#rip2', { left: 668, top: 588 }, 69.1);
tl.fromTo('#rip2', { scale: 0.2, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.5, immediateRender: false }, 69.1);
tl.to('#s11btn', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 }, 69.1);

/* S12 end card 69.82-END */
tl.to('#brand', { autoAlpha: 0, duration: 0.3 }, 69.6);
tl.to('#endbg', { opacity: 1, duration: 0.5 }, 69.6);
scene('s12', 69.82, END + 1);
tl.from('#s12logo', { scale: 0, rotate: -40, duration: 0.7, ease: 'back.out(2)' }, 69.84);
tl.fromTo('#s12ring', { scale: 0.5, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 1.2, ease: 'power2.out', immediateRender: false }, 70.0);
tl.from('#s12name span', { y: 60, opacity: 0, stagger: 0.12, duration: 0.55, ease: E.snap }, 70.1);
wordsIn('#s12t1', 71.05, 0.12);
wordsIn('#s12t2', 72.19, 0.14);
tl.from('#s12row', { opacity: 0, y: 30, duration: 0.6 }, 73.0);
tl.to('#s12logo', { y: -8, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 71.4);
tl.set({}, {}, END);

window.DURATION = END;
window.seek = t => { tl.seek(t, false); };
window.ready = document.fonts.ready.then(() => true);
