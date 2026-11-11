import {QUEST_XP,STORAGE_KEY,localDate,newGrind,readGrind,progress} from './grind.mjs';
import {number,timeDisplay} from './calculator.mjs';

const $=id=>document.getElementById(id);
let state=newGrind();
let storageAvailable=true;
try {state=readGrind(localStorage.getItem(STORAGE_KEY));} catch {storageAvailable=false;}
let today=localDate();
let goal={item:'Headphones',hours:20,mode:'shopping'};
let resetArmed=false;
let lastJudge='';
let timerWasActive=state.breakEndsAt>Date.now();

function persist() {
  try {localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
  catch {storageAvailable=false;document.querySelector('.quest-disclosure').textContent='Tick tasks yourself · browser storage is off; progress lasts this visit';}
}
function day() {return state.days[today]??={commit:false,logic:false,sprint:false,pass:false};}
function gentle() {return state.profile.intensity==='gentle'||state.profile.stage==='caregiver';}
function streakText(p) {return `${p.streak} ${p.streak===1?'day':'days'}`;}

export function setGrindGoal(purchase) {
  goal=purchase;
  const time=timeDisplay(goal.hours);
  $('grind-goal').textContent=`${goal.item} · ${goal.mode==='food'?`${number(goal.earningDays)} ${goal.earningDays===1?'workday':'workdays'} of pay`:`${time.value} ${time.unit} of work`}`;
}

function render() {
  const p=progress(state,today);
  $('streak-stat').textContent=streakText(p);
  $('xp-stat').textContent=`${p.xp} XP`;
  $('judge-stat').textContent=p.passed?'Rest day ♡':p.count===3?'All done!':p.count>0?'Keep going':'Ready to start';
  $('judge-stat').dataset.status=p.passed?'pass':p.count===3?'locked':p.count>0?'mid':'fresh';
  $('quest-count').textContent=`${p.count} / 3 DONE`;
  $('xp-meter').setAttribute('aria-valuenow',String(p.todayXP));
  $('xp-fill').style.width=`${p.todayXP/75*100}%`;
  document.querySelectorAll('[data-quest]').forEach(input=>{input.checked=day()[input.dataset.quest];input.disabled=p.passed;});
  $('intensity-badge').textContent=gentle()?'GENTLE':state.profile.intensity==='spicy'?'MEDIUM':'STRONG';
  $('empathy-note').textContent=state.profile.stage==='caregiver'?'Family comes first. Your feedback stays kind. Free rest days are always available.':gentle()?'Gentle mode: kind jokes and small steps. You can do this.':'Stronger jokes, without personal insults. You can take a free rest day at any time.';
  $('life-pass').textContent=p.passed?'♡ Rest day active. Tap to return.':'♡ Busy with life? Take a free rest day.';
  $('life-pass-note').textContent=p.passed?'Your streak is safe. Rest days give no extra points.':'Family and real responsibilities come first.';
  $('start-break').hidden=!p.unlocked;
  updateTimer();
}

function judge() {
  const p=progress(state,today);
  const who=state.profile.handle?`${state.profile.handle}, `:'';
  const track=state.profile.track;
  let lines;
  if(p.passed) lines=[`${who}family and real life come first. Your streak is safe. ${goal.item} can wait.`,`You are allowed to rest. Come back when you are ready.`];
  else if(p.unlocked) lines=[`${who}all 3 tasks are done! You earned a game break. Keep saving for ${goal.item}.`,`Code saved. Problem solved. Practice done. Enjoy your 15-minute break!`];
  else if(gentle()) lines=[`${who}${p.count?`${p.count} of 3 tasks done. Good progress!`:'One small code change is a good start.'} Keep building your ${track} skills.`,`${who}${goal.item} is your goal. Try 25 minutes of coding today. Small steps count.`,`A busy day can be hard. Try one small task. You can take a rest day if you need it.`];
  else if(state.profile.intensity==='spicy') lines=[`${who}you have a plan for ${goal.item}. Does your code have a plan too? Pick one task.`,`${p.count} of 3 tasks done. Your shopping list is growing faster than your code.`,`You opened the shopping page so fast. Now open your ${track} project.`];
  else lines=[`${who}you keep thinking about ${goal.item}. Your ${track} project would like some attention too.`,`You checked the price five times. Have you checked your code once?`,`${p.count} tasks done. So many videos watched. The code still will not write itself.`];
  const choices=lines.filter(line=>line!==lastJudge);
  lastJudge=choices[Math.floor(Math.random()*choices.length)]??lines[0];
  $('grind-roast').textContent=`“${lastJudge}”`;
}

document.querySelectorAll('[data-quest]').forEach(input=>input.addEventListener('change',()=>{
  if(day().pass) return;
  const wasUnlocked=progress(state,today).unlocked;
  day()[input.dataset.quest]=input.checked;
  if(!progress(state,today).unlocked) state.breakEndsAt=0;
  persist();render();
  if(progress(state,today).unlocked || wasUnlocked) judge();
}));
const profileFields={handle:'handle',track:'track',intensity:'intensity','life-stage':'stage'};
for(const [id,key] of Object.entries(profileFields)) {
  $(id).value=state.profile[key];
  $(id).addEventListener(id==='handle'?'input':'change',()=>{
    state.profile[key]=$(id).value.trim().slice(0,24);
    persist();render();
    if(id!=='handle') judge();
  });
}
$('judge-day').addEventListener('click',judge);
$('life-pass').addEventListener('click',()=>{day().pass=!day().pass;persist();render();judge();});

function updateTimer() {
  const p=progress(state,today);
  const remaining=Math.max(0,Math.ceil((state.breakEndsAt-Date.now())/1000));
  if(remaining>0 && p.unlocked) {
    $('break-status').textContent=`🎮 Game break · ${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')} left. Enjoy your break.`;
    $('start-break').disabled=true;
    $('start-break').textContent='Break time. You earned this.';
    timerWasActive=true;
  } else {
    if(timerWasActive) {
      state.breakEndsAt=0;persist();timerWasActive=false;
      $('grind-roast').textContent='“Your break is over. Stretch, drink some water, and choose your next task.”';
    }
    $('break-status').textContent=p.unlocked?'🎮 All 3 tasks done! Your 15-minute game break is ready.':'🔒 Finish all 3 tasks to earn a 15-minute game break.';
    $('start-break').disabled=false;
    $('start-break').textContent='🎮 Start my 15-minute break';
  }
}
$('start-break').addEventListener('click',()=>{
  if(!progress(state,today).unlocked || state.breakEndsAt>Date.now()) return;
  state.breakEndsAt=Date.now()+15*60*1000;
  persist();updateTimer();
});
$('reset-progress').addEventListener('click',()=>{
  if(!resetArmed) {
    resetArmed=true;$('reset-progress').textContent='Tap again to clear tasks & points';
    setTimeout(()=>{resetArmed=false;$('reset-progress').textContent='Reset progress';},5000);
    return;
  }
  state.days={};state.breakEndsAt=0;timerWasActive=false;resetArmed=false;
  $('reset-progress').textContent='Reset progress';
  persist();render();judge();
});
setInterval(()=>{
  const now=localDate();
  if(now!==today) {today=now;state.breakEndsAt=0;persist();render();judge();}
  else if(timerWasActive || state.breakEndsAt>Date.now()) updateTimer();
},1000);
if(!storageAvailable) document.querySelector('.quest-disclosure').textContent='Tick tasks yourself · browser storage is off; progress lasts this visit';
render();
