import type {ReactNode} from 'react';
const keywords=/^(?:OUTPUT|INPUT|DECLARE|INTEGER|REAL|STRING|CHAR|BOOLEAN|ARRAY|OF|FOR|TO|STEP|NEXT|IF|THEN|ELSE|ENDIF|WHILE|DO|ENDWHILE|REPEAT|UNTIL|PROCEDURE|ENDPROCEDURE|FUNCTION|ENDFUNCTION|RETURNS|RETURN|CALL|AND|OR|NOT|TRUE|FALSE|OPENFILE|READFILE|WRITEFILE|CLOSEFILE|READ|WRITE|SELECT|FROM|WHERE|ORDER|BY|ASC|DESC|DIV|MOD|LENGTH|ROUND|RANDOM|print|input|int|float|str|def|return|for|in|range|if|else|elif|while|and|or|not|True|False)$/i;
function tokens(line:string):ReactNode[]{
 return (line.match(/\/\/.*|#.*|"[^"\n]*"|'[^'\n]*'|\b[A-Za-z_]\w*\b|\b\d+(?:\.\d+)?\b|[^\w\s]|\s+/g)||[]).map((token,i)=>{
  const kind=/^(\/\/|#)/.test(token)?'comment':/^["']/.test(token)?'string':keywords.test(token)?'keyword':/^\d/.test(token)?'number':'';
  return kind?<span key={i} className={'code-'+kind}>{token}</span>:token;
 });
}
export function AnswerCode({text,numbered=true}:{text:string,numbered?:boolean}){
 return <div className="answer-code-preview" aria-label="Question code">{(text||'').split('\n').map((line,i)=><div className="answer-code-line" key={i}>{numbered&&<span className="answer-line-number" aria-hidden="true">{i+1}</span>}<code>{tokens(line)}{line?'':'\u00a0'}</code></div>)}</div>;
}
