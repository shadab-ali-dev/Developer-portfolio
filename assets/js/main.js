document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const pipeBox = Object.assign(document.createElement('div'), { className: 'pipe' });
  const mDesc = document.getElementById('m-desc');
  if (mDesc) mDesc.after(pipeBox);

  const pipes = {
    'Job-Hunter': ['RSS / Job APIs', 'Cloudflare DoH MX', 'Groq Llama Scorer', 'Role CV Router'],
    'Clipper': ['PS5 RTMP Stream', 'Groq Whisper STT', 'Llama Hook Scorer', 'FFmpeg 9:16 Render'],
    'Oracle': ['OEM Health Alerts', '100+ SQL Tuning', 'RMAN Crosscheck', '96% SLA Resolution']
  };

  document.querySelectorAll('.f-btn').forEach(b => b.onclick = () => {
    document.querySelectorAll('.f-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const f = b.dataset.f;
    document.querySelectorAll('.case').forEach(c => {
      c.style.display = (f === 'all' || (c.dataset.cat || '').includes(f)) ? 'grid' : 'none';
    });
  });

  document.querySelectorAll('.case').forEach(c => {
    c.onmousemove = e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    };
    c.onclick = () => {
      const h = c.querySelector('h3').textContent;
      document.getElementById('m-title').textContent = h;
      if (mDesc) mDesc.textContent = c.dataset.detail || c.querySelector('p').textContent;
      const key = Object.keys(pipes).find(k => h.includes(k));
      pipeBox.style.display = key ? 'flex' : 'none';
      if (key) pipeBox.innerHTML = pipes[key].map(s => `<span>${s}</span>`).join(' &rarr; ');
      const cv = document.getElementById('m-cv');
      if (cv) { cv.href = c.dataset.cv || '#'; cv.textContent = `Download ${c.dataset.cvname || 'Resume'} CV`; }
      const repo = document.getElementById('m-repo');
      if (repo) { repo.style.display = c.dataset.repo ? 'inline-flex' : 'none'; if (c.dataset.repo) repo.href = c.dataset.repo; }
      if (modal) modal.classList.add('open');
    };
  });

  if (modal) modal.onclick = e => { if (e.target === modal || e.target.classList.contains('m-close')) modal.classList.remove('open'); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal) modal.classList.remove('open'); });

  document.querySelectorAll('.sk-pill').forEach(p => p.onclick = () => {
    const btn = document.querySelector(`.f-btn[data-f="${p.dataset.target}"]`);
    if (btn) btn.click();
    const pr = document.getElementById('projects');
    if (pr) pr.scrollIntoView({ behavior: 'smooth' });
  });

  const toast = Object.assign(document.body.appendChild(document.createElement('div')), { className: 'toast' });
  const showToast = msg => { toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); if (navigator.vibrate) navigator.vibrate(10); };

  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) copyBtn.onclick = () => { navigator.clipboard.writeText('shadab012ali@gmail.com'); showToast('Copied shadab012ali@gmail.com ✓'); };

  const av = document.querySelector('.avail');
  const tick = () => {
    if (!av) return;
    const d = new Date();
    const t = tz => d.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
    av.textContent = `● Open to Work • IST ${t('Asia/Kolkata')} | UAE ${t('Asia/Dubai')} | CET ${t('Europe/Luxembourg')}`;
  };
  

  const mk = document.querySelector('.case .mockup');
  if (mk) {
    const b = Object.assign(mk.appendChild(document.createElement('button')), { className: 'sim-btn', textContent: '▶ Simulate Run' });
    b.onclick = e => {
      e.stopPropagation();
      const steps = ['[1/4] Fetching 4 global regions...', '[2/4] DoH MX verified (0 bounces)...', '[3/4] Groq Llama score: 94/100...', '[4/4] Sent AI Automation CV ✓'];
      let i = 0; b.disabled = true;
      const iv = setInterval(() => {
        b.textContent = steps[i++];
        if (i === steps.length) { clearInterval(iv); setTimeout(() => { b.textContent = '▶ Simulate Run'; b.disabled = false; }, 1800); }
      }, 650);
    };
  }

  const obs = new IntersectionObserver(es => es.forEach(e => { e.target.classList.toggle('in', e.isIntersecting); }), { threshold: 0.1 });
  document.querySelectorAll('.exp-card,.cred,.case').forEach(el => { el.classList.add('reveal'); obs.observe(el); });

  const dock = Object.assign(document.body.appendChild(document.createElement('div')), {
    className: 'mob-dock',
    innerHTML: '<a class="pri" href="resumes/Shadab_Ali_AI_Automation_Engineer_Resume.pdf" target="_blank">Resume &darr;</a><a href="#projects">Projects</a><button id="dk-mail">Email</button>'
  });
  document.getElementById('dk-mail').onclick = () => { navigator.clipboard.writeText('shadab012ali@gmail.com'); showToast('Email copied ✓'); };

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    dock.classList.toggle('hide', y > lastY && y > 180);
    lastY = y;
    const bar = document.getElementById('progress');
    const s = document.documentElement;
    if (bar) bar.style.width = ((s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100) + '%';
  }, { passive: true });
});
const ft = [...document.querySelectorAll('footer *')].find(el => el.children.length === 0 && el.textContent.includes('7:50 PM'));
if (ft) { const u = () => ft.textContent = `Right now, it's ${new Date().toLocaleTimeString('en-US',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'})} in Kolkata, India.`; u(); setInterval(u, 30000); }

