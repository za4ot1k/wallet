"use strict";

/* ---------- Modal (Add/Edit) ---------- */
function renderModal(){
  const root = document.getElementById('modalRoot');
  if(!ui.modal){ root.innerHTML = `<div class="modal-overlay" id="modalOverlay"></div>`; return; }
  const m = ui.modal;
  const isExpense = m.type==='expense';
  const d = m.data;

  let body = '';
  if(isExpense){
    body = `
      <div class="amount-wrap">
        <input type="number" inputmode="decimal" class="amount-input num" id="fAmount" placeholder="₴ 0" value="${d.amount||''}">
      </div>
      <div class="field-label">Категорія</div>
      <div class="cat-grid" id="catGrid">
        ${CATEGORIES.map(c=>`
          <div class="cat-chip ${d.category===c.id?'selected':''}" data-cat="${c.id}" style="--chip-color:${c.color}; --chip-bg:${c.color}1A;">
            <div class="icon-circ" style="background:${c.color}22; color:${c.color};">${ICONS[c.icon]}</div>
            <span>${c.label}</span>
          </div>
        `).join('')}
      </div>
      <div class="field-label">Назва або опис</div>
      <input type="text" class="text-input" id="fDesc" placeholder="Наприклад, Продукти на тиждень" value="${escapeHtml(d.description||'')}">
      <div class="field-label">Дата</div>
      <input type="date" class="text-input" id="fDate" value="${d.date||todayISO()}">
      <div style="height:22px;"></div>
      <button class="btn btn-primary" id="btnSave">${m.mode==='edit'?'Зберегти зміни':'Зберегти витрату'}</button>
      ${m.mode==='edit' ? `<div style="height:10px;"></div><button class="btn btn-danger" id="btnDelete">${ICONS.trash} Видалити витрату</button>`:''}
    `;
  } else {
    body = `
      <div class="amount-wrap">
        <input type="number" inputmode="decimal" class="amount-input num" id="fAmount" placeholder="₴ 0" value="${d.amount||''}">
      </div>
      <div class="field-label">Джерело</div>
      <input type="text" class="text-input" id="fSource" placeholder="Наприклад, Зарплата" value="${escapeHtml(d.source||'')}">
      <div class="field-label">Опис (необов'язково)</div>
      <input type="text" class="text-input" id="fDesc" placeholder="Додатковий опис" value="${escapeHtml(d.description||'')}">
      <div class="field-label">Дата</div>
      <input type="date" class="text-input" id="fDate" value="${d.date||todayISO()}">
      <div style="height:22px;"></div>
      <button class="btn btn-primary" id="btnSave">${m.mode==='edit'?'Зберегти зміни':'Зберегти прибуток'}</button>
      ${m.mode==='edit' ? `<div style="height:10px;"></div><button class="btn btn-danger" id="btnDelete">${ICONS.trash} Видалити прибуток</button>`:''}
    `;
  }

  root.innerHTML = `
    <div class="modal-overlay open" id="modalOverlay">
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-head">
          <h2>${isExpense ? (m.mode==='edit'?'Деталі витрати':'Нова витрата') : (m.mode==='edit'?'Деталі прибутку':'Новий прибуток')}</h2>
          <div class="modal-close" id="modalCloseBtn">${ICONS.x}</div>
        </div>
        <div class="modal-body">${body}</div>
      </div>
    </div>
  `;

  document.getElementById('modalOverlay').addEventListener('click', e=>{ if(e.target.id==='modalOverlay') closeModal(); });
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);

  if(isExpense){
    document.getElementById('catGrid').addEventListener('click', e=>{
      const chip = e.target.closest('.cat-chip'); if(!chip) return;
      ui.modal.data.category = chip.dataset.cat;
      renderModal();
    });
  }
  document.getElementById('btnSave').addEventListener('click', ()=>saveModal());
  const delBtn = document.getElementById('btnDelete');
  if(delBtn) delBtn.addEventListener('click', ()=>{
    askConfirm({
      title: isExpense ? 'Видалити цю витрату?' : 'Видалити цей прибуток?',
      body: '',
      confirmLabel: 'Видалити',
      cancelLabel: 'Скасувати',
      danger: true,
      onConfirm: ()=>{
        if(isExpense){ state.expenses = state.expenses.filter(x=>x.id!==d.id); }
        else{ state.incomes = state.incomes.filter(x=>x.id!==d.id); }
        saveState();
        closeModal();
        render();
        showToast('Видалено');
      }
    });
  });
}

function openModal(type, mode, data){
  ui.modal = { type, mode, data: Object.assign({ date: todayISO(), category: type==='expense'?'products':undefined }, data||{}) };
  renderModal();
}
function closeModal(){ ui.modal = null; renderModal(); }

function saveModal(){
  const m = ui.modal;
  const amountEl = document.getElementById('fAmount');
  const amount = parseFloat(amountEl.value);
  if(!amount || amount<=0){ amountEl.focus(); amountEl.style.color = 'var(--red)'; return; }
  const date = document.getElementById('fDate').value || todayISO();

  if(m.type==='expense'){
    const category = m.data.category || 'other';
    const description = document.getElementById('fDesc').value.trim();
    if(m.mode==='add'){
      state.expenses.unshift({ id:uid(), amount, category, description, date, createdAt: Date.now() });
    } else {
      const item = state.expenses.find(x=>x.id===m.data.id);
      if(item){ item.amount=amount; item.category=category; item.description=description; item.date=date; }
    }
  } else {
    const source = document.getElementById('fSource').value.trim() || 'Прибуток';
    const description = document.getElementById('fDesc').value.trim();
    if(m.mode==='add'){
      state.incomes.unshift({ id:uid(), amount, source, description, date, createdAt: Date.now() });
    } else {
      const item = state.incomes.find(x=>x.id===m.data.id);
      if(item){ item.amount=amount; item.source=source; item.description=description; item.date=date; }
    }
  }
  saveState();
  closeModal();
  render();
  showToast(m.mode==='add' ? 'Збережено' : 'Зміни збережено', true);
}
