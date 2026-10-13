import {NumberSystemExample} from './number-system-examples';
import {VisualBits,VisualFlow} from './topic-visuals';

const places=[128,64,32,16,8,4,2,1];
const choices=[
 {place:128,before:45,bit:'0',after:45},
 {place:64,before:45,bit:'0',after:45},
 {place:32,before:45,bit:'1',after:13},
 {place:16,before:13,bit:'0',after:13},
 {place:8,before:13,bit:'1',after:5},
 {place:4,before:5,bit:'1',after:1},
 {place:2,before:1,bit:'0',after:1},
 {place:1,before:1,bit:'1',after:0}
];

export function NumberConversionGuide({step}:{step:number}){
 if(step===3)return <div data-conversion-guide={step}><NumberSystemExample step={2}/></div>;
 return <figure className="number-step-visual guided-conversion" data-conversion-guide={step}>
  <figcaption>{['Start with 45. Check one column at a time.','Carry on with the 13 left over.','Read the bits from left to right.','','Check that 2D still means 45.'][step]}</figcaption>
  {step<2?<>
   <table className="conversion-example"><thead><tr><th scope="col">Column</th><th scope="col">Does it fit?</th><th scope="col">Write</th><th scope="col">Left over</th></tr></thead><tbody>
    {choices.slice(step===0?0:3,step===0?3:8).map(({place,before,bit,after})=><tr key={place}>
     <th scope="row">{place}</th><td>{place} {bit==='1'?'fits in':'is too big for'} {before}</td>
     <td><span className={bit==='1'?'digit-one':'digit-zero'}>{bit}</span></td>
     <td>{bit==='1'?`${before} − ${place} = ${after}`:`keep ${after}`}</td>
    </tr>)}
   </tbody></table>
   <div className="guided-pattern-label">{step===0?'PATTERN SO FAR · ? MEANS NOT CHECKED YET':'ALL EIGHT COLUMNS CHECKED · NOTHING LEFT OVER'}</div>
   <VisualBits pattern={step===0?'001?????':'00101101'} weights={places} marked={step===0?[2]:[3,4,5,6,7]}/>
   <p className="visual-caption">{step===0?<>A column that is too big gets <b>0</b>. Using 32 gives us <b>1</b> in that column and leaves <b>13</b> to make.</>:<>We checked 16 and 2 as well: each was too big for the number left, so each got <b>0</b>. The last subtraction leaves <b>0</b>, so we are finished.</>}</p>
  </>:step===2?<>
   <div className="place-example">{places.map((place,i)=><div key={place} className={'00101101'[i]==='1'?'used-place':'unused-place'}><span>{place}</span><strong>{'00101101'[i]}</strong><small>{'00101101'[i]==='1'?'ADD':'SKIP'}</small></div>)}</div>
   <div className="visual-equation"><span>32</span> + <span>8</span> + <span>4</span> + <span>1</span> = <strong>45</strong></div>
   <div className="visual-equation"><strong>45</strong> → <code>00101101</code></div>
   <p className="visual-caption">The zeros keep the columns in the right positions. The two zeros at the start make this an eight-bit pattern.</p>
  </>:<>
   <VisualFlow items={[{label:'2 in the 16 column',value:'2 × 16 = 32'},{label:'D means 13 in the 1 column',value:'13 × 1 = 13'},{label:'Add the two parts',value:'32 + 13 = 45'}]}/>
   <div className="guided-final-answer"><span>DENARY <b>45</b></span><span>BINARY <b>00101101</b></span><span>HEXADECIMAL <b>2D</b></span></div>
   <p className="visual-caption">All three ways of writing the number have the same value.</p>
  </>}
 </figure>;
}
