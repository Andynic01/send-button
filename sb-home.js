/* The Send Button — "together at home" mode: progress through the seven parts, a certificate,
   and (in the installable app build only) the install prompt and offline service worker.
   Everything is kept in this browser's localStorage; nothing is sent anywhere. */
(function(){
  var PARTS=[["hook","Before you press send"],["manners","Phone manners"],["forever","Sent means out there"],["police","When police get involved"],["upsetting","Seeing something upsetting"],["scenarios","What would you do?"],["close","Four readers + quiz"]];
  function $(id){return document.getElementById(id)}
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function put(k,v){try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}
  function getJSON(k,d){try{return JSON.parse(get(k))||d}catch(e){return d}}
  var body=document.body,app=!!document.querySelector('link[rel="manifest"]');

  /* ---------- mode ---------- */
  var modeBtns=[].slice.call(document.querySelectorAll(".mode"));
  function setMode(m){
    body.classList.toggle("mode-home",m==="home");
    modeBtns.forEach(function(b){b.setAttribute("aria-pressed",b.dataset.mode===m?"true":"false")});
    document.querySelector(".rail").setAttribute("aria-label",m==="home"?"Your progress":"Lesson clock");
    put("sb-mode",m);
  }
  modeBtns.forEach(function(b){b.addEventListener("click",function(){setMode(b.dataset.mode)})});
  setMode(get("sb-mode")||document.documentElement.dataset.defaultMode||"class");

  /* ---------- progress ---------- */
  var done=getJSON("sb-done",{}),buttons={};
  PARTS.forEach(function(p,i){
    var sec=$(p[0]);if(!sec)return;
    var row=document.createElement("div");row.className="done-row home-only";
    var b=document.createElement("button");b.type="button";b.className="done-btn";b.id="done-"+p[0];
    b.addEventListener("click",function(){
      if(done[p[0]])delete done[p[0]];else done[p[0]]=Date.now();
      put("sb-done",JSON.stringify(done));render();
    });
    row.appendChild(b);
    var next=PARTS[i+1];
    var a=document.createElement("a");a.href="#"+(next?next[0]:"finish");a.textContent=next?"Next: "+next[1]+" ↓":"Finish together ↓";
    row.appendChild(a);
    sec.querySelector(".body").appendChild(row);buttons[p[0]]=b;
  });

  var cN=$("childName"),aN=$("adultName"),names=getJSON("sb-names",{});
  cN.value=names.c||"";aN.value=names.a||"";
  function saveNames(){put("sb-names",JSON.stringify({c:cN.value.trim(),a:aN.value.trim()}));render()}
  cN.addEventListener("input",saveNames);aN.addEventListener("input",saveNames);

  function render(){
    var n=0;
    PARTS.forEach(function(p){
      var on=!!done[p[0]];if(on)n++;
      var b=buttons[p[0]];if(b){b.setAttribute("aria-pressed",on?"true":"false");b.textContent=on?"✓ Done. Tap to undo":"We’ve done this part"}
      var li=document.querySelector('#railList a[href="#'+p[0]+'"]');if(li)li.parentNode.classList.toggle("done",on);
    });
    $("progN").textContent=n+" / 7";$("progBar").style.width=(n/7*100)+"%";
    var todo=$("finishTodo"),cert=$("cert"),q=getJSON("sb-quiz",null);
    var left=PARTS.filter(function(p){return !done[p[0]]});
    todo.innerHTML=left.length?'<p><b>'+n+' of 7 parts done.</b> Still to do:</p><ul class="todo">'+left.map(function(p){return '<li><a href="#'+p[0]+'">'+esc(p[1])+'</a></li>'}).join("")+'</ul>':"";
    var finished=!left.length;
    if(finished&&!get("sb-finished"))put("sb-finished",String(Date.now()));
    if(!finished)put("sb-finished",null);
    var when=get("sb-finished"),date=when?new Date(+when).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}):"";
    var c=cN.value.trim()||"The teenager",a=aN.value.trim()||"their grown-up";
    cert.classList.toggle("locked",!finished);
    cert.innerHTML='<span class="eyebrow">Certificate · The Send Button</span>'+
      '<h3>'+(finished?"Finished together":"Locked until all 7 parts are done")+'</h3>'+
      '<p class="who"><b>'+esc(c)+'</b> and <b>'+esc(a)+'</b> worked through all seven parts of the lesson together.</p>'+
      '<div class="meta"><span>'+(finished?date:"Not finished yet")+'</span><span>7 parts</span><span>'+(q?"Quiz "+q.right+" / "+q.total:"Quiz not finished")+'</span></div>'+
      '<p class="promise">We know the three seconds before send are the only ones that count. We know who to tell, and that telling never gets anyone in trouble in this family.</p>';
    $("certHint").hidden=!finished;
  }
  document.addEventListener("sb-quiz",render);
  render();

  var rs=$("resetProgress"),armed=false,rt;
  rs.addEventListener("click",function(){
    if(!armed){armed=true;rs.textContent="Tap again to clear progress";$("resetMsg").textContent="";clearTimeout(rt);rt=setTimeout(function(){armed=false;rs.textContent="Start again"},4000);return}
    armed=false;rs.textContent="Start again";done={};put("sb-done",null);put("sb-quiz",null);put("sb-finished",null);render();
    $("resetMsg").textContent="Progress cleared. The names are kept.";
  });

  /* ---------- installable app (only in the app build, which has a manifest) ---------- */
  if(!app)return;
  if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})})}
  var box=$("installBox"),standalone=window.matchMedia("(display-mode: standalone)").matches||navigator.standalone;
  if(standalone)return;
  var deferred=null;
  window.addEventListener("beforeinstallprompt",function(e){
    e.preventDefault();deferred=e;
    box.innerHTML='<button class="pill" id="installBtn" type="button">Install the app</button><span>Works offline once installed.</span>';box.hidden=false;
    $("installBtn").addEventListener("click",function(){deferred.prompt();deferred.userChoice.then(function(){box.hidden=true;deferred=null})});
  });
  if(/iphone|ipad|ipod/i.test(navigator.userAgent)){
    box.innerHTML='<span>To install on iPhone: tap <b>Share</b>, then <b>Add to Home Screen</b>.</span>';box.hidden=false;
  }
})();
