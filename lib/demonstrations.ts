export function bits(value:number,width=8){return (value&(2**width-1)).toString(2).padStart(width,'0')}
export function additionColumns(a:number,b:number){let carry=0;return Array.from({length:8},(_,i)=>{const x=(a>>i)&1,y=(b>>i)&1,incoming=carry,total=x+y+carry;carry=total>>1;return {column:i,weight:2**i,a:x,b:y,incoming,total,result:total&1,outgoing:carry}})}
export function logicalShift(n:number,direction:'left'|'right',count:number){const original=bits(n);return {original,result:bits(direction==='left'?(n*2**count)%256:Math.floor(n/2**count)),value:direction==='left'?(n*2**count)%256:Math.floor(n/2**count),lost:direction==='left'?original.slice(0,count):original.slice(8-count),inserted:'0'.repeat(count)}}
export function runLength(text:string){const runs:{value:string,count:number}[]=[];for(const value of Array.from(text)){const last=runs[runs.length-1];if(last?.value===value)last.count++;else runs.push({value,count:1})}return runs}
export const storageUnits=['bit','nibble','byte','KiB','MiB','GiB','TiB','PiB','EiB'];
export const unitBits=[1n,4n,8n,...Array.from({length:6},(_,i)=>8n*1024n**BigInt(i+1))];
export function exactRatio(n:bigint,d:bigint){let whole=n/d,remainder=n%d;if(!remainder)return whole.toString();let decimals='';while(remainder){remainder*=10n;decimals+=(remainder/d).toString();remainder%=d}return `${whole}.${decimals}`}
export function quantize(v:number,depth:number){const max=2**depth-1;return Math.round(v/255*max)/max*255}
