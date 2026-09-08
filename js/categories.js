"use strict";

const CATEGORIES = [
  { id:'products',      label:'Продукти',           color:'#4ADE80', icon:'basket' },
  { id:'entertainment', label:'Розваги',             color:'#A78BFA', icon:'controller' },
  { id:'housing',       label:'Житло',               color:'#60A5FA', icon:'house' },
  { id:'shopping',      label:'Інтернет покупки',    color:'#FB923C', icon:'bag' },
  { id:'clothes',       label:'Одяг',                color:'#F472B6', icon:'shirt' },
  { id:'other',         label:'Інше',                color:'#94A3B8', icon:'box' },
];
const catById = id => CATEGORIES.find(c=>c.id===id) || CATEGORIES[CATEGORIES.length-1];
