import {lessons} from './content';
export type LearningView='dashboard'|'chapter'|'learn'|'practice'|'paper2'|'syllabus'|'revision';
export type LearningLocation={view:LearningView,lesson:number,mode:string,objective?:string};
export function readLearningLocation(search:string):LearningLocation{
 const params=new URLSearchParams(search),requested=params.get('view');
 let view:LearningView=['dashboard','chapter','learn','practice','paper2','syllabus','revision'].includes(requested||'')?requested as LearningView:'dashboard';
 const requestedLesson=lessons.findIndex(l=>l.id===params.get('lesson')),lesson=requestedLesson>=0?requestedLesson:(view!=='learn'?lessons.findIndex(l=>l.id.startsWith((params.get('chapter')||'1')+'.')):-1);if(view==='learn'&&lesson<0)view='chapter';
 const mode=['adaptive','chapter','written'].includes(params.get('mode')||'')?params.get('mode')!:'adaptive';
 const objective=lessons.find(l=>l.id===params.get('objective'))?.id;
 return {view,lesson:Math.max(0,lesson),mode,objective};
}
export function learningLocationSearch({view,lesson,mode,objective}:LearningLocation){
 const params=new URLSearchParams();if(view!=='dashboard')params.set('view',view);
 if(view==='learn')params.set('lesson',lessons[lesson].id);
 if((view==='chapter'||view==='practice')&&lessons[lesson]&&!lessons[lesson].id.startsWith('1.'))params.set('chapter',lessons[lesson].id.split('.')[0]);
 if(view==='practice'){params.set('mode',mode);if(objective)params.set('objective',objective)}
 const search=params.toString();return search?'?'+search:'';
}
