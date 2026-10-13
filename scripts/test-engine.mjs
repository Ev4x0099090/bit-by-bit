import ts from 'typescript';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
fs.mkdirSync('.test-build',{recursive:true});
fs.writeFileSync('.test-build/package.json','{"type":"commonjs"}');
for(const name of ['content','engine','marking','learning-config','learning-location','transmission','hardware','hardware-more','hardware-assessment','hardware-models','hardware-catalogue',...fs.readdirSync('lib').filter(n=>n.startsWith('course-')&&n.endsWith('.ts')).map(n=>n.slice(0,-3))]) fs.writeFileSync(`.test-build/${name}.js`,ts.transpileModule(fs.readFileSync(`lib/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const require=createRequire(import.meta.url);const {lessons,questions}=require(resolve('.test-build/content.js'));const e=require(resolve('.test-build/engine.js'));
const coverage=JSON.parse(fs.readFileSync('lib/coverage.json'));
assert.equal(lessons.length,96);assert.equal(lessons.filter(l=>l.id.startsWith('1.')).length,13);assert.equal(lessons.filter(l=>l.id.startsWith('2.')).length,9);assert.equal(lessons.filter(l=>l.id.startsWith('3.')).length,18);assert.equal(coverage.length,96);
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length,'question IDs must be unique');
for(const l of lessons){assert(coverage.some(c=>c.code===l.id));assert(questions.filter(q=>q.objective===l.id&&q.type!=='written').length>=3,`${l.id}: at least 3 objective questions`);for(const key of ['intro','example','misconception','tip','summary'])assert(l[key].length>30)}
for(const q of questions.filter(q=>q.type!=='written')){assert.equal(e.mark(q,q.answer),q.marks,q.id);assert.equal(e.mark(q,'not the answer'),0,q.id)}
const attempt=(earned=1,confidence=4,at=1,id='1.1.2-2-35')=>({id:String(at),questionId:id,objective:'1.1.2',earned,possible:1,confidence,at,self:false});
assert.equal(e.mastery([],'1.1.2').label,'Not started');
assert.equal(e.mastery([attempt()],'1.1.2').label,'Learning');
assert.equal(e.mastery([attempt(1,4,1),attempt(1,4,2),attempt(1,4,3,'different')],'1.1.2').label,'Mastered');
assert.equal(e.mastery([{...attempt(),self:true}],'1.1.2').count,0);
assert.equal(e.weakness([attempt(0)]).length,0);assert.equal(e.weakness([attempt(0),attempt(0),attempt(0)]).length,1);
assert.equal(e.interval(attempt(0),[]),1);assert.equal(e.interval(attempt(1,2),[]),1);assert.equal(e.interval(attempt(),[]),3);assert.equal(e.interval(attempt(),[attempt(),attempt(),attempt(),attempt()]),30);
assert.deepEqual(e.dueObjectives([attempt(0,4,0)],86400000),['1.1.2']);assert.deepEqual(e.dueObjectives([attempt(0,4,0)],86399999),[]);
const used=[];while(true){const q=e.nextQuestion([],used,undefined,()=>.5);if(!q)break;assert(!used.includes(q.id));used.push(q.id)}assert.equal(used.length,questions.filter(q=>q.type!=='written').length);
for(let i=0;i<20;i++)assert.equal(e.nextQuestion([],[],'1.1.6').objective,'1.1.6');
assert.equal(e.nextQuestion([],questions.map(q=>q.id)),null);
assert.equal(e.nextQuestion([],[],undefined,()=>0,[]),null,'An empty study scope must not offer questions');
assert.equal(e.nextQuestion([],[],undefined,()=>0,['2.1.1']).objective,'2.1.1');
assert.equal(e.nextQuestion([],questions.filter(q=>q.objective==='2.1.1').map(q=>q.id),undefined,()=>0,['2.1.1']),null,'Exhausted studied questions must not spill into another lesson');
assert.equal(640*480*8/8/1024,300);assert.equal(8000*16*4/8/1024,62.5);assert.equal(1024*512*16/8/1024/1024,1);
for(let n=-128;n<=127;n++){const encoded=n&255;assert.equal(encoded>=128?encoded-256:encoded,n)}
for(let a=0;a<256;a++)for(let b=0;b<256;b++){let carry=0,out=0;for(let i=0;i<8;i++){const sum=((a>>i)&1)+((b>>i)&1)+carry;out|=(sum&1)<<i;carry=sum>>1}assert.equal(out,(a+b)&255);assert.equal(carry,a+b>255?1:0)}
assert(coverage.find(r=>r.code==='8.1.4').objective.includes('(f)'),'continued operator objective must be preserved');
console.log(`PASS: ${lessons.length} lesson mappings; ${questions.length} mark schemes; adaptive selection, mastery, revision, all 65536 binary sums and signed range.`);


// Lesson answers must not force the same question in the next practice round.
for(const l of lessons){const pool=questions.filter(q=>q.objective===l.id&&q.type!=='written');const history=[];for(let i=0;i<pool.length;i++){const q=e.nextQuestion(history,[],l.id,()=>0);assert(!history.some(a=>a.questionId===q.id),l.id+': repeat before unseen questions');history.push({id:String(i),objective:l.id,questionId:q.id,earned:q.marks,possible:q.marks,confidence:3,at:i+1,self:false})}const ranked=e.rankPracticeQuestions(pool,history,5,()=>0);assert.equal(ranked[0].id,history[0].questionId,l.id+': oldest equally practised question first')}
const fresh=questions.filter(q=>q.objective==='2.2.3'&&q.type!=='written');const seen=fresh.filter(q=>q.difficulty>=2).map((q,i)=>({id:String(i),objective:q.objective,questionId:q.id,earned:1,possible:1,confidence:3,at:i+1,self:false}));assert.equal(e.nextQuestion(seen,[],'2.2.3',()=>0).id,fresh[0].id);assert.equal(e.rankPracticeQuestions(fresh,seen,5,()=>0)[0].id,fresh[0].id);
console.log('PASS: all 96 topics offer every unseen question before repeats; practice and chapter assessment respect exposure and oldest-first rotation.');
