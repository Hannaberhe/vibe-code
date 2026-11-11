export const CURRENCIES = Object.freeze({ETB:'Br',USD:'$',EUR:'€',GBP:'£',KES:'KSh',NGN:'₦',INR:'₹'});
export const number = (value, digits = 2) => new Intl.NumberFormat('en-US', {maximumFractionDigits:digits}).format(value);

export function calculatePurchase({item, price, rate, currency, mode = 'shopping'}) {
  const errors = {};
  const cleanItem = String(item ?? '').trim();
  const amount = Number(price);
  const hourly = Number(rate);
  if (!cleanItem || cleanItem.length > 80) errors.item = 'Enter a name with 1–80 characters.';
  if (!Number.isFinite(amount) || amount < 0.01 || amount > 1e12) errors.price = 'Enter a price from 0.01 to 1 trillion.';
  if (!Number.isFinite(hourly) || hourly < 0.01 || hourly > 1e9) errors.rate = `Enter ${mode==='food'?'daily earnings':'hourly pay'} from 0.01 to 1 billion.`;
  if (!Object.hasOwn(CURRENCIES, currency)) errors.currency = 'Choose a supported currency.';
  if (!['shopping','food'].includes(mode)) errors.mode = 'Choose a supported goal.';
  if (Object.keys(errors).length) return {errors};
  const hours = amount / hourly * (mode==='food'?8:1);
  const days = hours/8;
  const earningDays=Math.max(1,Math.ceil(days-Number.EPSILON*Math.max(1,days)));
  return {item:cleanItem, price:amount, rate:hourly, currency, mode, hours, days, earningDays, tier:hours<1?'little':hours<=8?'shift':hours<=40?'overtime':'ouch'};
}

export function money(value, currency) {
  const symbol = CURRENCIES[currency] ?? currency;
  return currency==='ETB' ? `${number(value)} ${symbol}` : `${symbol}${number(value)}`;
}

export function timeDisplay(hours) {
  if (hours < 1 / 60) return {value:'<1',unit:'minute'};
  if (hours < 1) {const minutes = Math.round(hours * 60);return {value:number(minutes),unit:minutes===1?'minute':'minutes'};}
  const value = hours>=1e6?new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(hours):number(hours);
  return {value,unit:value==='1'?'hour':'hours'};
}

export function shiftDetail(hours) {
  if (hours < 1/60) return 'Less than a minute on the clock';
  if (hours < 1) return `${number(hours*60,0)} minutes on the clock`;
  const shifts = Math.floor(hours/8);
  const remainder = hours%8;
  if (!shifts) return `${number(hours)} ${hours===1?'hour':'hours'} of your next shift`;
  return `${number(shifts)} full ${shifts===1?'shift':'shifts'}${remainder>=0.01?` + ${number(remainder)} hours`:''}`;
}
