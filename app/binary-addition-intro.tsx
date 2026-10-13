'use client';
import {useState} from 'react';

function Ones({count}:{count:number}){return <div className="addition-ones">{Array.from({length:count},(_,i)=><span key={i}>1</span>)}</div>}

export function BinaryAdditionIntro(){
 const [step,setStep]=useState(0),[total,setTotal]=useState(2);
 const leftover=total-2;
 return <figure className="topic-visual addition-intro" aria-label="Why binary addition needs a carry" data-addition-intro data-addition-step={step}>
  <figcaption><span>SEE IT HAPPEN</span>Two single ones make one group of two.</figcaption>
  <p>{total===2?<>Start in the <b>1s column</b>, on the right. Add one and one.</>:<>Now try a column further left. Both bits are 1, and the column on its right has sent in another 1. Count all three bits.</>}</p>
  <div className="addition-inputs">
   <div><span>FIRST BIT</span><b>1</b></div><em>+</em><div><span>SECOND BIT</span><b>1</b></div>
   {total===3&&<><em>+</em><div className="incoming-one"><span>CARRIED IN</span><b>1</b></div></>}
   <em>=</em><div><span>COUNT THE ONES</span><Ones count={total}/></div>
  </div>
  {step===0?<div className="addition-counting"><Ones count={total}/><strong>{total} single ones</strong><span>Binary has no digit {total}. Each column can only contain 0 or 1.</span></div>:<>
   <div className="addition-grouping"><div className="pair-of-ones"><Ones count={2}/><strong>1 group of two</strong></div><span>+</span><div className="leftover-ones"><Ones count={leftover}/><strong>{leftover} single {leftover===1?'one':'ones'} left</strong></div></div>
   {step===2&&<>
    <div className="addition-carry-direction">← Move the group to the next column on the left</div>
    <div className="addition-place-columns">
     <div className="carry-destination"><span>{total===2?'2s COLUMN':'NEXT COLUMN'}</span><small>Count groups of two</small><b>1</b><span>{total===2?'1 group × 2 = 2':'1 pair moves left'}</span><strong>CARRY 1 HERE</strong></div>
     <div className="addition-remainder"><span>{total===2?'1s COLUMN':'CURRENT COLUMN'}</span><small>Count single ones left</small><b className={leftover?'digit-one':'digit-zero'}>{leftover}</b><span>{total===2?'0 × 1 = 0':'1 single one stays'}</span><strong>WRITE {leftover} HERE</strong></div>
    </div>
    <div className="addition-meaning"><code>{total===2?'10':'11'}</code><span>{total===2?<>means <b>2 + 0 = 2</b>, not ten.</>:<>shows <b>1 pair and 1 single one</b>: carry 1 and write 1.</>}</span></div>
   </>}
  </>}
  <p className="addition-step-explanation" role="status">{step===0?'First, put two of the single ones into a group.':step===1?`Now we have one group of two and ${leftover} single ${leftover===1?'one':'ones'} left. The group belongs in ${total===2?'the 2s column':'the next column on the left'}.`:<>Moving that group left is called a <b>carry</b>. Write <b>{leftover}</b> in the current column and carry <b>1</b> to the next column. {total===3?'Every column on the left is worth twice the one on its right, so this keeps the same value.':'The 0 shows that there are no single ones left.'}</>}</p>
  <div className="demo-actions">
   {step<2?<button className="btn secondary" onClick={()=>setStep(s=>s+1)}>{step===0?'Make a group of two':total===2?'Move the group to the 2s column':'Move the pair one column left'}</button>:total===2?<button className="btn secondary" onClick={()=>{setTotal(3);setStep(0)}}>Try adding a carried 1</button>:<span className="addition-complete">1 + 1 + carried 1: write 1, carry 1</span>}
   <button className="text-btn" onClick={()=>{setTotal(2);setStep(0)}}>Start again with 1 + 1</button>
   <span className="reveal-count">Step {step+1} / 3</span>
  </div>
  <details className="addition-rule-recap"><summary>Keep the four addition rules handy</summary><div className="addition-rules">{[['0 + 0','0'],['0 + 1','1'],['1 + 0','1'],['1 + 1','10']].map(([sum,result])=><div key={sum}><code>{sum}</code><span>↓</span><strong>{result}</strong></div>)}</div><p>For 1 + 1, write 0 in the current column and carry 1 left. If a carried 1 makes the total three, write 1 and carry 1: the result is 11 in binary.</p></details>
 </figure>;
}
