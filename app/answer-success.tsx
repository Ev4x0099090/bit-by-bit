'use client';
import {useLayoutEffect,useRef,type CSSProperties} from 'react';

export function AnswerSuccess(){
 const badge=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{const element=badge.current;if(!element)return;const bounds=element.getBoundingClientRect();if(bounds.bottom>window.innerHeight-12||bounds.top<120)element.scrollIntoView({block:'center',behavior:'instant'})},[]);
 return <div ref={badge} className="answer-success" aria-hidden="true" data-answer-success>
  <div className="success-sparkles">{Array.from({length:10},(_,i)=>{
   const angle=i/10*Math.PI*2;
   return <i key={i} style={{'--spark-x':`${Math.cos(angle)*62}px`,'--spark-y':`${Math.sin(angle)*40}px`,'--spark-turn':`${i*47}deg`,'--spark-delay':`${i%3*35}ms`} as CSSProperties}/>;
  })}</div>
  <svg className="success-check" viewBox="0 0 56 56"><circle cx="28" cy="28" r="25"/><path d="m16 28 8 8 16-17"/></svg>
  <span>Nice work!</span>
 </div>;
}
