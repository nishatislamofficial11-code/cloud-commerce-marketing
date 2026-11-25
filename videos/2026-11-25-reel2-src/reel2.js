document.querySelectorAll('[data-ic]').forEach(el => { el.innerHTML = ICONS[el.dataset.ic] || ''; });
document.querySelectorAll('svg').forEach(s => { if (!s.getAttribute('width') || s.getAttribute('width') === '24') { s.setAttribute('width', '100%'); s.setAttribute('height', '100%'); } });
function words(sel) {
  document.querySelectorAll(sel).forEach(el => {
    const walk = node => [...node.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) frag.append(p); else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.append(s); } });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && !c.classList.contains('mark') && !['I', 'BR', 'B'].includes(c.tagName)) walk(c);
    });
    walk(el);
  });
}
words('.cap,#q12t1,#q12t2');

gsap.defaults({ ease: 'power3.out', duration: 0.5 });
const tl = gsap.timeline({ paused: true });
const END = 76.6;
const E = { pop: 'back.out(1.8)', snap: 'expo.out', inq: 'power2.in' };
function scene(id, a, b) { tl.set('#' + id, { autoAlpha: 1 }, a); tl.to('#' + id, { autoAlpha: 0, duration: 0.25, ease: E.inq }, b - 0.25); }
function wordsIn(sel, t, st = 0.07) { tl.from(sel + ' .w', { y: 70, opacity: 0, rotate: 4, duration: 0.55, stagger: st, ease: E.snap }, t); }
function markIn(sel, t) { tl.to(sel + ' > i', { scaleX: 1, duration: 0.45, ease: 'power4.out' }, t); tl.from(sel + ' > b', { opacity: 0, y: 30, duration: 0.4, ease: E.snap }, t + 0.08); }
function capIn(sel, t, markT) { tl.to(sel, { opacity: 1, duration: 0.01 }, t); wordsIn(sel, t); if (markT) markIn(sel + ' .mark', markT); }
function capOut(sel, t) { tl.to(sel, { opacity: 0, y: -50, duration: 0.25, ease: E.inq }, t); }
const show = (sel, t, from = 'c') => { tl.set(sel, { display: 'block' }, t); tl.from(sel, { x: from === 'c' ? -50 : 50, opacity: 0, scale: 0.75, transformOrigin: from === 'c' ? 'left bottom' : 'right bottom', duration: 0.4, ease: E.pop }, t); };

