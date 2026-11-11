export const QUEST_XP = Object.freeze({commit:25,logic:30,sprint:20});
export const STORAGE_KEY = 'wallet-check-grind-v1';
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function dayBefore(key) {
  const [year,month,day] = key.split('-').map(Number);
  return localDate(new Date(year,month-1,day-1,12));
}
export function newGrind() {
  return {profile:{handle:'',track:'Frontend',intensity:'gentle',stage:'student'},days:{},breakEndsAt:0};
}
export function readGrind(raw) {
  const clean=newGrind();
  try {
    const data=JSON.parse(raw);
    if(!data || typeof data!=='object') return clean;
    if(data.profile && typeof data.profile==='object') {
      clean.profile.handle=String(data.profile.handle??'').slice(0,24);
      for(const [key,options] of Object.entries({track:['Frontend','Backend','AI / Data','Cybersecurity','Builder'],intensity:['gentle','spicy','savage'],stage:['student','job','night','caregiver']})) {
        if(options.includes(data.profile[key])) clean.profile[key]=data.profile[key];
      }
    }
    for(const [key,day] of Object.entries(data.days??{})) {
      if(!/^\d{4}-\d{2}-\d{2}$/.test(key) || !day || typeof day!=='object') continue;
      clean.days[key]={commit:day.commit===true,logic:day.logic===true,sprint:day.sprint===true,pass:day.pass===true};
    }
    if(Number.isFinite(data.breakEndsAt) && data.breakEndsAt>0 && data.breakEndsAt<=Date.now()+15*60*1000) clean.breakEndsAt=data.breakEndsAt;
  } catch { /* Storage may be unavailable or edited. Start with clean defaults. */ }
  return clean;
}
export function progress(state,today=localDate()) {
  const day=state.days[today]??{};
  const completed=Object.keys(QUEST_XP).filter(key=>day[key]);
  const xp=Object.entries(state.days).reduce((total,[date,record])=>date<=today?total+Object.entries(QUEST_XP).reduce((sum,[key,value])=>sum+(record[key]?value:0),0):total,0);
  const todayXP=completed.reduce((sum,key)=>sum+QUEST_XP[key],0);
  const qualifies=key=>{const record=state.days[key];return record && (record.pass || Object.keys(QUEST_XP).every(task=>record[task]));};
  let cursor=qualifies(today)?today:dayBefore(today);
  let streak=0;
  while(qualifies(cursor) && streak<10000) {streak++;cursor=dayBefore(cursor);}
  return {count:completed.length,todayXP,xp,streak,passed:day.pass===true,unlocked:completed.length===3};
}
