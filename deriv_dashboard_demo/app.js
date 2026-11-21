const pageTitle = document.getElementById("pageTitle");
const pageContent = document.getElementById("pageContent");
const toastEl = document.getElementById("toast");
const modal = document.getElementById("modalBackdrop");
let toastTimer;
let currentPage = "home";
let balanceVisible = true;
let exchangeTab = "ETH";
let marketFilter = "Trending";

const money = (value, unit="USD") => `${balanceVisible ? value : "••••"} <small>${unit}</small>`;
function toast(message){toastEl.textContent=message;toastEl.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove("show"),2500)}
function showModal(title, message){document.getElementById("modalTitle").textContent=title;document.getElementById("modalText").textContent=message;modal.hidden=false}
function closeModal(){modal.hidden=true}
document.getElementById("modalClose").onclick=closeModal;
document.getElementById("modalOk").onclick=closeModal;
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});

const balancePanel = (label="Total trading value", unit="USD", actions=[["＋","Deposit","deposit"],["♧","Trade","trade"]]) => `
<div class="balance-panel"><div class="balance-main"><small>${label}</small><h2>${money("0.00",unit)} <button class="icon-btn" style="color:#fff;font-size:13px" data-action="refresh" aria-label="Refresh">⟳</button></h2><p>Updated just now · simulated balance</p></div><div class="balance-actions">${actions.map(a=>`<button class="round-action" data-action="${a[2]}"><span class="round ${a[2]==="deposit"?"red":""}">${a[0]}</span>${a[1]}</button>`).join("")}<button class="round-action" data-action="visibility"><span class="round">◉</span>Hide</button></div></div>`;
const accountCard=(logo,name,unit="USD")=>`<article class="account-card" data-action="account" data-name="${name}"><div class="account-logo">${logo}</div><h3>${name}</h3><p>0.00 <small>${unit}</small></p></article>`;
const productCard=(name,desc,tag,mark,cls="")=>`<article class="product-card" data-action="product" data-name="${name}"><div class="product-copy"><h3>${name}</h3><p>${desc}</p><span class="tag">${tag}</span></div><div class="product-mark ${cls}">${mark}</div></article>`;
const markets = [
 ["DOGE/USDT","Vol 480.46M","0.05520","+1.50%","▁▂▃▂▄▃▅▆"],
 ["ADA/USDT","Vol 131.35M","0.1454","+1.60%","▂▃▂▄▃▅▄▆"],
 ["XRP/USDT","Vol 84.51M","0.9337","+2.52%","▃▂▄▃▅▄▆▇"],
 ["DOGE/USDC","Vol 70.68M","0.05512","+1.56%","▂▃▄▃▅▄▅▆"],
 ["DOGE/BTC","Vol 63.71M","0.00000092","0.00%","▁▅▁▅▁▅▁▅"]
];
function marketRows(){return markets.map(m=>`<div class="market-row"><div class="coin">${m[0]}<small>${m[1]}</small></div><div class="spark">${m[4]}</div><div class="positive">${m[2]}<br>${m[3]}</div></div>`).join("")}
function home(){return `
${balancePanel()}
<section class="section"><div class="section-head"><h2>My trading accounts</h2><span class="subtle">Demo accounts</span></div><div class="account-grid">
${accountCard("OP","Options")}${accountCard("MT5","CFDs | Standard")}${accountCard("DXN","Deriv Exchange","USDT")}<article class="account-card empty-card" data-action="add-account"><span><b class="plus">⊕</b><br>Add more accounts</span></article></div></section>
<section class="section"><div class="banner"><div><h3>New Crash/Boom trades</h3><p>Explore simulated market movements in a practice environment.</p><button data-action="learn">Explore demo</button></div><div style="font-size:42px">📈</div></div></section>
<section class="section"><div class="section-head"><h2>Explore Deriv</h2></div><div class="account-grid">
${[["DXN","Exchange"],["OP","Options"],["TV","TradingView"],["MT5","Swap-Free"],["P2P","P2P"],["✣","More"]].map(x=>`<article class="account-card" data-action="explore" data-name="${x[1]}"><div class="account-logo">${x[0]}</div><h3>${x[1]}</h3></article>`).join("")}</div></section>
<section class="section"><div class="section-head"><h2>Highlights</h2><span class="subtle">Demo content</span></div><div class="feature-grid"><div class="feature-card"><div class="feature-art gold">GOLD · XAU</div><h3>Gold</h3><p>Explore a sample market information card.</p></div><div class="feature-card"><div class="feature-art"><span>deriv</span><span>TV</span></div><h3>TradingView</h3><p>Charting integration preview.</p></div></div></section>`}
function cfds(){return `
${balancePanel("Total trading value","USD",[["＋","Deposit","deposit"],["♧","Trade","trade"]])}
<section class="section"><div class="section-head"><h2>My accounts</h2></div><div class="account-grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">${accountCard("MT5","CFDs | Standard")}</div></section>
<section class="section"><div class="section-head"><h2>Featured</h2></div><div class="feature-grid"><div class="feature-card"><div class="feature-art gold">GOLD</div><h3>Gold</h3><p>Specialised account for gold and metals</p><div class="feature-bottom">🟦 Gold <button class="outline-btn" data-action="activate">Activate now</button></div></div><div class="feature-card"><div class="feature-art"><span>deriv</span><span>TV</span></div><h3>TradingView</h3><p>Explore charting tools in this visual demo</p><div class="feature-bottom">▣ TradingView <button class="outline-btn" data-action="connect">Connect</button></div></div></div></section>
<section class="section"><div class="section-head"><h2>Available accounts</h2><button class="small-btn" data-action="compare">Compare</button></div><div class="product-grid">
${productCard("CFDs | Standard","Trade CFDs on forex, stocks and more","Standard","MT5")}
${productCard("cTrader","Copy trading with 150+ sample assets","Copy Trading","cT","red")}
${productCard("Swap-Free","Learn about accounts without overnight swaps","Trade with your terms","MT5","green")}
${productCard("Zero Spread","Cost-efficient account example","Trade with your terms","MT5")}
${productCard("Financial","Tight spreads for financial markets","Financial markets","MT5","green")}
${productCard("Financial STP","Direct market access with wider spreads","Financial markets","MT5")}
</div></section>`}
function exchange(){return `
${balancePanel("Estimated total value","USDT",[["＋","Add funds","deposit"],["➤","Send","send"]])}
<section class="section two-col">
<div class="panel"><h2>Buy & sell crypto</h2><div class="tabs">${["ETH","BTC","USDC","USDT"].map(t=>`<button class="tab ${exchangeTab===t?"active":""}" data-tab="${t}">${t}</button>`).join("")}</div>
<div class="muted-box">◉ &nbsp; Sample conversion pair <b style="float:right">${exchangeTab} ⇄</b></div><div class="muted-box">Available demo balance <b style="float:right">0.00000000</b></div>
<label class="subtle" for="amount">Amount</label><input class="field" id="amount" type="number" min="0" placeholder="Enter a demo amount">
<div class="percent-row">${[25,50,75,100].map(n=>`<button data-percent="${n}">${n}%</button>`).join("")}</div><p class="subtle">Illustrative conversion only. No live price feed.</p><button class="primary-btn full" data-action="buy">Preview buy</button></div>
<div class="panel"><div class="section-head"><h2>Markets</h2><span class="subtle">Sample data</span></div><input class="field" id="marketSearch" placeholder="⌕  Search sample pairs"><div class="tabs">${["Trending","Gainers","Losers"].map(t=>`<button class="tab ${marketFilter===t?"active":""}" data-filter="${t}">${t}</button>`).join("")}</div><div id="marketRows">${marketRows()}</div><button class="outline-btn" style="width:100%;margin-top:10px" data-action="markets">View more</button></div>
</section><div class="banner"><div><h3>Learn how markets work</h3><p>Practice reading charts and comparing fictional market examples.</p><button data-action="learn">Learning centre</button></div><div style="font-size:40px">📊</div></div>`}
function options(){return `
${balancePanel("Options demo balance","USD",[["＋","Add funds","deposit"],["↗","Explore","trade"]])}
<section class="section"><div class="section-head"><h2>Options practice</h2><span class="demo-pill">SIMULATED</span></div><div class="two-col"><div class="panel"><h2>Choose a sample market</h2><select class="field" id="optionMarket"><option>Volatility 10 Index</option><option>Volatility 25 Index</option><option>Volatility 50 Index</option><option>Volatility 100 Index</option></select><div class="chart-placeholder"><svg viewBox="0 0 600 190" preserveAspectRatio="none"><path d="M0 145 L45 130 L90 145 L130 90 L175 110 L220 75 L265 115 L310 55 L355 82 L400 48 L445 92 L490 65 L535 88 L600 30" fill="none" stroke="#00b98b" stroke-width="3"/><path d="M0 160H600 M0 110H600 M0 60H600" stroke="#e8eaed" stroke-dasharray="4 5"/></svg></div><p class="subtle">Illustrative chart — not live market data.</p></div><div class="panel"><h2>Practice settings</h2><label class="subtle" for="stake">Practice amount</label><input class="field" id="stake" type="number" min="1" placeholder="e.g. 10"><label class="subtle" for="duration">Duration</label><select class="field" id="duration"><option>1 minute</option><option>5 minutes</option><option>15 minutes</option></select><div class="muted-box">This control only previews a fictional practice scenario.</div><button class="primary-btn full" data-action="practice">Preview scenario</button></div></div></section>`}
function portfolio(){return `
${balancePanel("Portfolio demo value","USD",[["◉","Overview","overview"],["↻","Refresh","refresh"]])}
<section class="section"><div class="portfolio-stats"><div class="stat"><small>Demo balance</small><strong>0.00 USD</strong></div><div class="stat"><small>Open positions</small><strong>0</strong></div><div class="stat"><small>Sample change</small><strong>0.00%</strong></div></div></section>
<section class="section panel"><div class="section-head"><h2>Open positions</h2><span class="subtle">Demo account</span></div><div class="empty-state"><strong>No open positions</strong>Your simulated portfolio activity will appear here.</div></section>
<section class="section panel"><div class="section-head"><h2>Recent activity</h2><span class="subtle">Sample history</span></div><table class="activity"><thead><tr><th>ACTIVITY</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th></tr></thead><tbody><tr><td colspan="4" class="subtle" style="text-align:center;padding:25px">No demo activity yet</td></tr></tbody></table></section>`}
function profile(){return `<section class="section panel"><div class="section-head"><h2>Demo profile</h2><span class="demo-pill">NOT CONNECTED</span></div><div class="settings-list"><div class="setting"><div><b>Account name</b><small>Demo User</small></div><span>›</span></div><div class="setting"><div><b>Email</b><small>demo@example.com</small></div><span>›</span></div><div class="setting"><div><b>Appearance</b><small>Light interface</small></div><span>›</span></div><div class="setting"><div><b>Notifications</b><small>Local demo notifications</small></div><span>›</span></div><div class="setting"><div><b>Privacy</b><small>No personal data is collected by this demo</small></div><span>✓</span></div></div></section>`}
const pages={home,cfds,exchange,options,portfolio,profile};
const titles={home:"Welcome back",cfds:"CFDs",exchange:"Exchange",options:"Options",portfolio:"Portfolio",profile:"Profile & settings"};
function render(page){currentPage=page;pageTitle.textContent=titles[page]||"Dashboard";pageContent.innerHTML=pages[page]();document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));document.querySelector(".content-wrap").scrollTop=0}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>{render(b.dataset.page);document.getElementById("sidebar").classList.remove("open")}));
document.getElementById("openMenu").onclick=()=>document.getElementById("sidebar").classList.add("open");
document.getElementById("closeMenu").onclick=()=>document.getElementById("sidebar").classList.remove("open");
document.getElementById("dismissMobile").onclick=()=>document.getElementById("mobileCard").style.display="none";
document.getElementById("amyButton").onclick=()=>showModal("Ask Amy · demo","This assistant button is a visual placeholder. It is not connected to Deriv or an AI service.");
document.getElementById("thoughtInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.value.trim())toast("This demo does not publish messages.");});
pageContent.addEventListener("click",e=>{
 const b=e.target.closest("button,[data-action],.account-card,.product-card");if(!b)return;
 if(b.dataset.tab){exchangeTab=b.dataset.tab;render("exchange");return}
 if(b.dataset.filter){marketFilter=b.dataset.filter;pageContent.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));return}
 if(b.dataset.percent){const input=document.getElementById("amount");if(input)input.value=(Number(input.value||100)*Number(b.dataset.percent)/100).toFixed(2);return}
 const a=b.dataset.action;
 if(a==="visibility"){balanceVisible=!balanceVisible;render(currentPage)}
 else if(a==="refresh")toast("Demo balance refreshed.");
 else if(a==="deposit"||a==="send")showModal("Not available in this demo","Real deposits, withdrawals and transfers are disabled. This project uses fictional balances only.");
 else if(a==="trade"||a==="learn"||a==="markets"||a==="overview")showModal("Practice mode","This is an interface demonstration. No live market connection or real order execution is available.");
 else if(a==="buy"){const amount=document.getElementById("amount")?.value||"0";showModal("Buy preview",`You entered ${amount} ${exchangeTab}. This is only a visual preview; no cryptocurrency can be bought or transferred.`)}
 else if(a==="practice"){showModal("Scenario preview","Your practice settings have been recorded only for this temporary page view. No trade has been placed.")}
 else if(a==="account"||a==="product"||a==="explore")showModal(b.dataset.name||"Demo feature","This card opens a demo information panel. Account creation and external services are not connected.");
 else if(a==="add-account"||a==="activate"||a==="connect"||a==="compare")showModal("Demo feature","This feature is represented for layout practice and is not connected to a real Deriv account.");
});
pageContent.addEventListener("input",e=>{if(e.target.id==="marketSearch"){const q=e.target.value.toLowerCase();pageContent.querySelectorAll(".market-row").forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?"grid":"none")}});
render("home");
