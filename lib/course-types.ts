import type {HardwareEntry,HardwareFrame} from './hardware';
export type CourseCheck={prompt:string,answer:string,options:string[],explanation:string,clues:HardwareFrame[]};
export type CourseEntry=HardwareEntry&{assessment:CourseCheck[],helpFrames:HardwareFrame[]};
export type CourseSpec=Omit<CourseEntry,'worked'|'practice'|'takeaways'|'sections'|'preview'|'helpFrames'> & {
 sections:[string,string,string][],worked:[string,...[string,string,[string,string][]][]],practice:CourseCheck[],helpFrames:[string,string][],recap?:[string,string,string]
};
export const F=(items:[string,string][])=>items.map(([label,value])=>({label,value}));
export const Q=(prompt:string,answer:string,options:string[],explanation:string,clues:[string,string][]=[]):CourseCheck=>({prompt,answer,options,explanation,clues:F(clues)});
export const C=({worked,sections,helpFrames,recap,...e}:CourseSpec):CourseEntry=>({...e,sections:sections.map(([title,text])=>[title,text]),takeaways:recap??sections.map(s=>s[2]).slice(0,3) as [string,string,string],worked:{prompt:worked[0],steps:worked.slice(1).map(s=>{const [title,reason,frames]=s as [string,string,[string,string][]];return {title,reason,frames:F(frames)}})},preview:helpFrames.map(s=>s[1]).slice(0,3) as [string,string,string],helpFrames:F(helpFrames),practice:e.practice.map(q=>({...q,hint:'Reveal the labelled diagram one part at a time, then follow the change.'}))});
