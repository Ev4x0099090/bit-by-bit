'use client';
import {useState} from 'react';
import {AnswerSuccess} from './answer-success';
export function HardwareChoices({prompt,answer,options,explanation}:{prompt:string,answer:string,options:string[],explanation:string}){
 const [selected,setSelected]=useState(''),[marked,setMarked]=useState(false);const correct=selected===answer;
 return <div className="hw-choice"><h3>{prompt}</h3><div className="hw-choice-options">{options.map(o=><button key={o} aria-pressed={selected===o} className={selected===o?(marked?(correct?'correct':'incorrect'):'selected'):''} onClick={()=>{setSelected(o);setMarked(false)}}>{o}{marked&&selected===o&&<span>{correct?'✓ Correct':'Try again'}</span>}</button>)}</div><button className="btn secondary" disabled={!selected||marked} onClick={()=>setMarked(true)}>Check choice</button>{marked&&<><p className={`hw-live ${correct?'hw-correct':'hw-error'}`} role="status">{correct?'Correct. ': 'Try another choice. '}{explanation}</p>{correct&&<AnswerSuccess/>}</>}</div>;
}
