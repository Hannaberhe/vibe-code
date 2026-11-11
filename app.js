import {CURRENCIES, calculatePurchase, money, number, timeDisplay, shiftDetail} from './calculator.mjs';
import {setGrindGoal} from './grind-ui.js';

const $ = id => document.getElementById(id);
const form = $('purchase-form');
const roasts = {
  little:[
    'Good news: your wallet is still breathing.',
    'A small price. A very big smile. We understand.',
    'You spent more time thinking about it than working for it.',
    'You can pay for this. But do you need a second one?',
    'Your wallet says yes. Please do not ask it ten more times.'
  ],
  shift:[
    'You work for hours. This item just sits there looking nice.',
    'You wanted a small gift. It wants your whole afternoon.',
    'Your wallet saw the price and closed its eyes.',
    'You will enjoy it today. Tomorrow, your wallet will ask why.',
    'That is a lot of work for something you might lose next week.'
  ],
  overtime:[
    'This item gets to relax at home. You get extra work.',
    'You said, “I deserve it.” Your wallet said, “Please wait.”',
    'Free delivery. Extra work. What a special offer.',
    'Your boss is happy. You just found a reason to work more.',
    'You wanted one item. Now you need one more workday.'
  ],
  ouch:[
    'At this price, your boss should choose the color.',
    'You wanted a new item. Your job wants you for another month.',
    'This item needs so much work, it should help with your job.',
    'Your wallet wants a holiday. You gave it more work.',
    'The price is asking if you can work on Saturday too.'
  ]
};
const verdicts = {little:'SMALL PRICE, BIG SMILE',shift:'THAT TAKES SOME WORK',overtime:'EXTRA WORK NEEDED',ouch:'YOUR BOSS IS HAPPY'};
const presets = {
  coffee:{item:'A little coffee',price:150,rate:100},
  shoes:{item:'New sneakers',price:5500,rate:100},
  phone:{item:'The new phone',price:120000,rate:150},
  tibs:{item:'Tibs platter',price:650,rate:300,mode:'food'},
  pizza:{item:'Pizza night',price:900,rate:400,mode:'food'},
  burger:{item:'Burger date',price:1200,rate:500,mode:'food'}
};
const foodRoasts=[
  'Your stomach said yes. Your wallet asked, “How many days?”',
  'Your friends said, “Let’s eat out.” Your wallet said, “Let’s cook.”',
  'You will finish the food in 20 minutes. The work takes longer.',
  'Your stomach is already at the restaurant. Your money is still at work.',
  'You came for a meal. Your wallet came for a cheaper menu.'
];
const drafts={shopping:{item:'Headphones',price:2000,rate:100,currency:'ETB'},food:{...presets.tibs,currency:'ETB'}};
let current = calculatePurchase({item:'Headphones',price:2000,rate:100,currency:'ETB'});
let lastRoast = 'Work for two and a half days. Listen to music about needing a holiday.';
let receiptCount = 0;
let busy = false;
let saved = false;
let dodgeCount = 0;
let toastTimeout;
let confettiTimeout;

function toast(message) {
  clearTimeout(toastTimeout);
  $('toast').textContent = message;
  $('toast').classList.add('visible');
  toastTimeout = setTimeout(()=>$('toast').classList.remove('visible'),4500);
}

function pickRoast() {
  const choices = (current.mode==='food'?foodRoasts:roasts[current.tier]).filter(roast=>roast!==lastRoast);
  lastRoast = choices[Math.floor(Math.random()*choices.length)];
  $('roast-text').textContent = `“${lastRoast}”`;
}

function resetBuy() {
  dodgeCount = 0;
  $('buy-anyway').style.transform = '';
  $('buy-anyway').textContent = 'Buy it anyway ↗';
  $('decision-hint').textContent = 'Try “Buy it anyway.” The button may run away.';
}

