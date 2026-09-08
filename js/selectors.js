"use strict";

/* ---------- Derived data ---------- */
function totalIncome(list){ return list.reduce((s,i)=>s+Number(i.amount||0),0); }
function totalExpense(list){ return list.reduce((s,i)=>s+Number(i.amount||0),0); }
function getBalance(){ return totalIncome(state.incomes) - totalExpense(state.expenses); }
function allTx(){
  const inc = state.incomes.map(i=>({...i, type:'income'}));
  const exp = state.expenses.map(e=>({...e, type:'expense'}));
  return [...inc, ...exp].sort((a,b)=> (b.date+String(b.createdAt)).localeCompare(a.date+String(a.createdAt)));
}
function recentTx(n=5){ return allTx().slice(0,n); }

function inPeriod(dateStr, period){
  const d = new Date(dateStr+'T00:00:00');
  const now = new Date();
  if(period==='today'){ return dateStr === todayISO(); }
  if(period==='week'){
    const day = (now.getDay()+6)%7; // Mon=0
    const monday = new Date(now); monday.setDate(now.getDate()-day); monday.setHours(0,0,0,0);
    return d >= monday && d <= now;
  }
  if(period==='month'){ return d.getFullYear()===now.getFullYear() && d.getMonth()===now.getMonth(); }
  if(period==='lastmonth'){
    const lm = new Date(now.getFullYear(), now.getMonth()-1, 1);
    return d.getFullYear()===lm.getFullYear() && d.getMonth()===lm.getMonth();
  }
  if(period==='year'){ return d.getFullYear()===now.getFullYear(); }
  if(period==='custom'){
    if(!ui.customFrom || !ui.customTo) return true;
    return dateStr >= ui.customFrom && dateStr <= ui.customTo;
  }
  return true;
}
