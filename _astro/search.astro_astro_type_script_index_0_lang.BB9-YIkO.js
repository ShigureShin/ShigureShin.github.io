function e(){let e=document.getElementById(`search-input`);if(!e)return;let t=document.getElementById(`search-results`),n=document.getElementById(`search-status`),r=document.getElementById(`search-initial`);if(!t||!n||!r)return;let i=e.dataset.noResults||`No results`,a=e.dataset.resultCount||`{count} results`,o=e.dataset.devHint||``,s=e.dataset.viewDetail||`View full article`,c=e.dataset.loading||`Loading...`,l=e.dataset.loadFailed||`Failed to load`,u=null,d=!1,f=Function(`url`,`return import(url)`);async function p(){if(u!==null||d)return u;try{u=await f(`/pagefind/pagefind.js`),await u.init()}catch{u=null,d=!0}return u}function m(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}let h=new Map;async function g(e){if(h.has(e))return h.get(e);let t=await(await fetch(e)).text(),n=new DOMParser().parseFromString(t,`text/html`).querySelector(`article[data-pagefind-body] .prose`);if(!n)return null;n.querySelectorAll(`[data-pagefind-ignore]`).forEach(e=>e.remove());let r=n.innerHTML;return h.set(e,r),r}async function _(e,t){let n=e.querySelector(`.preview-content`);if(n&&n.dataset.loaded!==`true`)try{let e=await g(t);e?(n.innerHTML=e,n.dataset.loaded=`true`):n.innerHTML=`<p class="opacity-50 text-center py-8">${l}</p>`}catch{n.innerHTML=`<p class="opacity-50 text-center py-8">${l}</p>`}}function v(e){let t=e.meta?.title||e.url,n=e.meta?.date||``;return`
        <div class="search-item" data-url="${e.url}">
          <div
            class="result-card flex items-center justify-between gap-4 p-4 cursor-pointer select-none"
          >
            <div class="flex-1 min-w-0">
              <h2 class="text-base font-semibold text-primary truncate">${m(t)}</h2>
              <div class="flex items-center gap-1.5 text-xs opacity-50 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
                <time>${m(n)}</time>
              </div>
            </div>
            <svg class="result-chevron w-5 h-5 opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
          <div class="result-preview">
            <div class="h-[280px] flex flex-col">
              <div class="preview-content flex-1 min-h-0 overflow-y-auto prose prose-sm max-w-none p-4 prose-h1:text-center">
                <p class="opacity-50 text-center py-8">${c}</p>
              </div>
              <div class="shrink-0 py-2 flex justify-center border-t border-base-300/50">
                <a href="${e.url}" class="view-detail-link btn btn-primary btn-sm rounded-full px-6 gap-1 normal-case">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  ${s}
                </a>
              </div>
            </div>
          </div>
        </div>
      `}let y;async function b(e){if(r.style.display=`none`,t.innerHTML=``,n.textContent=``,!e.trim()){r.style.display=``;return}let s=await p();if(!s){n.textContent=o;return}let c=await s.search(e);if(c.results.length===0){n.textContent=i;return}n.textContent=a.replace(`{count}`,String(c.results.length));let l=await Promise.all(c.results.slice(0,20).map(e=>e.data()));t.innerHTML=l.map(v).join(``)}t.addEventListener(`click`,e=>{if(e.target.closest(`.view-detail-link`))return;let n=e.target.closest(`.result-card`);if(!n)return;let r=n.closest(`.search-item`);if(!r)return;let i=r.querySelector(`.result-preview`),a=n.querySelector(`.result-chevron`),o=i?.classList.contains(`expanded`);t.querySelectorAll(`.search-item.expanded`).forEach(e=>{e!==r&&(e.classList.remove(`expanded`),e.querySelector(`.result-preview`)?.classList.remove(`expanded`),e.querySelector(`.result-chevron`)?.classList.remove(`expanded`))});let s=!o;if(i?.classList.toggle(`expanded`,s),a?.classList.toggle(`expanded`,s),r?.classList.toggle(`expanded`,s),s&&r){let e=r.dataset.url;e&&_(r,e)}}),e.addEventListener(`input`,e=>{let t=e.target.value;clearTimeout(y),y=window.setTimeout(()=>b(t),200)}),document.addEventListener(`astro:before-swap`,()=>{clearTimeout(y)},{once:!0})}document.addEventListener(`astro:page-load`,e);