function render() {
  const food=current.mode==='food';
  const display = food?{value:current.earningDays>=1e6?new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(current.earningDays):number(current.earningDays),unit:current.earningDays===1?'workday':'workdays'}:timeDisplay(current.hours);
  $('result-item').textContent = current.item;
  $('result-price').textContent = money(current.price,current.currency);
  $('result-rate').textContent = `${money(current.rate,current.currency)} / ${food?'day':'hr'}`;
  $('receipt-income-label').textContent=food?'Your pay per day':'Your pay per hour';
  $('cost-label').textContent=food?'DAYS TO PAY FOR YOUR MEAL':'THIS WILL COST YOU';
  $('result-hours').textContent = display.value;
  $('result-hours').style.fontSize = display.value.length>5?'clamp(24px, 4vw, 43px)':display.value.length>3?'clamp(32px, 5vw, 60px)':'';
  $('time-unit').replaceChildren(document.createTextNode(display.unit),Object.assign(document.createElement('span'),{textContent:food?'to cover your meal.':'of your life.'}));
  $('time-unit').classList.toggle('food-unit',food);
  $('result-days').textContent = food?`${current.days<0.01?'<0.01':number(current.days)} days of pay, rounded up to full days. This uses all your pay, before other costs.`:current.hours<1?'A small treat. A small part of your workday.':current.days<1?`That’s ${number(current.days)} of an 8-hour workday.`:`That’s ${number(current.days)} working ${current.days===1?'day':'days'}. That is a lot of time.`;
  $('shift-detail').textContent = shiftDetail(current.hours);
  $('shift-meter').querySelectorAll('span').forEach((segment,index)=>segment.classList.toggle('filled',index<Math.min(8,Math.ceil(current.hours))));
  $('verdict').textContent = food?'YOUR MEAL HAS A PLAN':verdicts[current.tier];
  $('receipt-label').textContent = `REALITY CHECK #${String(receiptCount).padStart(3,'0')}`;
  $('save-money').textContent = food?'↗ I’ll plan for it':'↗ I’ll save my money';
  saved = false;
  resetBuy();
  pickRoast();
  setGrindGoal(current);
}

function setMode(mode) {
  $('mode').value=mode;
  const food=mode==='food';
  $('shopping-mode').setAttribute('aria-pressed',String(!food));
  $('food-mode').setAttribute('aria-pressed',String(food));
  $('item-label').textContent=food?'What food do you want?':'What do you want to buy?';
  $('rate-label').textContent=food?'Your pay per day':'Your pay per hour';
  $('income-note').textContent=food?'Uses your full daily pay.':'Use the same currency for both.';
  $('formula-text').textContent=food?'Meal price ÷ daily earnings = days to cover it.':'Item price ÷ hourly pay = hours of your life.';
  $('shopping-presets').hidden=food;
  $('food-presets').hidden=!food;
}
for(const mode of ['shopping','food']) $(`${mode}-mode`).addEventListener('click',()=>{
  if(busy || $('mode').value===mode) return;
  drafts[$('mode').value]=Object.fromEntries(new FormData(form));
  setMode(mode);
  for(const name of ['item','price','rate','currency']) $(name).value=drafts[mode][name];
  $('currency').dispatchEvent(new Event('change'));
  submitPurchase();
});

function clearErrors() {
  for (const name of ['item','price','rate']) {
    $(name).removeAttribute('aria-invalid');
    $(`${name}-error`).textContent = '';
  }
}

async function submitPurchase({scroll=false}={}) {
  if (busy) return;
  clearErrors();
  const purchase = calculatePurchase(Object.fromEntries(new FormData(form)));
  if (purchase.errors) {
    for (const [name,message] of Object.entries(purchase.errors)) {
      $(name)?.setAttribute('aria-invalid','true');
      if ($(`${name}-error`)) $(`${name}-error`).textContent = message;
    }
    $(Object.keys(purchase.errors)[0])?.focus();
    return;
  }
  busy = true;
  $('calculate').disabled = true;
  $('calculate').firstElementChild.textContent = 'Your wallet is doing the math…';
  $('receipt').classList.add('refreshing');
  $('receipt').setAttribute('aria-busy','true');
  await new Promise(resolve=>setTimeout(resolve,420));
  current = purchase;
  receiptCount++;
  render();
  $('receipt').classList.remove('refreshing');
  $('receipt').removeAttribute('aria-busy');
  $('calculate').disabled = false;
  $('calculate').firstElementChild.textContent = 'Calculate & roast me';
  busy = false;
  if (scroll && matchMedia('(max-width:760px)').matches) $('receipt').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'center'});
}

