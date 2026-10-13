'use client';
import {chapters} from '@/lib/chapters';
import {ChapterMap} from './chapter-map';

export function ChapterPicker({chapter,completed,onChapter,onLesson,onAssessment}:{chapter:string,completed:string[],onChapter:(id:string)=>void,onLesson:(i:number)=>void,onAssessment:()=>void}){
 const c=chapters.find(c=>c.id===chapter)||chapters[0];
 return <div className="chapter-picker"><label className="chapter-jump">Browse chapters<select aria-label="Choose a chapter" value={c.id} onChange={e=>onChapter(e.target.value)}>{chapters.map(c=><option key={c.id} value={c.id}>{c.id}. {c.title}</option>)}</select></label><ChapterMap chapter={c.id} completed={completed} onLesson={onLesson} onAssessment={onAssessment}/></div>;
}
