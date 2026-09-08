"use strict";

function renderSettings(){
  const th = state.settings.theme;
  return `
    <div class="topbar"><div><h1>Налаштування</h1></div></div>
    <div class="screen">
      <div class="section-title">Загальні</div>
      <div class="glass">
        <div class="settings-row"><div class="label">Валюта</div><div class="val">₴ Гривня</div></div>
        <div class="settings-row"><div class="label">Тема</div>
          <div class="seg" id="themeSeg">
            <button data-theme="light" class="${th==='light'?'active':''}">Світла</button>
            <button data-theme="dark" class="${th==='dark'?'active':''}">Темна</button>
            <button data-theme="system" class="${th==='system'?'active':''}">Системна</button>
          </div>
        </div>
      </div>

      <div class="section-title">Дані</div>
      <div class="glass">
        <div class="settings-row"><div class="label">Транзакцій збережено</div><div class="val">${state.expenses.length + state.incomes.length}</div></div>
        <div class="settings-row"><div class="label">Статус синхронізації</div><div class="val">${ui.storageOK ? 'Збережено локально' : 'Тимчасово, не збережено'}</div></div>
      </div>

      <div class="section-title">Небезпечна зона</div>
      <button class="btn btn-danger" id="btnResetAll">${ICONS.trash} Видалити всі дані</button>
    </div>
  `;
}
