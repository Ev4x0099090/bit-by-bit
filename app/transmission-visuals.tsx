import {VisualFlow,VisualBits} from './topic-visuals';
import {PacketParts} from './transmission-activities';
import {CheckDigitCode} from './check-digit-explorer';
const concept:Record<string,[string,string][][]>={
 '2.1.1':[[['Header','From A · To B · Packet 1'],['Payload','MEET'],['Trailer','Checking information']],[['Packet 1','A → Router R1 → B'],['Packet 2','A → Router R2 → B']],[['Arrival order','3 · 1 · 2'],['Use packet numbers','1 · 2 · 3'],['Rebuild','MEET AFTER SCHOOL']]],
 '2.1.2':[[['Serial · one channel','1 → 0 → 1 → 1'],['Parallel · four channels','1 | 0 | 1 | 1 together']],[['Simplex','A → B'],['Half-duplex','A → B, then B → A'],['Full-duplex','A → B AND B → A at once']],[['Long distance, fewer wires','Serial'],['Both must speak at once','Full-duplex'],['Both can take turns','Half-duplex']]],
 '2.1.3':[[['Host','Computer'],['Interface','USB · serial data'],['Device','Mouse']],[['Same USB connection','Data + power'],['While running','Connect a device']],[['Nearby devices','Suitable cable length'],['Features supported?','Check device, version and cable']]],
 '2.2.1':[[['Sent','1011'],['Change','1001'],['Loss / gain','101 / 10111']],[['What was sent?','1011'],['What arrived?','1001'],['Use the data?','Check before trusting it']]],
 '2.2.2':[[['Data','1011001 · four 1s'],['Even parity','Add 0 → four 1s'],['Odd parity','Add 1 → five 1s']],[['Row parity','Checks across each row'],['Parity byte','Checks down each column'],['Single error','Failed row ∩ failed column']],[['Checksum','Calculate → send → recalculate → compare'],['Echo check','Send → return received data → compare']]],
 '2.2.3':[[],[],[]],
 '2.2.4':[[['Data passes check','Receiver → ACK → Sender'],['Error detected','Receiver → NAK → Sender']],[['Sender starts timer','Wait for a reply'],['No expected reply in time','Timeout → send again']],[['ACK','Continue'],['NAK','Retransmit'],['Timeout','Retransmit']]],
 '2.3.1':[[['Plaintext','MEET AT FIVE'],['Algorithm + key','Encrypt'],['Ciphertext','Q7 • 9Z • K2 (illustration)']],[['Ciphertext','Unreadable form'],['Appropriate key + algorithm','Decrypt'],['Plaintext recovered','MEET AT FIVE']],[['Intercepted bits','Can still be copied'],['Without the appropriate key','Contents should stay private']]],
 '2.3.2':[[['Sender encrypts','Secret key K'],['Receiver decrypts','The same secret key K']],[['Ben’s public key','Can be shared'],['Ben’s private key','Kept secret by Ben']],[['Amina sends to Ben','Encrypt: Ben’s public key'],['Ben reads','Decrypt: Ben’s private key'],['Ben replies to Amina','Encrypt: Amina’s public key']]]
};
const worked:Record<string,[string,string][][]>={
 '2.1.1':[[['First arrival','3 · DAY'],['Second arrival','1 · HAVE'],['Third arrival','2 · A GOOD']],[['1','HAVE'],['2','A GOOD'],['3','DAY']],[['Packet numbers','Restore order'],['Original message','HAVE A GOOD DAY']]],
 '2.1.2':[[['Person A','Can send'],['Person B','Can send']],[['A speaking','B waits'],['B speaking','A waits']],[['Both directions, in turns','Half-duplex']]],
 '2.1.3':[[['Laptop','Host'],['Mouse','Connected device']],[['Mouse','Movement + button data'],['USB interface','Serial transmission']],[['Connect while running','No shutdown needed'],['Same cable','Power + data']]],
 '2.2.1':[[['Sent','10[1]101'],['Received','10[0]101']],[['Six bits before and after','One bit changed']],[['Different data','Different meaning is possible'],['Before using it','Check for errors']]],
 '2.2.2':[[['1011001','Four 1s']],[['Even total needed','Keep four 1s'],['Parity bit','0'],['Complete transmission','1011001 | 0']],[['Received','0011001 | 0'],['Count','Three 1s: odd'],['Even-parity check','Fails']]],
 '2.2.3':[[],[],[]],
 '2.2.4':[[['Data','Sender → Receiver ✓'],['ACK','Receiver → lost ✕']],[['Sender waits','No ACK arrives'],['Timer expires','Timeout']],[['Sender','Retransmit data'],['Receiver','Check and acknowledge again']]],
 '2.3.1':[[['Before encryption','Readable account details']],[['Algorithm + key','Encryption'],['During transmission','Ciphertext']],[['Receiver with key','Recover plaintext'],['Interceptor without key','Cannot understand contents']]],
 '2.3.2':[[['Sender','Amina'],['Intended reader','Ben']],[['Encrypt','Ben’s PUBLIC key'],['Result','Ciphertext for Ben']],[['Decrypt','Ben’s PRIVATE key'],['Result','Plaintext recovered by Ben']]]
};
export function TransmissionVisual({objective,step,example=false}:{objective:string,step:number,example?:boolean}){
 if(objective==='2.2.3')return <figure className="tx-explanation-visual cd-static" data-topic-visual={objective} data-visual-step={step}>
  {example&&step===0?<><CheckDigitCode value="5276" label="Printed number"/><CheckDigitCode value="5286" changed={2} label="Typed number · 7 became 8"/></>:step===0?<CheckDigitCode value="3142" label="314 + extra check digit 2"/>:<><CheckDigitCode value={example?(step===1?'5286':'5276'):step===1?'3152':'1342'} label={step===1?'One digit mistyped':example?'Number retyped':'3 and 1 swapped · mistake missed'}/><div className="cd-compare"><div><span>Computer works out</span><b>{example?(step===1?'5':'6'):step===1?'1':'2'}</b></div><strong>{step===1?'≠':'='}</strong><div><span>Last digit entered</span><b>{example?'6':'2'}</b></div></div></>}
 </figure>;
 const rows=(example?worked:concept)[objective]?.[step];if(!rows)return null;
 return <figure className="tx-explanation-visual" data-topic-visual={objective} data-visual-step={step}>{!example&&objective==='2.1.1'&&step===0?<PacketParts/>:<VisualFlow items={rows.map(([label,value])=>({label,value}))}/>}</figure>;
}
const hints:Record<string,[string,string][][]>={
 '2.1.1':[[['Arrived','4 · 2 · 1 · 3'],['Original order','? · 2 · 3 · 4'],['First packet number','1']],[['Header','Addresses + packet number'],['Trailer','Checking information'],['Payload','Original message data']]],
 '2.1.2':[[['Sending sequence','1 → 0 → 1 → 1'],['Bits at once','One'],['Method','Serial']],[['A to B','Must send now'],['B to A','Must also send now'],['Timing','Both directions simultaneously']]],
 '2.1.3':[[['Laptop','USB cable → lamp'],['Lamp has no separate supply','Gets electrical energy through the cable'],['USB can carry','Power + data']],[['Device A','Building 1'],['Device B','Building 2, far away'],['USB drawback','Limited cable length']]],
 '2.2.1':[[['Sent','1011 · four bits'],['Received','101 · three bits'],['Compare length','One bit is missing']],[['Check result','Error detected'],['Correct original bits','Not necessarily known'],['Next action','May need another transmission']]],
 '2.2.2':[[['Data','1100 · two 1s'],['Odd total needed','2 + ? must be odd'],['Add a 1','Three 1s in total']],[['Sender','Calculate + send checksum'],['Receiver','Use the same calculation'],['Then compare','Received checksum ↔ recalculated checksum']]],
 '2.2.3':[[['Entered number','5 · 8 · 3 | 4'],['Separate the final check digit','5 · 8 · 3 | check: 4'],['Use these to work it out again','583']],[['Book label','Number + check digit → computer'],['Book pages','Words stay inside the book'],['What is being checked?','The entered book number']]],
 '2.2.4':[[['Receiver check','Error detected'],['Reply','NAK'],['Sender action','Send another copy']],[['Sender timer','Waiting for expected reply'],['Time limit reached','Still no reply'],['Name','Timeout']]],
 '2.3.1':[[['Before encryption','Readable message'],['After encryption','Ciphertext'],['Before-state name','Plaintext']],[['Interceptor','Can copy ciphertext'],['Appropriate key','Not available to interceptor'],['What is protected?','Understanding the contents']]],
 '2.3.2':[[['Intended receiver','Leah'],['Shareable member of pair','Public key'],['Encrypt for Leah','Leah’s public key']],[['Sender key','Secret K'],['Receiver key','The same secret K'],['One shared secret','Symmetric encryption']]]
};
export function TransmissionHint({objective,questionIndex,level}:{objective:string,questionIndex:number,level:number}){const rows=hints[objective]?.[questionIndex];if(!rows)return null;return <div className="visual-practice-hint" data-visual-hint={objective} data-hint-level={level}><span className="visual-hint-label">VISUAL HINT · {level} / 3</span>{objective==='2.2.2'&&questionIndex===0&&<VisualBits pattern="1100?"/>}<VisualFlow items={rows.slice(0,level).map(([label,value])=>({label,value}))}/></div>}