// Dark Mode, Live-Clipper Sim, Animated Metrics, Share & Haptics
(() => {
  const buzz = () => { if (navigator.vibrate) navigator.vibrate(15); };
  const nav = document.querySelector('nav .links') || document.querySelector('nav');
  if (nav) {
    const tb = Object.assign(nav.appendChild(document.createElement('button')), { className: 'theme-btn', textContent: '☾' });
    if (localStorage.getItem('theme') === 'dark') { document.documentElement.classList.add('dark');document.body.classList.add('dark'); tb.textContent = '☀'; }
    tb.onclick = () => { buzz(); const d = (document.documentElement.classList.toggle('dark'),document.body.classList.toggle('dark')); tb.textContent = d ? '☀' : '☾'; localStorage.setItem('theme', d ? 'dark' : 'light'); };
  }

  const mks = document.querySelectorAll('.case .mockup');
  if (mks[2]) {
    const b2 = Object.assign(mks[2].appendChild(document.createElement('button')), { className: 'sim-btn', textContent: '▶ Simulate Clipper' });
    b2.onclick = e => {
      e.stopPropagation(); buzz();
      const s = ['[1/4] Capturing PS5 1080p60 RTMP...', '[2/4] Groq Whisper STT transcript...', '[3/4] Llama hook score: 9.4/10...', '[4/4] Exported 9:16 Short ✓'];
      let i = 0; b2.disabled = true;
      const iv = setInterval(() => { b2.textContent = s[i++]; if (i === s.length) { clearInterval(iv); setTimeout(() => { b2.textContent = '▶ Simulate Clipper'; b2.disabled = false; }, 1800); } }, 650);
    };
  }

  const exp = document.querySelector('.exp-card');
  if (exp) {
    let ran = false;
    new IntersectionObserver(es => {
      if (es[0].isIntersecting && !ran) {
        ran = true;
        exp.querySelectorAll('li').forEach(li => {
          li.innerHTML = li.innerHTML.replace(/(\d+)%/g, '<b class="cnt" data-t="$1">0</b>%');
        });
        exp.querySelectorAll('.cnt').forEach(el => {
          const t = +el.dataset.t; let c = 0;
          const iv = setInterval(() => { c += Math.max(1, Math.ceil(t / 45)); if (c >= t) { el.textContent = t; clearInterval(iv); } else el.textContent = c; }, 55);
        });
      }
    }, { threshold: 0.3 }).observe(exp);
  }

  const ftLinks = document.querySelector('footer .links') || document.getElementById('copy-email')?.parentElement;
  if (ftLinks) {
    const sb = Object.assign(ftLinks.appendChild(document.createElement('button')), { className: 'cv-btn sec', textContent: 'Share ↗' });
    sb.onclick = () => {
      buzz();
      if (navigator.share) navigator.share({ title: 'Shadab Ali — AI Automation & Oracle DBA Portfolio', url: location.href });
      else { navigator.clipboard.writeText(location.href); alert('Portfolio link copied!'); }
    };
  }

  document.querySelectorAll('a,button').forEach(el => el.addEventListener('click', buzz, { passive: true }));
})();

