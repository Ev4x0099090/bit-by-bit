export type ListFrame={values:number[],active:number[],message:string,total:number,count:number,max:number,min:number,output:string};
export function listTrace(values:number[],method:string,target=5):ListFrame[]{
 if(!values.length)return [];
 const a=[...values],frames:ListFrame[]=[];let total=0,count=0,max=a[0],min=a[0];
 const push=(active:number[],message:string,output='')=>frames.push({values:[...a],active,message,total,count,max,min,output});
 push([],'Start with the supplied list.');
 if(method==='Bubble sort'){for(let end=a.length-1;end>0;end--){let swapped=false;for(let i=0;i<end;i++){const left=a[i],right=a[i+1];if(left>right){[a[i],a[i+1]]=[right,left];swapped=true;push([i,i+1],`${left} > ${right}: swap adjacent values.`)}else push([i,i+1],`${left} ≤ ${right}: keep this pair.`)}if(!swapped)break}push([],'All values are now in ascending order.',a.join(', '));return frames}
 for(let i=0;i<a.length;i++){
  if(method==='Linear search'){push([i],`Compare position ${i+1}: ${a[i]} ${a[i]===target?'matches':'does not match'} ${target}.`,a[i]===target?`Found at position ${i+1}`:'');if(a[i]===target)return frames}
  else {total+=a[i];count++;max=Math.max(max,a[i]);min=Math.min(min,a[i]);push([i],`Visit ${a[i]}. Update the running ${method.toLowerCase()}.`)}
 }
 const output=method==='Linear search'?'Not found':method==='Total'?String(total):method==='Count'?String(count):method==='Maximum'?String(max):method==='Minimum'?String(min):String(total/count);
 push([],method==='Average'?`Divide total ${total} by count ${count}.`:'The list has been checked.',output);return frames;
}
export type GateName='NOT'|'AND'|'OR'|'NAND'|'NOR'|'XOR';
export const gateNames:GateName[]=['NOT','AND','OR','NAND','NOR','XOR'];
export function gateOutput(g:GateName,a:boolean,b=false):boolean {switch(g){case 'NOT':return !a;case 'AND':return a&&b;case 'OR':return a||b;case 'NAND':return !(a&&b);case 'NOR':return !(a||b);case 'XOR':return a!==b}}
export const dbRows=[{ID:1,Name:'Sam',Score:72,House:'Blue'},{ID:2,Name:'Mia',Score:91,House:'Red'},{ID:3,Name:'Sam',Score:55,House:'Red'},{ID:4,Name:'Ali',Score:83,House:'Blue'}];
export function queryRows(min:number,house:string,join:string,desc:boolean){return dbRows.filter(r=>house==='Any'?r.Score>=min:join==='AND'?r.Score>=min&&r.House===house:r.Score>=min||r.House===house).sort((a,b)=>desc?b.Score-a.Score:a.Score-b.Score)}
export function validateRule(rule:string,text:string):boolean{switch(rule){case 'Range':return /^\d+$/.test(text)&&+text>=1&&+text<=10;case 'Length':return text.length===4;case 'Type':return /^-?\d+$/.test(text);case 'Presence':return text.trim().length>0;case 'Format':return /^\d{2}-\d{2}-\d{4}$/.test(text);case 'Check digit':return /^\d{4}$/.test(text)&&(+text[0]+ +text[1]+ +text[2])%10===+text[3];default:return false}}
