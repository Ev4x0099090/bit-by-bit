import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),files=[];
const excluded=new Set(['components/connector-error.tsx']);
function add(file){
 if(excluded.has(file)||file.startsWith('lib/connector'))return;
 const full=path.resolve(root,file);if(!full.startsWith(root+path.sep)||fs.lstatSync(full).isSymbolicLink())throw Error('Unsafe source path: '+file);
 const content=fs.readFileSync(full,'utf8');
 if(/gsk_[A-Za-z0-9]{20,}|sb_secret_[A-Za-z0-9_-]{12,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|eyJhbGciOi[A-Za-z0-9_-]+\./.test(content))throw Error('Possible secret in '+file);
 files.push({path:file,mode:'100644',type:'blob',content});
}
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=dir+'/'+item.name;if(['supabase/.temp','supabase/.branches'].includes(file))continue;if(item.isDirectory())walk(file);else add(file)}}
for(const dir of ['app','components','lib','hooks','public','vendor','supabase'])walk(dir);
for(const file of ['package.json','package-lock.json','tsconfig.json','next.config.ts','proxy.ts','postcss.config.mjs','eslint.config.mjs','vercel.json','.gitignore','.env.example','README.md','AGENTS.md'])add(file);
for(const file of ['prepare-edge.mjs','prepare-paper.mjs','test-ai-marking.mjs','test-engine.mjs','test-teaching.mjs','test-question-expansion.mjs','test-paper2.mjs','test-question-text.mjs','test-progress.mjs','test-api.mjs','export-github-source.mjs'])add('scripts/'+file);
files.sort((a,b)=>a.path.localeCompare(b.path));
if(new Set(files.map(f=>f.path)).size!==files.length)throw Error('Duplicate paths');
fs.mkdirSync('tmp',{recursive:true});fs.writeFileSync('tmp/github-tree.json',JSON.stringify(files));
console.log(JSON.stringify({files:files.length,bytes:files.reduce((n,f)=>n+Buffer.byteLength(f.content),0),includesSecrets:files.some(f=>f.path==='.env.local'||f.path.startsWith('.openai/'))}));
