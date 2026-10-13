'use client';
import {useState} from 'react';
const hexDigits='0123456789ABCDEF';

function Counters({count}:{count:number}){
 return <span className="number-counters" aria-label={`${count} counters`}>{Array.from({length:count},(_,i)=><i key={i}/>)}</span>;
}

export function NumberSystemsOpening(){
 const [swapped,setSwapped]=useState(false),tens=swapped?5:4,ones=swapped?4:5;
 return <figure className="number-familiar" aria-label="Denary place value example">
  <div className="denary-columns">{[[tens,10,'Tens'],[ones,1,'Ones']].map(([digit,weight,label])=><div key={label}>
   <span>{label}</span><strong>{digit}</strong><span>{digit} × {weight} = <b>{Number(digit)*Number(weight)}</b></span>
   <div className="denary-counter-groups" aria-label={`${digit} groups of ${weight}`}>{Array.from({length:Number(digit)},(_,i)=><Counters key={i} count={Number(weight)}/>)}</div>
  </div>)}</div>
  <div className="number-familiar-action"><div className="number-change" role="status"><b>{tens}{ones}</b> = {tens*10} + {ones}</div><button className="text-btn" onClick={()=>setSwapped(v=>!v)}>Swap the two digits</button></div>
  <figcaption>This is <b>place value</b>: a digit’s position tells us its value. In denary, each column is worth ten times the one to its right.</figcaption>
 </figure>;
}

function BinaryCounter(){
 const [n,setN]=useState(1),pattern=n.toString(2),values=[4,2,1].slice(3-pattern.length);
 return <figure className="number-step-visual number-foundation" data-number-foundation="count">
  <figcaption>Count the same things using 0 and 1.</figcaption>
  <div className="count-comparison"><div><span>How many counters?</span><Counters count={n}/><strong>{n}</strong><small>Denary</small></div><div><span>Write the count in binary</span><div className="foundation-columns" style={{gridTemplateColumns:`repeat(${pattern.length},minmax(0,1fr))`,maxWidth:pattern.length*64}}>{values.map((v,i)=><div key={v} className={pattern[i]==='1'?'used-place':'unused-place'}><span>{v}s</span><b>{pattern[i]}</b></div>)}</div><small>{pattern} in binary = {n} in denary</small></div></div>
  <div className="demo-actions"><button className="btn secondary" disabled={n===7} onClick={()=>setN(n+1)}>Add one counter</button><button className="text-btn" onClick={()=>setN(1)}>Start at one again</button></div>
  <p className="number-change" role="status">{n===2?<>Binary has no digit 2. <b>10</b> means <b>one two and zero ones</b>.</>:<>The 1 bits use these columns: <b>{values.filter((_,i)=>pattern[i]==='1').join(' + ')} = {n}</b>.</>}</p>
  <p className="visual-caption">Start at the right: 1, then 2, then 4. Each column is worth twice the one to its right. Binary is <b>base 2</b>: it uses two digits, and its columns grow in groups of two.</p>
 </figure>;
}

function ReadBinary(){
 const [n,setN]=useState(13),values=[8,4,2,1],pattern=n.toString(2).padStart(4,'0'),sum=values.filter((_,i)=>pattern[i]==='1');
 return <figure className="number-step-visual number-foundation" data-number-foundation="read">
  <figcaption>Try changing a bit. Its column value stays the same.</figcaption>
  <p className="visual-caption">Press a digit to switch between <b>1 · use this value</b> and <b>0 · leave it out</b>.</p>
  <div className="foundation-columns four">{values.map((v,i)=><div key={v} className={pattern[i]==='1'?'used-place':'unused-place'}><span>{v}</span><button aria-label={`Use the ${v} column`} aria-pressed={pattern[i]==='1'} onClick={()=>setN(n^v)}>{pattern[i]}</button></div>)}</div>
  <div className="number-change" role="status"><span>{sum.join(' + ')||'0'}</span> = <b>{n}</b></div>
  <p className="visual-caption"><b>{pattern}</b> in binary has the same value as <b>{n}</b> in denary. The zeros keep each 1 in the correct column.</p>
  <button className="text-btn" onClick={()=>setN(13)}>Reset to 1101</button>
 </figure>;
}

