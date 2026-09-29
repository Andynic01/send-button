/* The Send Button — illustrations. Every picture is drawn here as inline SVG from simple shapes,
   because the artifact sandbox blocks images from other sites. No cartoon people: the pictures are
   the things teenagers actually look at — lock screens, notifications, read receipts, evidence bags. */
(function(){
  var C={blue:"#4F7CFF",orange:"#FF6B2C",violet:"#8B5CFF",red:"#FF3B4E",teal:"#14C8A8",pink:"#FF3D8B",yellow:"#FFD23F",green:"#2FD37E",stage:"#121019",glass:"rgba(255,255,255,.1)"};
  var POSTER="Unbounded, Archivo, system-ui, sans-serif",HEAD="Archivo, system-ui, sans-serif",MONO="JetBrains Mono, ui-monospace, monospace";
  function t(x,y,size,fill,txt,o){o=o||{};return '<text x="'+x+'" y="'+y+'" font-family="'+(o.f||HEAD)+'" font-weight="'+(o.w||700)+'" font-size="'+size+'" fill="'+fill+'"'+(o.a?' text-anchor="'+o.a+'"':'')+(o.op?' opacity="'+o.op+'"':'')+(o.ls?' letter-spacing="'+o.ls+'"':'')+'>'+txt+'</text>'}

  // a notification card on a lock screen
  function notif(x,y,w,col,app,line,delay,when){
    return '<g class="pop" style="animation-delay:'+delay+'s"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="46" rx="12" fill="rgba(255,255,255,.13)"/>'+
      '<rect x="'+(x+9)+'" y="'+(y+10)+'" width="26" height="26" rx="7" fill="'+col+'"/>'+
      '<path d="M'+(x+15)+','+(y+17)+' h14 a3,3 0 0 1 3,3 v6 a3,3 0 0 1 -3,3 h-7 l-4,3 v-3 h-3 a3,3 0 0 1 -3,-3 v-6 a3,3 0 0 1 3,-3z" fill="#fff" opacity=".92" transform="translate(-1 -1)"/>'+
      t(x+43,y+20,10,"#fff",app,{w:800})+t(x+w-9,y+20,8,"rgba(255,255,255,.55)",when,{f:MONO,w:500,a:"end"})+
      t(x+43,y+35,10,"rgba(255,255,255,.85)",line,{w:500})+'</g>';
  }

  var art={};

  art.hero=function(){
    var s='<svg viewBox="0 0 540 470" role="img" aria-label="A lock screen filling up with notifications that a message has been screenshotted and forwarded"><title>One message, many copies</title>'+
      '<defs><filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="38"/></filter>'+
      '<linearGradient id="wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A1B5E"/><stop offset=".55" stop-color="#14112A"/><stop offset="1" stop-color="#3B0F2E"/></linearGradient></defs>';
    // glow behind
    s+='<g filter="url(#blur)" opacity=".75"><circle cx="190" cy="170" r="110" fill="'+C.blue+'"/><circle cx="370" cy="300" r="110" fill="'+C.pink+'"/><circle cx="330" cy="110" r="70" fill="'+C.violet+'"/></g>';
    // phone
    s+='<g transform="translate(160 22) rotate(-4 110 212)">'+
      '<rect width="220" height="424" rx="38" fill="#07060C"/><rect x="8" y="8" width="204" height="408" rx="31" fill="url(#wall)"/>'+
      '<rect x="80" y="18" width="60" height="16" rx="8" fill="#07060C"/>'+
      t(110,82,11,"rgba(255,255,255,.7)","Tuesday",{a:"middle",w:600})+
      t(110,132,50,"#fff","21:48",{f:POSTER,w:800,a:"middle"})+
      notif(18,160,184,C.red,"the lads","Reece took a screenshot",.05,"now")+
      notif(18,212,184,C.orange,"Year 9 🔥 · 31","Reece: 📷 Photo",.15,"now")+
      notif(18,264,184,C.violet,"netball girls · 14","Tia forwarded a photo",.25,"1m")+
      notif(18,316,184,C.pink,"Story","Someone posted it",.35,"2m")+
      '<rect x="75" y="398" width="70" height="5" rx="2.5" fill="rgba(255,255,255,.6)"/></g>';
    // deleted bubble sticker
    s+='<g transform="translate(18 64) rotate(-6)"><g class="pop" style="animation-delay:.45s"><rect width="168" height="40" rx="20" fill="#fff" stroke="#07060C" stroke-width="2.5"/>'+
      t(84,25,11,"#6A6680","You deleted this message",{a:"middle",w:600})+'<path d="M14,20 H154" stroke="'+C.red+'" stroke-width="3" stroke-linecap="round"/></g></g>';
    // copy counter sticker
    s+='<g transform="translate(402 356) rotate(7)"><g class="pop" style="animation-delay:.55s"><rect width="126" height="86" rx="14" fill="'+C.yellow+'" stroke="#07060C" stroke-width="2.5"/>'+
      t(63,48,34,"#07060C","146",{f:POSTER,w:900,a:"middle"})+t(63,70,9.5,"#07060C","COPIES OUT THERE",{f:MONO,w:500,a:"middle",ls:".06em"})+'</g></g>';
    // screenshot flash
    s+='<g class="flash"><rect x="160" y="22" width="220" height="424" rx="38" fill="#fff" opacity="0" transform="rotate(-4 270 234)"/></g>';
    return s+'</svg>';
  };

  art.hook=function(){
    return '<svg viewBox="0 0 220 170" role="img" aria-label="A send button with a three-second countdown ring"><title>Three seconds</title>'+
      '<circle cx="110" cy="85" r="66" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="12"/>'+
      '<circle class="ring" cx="110" cy="85" r="66" fill="none" stroke="'+C.yellow+'" stroke-width="12" stroke-linecap="round" stroke-dasharray="415" stroke-dashoffset="120" transform="rotate(-90 110 85)"/>'+
      '<circle cx="110" cy="85" r="46" fill="'+C.blue+'"/>'+
      '<path d="M88,86 L134,64 L120,108 L108,92 Z" fill="#fff"/><path d="M108,92 L134,64 L112,96 Z" fill="#C9D6FF"/>'+
      t(190,28,30,C.yellow,"3",{f:POSTER,w:900})+t(14,160,22,"#fff","2",{f:POSTER,w:900,op:".8"})+t(188,160,16,"#fff","1",{f:POSTER,w:900,op:".5"})+'</svg>';
  };

  art.manners=function(){
    // top-down café table: two drinks, one phone face down, one buzzing and ignored
    return '<svg viewBox="0 0 240 170" role="img" aria-label="A table seen from above with two drinks and a phone turned face down"><title>Face down</title>'+
      '<rect x="14" y="14" width="212" height="142" rx="18" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.18)" stroke-width="2"/>'+
      '<circle cx="62" cy="54" r="22" fill="#F4EEE6"/><circle cx="62" cy="54" r="16" fill="#6B4226"/><path d="M84,50 q10,0 10,6 q0,6 -10,6" fill="none" stroke="#F4EEE6" stroke-width="4"/>'+
      '<circle cx="182" cy="118" r="20" fill="#F4EEE6"/><circle cx="182" cy="118" r="14" fill="'+C.orange+'" opacity=".85"/><path d="M190,98 l14,-26" stroke="#fff" stroke-width="4" stroke-linecap="round"/>'+
      // face-down phone (back, camera bump)
      '<g transform="rotate(-14 110 110)"><rect x="86" y="72" width="50" height="92" rx="10" fill="#07060C"/><rect x="92" y="78" width="20" height="22" rx="6" fill="#2A2735"/><circle cx="98" cy="85" r="3.5" fill="#55516A"/><circle cx="106" cy="93" r="3.5" fill="#55516A"/></g>'+
      // buzz lines
      '<g class="rays" stroke="'+C.yellow+'" stroke-width="3" stroke-linecap="round"><path d="M142,70 l8,-6"/><path d="M146,82 l10,-2"/><path d="M76,146 l-9,4"/></g>'+
      '<g transform="translate(128 26) rotate(6)"><rect width="84" height="26" rx="13" fill="'+C.yellow+'"/>'+t(42,17,9.5,"#07060C","FACE DOWN",{f:MONO,w:500,a:"middle",ls:".08em"})+'</g></svg>';
  };

  art.forever=function(){
    var s='<svg viewBox="0 0 240 170" role="img" aria-label="A stack of screenshots with a camera flash"><title>Screenshots</title>';
    var cols=[C.yellow,C.pink,C.teal,"#fff"];
    cols.forEach(function(c,i){
      s+='<g transform="translate('+(46+i*26)+' '+(18+i*8)+') rotate('+(-12+i*7)+')"><rect width="84" height="124" rx="12" fill="'+c+'" stroke="#07060C" stroke-width="2"/><rect x="8" y="18" width="50" height="14" rx="7" fill="'+(i===3?C.violet:"rgba(0,0,0,.2)")+'"/><rect x="24" y="40" width="52" height="14" rx="7" fill="rgba(0,0,0,.14)"/><rect x="8" y="62" width="40" height="14" rx="7" fill="rgba(0,0,0,.14)"/></g>';
    });
    s+='<g transform="translate(188 26)"><circle r="24" fill="'+C.yellow+'" opacity=".35"/><path d="M0,-20 L5,-5 L20,0 L5,5 L0,20 L-5,5 L-20,0 L-5,-5Z" fill="#fff"/></g>';
    return s+'</svg>';
  };

  art.police=function(){
    // a phone sealed in an evidence bag, under a flashing light
    return '<svg viewBox="0 0 240 170" role="img" aria-label="A phone sealed in a police evidence bag under a flashing blue and red light"><title>Evidence</title>'+
      '<g class="beacon"><path d="M186,34 Q186,12 206,12 Q226,12 226,34 L226,42 L186,42Z" fill="'+C.red+'"/><path d="M206,12 Q226,12 226,34 L226,42 L206,42Z" fill="#2F5BFF"/></g><rect x="180" y="42" width="52" height="8" rx="3" fill="#fff"/>'+
      '<g class="rays" stroke="#fff" stroke-width="4" stroke-linecap="round"><path d="M172,18 l8,8"/><path d="M168,36 l10,1"/></g>'+
      '<g transform="rotate(-6 100 90)">'+
      '<rect x="30" y="20" width="136" height="146" rx="6" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.55)" stroke-width="2"/>'+
      '<rect x="30" y="20" width="136" height="16" fill="'+C.red+'"/>'+t(98,32,9,"#fff","EVIDENCE · DO NOT OPEN",{f:MONO,w:500,a:"middle",ls:".04em"})+
      '<rect x="72" y="48" width="52" height="96" rx="10" fill="#07060C"/><rect x="76" y="52" width="44" height="88" rx="7" fill="#1E1A33"/>'+
      '<rect x="80" y="66" width="30" height="8" rx="4" fill="rgba(255,255,255,.3)"/><rect x="86" y="80" width="30" height="8" rx="4" fill="'+C.blue+'"/><rect x="80" y="94" width="24" height="8" rx="4" fill="rgba(255,255,255,.3)"/>'+
      '<rect x="40" y="146" width="76" height="14" rx="2" fill="#fff"/>'+t(44,156,8,"#07060C","REF 0917 · 21:47",{f:MONO,w:500})+'</g></svg>';
  };

  art.upsetting=function(){
    // a feed post hidden behind a "sensitive content" screen, with the controls a viewer actually has
    return '<svg viewBox="0 0 240 170" role="img" aria-label="A phone showing a post hidden behind a sensitive content warning, with Not interested and Report buttons"><title>Sensitive content</title>'+
      '<defs><filter id="fz"><feGaussianBlur stdDeviation="6"/></filter></defs>'+
      '<g transform="rotate(-5 90 90)"><rect x="44" y="8" width="98" height="160" rx="16" fill="#07060C"/><rect x="49" y="13" width="88" height="150" rx="12" fill="#1E1A33"/>'+
      '<g filter="url(#fz)"><rect x="54" y="30" width="78" height="80" fill="'+C.red+'"/><circle cx="80" cy="60" r="18" fill="'+C.orange+'"/><rect x="92" y="70" width="36" height="34" fill="#55516A"/></g>'+
      '<rect x="54" y="30" width="78" height="80" fill="rgba(6,5,10,.45)"/>'+
      '<g transform="translate(93 58)" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"><path d="M-14,0 q14,-13 28,0 q-14,13 -28,0z"/><circle r="4" fill="#fff"/><path d="M-13,-10 L13,10"/></g>'+
      t(93,86,7.5,"#fff","Sensitive content",{a:"middle",w:700})+
      '<rect x="56" y="120" width="74" height="16" rx="8" fill="rgba(255,255,255,.14)"/>'+t(93,131,7.5,"#fff","Not interested",{a:"middle",w:700})+
      '<rect x="56" y="140" width="74" height="16" rx="8" fill="'+C.red+'"/>'+t(93,151,7.5,"#fff","Report",{a:"middle",w:700})+'</g>'+
      '<g transform="translate(150 40) rotate(4)"><rect width="80" height="44" rx="14" fill="'+C.blue+'"/><path d="M14,44 l-2,10 10,-10z" fill="'+C.blue+'"/><rect x="12" y="13" width="56" height="7" rx="3.5" fill="#fff" opacity=".9"/><rect x="12" y="25" width="38" height="7" rx="3.5" fill="#fff" opacity=".9"/></g>'+
      '<g transform="translate(160 104)"><rect width="66" height="24" rx="12" fill="#38BDF8"/>'+t(33,16,9,"#04121A","TALK TO",{f:MONO,w:500,a:"middle",ls:".06em"})+'</g>'+
      '<g transform="translate(168 132)"><rect width="58" height="24" rx="12" fill="#fff"/>'+t(29,16,9,"#04121A","SOMEONE",{f:MONO,w:500,a:"middle",ls:".04em"})+'</g></svg>';
  };

  art.finish=function(){
    return '<svg viewBox="0 0 240 170" role="img" aria-label="A certificate with a gold seal and a tick"><title>Finished</title>'+
      '<g transform="rotate(-4 120 85)"><rect x="34" y="18" width="150" height="112" rx="10" fill="#FFFDF6"/><rect x="50" y="36" width="90" height="9" rx="4.5" fill="'+C.violet+'"/><rect x="50" y="54" width="110" height="5" rx="2.5" fill="rgba(0,0,0,.18)"/><rect x="50" y="66" width="96" height="5" rx="2.5" fill="rgba(0,0,0,.18)"/><path d="M52,108 q10,-14 18,-2 q8,10 18,-6" stroke="'+C.blue+'" stroke-width="3" fill="none" stroke-linecap="round"/></g>'+
      '<g transform="translate(176 112)"><path d="M-14,14 L-20,46 L-4,36 L0,50 L8,16Z" fill="'+C.pink+'"/><circle r="30" fill="'+C.yellow+'" stroke="#07060C" stroke-width="3"/><path d="M-12,1 L-3,10 L13,-9" stroke="#07060C" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
  };

  art.scenarios=function(){
    return '<svg viewBox="0 0 240 170" role="img" aria-label="Three answer bubbles labelled A, B and C"><title>Choices</title>'+
      '<g transform="translate(20 18)"><rect width="150" height="36" rx="18" fill="#fff"/><circle cx="20" cy="18" r="12" fill="'+C.red+'"/>'+t(20,23,13,"#fff","A",{f:POSTER,w:800,a:"middle"})+'<rect x="40" y="13" width="90" height="10" rx="5" fill="rgba(0,0,0,.12)"/></g>'+
      '<g transform="translate(60 66)"><rect width="160" height="36" rx="18" fill="#fff"/><circle cx="20" cy="18" r="12" fill="'+C.yellow+'"/>'+t(20,23,13,"#07060C","B",{f:POSTER,w:800,a:"middle"})+'<rect x="40" y="13" width="100" height="10" rx="5" fill="rgba(0,0,0,.12)"/></g>'+
      '<g transform="translate(30 114)"><rect width="150" height="36" rx="18" fill="#fff"/><circle cx="20" cy="18" r="12" fill="'+C.green+'"/>'+t(20,23,13,"#07060C","C",{f:POSTER,w:800,a:"middle"})+'<rect x="40" y="13" width="80" height="10" rx="5" fill="rgba(0,0,0,.12)"/></g>'+
      '<g transform="translate(196 132)"><circle r="20" fill="'+C.green+'"/><path d="M-9,0 L-3,7 L10,-7" stroke="#07060C" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
  };

  var RD=[["at",C.pink],["home",C.orange],["brief",C.teal],["badge",C.blue]];
  art.close=function(){
    // one sent message, "Seen by" four icons
    var s='<svg viewBox="0 0 240 170" role="img" aria-label="A sent message marked as seen by four readers"><title>Seen by 4</title>'+
      '<rect x="60" y="24" width="160" height="50" rx="22" fill="'+C.blue+'"/><rect x="78" y="38" width="112" height="8" rx="4" fill="#fff" opacity=".9"/><rect x="78" y="52" width="72" height="8" rx="4" fill="#fff" opacity=".9"/>'+
      t(220,94,10,"rgba(255,255,255,.7)","Seen by 4",{f:MONO,w:500,a:"end"});
    RD.forEach(function(r,i){
      var cx=64+i*44;
      s+='<g transform="translate('+(cx-18)+' 110)"><circle cx="18" cy="18" r="19" fill="'+r[1]+'" stroke="'+C.stage+'" stroke-width="3"/><g transform="translate(6 6) scale(.5)" color="#07060C">'+I[r[0]].replace('stroke-width="3"','stroke-width="4"')+'</g></g>';
    });
    return s+'</svg>';
  };

  art.after=function(){
    // phones charging downstairs overnight, and the signed agreement
    return '<svg viewBox="0 0 240 170" role="img" aria-label="Phones charging together on a shelf at night next to a signed family agreement"><title>At home</title>'+
      '<path d="M206,18 a18,18 0 1 0 14,28 a14,14 0 0 1 -14,-28z" fill="'+C.yellow+'"/>'+
      '<circle cx="176" cy="26" r="2" fill="#fff"/><circle cx="224" cy="70" r="1.6" fill="#fff"/><circle cx="160" cy="54" r="1.4" fill="#fff"/>'+
      '<g transform="rotate(-5 90 80)"><rect x="40" y="16" width="96" height="120" rx="8" fill="#FFFDF6"/><rect x="54" y="32" width="64" height="8" rx="4" fill="'+C.violet+'"/><rect x="54" y="50" width="56" height="5" rx="2.5" fill="rgba(0,0,0,.2)"/><rect x="54" y="62" width="62" height="5" rx="2.5" fill="rgba(0,0,0,.2)"/><rect x="54" y="74" width="48" height="5" rx="2.5" fill="rgba(0,0,0,.2)"/><path d="M56,114 q10,-14 18,-2 q8,10 18,-6 q6,-8 16,2" stroke="'+C.blue+'" stroke-width="3" fill="none" stroke-linecap="round"/></g>'+
      '<rect x="120" y="150" width="112" height="8" rx="3" fill="rgba(255,255,255,.35)"/>'+
      [0,1,2].map(function(i){var x=132+i*32;return '<rect x="'+x+'" y="102" width="24" height="46" rx="5" fill="#07060C" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/><path d="M'+(x+12)+',114 l-4,8 h6 l-4,8" stroke="'+C.green+'" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'}).join("")+'</svg>';
  };

  // four readers tiles
  art.reader=function(i){
    var r=RD[i],when=["21:47","21:52","2031","09:15"][i];
    return '<svg viewBox="0 0 120 110" aria-hidden="true"><rect width="120" height="110" rx="14" fill="'+C.stage+'"/>'+
      '<circle cx="60" cy="48" r="30" fill="'+r[1]+'" opacity=".16"/><g transform="translate(36 24)" color="'+r[1]+'">'+I[r[0]]+'</g>'+
      t(60,96,8.5,"rgba(255,255,255,.6)",(i===2?"Seen in ":"Seen ")+when,{f:MONO,w:500,a:"middle"})+'</svg>';
  };

  // chat avatars: initials, the way real messaging apps show them
  var AV=[C.blue,C.orange,C.violet,C.teal,C.pink,C.yellow,C.green];
  art.avatar=function(seed){
    var n=0;for(var k=0;k<seed.length;k++)n+=seed.charCodeAt(k)*(k+1);
    var c=AV[n%AV.length],ch=(seed.replace(/[^A-Za-z]/g,"")[0]||"?").toUpperCase();
    return '<svg viewBox="-30 -30 60 60" aria-hidden="true"><circle r="30" fill="'+c+'"/>'+t(0,10,28,"#07060C",ch,{f:POSTER,w:800,a:"middle"})+'</svg>';
  };
  art.unknown=function(){
    return '<svg viewBox="-30 -30 60 60" aria-hidden="true"><circle r="30" fill="#55516A"/><circle cy="-6" r="11" fill="#8F8AA6"/><path d="M-18,22 Q-18,6 0,6 Q18,6 18,22Z" fill="#8F8AA6"/>'+t(0,-1,14,"#fff","?",{f:POSTER,w:800,a:"middle"})+'</svg>';
  };

  // small icons (48x48, stroke = currentColor)
  var I={};
  function ic(body){return '<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+body+'</svg>'}
  I.face=ic('<circle cx="16" cy="16" r="8"/><path d="M4,40 Q4,28 16,28 Q28,28 28,40"/><rect x="30" y="32" width="14" height="8" rx="2" fill="currentColor"/><path d="M30,10 h12 v8 h-8 l-4,4z"/>');
  I.meal=ic('<circle cx="24" cy="26" r="13"/><circle cx="24" cy="26" r="7"/><path d="M6,8 v12 M3,8 v6 q0,3 3,3 q3,0 3,-3 v-6 M42,8 q-4,4 -4,12 h4 v18"/>');
  I.phones=ic('<path d="M8,28 v-4 a16,16 0 0 1 32,0 v4"/><rect x="5" y="27" width="9" height="14" rx="3" fill="currentColor"/><rect x="34" y="27" width="9" height="14" rx="3" fill="currentColor"/>');
  I.camera=ic('<rect x="5" y="14" width="38" height="26" rx="5"/><path d="M16,14 l3,-5 h10 l3,5"/><circle cx="24" cy="27" r="7"/>');
  I.group=ic('<path d="M6,8 h22 a4,4 0 0 1 4,4 v10 a4,4 0 0 1 -4,4 h-12 l-6,5 v-5 h-4 a4,4 0 0 1 -4,-4 v-10 a4,4 0 0 1 4,-4z"/><path d="M36,18 h4 a4,4 0 0 1 4,4 v10 a4,4 0 0 1 -4,4 h-2 v5 l-6,-5 h-10 a4,4 0 0 1 -4,-4 v-2"/>');
  I.clock=ic('<circle cx="24" cy="24" r="17"/><path d="M24,14 v10 l7,5"/>');
  I.tone=ic('<path d="M8,8 h32 a4,4 0 0 1 4,4 v16 a4,4 0 0 1 -4,4 h-18 l-8,7 v-7 h-6 a4,4 0 0 1 -4,-4 v-16 a4,4 0 0 1 4,-4z"/><path d="M18,15 q0,-3 3,-3 q3,0 3,3 q0,3 -3,4 v2 M21,25 v0.5 M31,12 v8 M31,25 v0.5"/>');
  I.moon=ic('<path d="M30,8 a16,16 0 1 0 12,24 a13,13 0 0 1 -12,-24z" fill="currentColor"/><path d="M8,8 h7 l-7,8 h7"/>');
  I.exam=ic('<rect x="9" y="5" width="26" height="36" rx="3"/><path d="M15,14 h14 M15,21 h14 M15,28 h8"/><path d="M34,30 l8,8 M42,30 l-8,8" stroke-width="3.5"/>');
  I.talk=ic('<circle cx="12" cy="20" r="6"/><circle cx="36" cy="20" r="6"/><path d="M3,40 q0,-10 9,-10 q9,0 9,10 M27,40 q0,-10 9,-10 q9,0 9,10"/><path d="M19,8 h10 v5 h-4 l-3,3 v-3 h-3z"/>');
  I.shot=ic('<rect x="12" y="4" width="24" height="40" rx="5"/><path d="M4,12 v-6 h6 M44,12 v-6 h-6 M4,36 v6 h6 M44,36 v6 h-6"/>');
  I.cloud=ic('<path d="M13,36 a8,8 0 0 1 0,-16 a11,11 0 0 1 21,-3 a9,9 0 0 1 1,19z"/><path d="M24,22 v10 M20,28 l4,4 l4,-4"/>');
  I.forward=ic('<path d="M26,10 l14,12 l-14,12 v-7 q-14,0 -20,9 q2,-16 20,-18z"/>');
  I.server=ic('<rect x="8" y="6" width="32" height="10" rx="2"/><rect x="8" y="19" width="32" height="10" rx="2"/><rect x="8" y="32" width="32" height="10" rx="2"/><path d="M14,11 h.5 M14,24 h.5 M14,37 h.5"/>');
  I.eye=ic('<path d="M3,24 q21,-20 42,0 q-21,20 -42,0z"/><circle cx="24" cy="24" r="6" fill="currentColor"/>');
  I.phone2=ic('<rect x="6" y="10" width="16" height="30" rx="3"/><rect x="26" y="10" width="16" height="30" rx="3"/><circle cx="34" cy="20" r="3.5"/>');
  I.report=ic('<rect x="12" y="4" width="24" height="40" rx="5"/><path d="M18,16 h12 M18,22 h8"/><circle cx="34" cy="34" r="8" fill="currentColor"/>');
  I.bag=ic('<path d="M10,12 h28 l-3,30 h-22z"/><path d="M10,12 l3,-6 h22 l3,6"/><path d="M18,24 h12 M18,31 h8"/>');
  I.table=ic('<rect x="6" y="20" width="36" height="6" rx="2"/><path d="M10,26 v14 M38,26 v14"/><circle cx="14" cy="10" r="4"/><circle cx="34" cy="10" r="4"/>');
  I.scales=ic('<path d="M24,6 v34 M14,40 h20 M8,12 h32"/><path d="M8,12 l-5,12 h10z M40,12 l-5,12 h10z"/>');
  I.at=ic('<circle cx="24" cy="24" r="7"/><path d="M31,17 v10 q0,5 5,5 q7,0 7,-9 a19,19 0 1 0 -8,16"/>');
  I.home=ic('<path d="M6,22 L24,7 L42,22"/><path d="M11,19 v22 h26 v-22"/><path d="M20,41 v-11 h8 v11"/>');
  I.brief=ic('<rect x="5" y="14" width="38" height="26" rx="4"/><path d="M17,14 v-5 h14 v5 M5,25 h38"/><path d="M22,25 v4 h4 v-4"/>');
  I.badge=ic('<path d="M24,4 L40,10 Q40,34 24,44 Q8,34 8,10 Z"/><path d="M24,16 l2.6,5.4 5.9,.8 -4.3,4.1 1,5.8 -5.2,-2.8 -5.2,2.8 1,-5.8 -4.3,-4.1 5.9,-.8z" fill="currentColor"/>');
  I.eyeoff=ic('<path d="M3,24 q21,-20 42,0 q-21,20 -42,0z"/><circle cx="24" cy="24" r="6"/><path d="M8,8 L40,40"/>');
  I.flag=ic('<path d="M10,44 V6"/><path d="M10,8 h26 l-5,8 l5,8 h-26"/>');
  I.pause=ic('<rect x="8" y="8" width="32" height="32" rx="6"/><path d="M20,17 v14 M28,17 v14"/>');
  I.heart=ic('<path d="M24,40 C10,30 5,22 5,15 a9,9 0 0 1 19,-4 a9,9 0 0 1 19,4 c0,7 -5,15 -19,25z"/>');
  I.lock=ic('<rect x="9" y="21" width="30" height="21" rx="4"/><path d="M15,21 v-6 a9,9 0 0 1 18,0 v6"/><circle cx="24" cy="31" r="2.5" fill="currentColor"/>');
  I.pin=ic('<path d="M24,44 C14,32 9,25 9,18 a15,15 0 0 1 30,0 c0,7 -5,14 -15,26z"/><circle cx="24" cy="18" r="5"/>');
  I.kerb=ic('<rect x="16" y="6" width="16" height="28" rx="3"/><path d="M4,42 h40 M4,38 h14"/><path d="M36,20 l6,-4 M36,26 h7"/>');
  I.number=ic('<rect x="12" y="4" width="24" height="40" rx="5"/><path d="M17,18 h14 M17,24 h14 M20,14 l-2,14 M28,14 l-2,14"/>');
  I.check=ic('<circle cx="21" cy="21" r="13"/><path d="M31,31 L43,43"/><path d="M15,21 l4,4 l8,-8"/>');
  I.source=ic('<path d="M8,6 h22 l10,10 v26 h-32z"/><path d="M30,6 v10 h10 M14,24 h20 M14,31 h20 M14,38 h12"/>');
  I.clockback=ic('<circle cx="26" cy="24" r="16"/><path d="M26,14 v10 l6,4"/><path d="M4,20 l6,5 l5,-6"/>');
  I.robot=ic('<rect x="9" y="14" width="30" height="24" rx="6"/><path d="M24,14 v-7"/><circle cx="24" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="25" r="3" fill="currentColor"/><circle cx="30" cy="25" r="3" fill="currentColor"/><path d="M18,32 h12"/>');
  I.leaf=ic('<path d="M10,40 C10,18 24,8 40,8 C40,26 30,40 10,40z"/><path d="M10,40 L28,22"/>');
  I.pill=ic('<rect x="6" y="17" width="36" height="14" rx="7" transform="rotate(-35 24 24)"/><path d="M18,32 L30,16"/>');
  art.icon=function(n){return I[n]||""};

  window.SBArt=art;
})();
