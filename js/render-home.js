"use strict";

function renderHome(){
  const bal = getBalance();
  const inc = totalIncome(state.incomes);
  const exp = totalExpense(state.expenses);
  const recents = recentTx(5);

  return `
    <div class="topbar">
      <div><h1>Привіт</h1><div class="sub">${new Date().getDate()} ${MONTHS_UK[new Date().getMonth()]}, сьогодні</div></div>
    </div>
    <div class="screen">
      <div class="balance-card glass">
        <div class="balance-label">Залишок</div>
        <div class="balance-value num ${bal<0?'neg':''}">${fmtMoney(bal)}</div>
        <div class="balance-row">
          <div class="mini-card glass">
            <div class="mini-label"><span class="dot" style="background:var(--green)"></span>Прибутки</div>
            <div class="mini-value num" style="color:var(--green)">${fmtMoney(inc)}</div>
          </div>
          <div class="mini-card glass">
            <div class="mini-label"><span class="dot" style="background:var(--red)"></span>Витрати</div>
            <div class="mini-value num" style="color:var(--red)">${fmtMoney(exp)}</div>
          </div>
        </div>
      </div>

      <button class="add-btn" id="btnAddExpense">${ICONS.plus}Додати витрату</button>
      <button class="add-income-link" id="btnAddIncome">${ICONS.plus}Додати прибуток</button>

      <div class="section-title">Останні транзакції ${recents.length? `<span class="link" data-tab-link="history">Усі</span>`:''}</div>
      ${recents.length ? recents.map(txRow).join('') : emptyState('home')}
    </div>
  `;
}

function txRow(tx){
  if(tx.type==='income'){
    return `<div class="tx glass" data-tx-type="income" data-tx-id="${tx.id}">
      ${iconCircle({color:'#3FDA9A', icon:'income'})}
      <div class="tx-mid"><div class="tx-title">${escapeHtml(tx.source||'Прибуток')}</div><div class="tx-sub">${escapeHtml(tx.description||'')}</div></div>
      <div class="tx-right"><div class="tx-amount pos">+${fmtMoney(tx.amount)}</div><div class="tx-date">${fmtDateLabel(tx.date)}</div></div>
    </div>`;
  }
  const cat = catById(tx.category);
  return `<div class="tx glass" data-tx-type="expense" data-tx-id="${tx.id}">
    ${iconCircle(cat)}
    <div class="tx-mid"><div class="tx-title">${cat.label}</div><div class="tx-sub">${escapeHtml(tx.description||'')}</div></div>
    <div class="tx-right"><div class="tx-amount neg">−${fmtMoney(tx.amount)}</div><div class="tx-date">${fmtDateLabel(tx.date)}</div></div>
  </div>`;
}

function emptyState(kind){
  if(kind==='income'){
    return `<div class="empty-state">${ICONS.briefcase.replace('<svg ','<svg style="width:56px;height:56px;opacity:.5;margin-bottom:14px;" ')}
      <h3>Прибутків поки немає</h3><p>Додайте свій перший прибуток</p>
      <button class="btn btn-primary" id="btnEmptyAddIncome" style="max-width:240px;">${ICONS.plus} Додати прибуток</button></div>`;
  }
  return `<div class="empty-state">${ICONS.emptyBox.replace('<svg ','<svg style="width:56px;height:56px;opacity:.5;margin-bottom:14px;" ')}
    <h3>Витрат поки немає</h3><p>Додайте свою першу витрату</p>
    <button class="btn btn-primary" id="btnEmptyAdd" style="max-width:240px;">${ICONS.plus} Додати витрату</button></div>`;
}
