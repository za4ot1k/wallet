"use strict";

/*
 * Persistence layer.
 * Primary: window.storage — the key/value store provided when this app
 *          runs as a Claude.ai artifact (persists across sessions there).
 * Fallback: localStorage — used automatically when window.storage isn't
 *          available, e.g. when this project is hosted or opened on its own.
 */
function hasClaudeStorage(){
  return typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function';
}

async function loadState(){
  try{
    if(hasClaudeStorage()){
      const res = await window.storage.get(STORAGE_KEY, false);
      if(res && res.value){
        state = Object.assign(state, JSON.parse(res.value));
        return;
      }
    } else {
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){
        state = Object.assign(state, JSON.parse(raw));
        return;
      }
    }
    seedSampleData();
    await saveState();
  }catch(e){
    seedSampleData();
    ui.storageOK = false;
  }
}

async function saveState(){
  try{
    if(hasClaudeStorage()){
      await window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }catch(e){
    ui.storageOK = false;
  }
}
function seedSampleData(){
  const t = todayISO();
  const daysAgo = n => { const d=new Date(); d.setDate(d.getDate()-n); return d.toISOString().slice(0,10); };
  state.incomes = [
    { id:uid(), amount:25000, source:'Зарплата', description:'', date: daysAgo(8), createdAt: Date.now()-8*86400000 },
    { id:uid(), amount:20000, source:'Фріланс',  description:'Проєкт для клієнта', date: daysAgo(3), createdAt: Date.now()-3*86400000 },
  ];
  state.expenses = [
    { id:uid(), amount:450,  category:'products',      description:'Сільпо', date: t, createdAt: Date.now() },
    { id:uid(), amount:1200, category:'housing',        description:'Комунальні', date: daysAgo(1), createdAt: Date.now()-86400000 },
    { id:uid(), amount:299,  category:'entertainment',  description:'Кіно', date: daysAgo(2), createdAt: Date.now()-2*86400000 },
    { id:uid(), amount:1590, category:'shopping',       description:'Rozetka', date: daysAgo(4), createdAt: Date.now()-4*86400000 },
    { id:uid(), amount:850,  category:'clothes',        description:'', date: daysAgo(6), createdAt: Date.now()-6*86400000 },
    { id:uid(), amount:320,  category:'other',          description:'Аптека', date: daysAgo(7), createdAt: Date.now()-7*86400000 },
  ];
}
