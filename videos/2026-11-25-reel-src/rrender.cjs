const { chromium } = require('playwright');
const { spawn } = require('child_process');
(async () => {
  const FPS = 30, AUDIO = process.argv[2], OUT = process.argv[3];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + __dirname + '/reel.html'); await p.evaluate(() => window.ready); await p.waitForTimeout(300);
  const dur = await p.evaluate(() => window.DURATION); const N = Math.round(dur * FPS);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', AUDIO,
    '-filter_complex', '[1:a]apad,afade=t=out:st=' + (dur - 0.6) + ':d=0.6[a]', '-map', '0:v', '-map', '[a]', '-t', String(dur),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = 0; i < N; i++) {
    await p.evaluate(t => window.seek(t), i / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`frame ${i}/${N} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', N, 'frames');
})();
