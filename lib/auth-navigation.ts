export function safeReturnTo(value:string|null|undefined){return value&&value.startsWith('/')&&!value.startsWith('//')&&!/[\\\r\n]/.test(value)?value:'/'}
export function requestOrigin(request:Request){
 const url=new URL(request.url),host=request.headers.get('host')||url.host;
 const protocol=request.headers.get('x-forwarded-proto')?.split(',')[0]==='https'?'https:':url.protocol;
 return new URL(protocol+'//'+host).origin;
}
