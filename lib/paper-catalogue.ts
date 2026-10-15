import annual from './papers/annual.json';
import {paper2Paper,paper2Tasks,type PracticalTask} from './course-paper2-practice';
import {paper23Thresholds,paper23ThresholdSource} from './paper-selection';
export type PaperDefinition={id:string,year:number,title:string,code:string,minutes:number,marks:number,thresholds:{grade:string,minimum:number}[],thresholdSource:string,source?:string,legacy?:boolean,scenario?:{title:string,text:string,table:{headings:string[],rows:string[][]}},tasks:PracticalTask[]};
export const paperCatalogue:PaperDefinition[]=[{...paper2Paper,year:2025,thresholds:paper23Thresholds,thresholdSource:paper23ThresholdSource,tasks:paper2Tasks},...annual as PaperDefinition[]];
export const paperById=(id?:string)=>paperCatalogue.find(p=>p.id===id);
