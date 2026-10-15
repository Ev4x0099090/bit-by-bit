import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{paper2Tasks,lessonCodingTasks}=require('../.test-build/course-paper2-practice.js'),{paper2Foundations}=require('../.test-build/course-foundations.js'),{lessons}=require('../.test-build/content.js'),{courseById}=require('../.test-build/course-registry.js'),{paper2MarkSchemes}=require('../.test-build/paper2-mark-schemes.js'),{choosePaper,gradeForPaper}=require('../.test-build/paper-selection.js');
assert.equal(paper2Tasks.length,23);assert.equal(lessonCodingTasks.length,19);assert.equal(paper2Tasks.reduce((sum,t)=>sum+t.examMarks,0),75);
assert.deepEqual(Array.from({length:10},(_,i)=>paper2Tasks.filter(q=>q.question===i+1).reduce((sum,q)=>sum+q.examMarks,0)),[3,4,1,14,6,9,8,5,10,15]);
for(const t of [...paper2Tasks,...lessonCodingTasks]){assert(lessons.some(l=>l.id===t.objective));assert(t.requires.every(id=>lessons.some(l=>l.id===id)));assert(t.model.length>5);}
for(const t of paper2Tasks){const s=paper2MarkSchemes[String(t.question)+(t.part||'')];assert(s);assert.equal(s.points.reduce((n,p)=>n+p.marks,0),t.examMarks,t.id)}
assert.deepEqual(paper2MarkSchemes['10'].points.map(p=>p.marks),[9,6]);assert.match(paper2MarkSchemes['10'].instructions,/BEST-FIT/);assert.equal(paper2Tasks.find(q=>q.question===5&&q.part==='a').table.rows.flat().filter(Boolean).length,0,'Do not pre-fill columns worth marks');
assert(!lessonCodingTasks.some(q=>q.objective==='8.3.1'));assert(paper2Foundations['7.4'].some(f=>f.title.includes('assignment')));assert.equal(courseById['8.1.4'].sections[1][0],'Use arithmetic and comparisons');
assert(!fs.existsSync('public/papers/2210-w25-23.pdf'));assert(!fs.existsSync('public/papers/w25-23-flowchart.png'));
for(const [mark,grade] of [[0,'U'],[14,'U'],[15,'E'],[18,'E'],[19,'D'],[22,'D'],[23,'C'],[32,'C'],[33,'B'],[42,'B'],[43,'A'],[75,'A']])assert.equal(gradeForPaper(mark),grade);
for(const n of [-1,76,1.5])assert.throws(()=>gradeForPaper(n));
const pool=[{id:'one'},{id:'two'},{id:'three'}],active={paperId:'two',currentTask:'q2',status:'in_progress',updatedAt:5};
assert.equal(choosePaper(pool,[active],()=>0).session.currentTask,'q2');assert.equal(choosePaper(pool,[{paperId:'one',status:'complete'}],()=>0).paperId,'two');assert.equal(choosePaper(pool,[],()=>0.99).paperId,'three');assert.equal(choosePaper([{id:'one'}],[{paperId:'one',status:'complete'}]),null);
assert.equal(choosePaper(pool,[active],()=>0,false).paperId,'one','Explicit untried selection must not return the unfinished paper');
const annual=JSON.parse(fs.readFileSync('lib/papers/annual.json')),bank=JSON.parse(fs.readFileSync('supabase/functions/paper-practice/bank.json'));
assert.deepEqual(annual.map(p=>p.year),[2024,2023,2022,2021,2020]);assert.equal(bank.papers.length,6);assert.equal(bank.papers.reduce((n,p)=>n+p.taskIds.length,0),108);
assert.deepEqual(annual.map(p=>p.tasks.reduce((n,t)=>n+t.examMarks,0)),[75,75,50,50,50]);
for(const p of annual){assert.equal(p.tasks.reduce((n,t)=>n+t.examMarks,0),p.marks);assert.equal(p.thresholds.length,5);for(const t of p.thresholds){assert.equal(gradeForPaper(t.minimum,p.thresholds,p.marks),t.grade);if(t.minimum>0)assert.notEqual(gradeForPaper(t.minimum-1,p.thresholds,p.marks),t.grade)}assert.throws(()=>gradeForPaper(p.marks+1,p.thresholds,p.marks));for(const t of p.tasks){const q=bank.questions.find(q=>q.id===t.id);assert(q);assert.equal(q.max_marks,t.examMarks);assert(q.source.includes('_ms_'));assert.equal(q.mark_scheme.reduce((n,p)=>n+p.marks,0),q.max_marks);if(t.figure)assert(fs.existsSync('public'+t.figure));if(t.question===1&&p.legacy)assert(q.context.includes(p.scenario.title))}}
assert.equal(new Set(bank.questions.map(q=>q.id)).size,127);assert(annual.filter(p=>p.legacy).every(p=>p.scenario?.table.rows.length));
console.log('PASS: six complete annual papers / 108 parts; /50 and /75 totals; per-paper threshold boundaries; trusted matching schemes, original figures, legacy scenarios and explicit untried selection.');
console.log('PASS: 23 Cambridge parts / 75 marks; official allocations and AO2/AO3 bands; 19 lesson exercises; no paper uploads; exact threshold boundaries; resume, random untried selection and completed-paper exclusion.');
