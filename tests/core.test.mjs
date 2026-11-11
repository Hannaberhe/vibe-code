import test from 'node:test';
import assert from 'node:assert/strict';
import {calculatePurchase,money,timeDisplay,shiftDetail} from '../calculator.mjs';
import {newGrind,readGrind,progress,dayBefore,localDate} from '../grind.mjs';

const purchase={item:'Headphones',price:2000,rate:100,currency:'ETB'};
const fullDay={commit:true,logic:true,sprint:true,pass:false};

test('headphones show 20 hours and 2.5 workdays',()=>{
  const result=calculatePurchase(purchase);
  assert.equal(result.hours,20);assert.equal(result.days,2.5);assert.equal(result.tier,'overtime');
  assert.equal(shiftDetail(result.hours),'2 full shifts + 4 hours');
});

test('food divides the price by daily pay and rounds up full workdays',()=>{
  const result=calculatePurchase({...purchase,item:'Tibs',price:650,rate:300,mode:'food'});
  assert.equal(result.earningDays,3);assert.equal(result.days,650/300);assert.equal(result.hours,650/300*8);
  assert.equal(calculatePurchase({...purchase,price:100,rate:200,mode:'food'}).earningDays,1);
});

test('decimal currency does not create an extra workday',()=>{
  for(const [price,rate,days] of [[.07,.01,7],[.3,.1,3],[600,300,2],[600.01,300,3],[.01,1e9,1]]) {
    assert.equal(calculatePurchase({...purchase,price,rate,mode:'food'}).earningDays,days);
  }
});

test('missing, negative, huge, and invalid pay or prices give errors',()=>{
  for(const price of [0,-1,'',NaN,Infinity,1e13]) assert.ok(calculatePurchase({...purchase,price}).errors?.price);
  for(const rate of [0,-1,'',NaN,Infinity,1e10]) assert.ok(calculatePurchase({...purchase,rate}).errors?.rate);
  for(const item of ['','   ','a'.repeat(81)]) assert.ok(calculatePurchase({...purchase,item}).errors?.item);
  assert.ok(calculatePurchase({...purchase,currency:'unknown'}).errors?.currency);
  assert.ok(calculatePurchase({...purchase,mode:'unknown'}).errors?.mode);
});

test('currency labels do not convert the price',()=>{
  assert.equal(money(2000,'ETB'),'2,000 Br');assert.equal(money(2000,'USD'),'$2,000');
  assert.equal(calculatePurchase({...purchase,currency:'USD'}).hours,20);
});

test('small purchases show minutes and large ones remain readable',()=>{
  assert.deepEqual(timeDisplay(.5),{value:'30',unit:'minutes'});
  assert.deepEqual(timeDisplay(.001),{value:'<1',unit:'minute'});
  assert.deepEqual(timeDisplay(1),{value:'1',unit:'hour'});
  assert.equal(timeDisplay(1e14).value,'100T');
});

test('joke tiers follow the real amount of work',()=>{
  for(const [hours,tier] of [[.5,'little'],[1,'shift'],[8,'shift'],[8.01,'overtime'],[40,'overtime'],[40.01,'ouch']]) {
    assert.equal(calculatePurchase({...purchase,price:hours*100}).tier,tier);
  }
});

test('all tasks give 75 points and unlock the break',()=>{
  const state=newGrind();state.days['2026-11-11']={...fullDay};
  const result=progress(state,'2026-11-11');
  assert.equal(result.xp,75);assert.equal(result.todayXP,75);assert.equal(result.count,3);assert.equal(result.streak,1);assert.equal(result.unlocked,true);
  assert.equal(progress(state,'2026-11-11').xp,75,'reading progress must not add points');
  state.days['2026-11-11'].sprint=false;
  assert.equal(progress(state,'2026-11-11').xp,55);assert.equal(progress(state,'2026-11-11').unlocked,false);
});

test('full days and free rest days protect streaks without free XP',()=>{
  const state=newGrind();
  state.days['2026-11-10']={...fullDay};state.days['2026-11-11']={pass:true};state.days['2026-11-12']={...fullDay};
  assert.equal(progress(state,'2026-11-11').streak,2);assert.equal(progress(state,'2026-11-11').todayXP,0);assert.equal(progress(state,'2026-11-11').unlocked,false);
  assert.equal(progress(state,'2026-11-12').streak,3);assert.equal(progress(state,'2026-11-12').xp,150);
  assert.equal(progress(state,'2026-11-13').count,0,'a new day has fresh tasks');
  assert.equal(progress(state,'2026-11-13').streak,3,'today is still available to finish');
  assert.equal(progress(state,'2026-11-14').streak,0,'a missed day breaks the streak');
});

test('dates work across months, years, and leap days',()=>{
  assert.equal(dayBefore('2026-03-01'),'2026-02-28');assert.equal(dayBefore('2028-03-01'),'2028-02-29');assert.equal(dayBefore('2026-01-01'),'2025-12-31');
  assert.equal(localDate(new Date(2026,10,11,12)),'2026-11-11');
});

test('saved progress reloads and damaged data falls back safely',()=>{
  const state=newGrind();state.profile.stage='caregiver';state.days['2026-11-11']={...fullDay};
  assert.deepEqual(readGrind(JSON.stringify(state)),state);
  for(const raw of ['bad json','null','[]','{}']) assert.deepEqual(readGrind(raw),newGrind());
  const edited=readGrind(JSON.stringify({profile:{intensity:'bad'},days:{'2026-11-11':{commit:'yes',logic:true},bad:{commit:true}}}));
  assert.equal(edited.profile.intensity,'gentle');assert.equal(edited.days['2026-11-11'].commit,false);assert.equal(edited.days['2026-11-11'].logic,true);assert.equal(edited.days.bad,undefined);
});
