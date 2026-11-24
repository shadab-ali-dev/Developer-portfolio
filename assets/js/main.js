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
  tick(); setInterval(tick, 30000);

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

  const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }), { threshold: 0.1 });
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
