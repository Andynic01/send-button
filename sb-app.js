/* The Send Button — lesson content and interactions */
(function(){
  var A=window.SBArt;
  function $(id){return document.getElementById(id)}
  function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
  var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}

  /* ---------- pictures ---------- */
  [].forEach.call(document.querySelectorAll("[data-art]"),function(n){var f=A[n.dataset.art];if(f)n.innerHTML=f()});
  [].forEach.call(document.querySelectorAll("[data-icon]"),function(n){n.innerHTML=A.icon(n.dataset.icon)});
  [].forEach.call(document.querySelectorAll("[data-reader]"),function(n){n.innerHTML=A.reader(+n.dataset.reader)});

  /* ---------- toggles ---------- */
  var notesBtn=$("notesBtn"),bigBtn=$("bigBtn");
  function setNotes(on){document.body.classList.toggle("no-notes",!on);notesBtn.setAttribute("aria-pressed",on?"true":"false");notesBtn.textContent="Teacher notes: "+(on?"shown":"hidden");store("sb-notes",on?"1":"0")}
  function setBig(on){document.body.classList.toggle("big",on);bigBtn.setAttribute("aria-pressed",on?"true":"false");bigBtn.textContent="Projector mode: "+(on?"on":"off");store("sb-big",on?"1":"0")}
  setNotes(store("sb-notes")!=="0");setBig(store("sb-big")==="1");
  notesBtn.addEventListener("click",function(){setNotes(document.body.classList.contains("no-notes"))});
  bigBtn.addEventListener("click",function(){setBig(!document.body.classList.contains("big"))});

  /* ---------- lesson clock ---------- */
  var items=[].slice.call(document.querySelectorAll("#railList li")).filter(function(li){return +li.dataset.start<99});
  var bar=$("bar"),segs=[];
  items.forEach(function(li){var i=el("i");i.className=li.className;i.style.width=((li.dataset.end-li.dataset.start)/60*100)+"%";i.style.background="var(--soft)";bar.appendChild(i);segs.push(i)});
  var startBtn=$("startBtn"),clock=$("clock"),sub=$("clockSub"),t0=0,timer=null,paused=null,TOTAL=3600;
  function pad(n){return (n<10?"0":"")+n}
  function paint(s){
    clock.textContent=pad(Math.floor(s/60))+":"+pad(s%60);
    var m=s/60,cur=null;
    items.forEach(function(li,k){
      var a=+li.dataset.start,b=+li.dataset.end,on=m>=a&&m<b;li.classList.toggle("now",on);if(on)cur=li;
      var p=Math.max(0,Math.min(1,(m-a)/(b-a)))*100;
      segs[k].style.background="linear-gradient(90deg,var(--band) "+p+"%,var(--soft) "+p+"%)";
    });
    if(cur){var left=Math.ceil(+cur.dataset.end*60-s);sub.textContent="Now: "+cur.querySelector("span:last-child").textContent+" · "+Math.floor(left/60)+"m "+pad(left%60)+"s left"}
  }
  function tick(){
    var s=Math.min(TOTAL,Math.floor((Date.now()-t0)/1000));paint(s);
    if(s>=TOTAL){clearInterval(timer);timer=null;sub.textContent="Time’s up. Leave the help numbers on the board.";startBtn.textContent="Restart clock";paused=null;items.forEach(function(li){li.classList.remove("now")})}
  }
  startBtn.addEventListener("click",function(){
    if(timer){clearInterval(timer);timer=null;paused=Date.now()-t0;startBtn.textContent="Resume clock";sub.textContent="Paused.";return}
    t0=paused!=null?Date.now()-paused:Date.now();paused=null;startBtn.textContent="Pause clock";tick();timer=setInterval(tick,1000);
  });

  /* ---------- unsend machine ---------- */
  var uThread=$("uThread"),uText=$("uText"),uSend=$("uSend"),uDel=$("uDelete"),uReset=$("uReset"),uCount=$("uCount"),uLog=$("uLog");
  var uTimers=[],uCopies=0,uBubble=null,uMin=47;
  function uClock(){var m=uMin++;return "21:"+pad(m%60)}
  function uAdd(text,bad){var li=el("li",bad?"bad":"");li.appendChild(el("span","mono",uClock()));li.appendChild(el("span","",esc(text)));uLog.appendChild(li);while(uLog.children.length>6)uLog.removeChild(uLog.firstChild)}
  function uSet(n){uCopies=n;uCount.textContent=n.toLocaleString("en-GB")}
  function later(ms,f){uTimers.push(setTimeout(f,ms))}
  uSend.addEventListener("click",function(){
    var t=uText.value.trim();if(!t)return;
    uLog.innerHTML="";uMin=47;
    uBubble=el("div","b out",esc(t));uThread.appendChild(uBubble);
    var st=el("div","u-status");st.id="uStatus";st.innerHTML="<span>Delivered</span>";uThread.appendChild(st);
    uText.value="";uText.disabled=true;uSend.disabled=true;
    uSet(5);uAdd("Delivered to 5 phones in the chat");
    later(900,function(){uDel.disabled=false});
    later(1300,function(){uSet(6);uAdd("Reece took a screenshot",true);st.innerHTML+='<span class="warn">Reece took a screenshot</span>'});
    later(2600,function(){uSet(37);uAdd("Screenshot forwarded to “Year 9 🔥” (31 people)",true)});
    later(3900,function(){uSet(38);uAdd("Tia saved it to her camera roll",true)});
    later(5200,function(){uSet(52);uAdd("Forwarded to “netball girls” (14 people)",true)});
    later(6500,function(){uSet(53);uAdd("Maya’s best friend showed her",true)});
    later(7800,function(){uSet(54);uAdd("Maya’s mum took her own screenshot",true)});
    later(9100,function(){uSet(146);uAdd("Someone posted it on their story",true)});
    later(10400,function(){uAdd("Copies you can never delete: "+uCopies,true)});
  });
  uDel.addEventListener("click",function(){
    if(!uBubble)return;uDel.disabled=true;
    uBubble.className="b gone";uBubble.textContent="You deleted this message";
    var st=$("uStatus");if(st)st.innerHTML='<span>Deleted for everyone</span>';
    uAdd("You deleted it for everyone. It’s gone from 6 phones, and nowhere else.");
  });
  uReset.addEventListener("click",function(){
    uTimers.forEach(clearTimeout);uTimers=[];
    [].slice.call(uThread.children).slice(2).forEach(function(n){n.remove()});
    uText.disabled=false;uSend.disabled=false;uDel.disabled=true;uBubble=null;
    uText.value="she’s actually so embarrassing, she shouldn’t even bother coming in tomorrow";
    uSet(0);uLog.innerHTML='<li><span class="mono">--:--</span><span>Nothing sent yet. The message is still yours.</span></li>';
  });

  /* ---------- manners ---------- */
  var RULES=[
    ["face","orange","Faces come first","If someone is talking to you, turn your phone face down. Scrolling while they talk tells them your feed matters more than they do."],
    ["meal","yellow","Meals are phone-free","Unless whoever cooked says otherwise. That goes at home, at a friend’s house and in a café."],
    ["phones","pink","Headphones in public","No videos or music on speaker on the bus or in a shop. Keep calls short and quiet, and never on speaker."],
    ["camera","violet","Ask before you film","Ask before you take a photo or video of someone, and ask again before you post it. Their face belongs to them."],
    ["group","teal","Group chats have manners","Ask before you add someone. Never start a group to talk about someone who isn’t in it. Leaving someone out on purpose is bullying."],
    ["clock","blue","No reply isn’t an insult","People are in lessons, asleep or busy. Sending “??” fourteen times is pressure. Seeing “Read” with no reply doesn’t mean they’re angry."],
    ["tone","orange","Text has no tone of voice","If a message could be read two ways, expect the worse one. Sarcasm doesn’t survive a screenshot."],
    ["moon","violet","Nights are for sleep","Don’t message people late unless it’s urgent. Put notifications on silent and keep your phone out of the bedroom."],
    ["exam","red","Exam rules are real rules","A phone in your pocket in a GCSE exam counts as cheating, even if it’s switched off. You could lose that exam, or all of them."],
    ["talk","green","Big things aren’t for text","Apologies, breakups and bad news should be said out loud or face to face. It’s harder, and that’s why it counts."]
  ];
  var rules=$("rules");
  RULES.forEach(function(r,i){
    rules.appendChild(el("div","rule c-"+r[1],'<span class="ico">'+A.icon(r[0])+'</span><div><span class="n">Rule '+(i+1)+'</span><h4>'+r[2]+'</h4><p>'+r[3]+'</p></div>'));
  });
  var QUICK=[
    ["Texting under the table at your nan’s birthday meal",0,"Rude. She’s not going to have many more birthdays than you."],
    ["Leaving a group chat that’s turning nasty",1,"Fine, and brave. You don’t owe anyone an audience."],
    ["Replying to a message the next morning",1,"Fine. Nobody is owed an instant reply."],
    ["Posting a video of your mate falling over without asking",0,"Rude. Ask first, every time."],
    ["Showing your family holiday photos on your phone at dinner",1,"Fine. You’re sharing it with the people at the table."],
    ["Watching TikTok on speaker on the bus",0,"Rude. That’s what headphones are for."]
  ];
  var quick=$("quick");
  QUICK.forEach(function(q,i){
    var b=el("button","qk",'<span>'+q[0]+'</span><span class="verdict" hidden></span><span class="why" hidden></span>');b.type="button";b.id="qk"+i;
    b.addEventListener("click",function(){b.classList.add(q[1]?"fine":"rude");var v=b.querySelector(".verdict"),w=b.querySelector(".why");v.textContent=q[1]?"Fine":"Rude";w.textContent=q[2];v.hidden=false;w.hidden=false});
    quick.appendChild(b);
  });

  /* ---------- flip cards ---------- */
  function flip(container,cls,front,back,tag,cat){
    var b=el("button","flip "+cls);b.type="button";b.setAttribute("aria-pressed","false");
    b.innerHTML='<span class="front">'+(cat?'<span class="cat '+cat[0]+'">'+cat[1]+'</span>':'<span class="tag">'+tag[0]+'</span>')+'<span class="big">'+front+'</span><span class="hint">Tap to flip</span></span>'+
      '<span class="back"><span class="tag">'+tag[1]+'</span><span class="big">'+back[0]+'</span>'+(back[1]?'<span>'+back[1]+'</span>':'')+'</span>';
    b.addEventListener("click",function(){b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")==="true"?"false":"true")});
    container.appendChild(b);return b;
  }
  var MYTHS=[
    ["“I deleted it, so it’s gone.”","It’s only gone from the chat.","Screenshots, forwards, notifications people already saw and backups all survive."],
    ["“It was a disappearing message.”","It only disappears from the app.","Anyone can photograph the screen with a second phone, and the app won’t warn you."],
    ["“My account is private.”","Private just means your followers can see it.","And every one of them has a screenshot button."],
    ["“I only sent it to my best mate.”","Friendships change.","The person you trust today could fall out with you next year, and they’ll still have everything you sent."],
    ["“Everyone knew it was a joke.”","The people in the chat did.","A head teacher, a parent or a police officer reading the screenshot only sees the words. They don’t see your face."]
  ];
  var myths=$("myths");
  MYTHS.forEach(function(m){flip(myths,"myth","<s>"+m[0]+"</s>",[m[1],m[2]],["Myth","Truth"])});

  var CATS={threat:["cat-threat","Threats"],bully:["cat-bully","Bullying"],image:["cat-image","Images"],lies:["cat-lies","Lies"],drugs:["cat-drugs","Drugs"],danger:["cat-danger","Danger"]};
  var CRIMES=[
    ["threat","Sends “I’m going to kill you”, even as a joke","Threatening communications","Online Safety Act 2023. Up to 5 years in prison for an adult."],
    ["threat","Threatens to share someone’s pictures unless they pay or do something","Blackmail","Theft Act 1968. This is what sextortion gangs do."],
    ["bully","Keeps messaging or posting about someone after they’ve asked them to stop","Harassment","Protection from Harassment Act 1997. It only takes two occasions."],
    ["bully","Sends messages that are grossly offensive, indecent or menacing","Malicious or offensive communications","Communications Act 2003 (s127) and Malicious Communications Act 1988"],
    ["bully","Targets someone for their race, religion, disability, sexuality or gender identity","Hate crime","The court gives a heavier sentence for the offence."],
    ["image","Takes, keeps or sends a nude of anyone under 18, even a picture of themselves","Indecent image of a child","Protection of Children Act 1978. Forwarding someone else’s is taken very seriously."],
    ["image","Uses an AI app to make a fake nude of a classmate","Indecent image of a child","The same law applies. Fakes (called “pseudo-photographs”) count as real ones."],
    ["image","Shares, or threatens to share, an intimate photo of someone without their consent","Sharing intimate images","Sexual Offences Act 2003, s66B"],
    ["image","AirDrops a sexual picture to strangers on the bus","Cyberflashing","Sexual Offences Act 2003, s66A"],
    ["image","Takes a photo up someone’s skirt or under their clothes","Voyeurism (“upskirting”)","Voyeurism (Offences) Act 2019"],
    ["lies","Posts something they know is false to cause someone real harm","False communications","Online Safety Act 2023"],
    ["danger","Tells someone online to seriously hurt themselves","Encouraging serious self-harm","Online Safety Act 2023"],
    ["danger","Sends a fake bomb threat to a school to get out of a test","Bomb hoax","Criminal Law Act 1977. Police treat it as real until they know it isn’t."],
    ["danger","Sets up or eggs on a fight, then films and posts it","Encouraging an assault","The video is also evidence against everyone in it."],
    ["drugs","Buys weed or a “THC vape” from an account on Snapchat","Possession of a controlled drug","Misuse of Drugs Act 1971. Cannabis is Class B: up to 5 years in prison for an adult."],
    ["drugs","Sells “THC vapes” to mates at school, even at cost price","Supplying a controlled drug","Misuse of Drugs Act 1971. Up to 14 years for an adult. Giving drugs to friends still counts as supply."]
  ];
  var crimes=$("crimes"),crimeCards=[];
  CRIMES.forEach(function(c){crimeCards.push(flip(crimes,"crime",c[1],[c[2],c[3]],["","What the law calls it"],CATS[c[0]]))});
  var flipAll=$("flipAll");
  flipAll.addEventListener("click",function(){
    var anyClosed=crimeCards.some(function(b){return b.getAttribute("aria-pressed")!=="true"});
    crimeCards.forEach(function(b){b.setAttribute("aria-pressed",anyClosed?"true":"false")});
    flipAll.textContent=anyClosed?"Flip all back":"Flip all cards";
  });

  /* ---------- where it lives ---------- */
  var LIVES=[
    ["phone2","#2B5CFF","Their phone","It stays on every phone in the chat, and in the notification preview on the lock screen."],
    ["shot","#E8307F","Screenshots","One tap, and a copy sits in someone’s camera roll for years."],
    ["camera","#E06A10","Another phone’s camera","A photo of the screen gets round every “no screenshots” setting, and the app never tells you."],
    ["cloud","#00A88F","Cloud backups","Phones back up photos and chats automatically, sometimes to more than one place."],
    ["forward","#7B4DFF","Forwarded chats","Each forward creates a new copy in a group full of people you’ve never met."],
    ["server","#D92D35","The app’s own computers","Companies keep some data, and police can ask them for it during an investigation."]
  ];
  var lives=$("lives");
  LIVES.forEach(function(l){lives.appendChild(el("div","live",'<span class="ico" style="background:'+l[1]+'">'+A.icon(l[0])+'</span><h4>'+l[2]+'</h4><p>'+l[3]+'</p>'))});

  /* ---------- forwarding chain ---------- */
  var g=$("gsize"),h=$("hops"),cv=$("dots"),ctx=cv.getContext("2d"),COLS=["#5B6CFF","#7383FF","#8C9BFF","#A6B1FF","#4A58D8","#6676F0","#9AA6FF"],raf=null;
  function drawDots(total){
    var dpr=window.devicePixelRatio||1,W=cv.clientWidth,H=cv.clientHeight;if(!W)return;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    var per=Math.max(1,Math.ceil(total/1200)),n=Math.ceil(total/per);
    $("dotsKey").textContent=per===1?"Each dot is 1 person":"Each dot is "+per.toLocaleString("en-GB")+" people";
    var cell=Math.sqrt(W*H/n),cols=Math.max(1,Math.floor(W/cell)),rows=Math.ceil(n/cols);
    while(rows*cell>H&&cell>2){cell-=.25;cols=Math.max(1,Math.floor(W/cell));rows=Math.ceil(n/cols)}
    var r=Math.max(1,Math.min(10,cell*.36)),ox=(W-cols*cell)/2+cell/2,oy=(H-rows*cell)/2+cell/2;
    if(raf)cancelAnimationFrame(raf);
    var drawn=0,step=reduced?n:Math.max(4,Math.ceil(n/30));
    ctx.clearRect(0,0,W,H);
    (function frame(){
      var end=Math.min(n,drawn+step);
      for(var i=drawn;i<end;i++){
        var cx=ox+(i%cols)*cell,cy=oy+Math.floor(i/cols)*cell;
        ctx.fillStyle=i===0?"#FFD23F":COLS[(i*7+Math.floor(i/cols))%COLS.length];
        ctx.beginPath();ctx.arc(cx,cy,i===0?r*1.4:r,0,Math.PI*2);ctx.fill();
      }
      drawn=end;if(drawn<n)raf=requestAnimationFrame(frame);
    })();
  }
  function chain(){
    var n=+g.value,k=+h.value,r=Math.pow(n,k);
    $("gsizeV").textContent=n;$("hopsV").textContent=k;$("reach").textContent=r.toLocaleString("en-GB");
    var c="people could see it.";
    if(r>=90000)c="people could see it. Wembley Stadium holds about 90,000.";
    else if(r>=1000)c="people could see it. That’s more than a whole secondary school.";
    else if(r>=150)c="people could see it. That’s more than your whole year group.";
    $("reachSub").textContent=c;drawDots(r);
  }
  g.addEventListener("input",chain);h.addEventListener("input",chain);
  var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(chain,150)});
  chain();

  /* ---------- journey ---------- */
  var JOURNEY=[
    ["report","Someone reports it","A parent, the school, or the person it was about calls 101 or 999. The screenshot is the evidence."],
    ["bag","Your phone is taken","Police can take your phone to examine it, and ask the apps for account records."],
    ["table","Interview","Under-18s are interviewed with an appropriate adult, often at a police station."],
    ["scales","The outcome","This could be advice, a community resolution, a youth caution or court. Some outcomes stay on police records."]
  ];
  var journey=$("journey");
  JOURNEY.forEach(function(j,i){journey.appendChild(el("div","stop",'<span class="ico">'+A.icon(j[0])+'</span><span class="mono">Step '+(i+1)+'</span><b>'+j[1]+'</b><p>'+j[2]+'</p>'))});

  /* ---------- scenarios ---------- */
  // msg: [who, text, kind] kind: "me" | "draft" | "unknown" | "alert" | "sys"
  var S=[
    {t:"The group chat",chat:"Year 9 banter · 24",m:[["Jay","📷 Photo of Leah"],["Jay","look at the state of this 😂"],["Mo","💀💀💀"],["Tia","someone screenshot this and send it to her lol"]],ctx:"Leah isn’t in the chat. Everyone is waiting to see who laughs next.",o:[
      ["Join in. It’s only banter and she’ll never see it.","bad","Makes it worse","Someone has just suggested sending it to her, so she will see it. Joining in puts your name on the screenshot too. If it becomes bullying or harassment, everyone who took part is involved."],
      ["Say nothing and mute the chat.","meh","Better, but not enough","You’re not adding to it, which matters. But saying nothing usually looks like agreeing, and she still gets hurt."],
      ["Post “not cool, leave it” or leave the group. Then check on her, or tell a trusted adult.","best","Best move","One person speaking up often stops a pile-on. Checking on her privately means she knows not everyone was against her."]]},
    {t:"The request",chat:"Sam",m:[["Sam","u looked so good today"],["Sam","send me a pic? just for me, i won’t show anyone 🤞"]],ctx:"You’re both 14, and you’ve been seeing each other for two weeks.",o:[
      ["Send it. You trust them.","bad","Makes it worse","You might trust them today. Once it’s sent, it’s out of your control forever. And because you’re under 18, the picture is illegal to make, send or keep."],
      ["Say no. If they keep asking, tell someone.","best","Best move","Anyone who keeps pushing after you say no isn’t respecting you. “No” is enough, and you don’t have to give a reason. A funny gif is a good way to shut it down."],
      ["Send one with your face cropped out.","meh","Still risky","Tattoos, your bedroom, jewellery and the chat history can all show who you are. In law, it’s still an indecent image of a child."]]},
    {t:"Passed round",chat:"Year 10 🔥 · 47",m:[["","Forwarded many times","sys"],["Dev","📷 Photo"],["Dev","omg is this chloe??"],["Aaron","send it to me"]],ctx:"It’s a nude of someone in your year, and it’s going round everyone.",o:[
      ["Screenshot it as evidence, then tell a teacher.","meh","Right idea, wrong way","Telling an adult is right. But saving or screenshotting it means you now have an indecent image of a child on your phone. Don’t copy it. Tell an adult straight away and let them handle it."],
      ["Forward it to one friend to ask what to do.","bad","Makes it worse","Forwarding it counts as distributing an indecent image of a child, and it spreads the harm to Chloe."],
      ["Don’t save it or send it on. Tell a trusted adult now. Chloe can use Report Remove.","best","Best move","This limits the harm and protects you. The school’s safeguarding lead knows how to deal with it without anyone needing to see it again."]]},
    {t:"“As a joke”",chat:"Ollie",m:[["Ollie","HAHAHA got u 😂😂 check ur PE bag"],["","I’m going to kill you tomorrow, you’re dead","draft"]],ctx:"He’s put a fish-paste sandwich in your PE bag. You’re fuming, and you’ve typed the message above. You haven’t sent it yet.",o:[
      ["Send it. He knows you don’t mean it.","bad","Risky","He probably does. But a parent or teacher who reads a screenshot doesn’t know you, and to them it reads as a threat to kill. That can be a crime even if you just didn’t think about how it would come across."],
      ["Delete it and send “that was out of order mate 😤” instead.","best","Best move","You still say how you feel, without threatening anyone. Those three seconds before sending are what this whole lesson is about."],
      ["Send it, then delete it a minute later.","meh","Too late","He might already have seen it in the notification, and deleting it doesn’t undo a screenshot."]]},
    {t:"The fight",chat:"Kyle",m:[["Kyle","FIGHT outside the chicken shop NOW 👊"],["Kyle","bring ur phone"]],ctx:"You get there and a crowd has formed. Everyone has their phone out.",o:[
      ["Film it and post it. It’ll be everywhere anyway.","bad","Makes it worse","Posting it humiliates whoever is getting hurt and spreads the video. If you egged it on, your video is evidence against you as well."],
      ["Walk away. If someone is getting badly hurt, call 999.","best","Best move","Crowds with phones out make fights last longer, because people perform for the camera. Taking the audience away helps. A 999 call can stop someone getting seriously hurt."],
      ["Film it but don’t post it.","meh","Not great","You’re still part of the crowd. If the police ask for footage, handing yours over can help, but don’t share it anywhere else."]]},
    {t:"The new friend",chat:"jess_x_2011",unknown:1,m:[["jess","hey ur in the year above my cousin right? 😊","unknown"],["jess","ur so easy to talk to, not like ppl at my school","unknown"],["jess","can we move to another app? this one’s dodgy","unknown"],["jess","don’t tell ur parents about me tho, they wouldn’t get it","unknown"]],ctx:"You’ve been chatting for a week. She says she’s 15 and goes to a school nearby.",o:[
      ["Move apps. She seems nice, and you’ve been chatting for days.","bad","Makes it worse","Moving to another app and asking you to keep it secret are two of the most common signs of grooming. Adults who target children often pretend to be teenagers."],
      ["Stop replying, block her, tell a trusted adult and report it to CEOP.","best","Best move","You’re not in trouble. CEOP exists exactly for this. An adult contacting children like this is a serious crime, and reporting it protects other people too."],
      ["Ask her to video call to prove who she is.","meh","Risky","Video calls can be faked, and it gives her more contact with you. Asking you to keep her secret already tells you what you need to know."]]},
    {t:"The blackmail",chat:"lily.m",unknown:1,m:[["lily","📷 Photo","unknown"],["lily","ur turn 😘","unknown"],["","You sent a photo","sys"],["lily","I have ur pic and all ur followers. Pay £200 in gift cards in 1 hour or I send it to everyone","alert"],["lily","📷 Screenshot of your follower list","alert"]],ctx:"You matched with her yesterday. You’re panicking.",o:[
      ["Pay. £200 and it all goes away.","bad","Makes it worse","Paying almost never ends it. Once they know you’ll pay, they ask for more, and they can still share the picture anyway."],
      ["Block her and delete the whole chat so nobody ever finds out.","meh","Half right","Blocking is right. But deleting everything wipes the evidence the police need to find her and get the picture taken down. Keep the chat, block her, then tell someone."],
      ["Don’t pay. Stop replying, keep the messages, and tell a trusted adult now. Report to CEOP and use Report Remove.","best","Best move","This is exactly what the National Crime Agency advises. You’re the victim of a crime, and adults will help you, not blame you."]]},
    {t:"The fight video",chat:"Year 10 🔥 · 47",m:[["","Forwarded many times","sys"],["Zac","📹 Video"],["Zac","bro look what happened to the year 8 kid at the bus stop 😭"],["Mo","send it to the other gc"]],ctx:"It’s a real fight. The boy getting hit goes to your school, and the video has already been forwarded dozens of times.",o:[
      ["Watch it, then send it to your other group so they know what happened.","bad","Makes it worse","Every share is another crowd watching him get hurt, and he’ll know it’s still going round. If the police get involved, sharing it can pull you in too."],
      ["Don’t watch it. Report it in the app, and tell a teacher so someone checks he’s OK.","best","Best move","You stop it spreading through you, and an adult who can actually help finds out. Most people in that chat will be hoping someone else does this."],
      ["Watch it, but don’t send it on.","meh","Better, but not enough","Not spreading it matters. But he still needs an adult to know, and fight videos can stay in your head for longer than you’d think."]]},
    {t:"The plug",chat:"plug 🔌",unknown:1,m:[["plug","🍃 💨 🍬 menu on my story","unknown"],["plug","thc vapes £20, can drop to ur school gates","unknown"],["plug","first one half price for new customers 😉","unknown"]],ctx:"Someone in your year added you to this account. Half your year seems to follow it.",o:[
      ["Buy one. Everyone’s doing it, and it’s only a vape.","bad","Risky","When researchers tested “THC vapes” taken off pupils, about 1 in 6 contained spice, which has left pupils collapsing at school. You don’t know what’s in it, and buying cannabis is still a crime."],
      ["Ignore it and unfollow.","meh","Better, but not enough","You’re safe. But the account is still selling to younger kids, and reporting it takes ten seconds."],
      ["Block and report the account, then tell a trusted adult or report it anonymously through Fearless.","best","Best move","Dealers rely on young customers keeping quiet. Fearless never asks for your name, so nobody will know it was you."]]}
  ];
  var scen=$("scen"),allOpts=[];
  S.forEach(function(s,i){
    var card=el("div","card");
    card.appendChild(el("div","card-head",'<span class="num">'+(i+1)+'</span><h4>'+s.t+'</h4>'));
    var chat=el("div","chat");chat.appendChild(el("div","who",esc(s.chat)));
    s.m.forEach(function(m){
      var kind=m[2]||"";
      if(kind==="sys"){chat.appendChild(el("div","sys",esc(m[1])));return}
      if(kind==="draft"){chat.appendChild(el("div","msg me",'<div class="b out" style="opacity:.55;font-style:italic">'+esc(m[1])+'<small style="margin-top:3px">Not sent yet</small></div>'));return}
      var av=kind==="unknown"||kind==="alert"?(s.unknown?A.unknown():A.avatar(m[0])):A.avatar(m[0]);
      chat.appendChild(el("div","msg",'<span class="av">'+av+'</span><div class="b in'+(kind==="alert"?" alert":"")+'"><small>'+esc(m[0])+'</small>'+esc(m[1])+'</div>'));
    });
    card.appendChild(chat);
    card.appendChild(el("p","ctx",s.ctx));
    var opts=el("div","opts"),fb=el("div","fb");fb.hidden=true;
    s.o.forEach(function(o,j){
      var b=el("button","opt "+o[1],'<span class="l">'+"ABC"[j]+'</span><span>'+o[0]+'</span>');b.type="button";b.id="s"+i+"o"+j;
      function pick(){
        [].forEach.call(opts.children,function(x){x.classList.remove("picked")});b.classList.add("picked");
        fb.className="fb "+o[1];fb.innerHTML='<span class="tag">'+o[2]+'</span>'+o[3];fb.hidden=false;
      }
      b.addEventListener("click",pick);opts.appendChild(b);
      if(o[1]==="best")allOpts.push(pick);
    });
    card.appendChild(opts);card.appendChild(fb);scen.appendChild(card);
  });
  $("showAll").addEventListener("click",function(){allOpts.forEach(function(f){f()})});

  /* ---------- quiz ---------- */
  var Q=[
    ["If you tap “delete for everyone”, nobody can ever see the message again.",false,"False. Screenshots, forwards and notifications people already saw all survive."],
    ["A 12-year-old can be arrested for sending a threatening message.",true,"True. The age of criminal responsibility in England, Wales and Northern Ireland is 10."],
    ["If you’re under 18, sending a nude of yourself is against the law, even if it was your choice.",true,"True. But the law is there to protect you, and Report Remove can get the picture taken down."],
    ["If you’re sent a nude of a classmate, you should screenshot it as evidence.",false,"False. Don’t save or copy it. Tell a trusted adult straight away."],
    ["Disappearing messages can’t be saved.",false,"False. Anyone can photograph the screen with another phone."],
    ["Messaging someone again and again after they’ve asked you to stop can count as harassment.",true,"True. Two or more times can be enough."],
    ["If someone is blackmailing you with a picture, paying them makes it stop.",false,"False. Don’t pay. Stop replying, keep the evidence, and tell someone."],
    ["An AI-made fake nude of someone under 18 isn’t a crime because it isn’t real.",false,"False. The law treats fakes the same as real pictures."],
    ["If you see a horrible video, the best thing is to share it so people know what’s going on.",false,"False. Close it, report it and tell someone. Sharing spreads the harm."],
    ["A “THC vape” bought on Snapchat could contain something else entirely.",true,"True. In tests on vapes taken off pupils, about 1 in 6 contained spice."],
    ["Posting something you know is false to cause serious harm can be a crime.",true,"True. It’s called false communications. After the 2024 riots, a man was jailed for a fake TikTok live."],
    ["If someone snatches your phone, you should chase them to get it back.",false,"False. Let it go. Call 999 if you’re hurt, then lock the phone remotely and have it blocked."]
  ];
  var quiz=$("quiz"),answered=0,right=0;
  Q.forEach(function(q,i){
    var row=el("div","qrow");row.appendChild(el("p","",'<b>'+(i+1)+'.</b> '+q[0]));
    var tf=el("div","tf"),ans=el("p","ans");ans.hidden=true;
    [["True",true,"t"],["False",false,"f"]].forEach(function(x){
      var b=el("button",x[2],x[0]);b.type="button";b.id="q"+i+x[2];
      b.addEventListener("click",function(){
        if(!ans.hidden)return;
        var ok=x[1]===q[1];answered++;if(ok)right++;
        b.classList.add("chosen");[].forEach.call(tf.children,function(c){c.disabled=true});
        ans.className="ans "+(ok?"ok":"no");ans.textContent=(ok?"Correct. ":"Not quite. ")+q[2];ans.hidden=false;
        $("scoreFill").style.width=(answered/Q.length*100)+"%";
        $("score").textContent=answered<Q.length?answered+" of "+Q.length:right+" / "+Q.length+" right";
        if(answered===Q.length){store("sb-quiz",JSON.stringify({right:right,total:Q.length}));document.dispatchEvent(new Event("sb-quiz"))}
      });
      tf.appendChild(b);
    });
    row.appendChild(tf);row.appendChild(ans);quiz.appendChild(row);
  });


  /* ---------- family agreement ---------- */
  var AG=[
    ["I will","kid",[
      ["Put my phone face down when someone is talking to me",1],
      ["Ask before I film or post anyone",1],
      ["Use the four readers test before I send anything I’m not sure about",1],
      ["Never send or forward a nude, of anyone",1],
      ["Leave any group chat that turns nasty",0],
      ["Tell a grown-up if anything online worries or scares me",1],
      ["Close and report anything upsetting, and never send it on",1],
      ["Check before I share news or a shocking post",0]]],
    ["We will","fam",[
      ["Charge all our phones downstairs at night",1],
      ["Have at least one phone-free meal every day",1],
      ["Check our privacy settings together every few months",0],
      ["Talk about what we’ve seen online, the good and the bad",0],
      ["Write down our IMEI numbers and turn on find-and-lock",0]]],
    ["Grown-ups will","adult",[
      ["Never take the phone away as a punishment for telling us something",1],
      ["Stay calm and help first, and ask questions later",1],
      ["Follow the same rules at meals and in conversations",1],
      ["Ask before posting photos of you",0]]]
  ];
  var picks=$("agreePicks"),paper=$("paper");
  AG.forEach(function(grp,gi){
    var fs=el("fieldset");fs.appendChild(el("legend","",grp[0]));
    grp[2].forEach(function(it,ii){
      var id="ag"+gi+"_"+ii,lab=el("label");lab.htmlFor=id;
      var cb=el("input");cb.type="checkbox";cb.id=id;cb.checked=!!it[1];cb.dataset.g=gi;cb.dataset.i=ii;
      cb.addEventListener("change",renderPaper);lab.appendChild(cb);lab.appendChild(el("span","",it[0]));fs.appendChild(lab);
    });
    picks.appendChild(fs);
  });
  function chosen(){return AG.map(function(grp,gi){return {h:grp[0],items:grp[2].filter(function(_,ii){return $("ag"+gi+"_"+ii).checked}).map(function(it){return it[0]})}})}
  function renderPaper(){
    var html='<h4>Our family phone agreement</h4>';
    chosen().forEach(function(s){if(!s.items.length)return;html+='<h5>'+s.h+'</h5><ul>'+s.items.map(function(t){return "<li>"+esc(t)+"</li>"}).join("")+'</ul>'});
    html+='<div class="sig"><span>Signed (me)</span><span>Signed (grown-ups)</span></div>';
    paper.innerHTML=html;
  }
  renderPaper();
  $("copyAgree").addEventListener("click",function(){
    var txt="OUR FAMILY PHONE AGREEMENT\n";
    chosen().forEach(function(s){if(!s.items.length)return;txt+="\n"+s.h+":\n"+s.items.map(function(t){return "- "+t}).join("\n")+"\n"});
    txt+="\nSigned (me): ____________   Signed (grown-ups): ____________\n";
    var done=function(){$("copied").textContent="Copied. Paste it anywhere."};
    var fail=function(){var r=document.createRange();r.selectNodeContents(paper);var s=getSelection();s.removeAllRanges();s.addRange(r);$("copied").textContent="Selected. Press Ctrl+C or Cmd+C to copy."};
    try{navigator.clipboard.writeText(txt).then(done,fail)}catch(e){fail()}
  });

  /* ---------- glossary ---------- */
  var GL=[
    ["Digital footprint","Everything online that links back to you, including what other people post about you."],
    ["Screenshot","A picture of your screen. It can be taken in a second, and the app doesn’t always tell you."],
    ["Consent","Agreeing freely to something. Consent to one thing, like a photo being taken, isn’t consent to another, like it being posted."],
    ["Harassment","Behaviour that happens again and again and makes someone feel scared or distressed. Two occasions can be enough."],
    ["Cyberflashing","Sending someone a sexual image they didn’t ask for, including by AirDrop."],
    ["Grooming","When someone builds trust with a young person so they can abuse or exploit them."],
    ["Sextortion","Blackmail using a sexual picture: “pay me, or I share it”."],
    ["Deepfake","A fake picture or video made with AI to look real."],
    ["Indecent image of a child","A nude or sexual picture of anyone under 18, real or fake. Illegal to take, have or share."],
    ["DSL","Designated Safeguarding Lead: the member of staff in every school who deals with worries about children’s safety."],
    ["CEOP","The part of the National Crime Agency that protects children from sexual abuse and exploitation online."],
    ["Report Remove","A Childline and IWF service that helps under-18s get nude pictures of themselves taken down."],
    ["Outcome 21","A way for police to record a crime but take no further action when that isn’t in the public interest. Often used for young people sharing nudes."],
    ["Appropriate adult","An adult who must be there when police interview anyone under 18."],
    ["Algorithm","The rules an app uses to decide what to show you next, based on what you watch, like and stop on."],
    ["Misinformation","False information shared by people who think it’s true. When it’s spread on purpose to fool people, it’s called disinformation."],
    ["IMEI","A 15-digit number that identifies your phone. Dial *#06# to see it. Your network can use it to block a stolen phone."],
    ["Spice","A synthetic drug that is far stronger than cannabis. It has been found in vapes sold to teenagers as “THC vapes”."],
    ["County lines","When gangs use children to carry or sell drugs, often in other towns. It is a form of criminal exploitation."],
    ["Plug","Slang for a drug dealer."]
  ];
  var gloss=$("gloss");
  GL.forEach(function(g){gloss.appendChild(el("div","",'<dt>'+g[0]+'</dt><dd>'+g[1]+'</dd>'))});
})();