function BuildBinary(){
 const [shown,setShown]=useState(0),values=[8,4,2,1],before=[11,3,3,1],after=[3,3,1,0],pattern='1011';
 return <figure className="number-step-visual number-foundation" data-number-foundation="build">
  <figcaption>Make denary 11, using the 8, 4, 2 and 1 columns.</figcaption>
  <div className="foundation-columns four">{values.map((v,i)=><div key={v} className={i>=shown?'pending-place':pattern[i]==='1'?'used-place':'unused-place'}><span>{v}</span><b>{i<shown?pattern[i]:'?'}</b><small>{i<shown?(pattern[i]==='1'?'Use':'Skip'):'Not checked'}</small></div>)}</div>
  <div className="number-decision" role="status">{shown===0?<><span>Start with 11 to make</span><strong>Does 8 fit into 11?</strong></>:<><span>Check the {values[shown-1]} column</span><strong>{pattern[shown-1]==='1'?`${values[shown-1]} fits into ${before[shown-1]} → write 1`:`${values[shown-1]} is too big for ${before[shown-1]} → write 0`}</strong><code>{pattern[shown-1]==='1'?`${before[shown-1]} − ${values[shown-1]} = ${after[shown-1]} left`:`Keep ${after[shown-1]} left`}</code></>}</div>
  <div className="demo-actions"><button className="btn secondary" disabled={shown===4} onClick={()=>setShown(shown+1)}>{shown===4?'All four columns checked':`Check the ${values[shown]} column`}</button><button className="text-btn" onClick={()=>setShown(0)}>Start again</button></div>
  {shown===4&&<p className="number-change"><b>1011</b> = 8 + 2 + 1 = <b>11</b></p>}
  <p className="visual-caption">Work from left to right. Use the amount left over for the next check. Keep the 0 in the 4 column: it tells us not to use 4.</p>
 </figure>;
}

function MeetHex(){
 const [n,setN]=useState(9);
 return <figure className="number-step-visual number-foundation" data-number-foundation="hex">
  <figcaption>What comes after 9 in hexadecimal?</figcaption>
  <div className="hex-count-pair"><div><span>Denary</span><strong>{n}</strong></div><div><span>Hexadecimal</span><strong>{n.toString(16).toUpperCase()}</strong></div></div>
  <div className="demo-actions"><button className="btn secondary" disabled={n===16} onClick={()=>setN(n+1)}>Show the next number</button><button className="text-btn" onClick={()=>setN(9)}>Start at nine again</button></div>
  <p className="number-change" role="status">{n===16?<><b>10</b> in hex means <b>one sixteen and zero ones</b>. Its denary value is 16.</>:n<10?<>Digits 0–9 have the same values in denary and hex.</>:<><b>{hexDigits[n]}</b> is one hex digit with the value <b>{n}</b>. It is a number here, rather than a letter in a word.</>}</p>
  <div className="hex-letter-key">{['A','B','C','D','E','F'].map((d,i)=><div key={d} className={n===10+i?'matching-letter':''}><strong>{d}</strong><span>= {i+10}</span></div>)}</div>
  <p className="visual-caption">Hex is <b>base 16</b>. It has sixteen digits: 0–9, then A–F. Its column values grow by sixteen: <b>1, 16, 256, 4096</b> from right to left.</p>
 </figure>;
}

function GroupHex(){
 return <figure className="number-step-visual number-foundation" data-number-foundation="group">
  <figcaption>One group of four bits becomes one hex digit.</figcaption>
  <div className="hex-example">{['0001','1010'].map((g,i)=>{const n=parseInt(g,2);return <div key={i}><span>FOUR BITS</span><div className="hex-mini-bits">{[8,4,2,1].map((v,j)=><div key={v} className={g[j]==='1'?'used-place':'unused-place'}><small>{v}</small><b>{g[j]}</b></div>)}</div><small>{i===0?'1':'8 + 2'} = {n}</small><strong>{hexDigits[n]}</strong><small>Hex digit</small></div>})}</div>
  <div className="number-change"><code>0001 | 1010</code> = <b>1A</b> in hex</div>
  <p className="visual-caption">A group of four bits is a <b>nibble</b>. Four bits can make every value from 0 to 15, exactly the values of the sixteen hex digits.</p>
  <div className="hex-place-check"><div><span>16s column</span><b>1</b><small>1 × 16 = 16</small></div><div><span>1s column</span><b>A</b><small>10 × 1 = 10</small></div></div>
  <p className="visual-caption">Check: <b>16 + 10 = 26</b>. Binary 00011010, hex 1A and denary 26 all have the same value.</p>
  <details className="number-padding"><summary>What if there are fewer than eight bits?</summary><p className="visual-caption">Group from the right. Add 0s on the left to fill the first group. They do not change the value.</p><code>11010 → <b>000</b>1 | 1010 → 1A</code></details>
 </figure>;
}

export function NumberSystemsFoundation({step}:{step:number}){
 switch(step){case 0:return <BinaryCounter/>;case 1:return <ReadBinary/>;case 2:return <BuildBinary/>;case 3:return <MeetHex/>;case 4:return <GroupHex/>;default:return null;}
}
