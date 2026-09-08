"use strict";

/* ---------- Rendering ---------- */
const app = document.getElementById('app');
const navbar = document.getElementById('navbar');

function render(){
  applyTheme();
  navbar.style.display = 'flex';
  document.querySelectorAll('.nav-item').forEach(el=>{
    el.classList.toggle('active', el.dataset.tab === ui.tab);
  });
  let html = '';
  if(ui.tab==='home') html = renderHome();
  else if(ui.tab==='history') html = renderHistory();
  else if(ui.tab==='stats') html = renderStats();
  else if(ui.tab==='settings') html = renderSettings();
  app.innerHTML = html;
  attachScreenEvents();
  renderModal();
  renderConfirm();
}

function applyTheme(){
  let t = state.settings.theme;
  if(t==='system'){
    t = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', t);
}

function iconCircle(cat, size=42){
  return `<div class="tx-icon" style="background:${cat.color}22; color:${cat.color}; width:${size}px; height:${size}px;">${ICONS[cat.icon]}</div>`;
}
