"use strict";

/* ---------- Confirm dialog ---------- */
function askConfirm(opts){ ui.confirm = opts; renderConfirm(); }
function renderConfirm(){
  const root = document.getElementById('confirmRoot');
  if(!ui.confirm){ root.innerHTML = `<div class="confirm-overlay" id="confirmOverlay"></div>`; return; }
  const c = ui.confirm;
  root.innerHTML = `
    <div class="confirm-overlay open" id="confirmOverlay">
      <div class="confirm-card glass">
        <h3>${c.title}</h3>
        ${c.body?`<p>${c.body}</p>`:'<div style="height:12px;"></div>'}
        <div class="confirm-actions">
          <button class="btn btn-ghost" id="confirmCancel">${c.cancelLabel||'Скасувати'}</button>
          <button class="btn ${c.danger?'btn-danger':'btn-primary'}" id="confirmOk">${c.confirmLabel||'Ок'}</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('confirmCancel').addEventListener('click', ()=>{ ui.confirm=null; renderConfirm(); });
  document.getElementById('confirmOk').addEventListener('click', ()=>{ const fn=c.onConfirm; ui.confirm=null; renderConfirm(); if(fn) fn(); });
  document.getElementById('confirmOverlay').addEventListener('click', e=>{ if(e.target.id==='confirmOverlay'){ ui.confirm=null; renderConfirm(); }});
}

/* ---------- Toast ---------- */
function showToast(text, success){
  const root = document.getElementById('toastRoot');
  root.innerHTML = `<div class="toast glass show" id="toastEl" style="${success?'color:var(--green)':''}">${success?ICONS.check:''}${text}</div>`;
  setTimeout(()=>{ const t=document.getElementById('toastEl'); if(t) t.classList.remove('show'); }, 1800);
}
