"use strict";

function renderHistory(){
  const filter = ui.historyFilter;
  const period = ui.historyPeriod;
  let list = allTx().filter(tx => inPeriod(tx.date, period));
  if(filter==='expense') list = list.filter(t=>t.type==='expense');
  if(filter==='income') list = list.filter(t=>t.type==='income');

  const groups = {};
  list.forEach(tx=>{
    const key = tx.date;
    (groups[key] = groups[key]||[]).push(tx);
  });
  const keys = Object.keys(groups).sort().reverse();

  const periodLabels = {today:'Сьогодні', week:'Цей тиждень', month:'Цей місяць', lastmonth:'Попередній місяць', year:'Рік', custom:'Період'};

  return `
    <div class="topbar"><div><h1>Історія</h1><div class="sub">${list.length} транзакцій</div></div></div>
    <div class="screen">
      <div class="period-tabs" id="periodTabs">
        ${['today','week','month','lastmonth','custom'].map(p=>`<button data-period="${p}" class="${period===p?'active':''}">${p==='today'?'Сьогодні':p==='week'?'Тиждень':p==='month'?'Місяць':p==='lastmonth'?'Мин. місяць':'Період'}</button>`).join('')}
      </div>
      ${period==='custom' ? `
        <div class="custom-range">
          <input type="date" class="text-input" id="customFrom" value="${ui.customFrom||''}">
          <input type="date" class="text-input" id="customTo" value="${ui.customTo||''}">
        </div>
      `:''}
      <div class="filter-tabs" id="filterTabs">
        <button data-filter="all" class="${filter==='all'?'active':''}">Усі</button>
        <button data-filter="expense" class="${filter==='expense'?'active':''}">Витрати</button>
        <button data-filter="income" class="${filter==='income'?'active':''}">Прибутки</button>
      </div>
      ${keys.length ? keys.map(k=>`
        <div class="date-group-label">${fmtDateLabel(k)}</div>
        ${groups[k].map(txRow).join('')}
      `).join('') : `<div class="empty-state">${ICONS.emptyBox.replace('<svg ','<svg style="width:48px;height:48px;opacity:.4;margin-bottom:10px;" ')}<h3>Нічого не знайдено</h3><p>Спробуйте інший період або фільтр</p></div>`}
    </div>
  `;
}
