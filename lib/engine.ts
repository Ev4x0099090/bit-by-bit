import { questions, type Question } from './content';
import {learningConfig as config} from './learning-config';
export type Attempt={id:string,objective:string,questionId:string,answer?:string,earned:number,possible:number,confidence:number,at:number,self:boolean};
export {normalise,mark} from './marking';
export function mastery(attempts:Attempt[],objective:string){const rows=attempts.filter(a=>a.objective===objective&&!a.self).slice(-config.rollingWindow);if(!rows.length)return {score:0,count:0,label:'Not started'};const score=Math.round(rows.reduce((s,a)=>s+a.earned,0)/rows.reduce((s,a)=>s+a.possible,0)*100);const enough=rows.length>=config.minimumAttempts&&new Set(rows.map(a=>a.questionId)).size>=config.minimumDistinctQuestions;return {score,count:rows.length,label:!enough?'Learning':score>=config.masteryThreshold?'Mastered':score>=config.proficiencyThreshold?'Proficient':score>=45?'Developing':'Learning'}}
// Keep each topic represented, then prefer questions the student has seen least.
// Difficulty breaks ties between equally fresh questions; it must not force repeats.
export function rankPracticeQuestions(pool:Question[],attempts:Attempt[],target:number,random=Math.random){
 const byObjective=new Map<string,number>(),byQuestion=new Map<string,{count:number,last:number}>();
 for(const a of attempts.filter(a=>!a.self)){byObjective.set(a.objective,(byObjective.get(a.objective)||0)+1);const old=byQuestion.get(a.questionId);byQuestion.set(a.questionId,{count:(old?.count||0)+1,last:Math.max(old?.last||0,a.at)})}
 return pool.map(q=>({q,topic:byObjective.get(q.objective)||0,count:byQuestion.get(q.id)?.count||0,last:byQuestion.get(q.id)?.last||0,distance:Math.abs(q.difficulty-target),tie:random()})).sort((a,b)=>a.topic-b.topic||a.count-b.count||a.last-b.last||a.distance-b.distance||a.tie-b.tie).map(item=>item.q);
}
export function nextQuestion(attempts:Attempt[],used:string[],objective?:string,random=Math.random,scope?:string[]){const pool=questions.filter(q=>q.type!=='written'&&(!objective||q.objective===objective)&&(!scope||scope.includes(q.objective))&&!used.includes(q.id));const recent=attempts.filter(a=>!a.self).slice(-3);const target=Math.max(1,Math.min(5,2+recent.reduce((s,a)=>s+(a.earned===a.possible?1:-1),0)));return rankPracticeQuestions(pool,attempts,target,random)[0]||null}

export function interval(a:Attempt,prior:Attempt[]){if(a.earned<a.possible||a.confidence<=2)return 1;const correct=prior.filter(p=>p.objective===a.objective&&p.earned===p.possible&&!p.self).length;return Math.min(30,[3,7,14,30][Math.min(correct,3)])}
export function dueObjectives(attempts:Attempt[],now=Date.now()){const latest=new Map<string,Attempt>();for(const a of attempts)latest.set(a.objective,a);return [...latest.values()].filter(a=>a.at+interval(a,attempts.filter(p=>p.at<a.at))*86400000<=now).map(a=>a.objective)}
export function weakness(attempts:Attempt[]){return [...new Set(attempts.map(a=>a.objective))].map(o=>({objective:o,...mastery(attempts,o)})).filter(x=>x.count>=3&&x.score<70).sort((a,b)=>a.score-b.score)}
