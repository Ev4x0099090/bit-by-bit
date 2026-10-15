'use client';
import {useEffect,useRef} from 'react';
import {basicSetup} from 'codemirror';
import {Compartment,EditorState} from '@codemirror/state';
import {EditorView} from '@codemirror/view';
import {classHighlighter} from '@lezer/highlight';
import {syntaxHighlighting,indentUnit,StreamLanguage} from '@codemirror/language';
import {python} from '@codemirror/lang-python';
import {java} from '@codemirror/lang-java';
import {sql} from '@codemirror/lang-sql';
const keywords=new Set('OUTPUT INPUT DECLARE INTEGER REAL STRING CHAR BOOLEAN ARRAY OF FOR TO STEP NEXT IF THEN ELSE ENDIF WHILE DO ENDWHILE REPEAT UNTIL PROCEDURE ENDPROCEDURE FUNCTION ENDFUNCTION RETURNS RETURN CALL AND OR NOT TRUE FALSE OPENFILE READFILE WRITEFILE CLOSEFILE READ WRITE DIV MOD LENGTH ROUND RANDOM PUBLIC SUB END DIM AS LOOP'.split(' '));
const pseudocode=StreamLanguage.define({startState:()=>({depth:0}),token(stream,state){if(stream.eatSpace())return null;if(stream.match('//')||stream.match("'",false)&&stream.sol()){stream.skipToEnd();return 'comment'}if(stream.match(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/))return 'string';if(stream.match(/\b\d+(?:\.\d+)?\b/))return 'number';if(stream.match(/[A-Za-z_]\w*/)){const word=stream.current().toUpperCase();if(['ENDIF','NEXT','ENDWHILE','UNTIL','ENDPROCEDURE','ENDFUNCTION'].includes(word))state.depth=Math.max(0,state.depth-1);else if(['IF','FOR','WHILE','REPEAT','PROCEDURE','FUNCTION'].includes(word))state.depth++;return keywords.has(word)?'keyword':'variableName'}stream.next();return null},indent(state,textAfter,context){return Math.max(0,state.depth-(/^(?:ENDIF|ELSE|NEXT|ENDWHILE|UNTIL|ENDPROCEDURE|ENDFUNCTION)\b/i.test(textAfter)?1:0))*context.unit}});
const languageFor=(name:string)=>name==='Python'?python():name==='Java'?java():name==='SQL'?sql():pseudocode;
const theme=EditorView.theme({'&':{fontSize:'14px',backgroundColor:'transparent',color:'var(--foreground)'},'.cm-scroller':{fontFamily:'ui-monospace, Consolas, monospace',lineHeight:'1.85',overflow:'auto',maxHeight:'640px'},'.cm-content':{padding:'17px 0',minHeight:'250px',caretColor:'var(--foreground)'},'.cm-line':{padding:'0 16px'},'.cm-gutters':{backgroundColor:'transparent',border:'0',color:'#64748b',padding:'0 0 0 5px'},'.cm-activeLine,.cm-activeLineGutter':{backgroundColor:'var(--editor-active,#eff6ff)'},'&.cm-focused':{outline:'none'},'.cm-selectionBackground':{backgroundColor:'#2563eb25 !important'},'.cm-tooltip':{backgroundColor:'var(--background)',color:'var(--foreground)',border:'1px solid var(--border)'},'.cm-panels':{backgroundColor:'var(--secondary)',color:'var(--foreground)'}});
export function CodeEditor({value,onChange,language='Pseudocode',readOnly=false,label='Your code answer'}:{value:string,onChange:(value:string)=>void,language?:string,readOnly?:boolean,label?:string}){
 const parent=useRef<HTMLDivElement>(null),editor=useRef<EditorView|null>(null),change=useRef(onChange),initial=useRef(value),languageConfig=useRef(new Compartment()),editableConfig=useRef(new Compartment()),labelConfig=useRef(new Compartment());
 useEffect(()=>{change.current=onChange},[onChange]);
 useEffect(()=>{
  if(!parent.current)return;
  const view=new EditorView({parent:parent.current,state:EditorState.create({doc:initial.current,extensions:[basicSetup,EditorView.lineWrapping,syntaxHighlighting(classHighlighter),theme,indentUnit.of('    '),languageConfig.current.of(languageFor(language)),editableConfig.current.of([EditorState.readOnly.of(readOnly),EditorView.editable.of(!readOnly)]),labelConfig.current.of(EditorView.contentAttributes.of({'aria-label':label,'aria-multiline':'true',role:'textbox',spellcheck:'false'})),EditorState.changeFilter.of(tr=>tr.newDoc.length<=12000),EditorView.updateListener.of(update=>{if(update.docChanged)change.current(update.state.doc.toString())})]})});editor.current=view;return()=>{view.destroy();editor.current=null};
  // Create one editor per answer; subsequent prop changes use transactions below.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);
 useEffect(()=>{const view=editor.current;if(view&&view.state.doc.toString()!==value)view.dispatch({changes:{from:0,to:view.state.doc.length,insert:value}})},[value]);
 useEffect(()=>{editor.current?.dispatch({effects:languageConfig.current.reconfigure(languageFor(language))})},[language]);
 useEffect(()=>{editor.current?.dispatch({effects:editableConfig.current.reconfigure([EditorState.readOnly.of(readOnly),EditorView.editable.of(!readOnly)])})},[readOnly]);
 useEffect(()=>{editor.current?.dispatch({effects:labelConfig.current.reconfigure(EditorView.contentAttributes.of({'aria-label':label,'aria-multiline':'true',role:'textbox',spellcheck:'false'}))})},[label]);
 return <div ref={parent} className="proper-code-editor"/>;
}
