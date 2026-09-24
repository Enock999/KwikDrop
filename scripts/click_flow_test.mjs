import { spawn } from 'node:child_process';
import { request } from 'node:http';

const chrome = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9222','--user-data-dir=/tmp/kwikdrop-click-test'], {stdio:'ignore'});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const json = (url) => new Promise((resolve, reject) => { request(url, (res) => { let body=''; res.on('data', d => body += d); res.on('end', () => resolve(JSON.parse(body))); }).on('error', reject).end(); });
const send = (ws, id, method, params={}) => new Promise((resolve, reject) => {
  const listener = (event) => { const msg = JSON.parse(event.data); if (msg.id !== id) return; ws.removeEventListener('message', listener); msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result); };
  ws.addEventListener('message', listener); ws.send(JSON.stringify({id, method, params}));
});
try {
  await sleep(1200);
  const tabs = await new Promise((resolve, reject) => { request({hostname:'127.0.0.1',port:9222,path:'/json/new?https://enock999.github.io/KwikDrop/index.html',method:'PUT'}, (res) => { let body=''; res.on('data', d => body += d); res.on('end', () => resolve(JSON.parse(body))); }).on('error', reject).end(); });
  const ws = new WebSocket(tabs.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));
  let id = 1;
  await send(ws, id++, 'Runtime.enable');
  await send(ws, id++, 'Page.enable');
  await send(ws, id++, 'Page.navigate', {url:'https://enock999.github.io/KwikDrop/index.html'});
  await sleep(2200);
  const click = async (selector, label) => {
    const result = await send(ws, id++, 'Runtime.evaluate', {expression:`(()=>{const el=document.querySelector(${JSON.stringify(selector)}); if(!el) return {label:${JSON.stringify(label)},found:false,href:null}; el.click(); return {label:${JSON.stringify(label)},found:true,href:el.href||null};})()`, returnByValue:true});
    await sleep(1800);
    const state = await send(ws, id++, 'Runtime.evaluate', {expression:`({label:${JSON.stringify(label)},url:location.href,title:document.title,rootText:(document.querySelector('#root')?.innerText||'').slice(0,120),rootChildren:document.querySelector('#root')?.children.length||0})`, returnByValue:true});
    return {...result.result.value, ...state.result.value};
  };
  const results = [];
  results.push(await click('nav a[href$="#shop"]', 'Home -> Shop'));
  results.push(await click('nav a[href$="#how-it-works"]', 'Shop -> How it works'));
  results.push(await click('nav a[href$="#delivery"]', 'How it works -> Delivery'));
  results.push(await click('nav a[href$="#faqs"]', 'Delivery -> FAQs'));
  results.push(await click('a.brand[href$="index.html"]', 'FAQs -> Home'));
  console.log(JSON.stringify(results, null, 2));
} finally { chrome.kill('SIGTERM'); }
