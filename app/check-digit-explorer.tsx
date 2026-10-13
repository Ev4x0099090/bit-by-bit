'use client';
import {useState} from 'react';
import {AnswerSuccess} from './answer-success';

/** A deliberately simple teaching rule, not a real ISBN/barcode calculation. */
const checkDigit=(digits:string)=>(10-[...digits].reduce((sum,digit)=>sum+Number(digit),0)%10)%10;

export function CheckDigitCode({value,label,changed=-1}:{value:string,label:string,changed?:number}){
 return <div className="cd-code"><span>{label}</span><div className="cd-digits">{[...value].map((digit,i)=><span key={i} className={`${i===3?'cd-check':''} ${i===changed?'cd-changed':''}`}><b>{digit}</b><small>{i===3?'check digit':i===changed?'changed':''}</small></span>)}</div></div>;
}

export function CheckDigitExplorer(){
 const [stage,setStage]=useState(0),[furthest,setFurthest]=useState(0),[entered,setEntered]=useState('3142'),[checked,setChecked]=useState(false),[showLimit,setShowLimit]=useState(false);
 const valid=/^[0-9]{4}$/.test(entered),expected=valid?checkDigit(entered.slice(0,3)):null,passes=valid&&String(expected)===entered[3];
 const choose=(value:string)=>{setEntered(value);setChecked(false);setShowLimit(false)};
 const goStage=(next:number)=>{setStage(next);setFurthest(old=>Math.max(old,next))};
 const reset=()=>{setStage(0);setFurthest(0);choose('3142')};
 return <div className="cd-explorer">
  <nav className="cd-stages" aria-label="Check-digit activity stages">{['Start with a number','Add a check digit','Type the number','Check it'].map((title,i)=><button key={title} aria-current={stage===i?'step':undefined} disabled={i>furthest} onClick={()=>goStage(i)}><b>{i+1}</b><span>{title}</span></button>)}</nav>
  <div className="cd-stage" key={stage}>
   {stage===0&&<><h3>A number can be typed wrongly</h3><p>Imagine an item labelled <strong>314</strong>. Someone needs to type this number into a computer.</p><CheckDigitCode value="314" label="Number on the item"/><p>Each symbol — 3, 1 or 4 — is a <strong>digit</strong>. A digit is one symbol from 0 to 9.</p><button className="btn" onClick={()=>goStage(1)}>Give the number a checking digit</button></>}
   {stage===1&&<><h3>Add one extra digit at the end</h3><div className="cd-attach"><CheckDigitCode value="314" label="Original number"/><span aria-hidden="true">→</span><CheckDigitCode value="3142" label="Number printed on the item"/></div><p>The computer uses the original digits to calculate <strong>2</strong>. It adds this extra digit at the end. This is the <strong>check digit</strong>.</p><p>Later, it will help the computer spot a typing mistake.</p><details className="cd-optional"><summary>How did this example get 2? · optional</summary><p>For this example only, add the digits and fill up to the next ten.</p><div className="cd-ten" aria-label="Eight from the original digits, plus two to reach ten">{Array.from({length:10},(_,i)=><b key={i} className={i>=8?'extra':''}>{i>=8?'+1':'1'}</b>)}</div><div className="cd-equations"><span>3 + 1 + 4 = <b>8</b></span><span>8 + <b>2</b> = 10</span></div><p>The two extra dots give check digit <strong>2</strong>. This is a teaching rule. Real ISBNs and barcodes use their own rules. You do not need to memorise this example rule.</p></details><button className="btn" onClick={()=>goStage(2)}>Now type the printed number</button></>}
   {(stage===2||stage===3)&&<><h3>{stage===2?'Copy the whole number':'Does the last digit match?'}</h3><p>{stage===2?'Try the correct copy first. Then try a typing mistake.':'The computer uses the first three entered digits to work out a check digit again. It compares that result with the last digit you typed.'}</p><CheckDigitCode value="3142" label="Printed number · copy all four digits"/>
    <label className="cd-entry">Number typed into the computer<input aria-describedby="cd-entry-help" value={entered} maxLength={4} inputMode="numeric" autoComplete="off" onChange={e=>{setEntered(e.target.value);setChecked(false);setShowLimit(false)}}/></label>
    <p id="cd-entry-help" className="small-reading-note">Use four digits from 0 to 9, including the check digit.</p>
    {!valid&&<p role="alert">Enter exactly four digits before checking.</p>}
    <div className="demo-actions"><button className="btn secondary" onClick={()=>choose('3142')}>Use the correct copy</button><button className="btn secondary" onClick={()=>choose('3152')}>Try one typing mistake</button></div>
    <button className="btn" disabled={!valid} onClick={()=>{goStage(3);setChecked(true)}}>Check what I typed</button>
    {checked&&valid&&<div className={`cd-result ${passes?'cd-match':'cd-mismatch'}`}>
     <CheckDigitCode value={entered} changed={entered==='3152'?2:-1} label="Entered number"/>
     <div className="cd-compare"><div><span>Worked out from {entered.slice(0,3)}</span><b>{expected}</b></div><strong>{passes?'=':'≠'}</strong><div><span>Last digit typed</span><b>{entered[3]}</b></div></div>
     <p role="status"><strong>{passes?'Match — no error detected.':'Different — possible typing mistake.'}</strong> {passes?'The two checking digits are the same. This check found no problem.':'Check the printed number and type it again. The check flags a problem; it does not fix the number for you.'}</p>
     {passes&&entered==='3142'&&<AnswerSuccess/>}
     <details className="cd-optional"><summary>Show the example calculation</summary><p>{entered.slice(0,3).split('').join(' + ')} = {[...entered.slice(0,3)].reduce((s,d)=>s+Number(d),0)}. {expected===0?'This total already ends in 0, so add 0.':`Add ${expected} to reach the next ten.`} So the expected check digit is {expected}.</p></details>
     <button className="text-btn" onClick={()=>{setEntered('1342');setChecked(true);setShowLimit(true)}}>Can this check miss a mistake?</button>
     {showLimit&&<p className="cd-limit">Look at the printed number: <strong>3142</strong>. We swapped 3 and 1 to get <strong>1342</strong>. The addition still gives the same check digit, 2. So this simple rule misses that mistake. <strong>A match is not proof that the whole number is correct.</strong></p>}
    </div>}
   </>}
  </div>
  <div className="cd-controls">{stage>0&&<button className="text-btn" onClick={()=>goStage(stage-1)}>Previous stage</button>}<button className="text-btn" onClick={reset}>Start this activity again</button></div>
 </div>;
}
