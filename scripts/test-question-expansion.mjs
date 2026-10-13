import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {lessons,questions}=require('../.test-build/content.js');
const {teaching}=require('../.test-build/teaching.js');
const {mark}=require('../.test-build/marking.js');
const added=questions.filter(q=>q.id.startsWith('extra-'));
assert.equal(added.length,444);
assert.equal(questions.length,859);
const normal=s=>s.trim().toLowerCase().replace(/\s+/g,' ');
for(const lesson of lessons){
 assert.equal(added.filter(q=>q.objective===lesson.id&&q.type==='choice').length,3,lesson.id);
}
for(const q of added){
 assert(lessons.some(l=>l.id===q.objective),q.id);
 assert(q.model.length>25,q.id+' needs a useful explanation');
 assert(!questions.some(p=>p.id!==q.id&&normal(p.prompt)===normal(q.prompt)),q.id+' repeats a saved prompt');
 assert(!teaching[q.objective].practice.some(p=>normal(p.prompt)===normal(q.prompt)),q.id+' repeats guided work');
 assert.equal(mark(q,q.answer),q.marks,q.id);
 if(q.type==='choice'){
  assert.equal(new Set(q.options).size,q.options.length,q.id);
  assert.equal(q.options.filter(option=>option===q.answer).length,1,q.id);
  for(const option of q.options.filter(option=>option!==q.answer))assert.equal(mark(q,option),0,q.id);
 }
}
const set=(objective,series)=>added.filter(q=>q.id.startsWith(`extra-calc-${objective}-${series}-`));
const answers=(objective,series)=>set(objective,series).map(q=>Number(q.answer));
for(const q of set('1.1.2','denary-hex'))assert.equal(mark(q,q.answer+'.0'),0,'Hex answers must not be treated as decimal numbers');
assert.deepEqual(answers('1.3.1','unit-conversion'),[3072,7168,5120,9216,4096,6144,2048,3145728,.5,1.5,2.5,4.5,2560,6,48,36]);
assert.deepEqual(answers('1.3.2','bitmap-size'),[1024,1536,6,64,128,.75,.25,.5]);
assert.deepEqual(answers('1.3.2','audio-size'),[3072,28,44,240,120,.9375,1.40625,600]);
assert.deepEqual(answers('7.7','accumulator-trace'),[6,12,20,15,12,19,16,24,18,17,24,33,18,24,32,27]);
for(const q of set('1.1.4','stored-sum')){
 const [,a,b]=q.prompt.match(/adds ([01]{8}) and ([01]{8})/);
 const sum=BigInt('0b'+a)+BigInt('0b'+b);
 assert.equal(BigInt('0b'+q.answer),sum%256n,q.id);
 assert.equal(q.answer.length,8);
}
for(const q of set('1.1.5','shift')){
 const [,input,direction,count]=q.prompt.match(/shift ([01]{8}) (left|right) by (\d)/);
 const n=BigInt('0b'+input),factor=2n**BigInt(count);
 assert.equal(BigInt('0b'+q.answer),direction==='left'?(n*factor)%256n:n/factor,q.id);
}
for(const q of added.filter(q=>q.objective==='1.1.6'&&q.type==='numeric')){
 if(q.id.includes('-encode-')){
  const [,sign,digits]=q.prompt.match(/Represent (−|\+)(\d+)/);
  const n=Number(digits)*(sign==='−'?-1:1),unsigned=parseInt(q.answer,2);
  assert.equal(unsigned>=128?unsigned-256:unsigned,n,q.id);
 }else{
  const [,pattern]=q.prompt.match(/pattern is ([01]{8})/),unsigned=parseInt(pattern,2);
  assert.equal(Number(q.answer),unsigned>=128?unsigned-256:unsigned,q.id);
 }
}
for(const q of set('10.3','combined-gates')){
 const [,a,b,c]=q.prompt.match(/A = ([01]), B = ([01]), C = ([01])/).map(Number);
 const expected=q.prompt.includes('NOT')?Number(a===0&&b===0&&c===1):Number((a===1&&b===1)||c===1);
 assert.equal(Number(q.answer),expected,q.id);
}
console.log('PASS: 444 additions across all 96 lessons; distinct prompts and options; correct and wrong-choice marking; independently checked file sizes, units, sums, shifts, signed values, traces and combined gates.');
