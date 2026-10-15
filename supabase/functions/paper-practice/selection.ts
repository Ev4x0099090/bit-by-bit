import type {PaperSession} from './types.ts';
export const paper23Thresholds=[{grade:'A',minimum:43},{grade:'B',minimum:33},{grade:'C',minimum:23},{grade:'D',minimum:19},{grade:'E',minimum:15}];
export const paper23ThresholdSource='https://www.cambridgeinternational.org/Images/750801-computer-science-2210-november-2025-grade-threshold-table.pdf';
export function gradeForPaper(mark:number,thresholds=paper23Thresholds,maximum=75){if(!Number.isInteger(mark)||mark<0||mark>maximum)throw Error('Invalid paper mark');return thresholds.find(t=>mark>=t.minimum)?.grade||'U'}
export function choosePaper(papers:{id:string}[],sessions:PaperSession[],random=Math.random,resume=true){
 const active=sessions.filter(s=>s.status!=='complete'&&papers.some(p=>p.id===s.paperId)).sort((a,b)=>b.updatedAt-a.updatedAt)[0];
 if(active&&resume)return {paperId:active.paperId,session:active};
 const available=papers.filter(p=>!sessions.some(s=>s.paperId===p.id));
 if(!available.length)return null;
 return {paperId:available[Math.min(available.length-1,Math.floor(Math.max(0,random())*available.length))].id,session:null};
}
