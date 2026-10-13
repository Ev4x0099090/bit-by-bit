'use client';
import {useState} from 'react';
import {unitOneExamples,binaryStorageNames,type UnitExample,type CalculationStep} from '@/lib/unit-one';
import {PracticeCheck} from './learning-support';
import {VisualBits} from './topic-visuals';

function CalculationVisual({rows,bits,weights}:{rows:[string,string][],bits?:string,weights?:number[]}){
 return <div className="unit-calculation-visual">{bits&&<VisualBits pattern={bits} weights={weights}/>}<dl>{rows.map(([label,value],i)=><div key={i}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>;
}
function Example({example:e}:{example:UnitExample}){
 const [shown,setShown]=useState(1);
 return <details className="unit-worked-example" data-unit-example={e.id}><summary>{e.title}</summary><p className="worked-prompt">{e.prompt}</p><ol className="unit-worked-steps">{e.steps.slice(0,shown).map((s:CalculationStep,i)=><li key={i}><span className="unit-step-number">{i+1}</span><div><h4>{s.title}</h4><p>{s.reason}</p><CalculationVisual {...s}/></div></li>)}</ol><div className="demo-actions"><button className="btn secondary" onClick={()=>setShown(n=>n+1)} disabled={shown===e.steps.length}>{shown===e.steps.length?'All steps shown':'Show the next step'}</button><button className="text-btn" onClick={()=>setShown(1)}>Start this example again</button><span>{shown} / {e.steps.length} steps</span></div>{shown===e.steps.length&&<PracticeCheck question={e.practice} label="Try a different example" hintVisuals={e.hints.map((rows,i)=><div key={i} data-calculation-hint={i+1}><CalculationVisual rows={rows}/></div>)}/>}</details>;
}
export function UnitOneWorkedExamples({objective}:{objective:string}){
 const examples=unitOneExamples.filter(e=>e.objective===objective);if(!examples.length)return null;
 return <div className="unit-worked-examples" data-unit-examples={objective}><h3>More worked examples</h3><p>Choose the skill you want to practise. Follow one step at a time, then try a different question.</p>{objective==='1.3.1'&&<details className="unit-storage-reference"><summary>All nine storage units in the syllabus</summary><dl>{binaryStorageNames.map(([name,meaning])=><div key={name}><dt>{name}</dt><dd>{meaning}</dd></div>)}</dl></details>}{examples.map(e=><Example key={e.id} example={e}/>)}</div>;
}
