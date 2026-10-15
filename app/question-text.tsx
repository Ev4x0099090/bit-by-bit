// Names come from the question data; ordinary words are never inferred as variables.
const token=/`[^`\n]+`|\b[A-Za-z_]\w*(?:\[[^\]\n]*\])?|\$\d+(?:\.\d+)?|\b\d+(?:\.\d+)?(?:\s+to\s+\d+)?\b/g;
const command=/^(?:Name|State|Give|Identify|Count|Describe|Find|Write|Choose|Complete|Explain|Calculate|Draw)$/;
export function QuestionText({text,identifiers=[]}:{text:string,identifiers?:string[]}){
 let end=0;const nodes=[],names=new Set(identifiers);
 for(const match of text.matchAll(token)){
  const index=match.index!,word=match[0],base=word.split('[')[0],before=text.slice(0,index),after=text.slice(index+word.length);
  if(index>end)nodes.push(text.slice(end,index));
  const instruction=command.test(word)&&(!before.trim()||/[.!?]\s*$/.test(before))&&/^\s+(?:the|a|an|one|two|three|four|five|six|each|how|which|all|your|this|that)\b/i.test(after);
  const kind=word.startsWith('`')?'statement':/^\$?\d/.test(word)?'value':!instruction&&names.has(base)?'identifier':'plain';
  nodes.push(kind==='plain'?word:<span className={'question-'+kind} key={index}>{word.startsWith('`')?word.slice(1,-1):word}</span>);end=index+word.length;
 }
 nodes.push(text.slice(end));return <>{nodes}</>;
}
export function QuestionPassage({text,instruction=false,identifiers=[]}:{text:string,instruction?:boolean,identifiers?:string[]}){
 const sentences=text.split(/\n\n|(?<=[.!?])\s+(?=[A-Z])/),paragraphs:string[]=[];
 for(let i=0;i<sentences.length;i+=2)paragraphs.push(sentences.slice(i,i+2).join(' '));
 return <>{paragraphs.map((part,i)=><p className={instruction?'paper2-instruction':undefined} key={i}><QuestionText text={part} identifiers={identifiers}/></p>)}</>;
}
