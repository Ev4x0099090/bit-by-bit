'use client';
import {ArrowRight} from 'lucide-react';
import type {HardwareFrame} from '@/lib/hardware';
export function HardwareFlow({frames}:{frames:HardwareFrame[]}){return <div className="hw-flow">{frames.map((f,i)=><div className="hw-flow-node" key={i}>{i>0&&<ArrowRight className="hw-flow-arrow" aria-hidden="true"/>}<small>{f.label}</small><strong>{f.value}</strong></div>)}</div>}
const examples:Record<string,[string,string][]>= {
 '3.1.1':[['Score','10'],['CPU follows ADD 2','12'],['Screen','12']],
 '3.1.2':[['CIR','ADD 8'],['RAM[8] → MDR','Value from address 8'],['ALU → ACC','Add to previous ACC']],
 '3.1.3':[['Independent files','4'],['Cores','Share separate jobs'],['Dependent chain','Must keep its order']],
 '3.1.4':[['Model A','Supports MULTIPLY'],['Model B','Supports ADD only'],['Same result possible','Different supported commands']],
 '3.1.5':[['Lighting input','Light level'],['Dedicated controller','Compare with target'],['Output','Switch lamps on']],
 '3.2.1':[['Speech','Microphone'],['Paper certificate','2D scanner'],['Part shape','3D scanner']],
 '3.2.2':[['Share with a class','Projector → large image'],['Keep a paper copy','Printer → printed page']],
 '3.2.3':[['Fridge cold enough?','Temperature sensor'],['Tank full enough?','Level sensor']],
 '3.3.1':[['Changing game score','RAM'],['Power off','RAM contents lost'],['Startup instructions','ROM retains them']],
 '3.3.2':[['Saved song','Secondary storage'],['Load for playing','Working memory'],['Sound output','Speaker']],
 '3.3.3':[['HDD','Magnetic states'],['CD','Laser light'],['SD card','Flash cells']],
 '3.3.4':[['RAM','X + Y'],['Request Z','Y out, Z in'],['Need Y again','Another exchange']],
 '3.3.5':[['Phone','Upload photo'],['Physical server','Store photo'],['Tablet','Download photo']],
 '3.3.6':[['Class group','Shared cloud folder'],['Before travel','Download documents'],['Offline','Use local copies']],
 '3.4.1':[['Wired interface','Own MAC address'],['Wireless interface','Own MAC address']],
 '3.4.2':[['Same manufacturer','00:1A:2B'],['Interface 1','10:20:30'],['Interface 2','10:20:31']],
 '3.4.3':[['IPv4','192.0.2.40'],['Full IPv6','2001:0DB8:0000:0000:0000:0000:0000:0040']],
 '3.4.4':[['New laptop','Allocate local IP'],['Internet packet','Read destination IP'],['Router','Forward towards server']]
};
export function HardwareHelpVisual({objective}:{objective:string}){return <HardwareFlow frames={(examples[objective]??[]).map(([label,value])=>({label,value}))}/>}