const another:Record<string,[string,string][] >={
 '2.1.1':[['Photo packets arrive','2 · 3 · 1'],['Put them back in order','1 · 2 · 3'],['Rebuild','The original photo']],
 '2.1.2':[['Radio broadcast','Station → listeners'],['Phone conversation','Both directions at once']],
 '2.1.3':[['USB storage drive','Connect while the computer runs'],['Same suitable cable','Files + power']],
 '2.2.1':[['Sent','1100'],['Received','11001'],['Data gain','One extra bit']],
 '2.2.2':[['Data 111','Three 1s'],['Even parity','Add 1 → four 1s'],['Odd parity','Add 0 → three 1s']],
 '2.2.3':[['Printed number','621 | 1'],['Typed number','631 | 1'],['Computer works out','0 ≠ entered 1 → check and retype']],
 '2.2.4':[['First copy damaged','Receiver sends NAK'],['Sender retransmits','Second copy passes'],['Reply','Receiver sends ACK']],
 '2.3.1':[['Plaintext','MEET AT FIVE'],['Encrypt','Ciphertext'],['Decrypt with key','MEET AT FIVE']],
 '2.3.2':[['Ben replies to Amina','Encrypt with Amina’s public key'],['Amina reads it','Decrypt with Amina’s private key']]
};
export function TransmissionHelpVisual({objective}:{objective:string}){return <VisualFlow items={(another[objective]||[]).map(([label,value])=>({label,value}))}/>}

