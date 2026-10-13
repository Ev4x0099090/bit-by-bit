'use client';
import {useState} from 'react';
import {Cpu,Monitor,ArrowRight,RotateCcw} from 'lucide-react';
import {AnswerSuccess} from './answer-success';
import {CpuTrace,CpuPerformance,InstructionSet,EmbeddedSystems} from './hardware-architecture';
import {DeviceExplorer,SensorExplorer} from './hardware-devices';
import {MemoryPower,SaveAndLoad,StorageInside,VirtualMemory,CloudJourney,StorageChoice} from './hardware-storage';
import {NetworkInterface,MacAddress,IpAllocation,PacketRouter} from './hardware-network';
const activities:Record<string,()=>React.ReactNode>={
 '3.1.1':CpuCalculation,'3.1.2':CpuTrace,'3.1.3':CpuPerformance,'3.1.4':InstructionSet,'3.1.5':EmbeddedSystems,
 '3.2.1':()=> <DeviceExplorer/>,'3.2.2':()=> <DeviceExplorer output/>,'3.2.3':SensorExplorer,
 '3.3.1':MemoryPower,'3.3.2':SaveAndLoad,'3.3.3':StorageInside,'3.3.4':VirtualMemory,'3.3.5':CloudJourney,'3.3.6':StorageChoice,
 '3.4.1':NetworkInterface,'3.4.2':MacAddress,'3.4.3':IpAllocation,'3.4.4':PacketRouter
};
export function HardwareActivity({id}:{id:string}){
 const Activity=activities[id];
 return <section className="hw-activity" data-hardware-activity={id}><Activity/></section>;
}
function CpuCalculation(){
 const [a,setA]=useState(3),[b,setB]=useState(4),[op,setOp]=useState('add'),[step,setStep]=useState(0);
 const result=op==='add'?a+b:a-b,change=()=>setStep(0);
 return <><p className="hw-instructions">Choose two numbers and an action. Advance one step at a time to follow input, processing and output.</p><div className="hw-calculation-controls"><label>First number<input type="number" min={0} max={99} value={a} onChange={e=>{setA(Math.max(0,Math.min(99,Number(e.target.value))));change()}}/></label><label>Action<select aria-label="Calculation action" value={op} onChange={e=>{setOp(e.target.value);change()}}><option value="add">Add</option><option value="subtract">Subtract</option></select></label><label>Second number<input type="number" min={0} max={99} value={b} onChange={e=>{setB(Math.max(0,Math.min(99,Number(e.target.value))));change()}}/></label></div><div className="hw-calculation-diagram"><div className={`hw-machine-part ${step===1?'current':''}`}><small>1 · INPUT</small><strong>{a} {op==='add'?'+':'−'} {b}</strong><span>Data + instruction</span></div><ArrowRight className="hw-data-arrow"/><div className={`hw-machine-part hw-processor ${step===2?'current':''}`}><Cpu size={44}/><small>2 · CPU</small><strong>{step>=2?`${a} ${op==='add'?'+':'−'} ${b} = ${result}`:'Ready to process'}</strong><span>Carry out the instruction</span></div><ArrowRight className="hw-data-arrow"/><div className={`hw-machine-part ${step===3?'current':''}`}><Monitor size={35}/><small>3 · OUTPUT</small><strong aria-label="Displayed result">{step===3?result:'—'}</strong><span>Display the result</span></div></div><div className="hw-live" role="status">{['The numbers and action are ready. Start with the input.','Input: the numbers and the instruction enter the computer.','Processing: the CPU follows the instruction and calculates the result.','Output: the screen displays the result produced by the CPU.'][step]}</div><div className="hw-controls"><button className="btn" disabled={step===3} onClick={()=>setStep(n=>n+1)}>{step===0?'Follow the input':step===1?'Let the CPU process':'Show the output'}</button><button className="text-btn" onClick={()=>setStep(0)}><RotateCcw size={15}/> Start again</button></div>{step===3&&<AnswerSuccess/>}<p className="hw-model-note">This diagram shows the CPU’s role. The next lesson opens up its internal parts.</p></>;
}
