export type Foundation={title:string,explanation:string,example:string};
const variable:Foundation={title:'A named value',explanation:'A variable remembers a value under a name. Its value can change while the program runs.',example:'Score holds 4. Later it can hold 7.'};
const assign:Foundation={title:'The assignment arrow',explanation:'← means calculate what is on the right, then store it in the name on the left.',example:'Total ← Total + 3: if Total was 4, it becomes 7.'};
const condition:Foundation={title:'A condition chooses a path',explanation:'A comparison gives TRUE or FALSE. In a condition, = means equal, <> means not equal, > means greater than and >= means at least. IF ... THEN runs its steps when TRUE; ELSE can give the other path. ENDIF closes the choice.',example:'IF Age >= 12 THEN\n    CanJoin ← TRUE\nENDIF'};
const loop:Foundation={title:'Repeat the steps',explanation:'A loop repeats instructions. FOR visits a stated range of values; NEXT ends its repeated steps. A counter records the current repetition.',example:'FOR Count ← 1 TO 3\n    OUTPUT Count\nNEXT Count\nThis displays 1, then 2, then 3.'};
const io:Foundation={title:'Read and display a value',explanation:'INPUT Name stores what the user enters in Name. OUTPUT Name displays that stored value. Text in quotes is a fixed message.',example:'INPUT Name\nOUTPUT "Hello ", Name'};
const arithmetic:Foundation={title:'Calculate with stored values',explanation:'Use + to add, - to subtract, * to multiply and / to divide. Brackets group the part to calculate first.',example:'Average ← (First + Second + Third) / 3'};
const validationLoop:Foundation={title:'Ask again until a rule is met',explanation:'REPEAT runs its steps at least once. UNTIL tests the stopping rule: a FALSE result repeats the steps; TRUE ends the loop. AND requires both rules; OR requires at least one.',example:'REPEAT\n    INPUT Age\nUNTIL Age >= 11 AND Age <= 18'};
const whileLoop:Foundation={title:'Repeat while a condition is true',explanation:'WHILE tests before each repetition. Its steps run while the condition is TRUE; ENDWHILE closes them. Change the relevant value so the loop can eventually stop.',example:'Count ← 3\nWHILE Count > 0 DO\n    Count ← Count - 1\nENDWHILE'};
const array:Foundation={title:'A list with numbered places',explanation:'An array groups related values. An index is the position number used to select one of them.',example:'Names[2] means the name in position 2, when indexes start at 1.'};
const types:Foundation={title:'Choose a kind of value',explanation:'INTEGER means a whole number. REAL can have a fractional part. STRING means text; CHAR means one character. BOOLEAN means TRUE or FALSE.',example:'Count: INTEGER. Price: REAL. Name: STRING.'};
const routine:Foundation={title:'A reusable set of steps',explanation:'A routine groups instructions under a name. A parameter lets it receive a value. A function also returns a result.',example:'DoubleValue(7) receives 7 and can return 14.'};
const file:Foundation={title:'Keep data after the program ends',explanation:'A file stores data for later use. Writing sends data into a file; reading brings saved data back into the program.',example:'Write 27 to a score file today; read it in the next run.'};
export const paper2Foundations:Record<string,Foundation[]>={
 '7.1':[{title:'What is a program?',explanation:'A program is a set of instructions a computer follows. Input is data it receives; output is the result it sends out.',example:'Input: ticket count → calculate cost → output: total price.'}],
 '7.2':[{title:'A smaller job',explanation:'A system can be split into smaller jobs called sub-systems. An algorithm is a clear sequence of steps for doing a job.',example:'A library system can have borrowing, returning and searching jobs.'}],
 '7.3':[variable,assign,io,arithmetic],
 '7.4':[array,assign,io,condition,loop],
 '7.5':[types,condition,io,validationLoop,{title:'Acceptable is not always correct',explanation:'Validation checks a rule; verification checks copying. A valid-looking age can still be the wrong person’s age.',example:'15 is within 11..18, but it may have been copied instead of 16.'}],
 '7.6':[{title:'Expected result',explanation:'Before running a test, work out what a correct program should do with that input.',example:'If ages 11..18 are allowed, 18 is accepted and 19 is rejected.'}],
 '7.7':[variable,assign,io,condition,loop],
 '7.8':[assign,io,condition,whileLoop],
 '7.9':[variable,assign,io,condition,loop,validationLoop],
 '8.1.1':[types,assign,{title:'Leave a note for the reader',explanation:'A line starting // is a comment in this pseudocode. It explains the code and is not an instruction to execute.',example:'// Score now holds 7'}],
 '8.1.2':[{title:'What a declaration tells us',explanation:'A declaration gives a stored value a name and a type. A type describes the kind of data that name can hold.',example:'DECLARE Age : INTEGER gives Age a whole-number type.'},condition],
 '8.1.3':[variable,{title:'Text in quotes',explanation:'Quotes mark literal text to display. An unquoted variable name refers to its stored value.',example:'OUTPUT "Name" prints Name. OUTPUT Name prints the stored name.'}],
 '8.1.4':[assign,condition],
 '8.1.5':[condition,loop],
 '8.1.6':[variable,assign,routine],
 '8.1.7':[routine,{title:'Whole groups and leftovers',explanation:'DIV finds the whole-number quotient. MOD finds the remainder after making those whole groups.',example:'17 DIV 5 = 3 whole groups; 17 MOD 5 = 2 left over.'}],
 '8.1.8':[variable,routine],
 '8.2.1':[variable,types],
 '8.2.2':[array,loop],
 '8.2.3':[array,assign,loop],
 '8.3.1':[variable,file],
 '8.3.2':[variable,file],
 '9.1':[{title:'A table of related items',explanation:'A record is one row about one item. A field is one kind of detail, shown as a column.',example:'One book record can have Title, Pages and Available fields.'}],
 '9.2':[types],
 '9.3':[{title:'Tell two records apart',explanation:'A primary key is a field whose value identifies one record uniquely. Names are not always unique.',example:'Two pupils may share a name; their StudentID values should differ.'}],
 '9.4':[{title:'Read a query in three pieces',explanation:'SQL is a language for asking a database for information. SELECT chooses fields, FROM chooses the table, and WHERE chooses which records match.',example:'SELECT Title FROM Books WHERE Pages >= 200;'},condition],
 '10.1':[{title:'Two input states',explanation:'Logic circuits use 0 and 1 as two states. A gate applies a rule to its input state or states and produces an output.',example:'A NOT gate changes an input 0 to output 1.'}],
 '10.2':[{title:'Test a rule',explanation:'A truth table lists every possible input combination and the output given by a gate’s rule.',example:'Two binary inputs have combinations 00, 01, 10 and 11.'}],
 '10.3':[{title:'Join simple rules',explanation:'AND needs both conditions, OR needs at least one, and NOT reverses a condition. Work through brackets before the next gate.',example:'A AND (NOT B): first reverse B, then apply AND with A.'}]
};
