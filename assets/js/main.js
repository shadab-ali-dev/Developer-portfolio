function updateClock() {
  const t = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' });
  const el = document.getElementById('ist-clock');
  if (el) el.textContent = `Right now, it's ${t} in Kolkata, India.`;
}
updateClock(); setInterval(updateClock, 30000);

const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('show')), { threshold: .12 });
document.querySelectorAll('.exp-card,.cred,.case').forEach(el => { el.classList.add('reveal'); obs.observe(el); });

document.querySelectorAll('.f-btn').forEach(btn => btn.onclick = () => {
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.f;
  document.querySelectorAll('.case').forEach(c => c.classList.toggle('hide', f !== 'all' && !c.dataset.cat.includes(f)));
});

const modal = document.getElementById('modal');
document.querySelectorAll('.case').forEach(c => c.onclick = () => {
  document.getElementById('m-title').textContent = c.querySelector('h3').textContent;
  document.getElementById('m-desc').textContent = c.dataset.detail || c.querySelector('p').textContent;
  const cv = document.getElementById('m-cv');
  cv.href = c.dataset.cv; cv.textContent = `Download ${c.dataset.cvname} CV`;
  modal.classList.add('open');
});
if (modal) modal.onclick = e => { if (e.target === modal || e.target.classList.contains('m-close')) modal.classList.remove('open'); };
document.querySelectorAll('.sk-pill').forEach(p => p.onclick = () => {
  const btn = document.querySelector(`.f-btn[data-f="${p.dataset.target}"]`);
  if (btn) btn.click();
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});
const copyBtn = document.getElementById('copy-email');
if (copyBtn) copyBtn.onclick = () => {
  navigator.clipboard.writeText('shadab012ali@gmail.com');
  copyBtn.textContent = 'Copied! ✓';
  setTimeout(() => copyBtn.textContent = 'Copy Email', 2000);
};
window.addEventListener('scroll', () => {
  const s = document.documentElement;
  const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
  const bar = document.getElementById('progress');
  if (bar) bar.style.width = pct + '%';
});