form.addEventListener('submit',event=>{event.preventDefault();submitPurchase({scroll:true});});
for (const name of ['item','price','rate']) $(name).addEventListener('input',()=>{
  $(name).removeAttribute('aria-invalid');
  $(`${name}-error`).textContent='';
  $('receipt-label').textContent='PRESS CALCULATE TO UPDATE';
});
$('currency').addEventListener('change',()=>{
  document.querySelectorAll('[data-currency-unit]').forEach(unit=>unit.textContent=CURRENCIES[$('currency').value]);
  $('receipt-label').textContent='PRESS CALCULATE TO UPDATE';
});
document.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{
  if (busy) return;
  const preset = presets[button.dataset.preset];
  drafts[$('mode').value]=Object.fromEntries(new FormData(form));
  setMode(preset.mode??'shopping');
  for (const name of ['item','price','rate']) $(name).value = preset[name];
  $('currency').value='ETB';
  $('currency').dispatchEvent(new Event('change'));
  submitPurchase({scroll:true});
}));
$('reroll').addEventListener('click',()=>{pickRoast();});

function confetti() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  clearTimeout(confettiTimeout);
  const container = $('confetti');
  container.replaceChildren();
  for (let i=0;i<65;i++) {
    const piece = document.createElement('i');
    piece.className='confetti-piece';
    piece.style.cssText=`left:${Math.random()*100}%;background:${['#d6f85a','#b7a0dd','#ef744c','#24291f'][i%4]};--fall-duration:${1.7+Math.random()*1.3}s;--fall-delay:${Math.random()*.4}s;--drift:${Math.random()*200-100}px;transform:rotate(${Math.random()*360}deg)`;
    container.append(piece);
  }
  confettiTimeout=setTimeout(()=>container.replaceChildren(),3600);
}

$('save-money').addEventListener('click',()=>{
  if (saved) {toast('Your wallet is still proud of you. Keep going.');return;}
  saved = true;
  if(current.mode==='food') {
    $('save-money').textContent='✓ Meal goal set';
    $('decision-hint').textContent=`Plan ${number(current.earningDays)} ${current.earningDays===1?'workday':'workdays'} for ${current.item}. Remember your other costs too.`;
    toast(`Meal plan ready: ${current.item}. Save a little each day.`);
    confetti();
    return;
  }
  $('save-money').textContent='✓ Your wallet says thanks';
  $('decision-hint').textContent=`You chose to keep ${money(current.price,current.currency)}. Your wallet is smiling.`;
  toast(`Good choice! You kept ${money(current.price,current.currency)}.`);
  confetti();
});

function dodge() {
  dodgeCount++;
  const button = $('buy-anyway');
  const arena = $('buy-arena').getBoundingClientRect();
  const edge = Math.min(28,(window.innerWidth-arena.right)-8);
  const dx = dodgeCount%2===0?Math.max(-45,12-arena.left):Math.max(0,edge);
  const dy = dodgeCount%2===0?0:-58;
  button.style.transform=`translate(${dx}px,${dy}px)`;
  button.textContent=['Think again ↗','Catch me first ↗','Your wallet said no','Still chasing it?'][Math.min(dodgeCount-1,3)];
  $('decision-hint').textContent='Even this button wants you to think twice.';
}
$('buy-anyway').addEventListener('pointerenter',event=>{
  if (event.pointerType!=='mouse' || dodgeCount>=4 || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  dodge();
});
$('buy-anyway').addEventListener('click',()=>{
  dodgeCount++;
  $('buy-anyway').textContent=dodgeCount<3?'Are you sure? 👀':'Fine. You caught me.';
  toast(dodgeCount<3?'Your wallet says: think about it once more.':'You caught the button! This is a demo. Nothing was bought.');
});
window.addEventListener('resize',()=>{$('buy-anyway').style.transform='';});

$('copy-result').addEventListener('click',async()=>{
  const display=timeDisplay(current.hours);
  const timing=current.mode==='food'?`${number(current.earningDays)} earning days at ${money(current.rate,current.currency)}/day (all daily earnings set aside)`:`${display.value} ${display.unit} of work at ${money(current.rate,current.currency)}/hr`;
  const text=`WALLET CHECK\n${current.item}: ${money(current.price,current.currency)}\nThat’s ${timing}.\n“${lastRoast}”\n${location.origin}`;
  try {
    await navigator.clipboard.writeText(text);
    toast('Receipt copied! Share it with a friend who loves shopping.');
  } catch {
    toast('Copy is unavailable in this browser. Your receipt is right here.');
  }
});
$('year').textContent=new Date().getFullYear();
document.querySelectorAll('#shift-meter span').forEach(segment=>segment.classList.add('filled'));
$('calculate').disabled=false;
$('calculate').firstElementChild.textContent='Calculate & roast me';
document.body.dataset.ready='true';
