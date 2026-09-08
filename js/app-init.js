"use strict";

/*
 * When opened as a plain browser tab (not installed to the Home Screen),
 * briefly allow the page to scroll 1px on load — this nudges Safari/Chrome
 * to collapse their address bar. Runs once, before any user interaction,
 * so it never conflicts with the locked #app scroll container used
 * elsewhere to keep the bottom nav from jumping.
 */
function collapseAddressBarOnce(){
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if(isStandalone) return; // already installed as an app — no browser chrome to hide
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
  window.scrollTo(0, 1);
  setTimeout(()=>{
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    window.scrollTo(0, 0);
  }, 200);
}

(async function init(){
  collapseAddressBarOnce();
  await loadState();
  render();
})();

