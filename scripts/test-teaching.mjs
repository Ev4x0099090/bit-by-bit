import fs from 'node:fs';
import ts from 'typescript';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
fs.mkdirSync('.test-build',{recursive:true});fs.writeFileSync('.test-build/package.json','{"type":"commonjs"}');
for(const name of ['teaching','demonstrations'])fs.writeFileSync(`.test-build/${name}.js`,ts.transpileModule(fs.readFileSync(`lib/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const require=createRequire(import.meta.url),d=require('../.test-build/demonstrations.js'),{teaching}=require('../.test-build/teaching.js'),{lessons}=require('../.test-build/content.js');
for(const l of lessons){const t=teaching[l.id];assert(t,l.id);assert(t.ideaTitles.length>=l.detail.length,l.id);assert(t.worked.steps.length>=3);assert.equal(t.takeaways.length,3);assert(t.practice.length>=2);for(const q of t.practice){assert(q.hint.length>20);assert(q.explanation.length>20);if(q.options)assert(q.options.includes(q.answer))}}
assert.equal(d.bits(45),'00101101');assert.equal(d.bits(65535,16),'1111111111111111');
const a=d.additionColumns(13,7);assert.deepEqual(a.slice(0,3).map(c=>[c.incoming,c.total,c.result,c.outgoing]),[[0,2,0,1],[1,2,0,1],[1,3,1,1]]);assert.equal(d.additionColumns(200,100)[7].outgoing,1);
for(let n=0;n<256;n++)for(let count=0;count<=8;count++){const left=d.logicalShift(n,'left',count),right=d.logicalShift(n,'right',count);assert.equal(left.value,Number((BigInt(n)*2n**BigInt(count))&255n));assert.equal(right.value,Number(BigInt(n)/2n**BigInt(count)));assert.equal(left.lost.length,count);assert.equal(right.lost.length,count)}
const runs=d.runLength('AAAAABBBCC');assert.deepEqual(runs,[{value:'A',count:5},{value:'B',count:3},{value:'C',count:2}]);assert.equal(runs.map(r=>r.value.repeat(r.count)).join(''),'AAAAABBBCC');assert.equal(d.runLength('ABCDEFGH').length*2,16);
assert.equal(d.exactRatio(2n*d.unitBits[4],d.unitBits[3]),'2048');assert.equal(d.exactRatio(d.unitBits[8],d.unitBits[2]),'1152921504606846976');assert.equal(d.exactRatio(4n,8n),'0.5');
assert.equal(d.quantize(17,2),0);assert.equal(d.quantize(51,2),85);assert.equal(d.quantize(170,2),170);assert.equal(d.quantize(255,2),255);
assert.equal(32*16*8/8,512);assert.equal(8000*8*2/8,16000);assert.equal(12/3,4);assert.equal(parseInt('00110110',2),54);assert.equal((61).toString(16).toUpperCase(),'3D');assert.equal(d.bits(-12),'11110100');
console.log(`PASS: all ${lessons.length} teaching plans, guided-example coverage, 4608 shift cases, carry propagation, exact EiB conversion, RLE recovery, quantisation, and independent practice answers.`);

assert.equal(teaching['1.1.3'].practice[0].answer,'8');assert.match(teaching['1.2.1'].practice[1].prompt,/One app stores A/);assert.match(teaching['3.1.4'].practice[1].prompt,/LOAD 8, ADD 3/);assert.match(teaching['3.4.4'].practice[0].prompt,/same local network/);const selected=require('../.test-build/content.js').questions.filter(q=>q.objective==='2.2.3'&&q.type!=='written');assert(selected.every(q=>q.type==='choice'));assert(!teaching['2.2.3'].worked.prompt.includes('3142'));for(const l of lessons){const guided=teaching[l.id].practice;for(const q of require('../.test-build/content.js').questions.filter(q=>q.objective===l.id&&q.type!=='written'))assert(!guided.some(p=>p.prompt===q.prompt),l.id+': duplicated guided/final prompt')}
console.log('PASS: guided work differs from saved questions; check-digit knowledge checks need no formula.');
