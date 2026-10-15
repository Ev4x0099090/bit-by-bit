// Transcribed and paraphrased from the published Cambridge 2210/23 O/N 2025
// mark scheme, pp. 7–21. Keep the original allocations and best-fit bands.
export const cambridgeMarkSchemeSource='https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/2210_w25_ms_23.pdf';
export type MarkPoint={id:number,marks:number,criterion:string};
export type MarkScheme={points:MarkPoint[],instructions:string,page:number,deterministic?:'matching'|'choice'|'truth'|'search'};
const points=(items:(string|[number,string])[]):MarkPoint[]=>items.map((item,i)=>({id:i+1,marks:typeof item==='string'?1:item[0],criterion:typeof item==='string'?item:item[1]}));
const scheme=(page:number,items:(string|[number,string])[],instructions='',deterministic?:MarkScheme['deterministic']):MarkScheme=>({page,points:points(items),instructions,deterministic});
export const paper2MarkSchemes:Record<string,MarkScheme>={
 '1':scheme(7,['Use identifiers whose names explain their purpose.','Include relevant comments.','Use procedures or functions.']),
 '2':scheme(7,['Adding a set of numbers: totalling.','Displaying a result: output.','Choosing instructions using a condition: selection.','Repeating instructions: iteration.'],'One mark for each correct match.','matching'),
 '3':scheme(7,['Choose char for the single character M.'],'The original option letter is B; the app records its label char.','choice'),
 '4a':scheme(8,['Input both the adult and child ticket counts.','Calculate adult count × 12.99 plus child count × 7.99.','Add one booking fee of 1.99 to the booking.','Output the total with a suitable message.']),
 '4b':scheme(8,['Use a suitable WHILE or REPEAT/UNTIL loop.','Use a correct condition rejecting adult counts below 1.','Provide a suitable message asking for valid input.','Read a new adult count inside the loop.'],'Credit an explained equivalent solution. Do not invent a separate mark for continuing the calculation.'),
 '4ci':scheme(8,['Require A AND B.','Combine that result with AND NOT C.'],'Equivalent logic expressions are valid.'),
 '4cii':scheme(9,[[4,'The X outputs, in row order 000 to 111, are 0,0,0,0,0,0,1,0.']],'Award 4 for 8 correct rows, 3 for 6 or 7, 2 for 4 or 5, 1 for 2 or 3, and 0 for fewer than 2. Do not award one mark per row.','truth'),
 '5a':scheme(10,['Correct Count column: blank initially, then 1,2,3,4,5.','Correct Number column: blank initially, then 563,21,376,99,400.','Correct Lowest column: initially 900, then 563,21,21,21,21.','Correct Highest column: initially 1, then 1,1,376,376,400.'],'One mark per correct column. Follow the faulty code exactly. Trace tables may leave unchanged values blank; assess the implied value changes, not formatting. Do not award the intended maximum 563 as the faulty final Highest.'),
 '5b':scheme(10,['Explain the wrong maximum: the highest comparison is skipped when the lowest comparison is true.','Correct it using independent IF statements, or an equivalent removal of the nested ELSE.']),
 '6a':scheme(11,[[2,'Outputs: Ridwan → 5; Yan → -1; Ella → 3.']],'Award 2 for all three rows, 1 for exactly two correct rows, and 0 for fewer.','search'),
 '6b':scheme(11,['Identify search or linear search.'],'The published scheme accepts (Linear) search; do not demand the adjective.'),
 '6c':scheme(12,['Initialise Count to 1 and Position to -1.','Input Name before the loop.','Use a suitable loop with its correct stopping condition.','Compare Name with the array element at the current index.','Increment Count correctly by 1 when needed.','Output the correct Position, including -1 when not found.'],'Accept the equivalent REPEAT, WHILE or FOR approaches in the published scheme. The array indexes are 1 through 5. A found index must be retained.'),
 '7a':scheme(14,['Identify line 02 and change DenaryNumber to INTEGER.','Identify line 05 and start the descending loop at 8.','Identify line 06 and use MOD(DenaryNumber,2).'],'Each mark requires both the relevant line and its correction.'),
 '7b':scheme(14,['Name any one of input, output or iteration.']),
 '7ci':scheme(14,['Identify a range check.']),
 '7cii':scheme(14,['Use an appropriate repetition structure.','Use a condition accepting only the inclusive range 1..255.','Input DenaryNumber correctly.'],'Accept equivalent loops and logically equivalent conditions.'),
 '8ai':scheme(14,['Identify EquipmentID.']),
 '8aii':scheme(14,['Explain that the chosen field has unique values or no repeated data.']),
 '8b':scheme(15,['Select Description and Name.','Use the EquipmentLoan table.','Filter Returned to the text value No.'],'Accept valid SQL quote styles and harmless case/spacing differences. The supplied table uses Yes/No text; do not silently treat it as Boolean.'),
 '9a':scheme(15,['Declare Name as STRING.','Declare Age as INTEGER.','Declare Found as BOOLEAN.']),
 '9bi':scheme(15,['Use PROCEDURE StoreData with ENDPROCEDURE.','Define the Name parameter correctly.','Open People.txt for writing.','Write the received name to the file.','Close the file.']),
 '9bii':scheme(16,['Use CALL.','Call StoreData with the string Suella.']),
 '10':scheme(20,[[9,'AO2: apply suitable programming techniques and data structures to the scenario.'],[6,'AO3: produce an accurate, logical, well-communicated solution.']],
  'This is a BEST-FIT banded question. Award AO2 out of 9 and AO3 out of 6 separately; do NOT turn the scenario into fifteen independent one-mark points. '+
  'Requirements: R1 input and validate both player names; R2 generate and store 100 random integers from 1 to 6 per player in NumberGenerated[], compare corresponding numbers and calculate both totals (higher roll +2; equal +1 each); R3 resolve an overall draw by generating pairs until unequal, add 2 to the winner, and output both names/scores in descending order with suitable messages. Equal tie-break rolls add nothing. Declarations are not required. '+
  'AO2 bands: 0 no creditable response; 1–3 at least one relevant technique and some stored data, possibly inappropriate; 4–6 multiple appropriate techniques and structures handling some scenario data; 7–9 a suitable range of techniques and structures covering all scenario requirements and storing all required data. Judge within the best-fitting band. '+
  'AO3 bands: 0 no creditable response; 1–2 some appropriate identifiers, little or no useful commenting, inaccurate or illogical code attempting at least one requirement; 3–4 some relevant comments, mostly meaningful names, some inaccuracies or illogical parts, and most requirements met; 5–6 well-commented code, meaningful names throughout, logical order, accurate solution meeting all requirements. Ignore minor syntax errors. Use the whole band when warranted. '+
  'Accept a correct permitted programming-language solution or pseudocode. Do not require the example answer’s exact variable names, except NumberGenerated[] which is specified in the question. Do not copy accidental typos in an example as requirements.')
};
