"use strict";

function attachScreenEvents(){
  // tx rows open edit
  document.querySelectorAll('.tx').forEach(el=>{
    el.addEventListener('click', ()=>{
      const id = el.dataset.txId, type = el.dataset.txType;
      if(type==='expense'){
        const item = state.expenses.find(x=>x.id===id);
        if(item) openModal('expense','edit', item);
      } else {
        const item = state.incomes.find(x=>x.id===id);
        if(item) openModal('income','edit', item);
      }
    });
  });

  const bAddExp = document.getElementById('btnAddExpense'); if(bAddExp) bAddExp.addEventListener('click', ()=>openModal('expense','add',{}));
  const bAddInc = document.getElementById('btnAddIncome'); if(bAddInc) bAddInc.addEventListener('click', ()=>openModal('income','add',{}));
  const bEmptyAdd = document.getElementById('btnEmptyAdd'); if(bEmptyAdd) bEmptyAdd.addEventListener('click', ()=>openModal('expense','add',{}));
  const bEmptyAddInc = document.getElementById('btnEmptyAddIncome'); if(bEmptyAddInc) bEmptyAddInc.addEventListener('click', ()=>openModal('income','add',{}));

  document.querySelectorAll('[data-tab-link]').forEach(el=>{
    el.addEventListener('click', ()=>{ ui.tab = el.dataset.tabLink; render(); });
  });

  const periodTabs = document.getElementById('periodTabs');
  if(periodTabs) periodTabs.addEventListener('click', e=>{
    const b = e.target.closest('button'); if(!b) return;
    ui.historyPeriod = b.dataset.period; render();
  });
  const custFrom = document.getElementById('customFrom');
  const custTo = document.getElementById('customTo');
  if(custFrom) custFrom.addEventListener('change', e=>{ ui.customFrom = e.target.value; render(); });
  if(custTo) custTo.addEventListener('change', e=>{ ui.customTo = e.target.value; render(); });

  const filterTabs = document.getElementById('filterTabs');
  if(filterTabs) filterTabs.addEventListener('click', e=>{
    const b = e.target.closest('button'); if(!b) return;
    ui.historyFilter = b.dataset.filter; render();
  });

  const statsPeriodTabs = document.getElementById('statsPeriodTabs');
  if(statsPeriodTabs) statsPeriodTabs.addEventListener('click', e=>{
    const b = e.target.closest('button'); if(!b) return;
    ui.statsPeriod = b.dataset.speriod; render();
  });

  const themeSeg = document.getElementById('themeSeg');
  if(themeSeg) themeSeg.addEventListener('click', e=>{
    const b = e.target.closest('button'); if(!b) return;
    state.settings.theme = b.dataset.theme; saveState(); render();
  });

  const btnResetAll = document.getElementById('btnResetAll');
  if(btnResetAll) btnResetAll.addEventListener('click', ()=>{
    askConfirm({
      title:'Видалити всі дані?',
      body:'Цю дію неможливо скасувати. Усі витрати та прибутки буде видалено.',
      confirmLabel:'Видалити все',
      danger:true,
      onConfirm: async ()=>{
        state.expenses = []; state.incomes = [];
        await saveState();
        render();
        showToast('Усі дані видалено');
      }
    });
  });
}

navbar.addEventListener('click', e=>{
  const item = e.target.closest('.nav-item'); if(!item) return;
  ui.tab = item.dataset.tab; render();
});
