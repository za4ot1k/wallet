"use strict";

function renderStats(){
  const period = ui.statsPeriod;
  const periodMap = {week:'week', month:'month', year:'year'};
  const exps = state.expenses.filter(e=>inPeriod(e.date, periodMap[period]));
  const total = totalExpense(exps);
  const byCat = {};
  CATEGORIES.forEach(c=>byCat[c.id]=0);
  exps.forEach(e=>{ byCat[e.category] = (byCat[e.category]||0) + Number(e.amount); });

  const segments = CATEGORIES.map(c=>({...c, amount: byCat[c.id]||0})).filter(c=>c.amount>0).sort((a,b)=>b.amount-a.amount);

  let donut = '';
  if(total>0){
    const R = 70, C = 2*Math.PI*R;
    let offset = 0;
    donut = segments.map(s=>{
      const frac = s.amount/total;
      const len = frac * C;
      const dash = `${len} ${C-len}`;
      const el = `<circle cx="90" cy="90" r="${R}" fill="none" stroke="${s.color}" stroke-width="20" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}" stroke-linecap="butt" transform="rotate(-90 90 90)"/>`;
      offset += len;
      return el;
    }).join('');
  }

  const periodTitle = period==='week'?'за тиждень':period==='year'?'за рік':`за ${MONTHS_UK_NOM[new Date().getMonth()].toLowerCase()}`;

  return `
    <div class="topbar"><div><h1>Статистика</h1><div class="sub">Огляд ваших витрат</div></div></div>
    <div class="screen">
      <div class="period-tabs" id="statsPeriodTabs">
        <button data-speriod="week" class="${period==='week'?'active':''}">Тиждень</button>
        <button data-speriod="month" class="${period==='month'?'active':''}">Місяць</button>
        <button data-speriod="year" class="${period==='year'?'active':''}">Рік</button>
      </div>
      <div class="glass" style="padding:20px;">
        <div class="balance-label">Витрати ${periodTitle}</div>
        <div class="balance-value num" style="font-size:32px; margin-top:4px;">${fmtMoney(total)}</div>
        ${total>0 ? `
        <div class="donut-wrap">
          <svg viewBox="0 0 180 180" width="180" height="180">${donut}
            <circle cx="90" cy="90" r="70" fill="none" stroke="var(--glass-border-soft)" stroke-width="20" opacity="${segments.length?0:1}"/>
          </svg>
        </div>
        <div class="legend">
          ${segments.map(s=>`
            <div class="legend-row">
              <div class="legend-name"><span class="dot" style="background:${s.color}"></span>${s.label}</div>
              <div class="bar-track"><div class="bar-fill" style="width:${(s.amount/total*100).toFixed(1)}%; background:${s.color};"></div></div>
              <div class="legend-amt num">${fmtMoney(s.amount)}</div>
            </div>
          `).join('')}
        </div>
        ` : `<div class="empty-state" style="padding:30px 10px 6px;"><p>Немає витрат за цей період</p></div>`}
      </div>
    </div>
  `;
}