tl.to('#bg .b1', { x: 150, y: 120, duration: END / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
tl.to('#bg .b2', { x: -160, y: -100, duration: END / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
tl.from('#brand', { y: -40, opacity: 0, duration: 0.5 }, 0.1);

/* Q1 0-4.1 */
scene('q1', 0, 4.12);
wordsIn('#q1a', 0.05, 0.12);
capIn('#q1b', 1.75, 2.3);
tl.from('#q1w', { y: 900, rotate: 5, duration: 0.65, ease: E.snap }, 1.9);
tl.from('#q1q', { scale: 0, rotate: -40, duration: 0.5, ease: 'back.out(2.4)' }, 2.6);
tl.to('#q1q', { rotate: 12, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 3.1);

/* Q2/Q3 4.14-14.2 */
scene('q2', 4.14, 14.22);
capIn('#q2a', 4.14, 4.9);
[['#a1', 6.9], ['#a2', 7.9], ['#a3', 8.6], ['#a4', 9.6]].forEach(([s, t], i) => tl.from(s, { x: i % 2 ? 700 : -700, rotate: i % 2 ? 8 : -8, duration: 0.5, ease: E.snap }, t));
capOut('#q2a', 11.35);
tl.to('#a1', { left: 40, top: 340, rotate: -6, duration: 0.6, ease: 'power3.inOut' }, 11.57);
tl.to('#a2', { left: 640, top: 420, rotate: 6, duration: 0.6, ease: 'power3.inOut' }, 11.57);
tl.to('#a3', { left: 40, top: 960, rotate: 5, duration: 0.6, ease: 'power3.inOut' }, 11.57);
tl.to('#a4', { left: 640, top: 1040, rotate: -5, duration: 0.6, ease: 'power3.inOut' }, 11.57);
tl.set('#q2 .lbl', { opacity: 0 }, 0);
tl.to('#q2 .lbl', { opacity: 1, duration: 0.3, stagger: 0.15 }, 12.2);
tl.to('#q2 .app', { x: '+=10', duration: 0.07, yoyo: true, repeat: 7, stagger: 0.04 }, 12.6);
capIn('#q2b', 11.6, 12.1);

/* Q4 14.27-23.5 */
scene('q4', 14.27, 23.55);
tl.from('#q4logo', { scale: 0, rotate: -45, duration: 0.6, ease: 'back.out(2)' }, 14.27);
wordsIn('#q4a', 14.4, 0.09);
markIn('#q4m', 16.53);
tl.to('#q4logo', { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1 }, 16.6);
tl.from('#p1', { x: -1000, duration: 0.55, ease: E.snap }, 17.51);
tl.from('#p2', { x: 1000, duration: 0.55, ease: E.snap }, 19.58);
tl.from('#p3', { x: -1000, duration: 0.55, ease: E.snap }, 21.87);
tl.to('#p1 .sq,#p2 .sq,#p3 .sq', { rotate: 8, duration: 0.2, yoyo: true, repeat: 1, stagger: 0.12 }, 22.6);

/* Q5/Q6 23.64-39.2 */
scene('q5', 23.64, 39.22);
['#k1', '#k2', '#k3', '#k4', '#k5', '#k6'].forEach(s => tl.set(s, { display: 'none' }, 0));
capIn('#q5a', 23.64, 24.1);
tl.from('#q5p', { y: 1300, duration: 0.7, ease: E.snap }, 23.7);
show('#k1', 24.4, 'c'); show('#k2', 25.6, 'a'); show('#k3', 27.4, 'a');
tl.from('#ch1', { x: -400, opacity: 0, duration: 0.45, ease: E.pop }, 27.6);
tl.from('#ch2', { x: 400, opacity: 0, duration: 0.45, ease: E.pop }, 28.4);
tl.set('#k1,#k2', { display: 'none' }, 29.6);
show('#k4', 29.6, 'c');
tl.from('#ch3', { x: -400, opacity: 0, duration: 0.45, ease: E.pop }, 29.9);
capOut('#q5a', 30.5);
tl.to('#ch1,#ch2,#ch3', { opacity: 0, duration: 0.25 }, 30.5);
capIn('#q5b', 30.73, 31.3);
tl.set('#k3', { display: 'none' }, 32.7);
show('#k5', 32.75, 'a');
tl.to('#cur5', { left: 560, top: 1290, duration: 0.6, ease: 'power2.inOut' }, 33.4);
tl.to('#cur5', { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 }, 34.05);
tl.to('#paypg', { opacity: 1, duration: 0.3 }, 34.2);
tl.from('#paypg > *', { y: 60, opacity: 0, stagger: 0.12, duration: 0.4 }, 34.25);
tl.to('#cur5', { left: 520, top: 950, duration: 0.5, ease: 'power2.inOut' }, 34.9);
tl.to('#paybtn', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 }, 35.5);
tl.to('#paypg', { opacity: 0, duration: 0.3 }, 36.0);
tl.to('#cur5', { left: 1100, top: 1800, duration: 0.4 }, 36.0);
tl.set('#k4', { display: 'none' }, 36.2);
show('#k6', 36.2, 'a');
tl.to('#q5ok', { opacity: 1, duration: 0.01 }, 37.91);
tl.from('#q5ok', { scale: 0, duration: 0.55, ease: 'back.out(2.2)' }, 37.91);

/* Q7/Q8 39.31-50.4 */
tl.to('#gray', { opacity: 0.08, duration: 0.4 }, 39.2);
scene('q7', 39.31, 50.42);
wordsIn('#q7a', 39.31, 0.15);
tl.from('#q7m', { scale: 0.6, opacity: 0, duration: 0.55, ease: E.pop }, 40.84);
tl.to('#q7m', { rotate: -2, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 41.6);
tl.fromTo('#q7no', { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power4.out', immediateRender: false }, 43.68);
tl.to('#q7m', { opacity: 0.25, filter: 'blur(3px)', duration: 0.3 }, 43.7);
tl.to('#gray', { opacity: 0, duration: 0.4 }, 43.9);
tl.to('#q7a,#q7m,#q7no', { opacity: 0, y: -100, duration: 0.3, ease: E.inq }, 44.35);
tl.to('#q8', { opacity: 1, duration: 0.01 }, 44.64);
wordsIn('#q8a', 44.64, 0.08);
markIn('#q8a .mark', 45.6);
tl.from('#q8o', { x: 1100, duration: 0.55, ease: E.snap }, 46.15);
tl.from('#q8t', { y: 300, opacity: 0, duration: 0.5, ease: E.pop }, 47.1);
tl.to('#knob', { left: 56, duration: 0.3, ease: 'power2.inOut' }, 48.72);
tl.to('#sw', { backgroundColor: '#16a34a', duration: 0.3 }, 48.72);
tl.set('#swl', { textContent: 'চালু', color: '#16a34a' }, 48.85);
capIn('#q8b', 48.72, 49.2);

/* Q9/Q10 50.53-69.0 */
scene('q9', 50.53, 69.02);
wordsIn('#q9a', 51.0, 0.12);
tl.from('#pw', { x: -700, rotate: -6, duration: 0.55, ease: E.snap }, 54.4);
tl.from('#pa', { x: 700, rotate: 6, duration: 0.55, ease: E.snap }, 54.6);
tl.to('#q9x', { opacity: 1, duration: 0.01 }, 55.3);
tl.from('#q9x', { scale: 0, rotate: -90, duration: 0.45, ease: 'back.out(2.4)' }, 55.3);
capIn('#q9b', 55.4, 56.1);
capOut('#q9a', 57.35); capOut('#q9b', 57.35);
tl.to('#q9x', { scale: 0, duration: 0.25 }, 57.35);
tl.to('#pw', { left: 330, top: 640, rotate: 0, opacity: 0, duration: 0.55, ease: 'power3.in' }, 57.4);
tl.to('#pa', { left: 330, top: 640, rotate: 0, opacity: 0, duration: 0.55, ease: 'power3.in' }, 57.4);
tl.to('#q9d', { opacity: 1, duration: 0.3 }, 57.85);
tl.from('#q9d', { scale: 0.5, duration: 0.6, ease: 'back.out(1.6)' }, 57.85);
tl.from('#q9d .drow2', { x: 120, opacity: 0, stagger: 0.12, duration: 0.4 }, 58.2);
capIn('#q9c', 57.57, 58.3);
tl.set('#q9d .src', { scale: 0 }, 0.01);
tl.to('#q9d .drow2:nth-child(2) .src', { scale: 1, duration: 0.35, ease: 'back.out(3)' }, 61.6);
tl.to('#q9d .drow2:nth-child(3) .src', { scale: 1, duration: 0.35, ease: 'back.out(3)' }, 63.0);
tl.to('#q9d .drow2:nth-child(4) .src', { scale: 1, duration: 0.35, ease: 'back.out(3)' }, 64.6);
tl.to('#q9d .drow2:nth-child(5) .src', { scale: 1, duration: 0.35, ease: 'back.out(3)' }, 65.3);
tl.to('#q9d .drow2:nth-child(6) .src', { scale: 1, duration: 0.35, ease: 'back.out(3)' }, 66.0);
tl.to('#q9d .drow2:nth-child(n+3)', { backgroundColor: '#f4f5ff', duration: 0.3, stagger: 0.1 }, 63.0);
capIn('#q9e', 66.99, 67.4);

/* Q11 69.07-72.95 */
scene('q11', 69.07, 72.97);
wordsIn('#q11a', 69.07, 0.1);
markIn('#q11a .mark', 69.4);
tl.from('#q11rib', { scale: 0, rotate: -12, duration: 0.5, ease: E.pop }, 70.28);
wordsIn('#q11c', 70.3, 0.1);
tl.from('#q11btn', { scale: 0, duration: 0.55, ease: 'back.out(2)' }, 71.85);
tl.to('#cur6', { left: 700, top: 1240, duration: 0.45, ease: 'power2.inOut' }, 72.0);
tl.set('#rip6', { left: 670, top: 1200 }, 72.45);
tl.fromTo('#rip6', { scale: 0.2, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.45, immediateRender: false }, 72.45);
tl.to('#q11btn', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 }, 72.45);

/* Q12 73.02-END */
tl.to('#brand', { autoAlpha: 0, duration: 0.3 }, 72.75);
tl.to('#endbg', { opacity: 1, duration: 0.45 }, 72.75);
scene('q12', 73.0, END + 1);
tl.from('#q12logo', { scale: 0, rotate: -40, duration: 0.6, ease: 'back.out(2)' }, 73.02);
tl.fromTo('#q12ring', { scale: 0.5, opacity: 1 }, { scale: 1.7, opacity: 0, duration: 1.2, ease: 'power2.out', immediateRender: false }, 73.15);
tl.from('#q12name span', { y: 70, opacity: 0, stagger: 0.12, duration: 0.55, ease: E.snap }, 73.2);
wordsIn('#q12t1', 74.11, 0.12);
wordsIn('#q12t2', 74.9, 0.14);
tl.from('#q12row', { opacity: 0, y: 30, duration: 0.6 }, 75.6);
tl.set({}, {}, END);

window.DURATION = END;
window.seek = t => { tl.seek(t, false); };
window.ready = document.fonts.ready.then(() => true);
