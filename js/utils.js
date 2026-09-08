"use strict";

const MONTHS_UK = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
const MONTHS_UK_NOM = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
const WEEKDAYS_UK = ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'];

function fmtMoney(n){
  const neg = n < 0;
  const abs = Math.abs(n);
  const parts = abs.toFixed(abs % 1 === 0 ? 0 : 2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (neg?'−':'') + '₴ ' + parts.join(',');
}
function fmtDateLabel(iso){
  const d = new Date(iso+'T00:00:00');
  return d.getDate() + ' ' + MONTHS_UK[d.getMonth()];
}
function todayISO(){
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off*60000).toISOString().slice(0,10);
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