// Pulsing Clock Dot, Desktop Scroll-Reveal & Remaining Project Animations
(() => {
  const av = document.querySelector('.avail');
  const tickDot = () => {
    if (!av) return;
    const d = new Date();
    const t = tz => d.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
    av.innerHTML = `<span class="dot"></span> Open to Work • IST ${t('Asia/Kolkata')} | UAE ${t('Asia/Dubai')} | CET ${t('Europe/Luxembourg')}`;
  };
  tickDot(); setInterval(tickDot, 30000);

  const obs2 = new IntersectionObserver(es => es.forEach(e => {
    e.target.classList.toggle('in', e.isIntersecting);
  }), { threshold: 0.05 });
  document.querySelectorAll('.hero,.stack,.exp-card,.cred,.case,footer').forEach(el => {
    el.classList.add('reveal');
    obs2.observe(el);
  });

  const mks = document.querySelectorAll('.case .mockup');
  if (mks[1]) {
    const bRman = Object.assign(mks[1].appendChild(document.createElement('button')), { className: 'sim-btn grn', textContent: '▶ Run RMAN Check' });
    bRman.onclick = e => {
      e.stopPropagation();
      if (navigator.vibrate) navigator.vibrate(15);
      const s = ['[1/4] RMAN> CROSSCHECK BACKUP...', '[2/4] RESYNC CATALOG synced...', '[3/4] FRA usage: 14.2% (Healthy)...', '[4/4] Backup & SLA Verified ✓'];
      let i = 0; bRman.disabled = true;
      const iv = setInterval(() => {
        bRman.textContent = s[i++];
        if (i === s.length) { clearInterval(iv); setTimeout(() => { bRman.textContent = '▶ Run RMAN Check'; bRman.disabled = false; }, 1800); }
      }, 650);
    };
  }

  if (mks[3]) {
    const ov = Object.assign(mks[3].appendChild(document.createElement('div')), { className: 'live-line' });
    const frames = ['[Overlay] 60.0 FPS • Frame: 8.2ms ✓', '[Overlay] 59.9 FPS • GPU Sync OK ✓', '[Overlay] 60.0 FPS • Zero Drops ✓'];
    let k = 0; ov.textContent = frames[0];
    setInterval(() => { k = (k + 1) % frames.length; ov.style.opacity = '.35'; setTimeout(() => { ov.textContent = frames[k]; ov.style.opacity = '.95'; }, 220); }, 2200);
  }

  if (mks[4]) {
    const dj = Object.assign(mks[4].appendChild(document.createElement('div')), { className: 'live-line' });
    const reqs = ['[24/Nov] "GET /menu/ HTTP/1.1" 200', '[24/Nov] "POST /order/new/ HTTP/1.1" 201', '[24/Nov] "GET /kitchen/queue/ HTTP/1.1" 200'];
    let j = 0; dj.textContent = reqs[0];
    setInterval(() => { j = (j + 1) % reqs.length; dj.style.opacity = '.35'; setTimeout(() => { dj.textContent = reqs[j]; dj.style.opacity = '.95'; }, 220); }, 2400);
  }
})();

(() => {
  const mks = document.querySelectorAll('.case .mockup');
  if (mks[3]) {
    const b3 = Object.assign(mks[3].appendChild(document.createElement('button')), { className: 'sim-btn blu', textContent: '▶ Test 60FPS Overlay' });
    b3.onclick = e => {
      e.stopPropagation();
      if (navigator.vibrate) navigator.vibrate(15);
      const st = ['[1/4] Mounting 100% Fluid Grid...', '[2/4] GPU Layer Composited (8.1ms)...', '[3/4] Locked 60.0 FPS • 0 Dropped...', '[4/4] Responsive HUD Ready ✓'];
      let i = 0; b3.disabled = true;
      const iv = setInterval(() => {
        b3.textContent = st[i++];
        if (i === st.length) { clearInterval(iv); setTimeout(() => { b3.textContent = '▶ Test 60FPS Overlay'; b3.disabled = false; }, 1800); }
      }, 650);
    };
  }
  if (mks[4]) {
    const b4 = Object.assign(mks[4].appendChild(document.createElement('button')), { className: 'sim-btn ind', textContent: '▶ Simulate Order' });
    b4.onclick = e => {
      e.stopPropagation();
      if (navigator.vibrate) navigator.vibrate(15);
      const st = ['[1/4] POST /order/create/ (201)...', '[2/4] Kitchen Queue Ticket #104...', '[3/4] Table 06 Status: Served...', '[4/4] Invoice & GST Settled ✓'];
      let i = 0; b4.disabled = true;
      const iv = setInterval(() => {
        b4.textContent = st[i++];
        if (i === st.length) { clearInterval(iv); setTimeout(() => { b4.textContent = '▶ Simulate Order'; b4.disabled = false; }, 1800); }
      }, 650);
    };
  }
})();
