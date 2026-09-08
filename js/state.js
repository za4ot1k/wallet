"use strict";

/* ---------- State ---------- */
const STORAGE_KEY = 'wallet-data-v1';
let state = {
  expenses: [],
  incomes: [],
  settings: { theme: 'system', currency: '₴' },
};
let ui = {
  tab: 'home',
  historyFilter: 'all',
  historyPeriod: 'month',
  customFrom: null, customTo: null,
  statsPeriod: 'month',
  modal: null,   // {type:'expense'|'income', mode:'add'|'edit', data}
  confirm: null,
  storageOK: true,
};
