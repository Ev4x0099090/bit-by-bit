export type TraceStep={label:string,text:string,pc:number,mar:string,mdr:string,cir:string,acc:string,bus?:'address'|'data'|'control',address?:number};
export const cpuTrace:TraceStep[]=[
 {label:'Ready',text:'RAM holds instructions at 0 and 1, and data at 6 and 7. PC points to the first instruction.',pc:0,mar:'—',mdr:'—',cir:'—',acc:'0'},
 {label:'Fetch · choose address',text:'Copy PC to MAR. The address bus carries address 0 to RAM.',pc:0,mar:'0',mdr:'—',cir:'—',acc:'0',bus:'address',address:0},
 {label:'Fetch · request a read',text:'The CU sends a READ signal on the control bus.',pc:0,mar:'0',mdr:'—',cir:'—',acc:'0',bus:'control',address:0},
 {label:'Fetch · receive instruction',text:'The instruction at address 0 travels on the data bus to MDR.',pc:0,mar:'0',mdr:'LOAD 6',cir:'—',acc:'0',bus:'data',address:0},
 {label:'Fetch · hold instruction',text:'Copy the instruction from MDR into CIR. Advance PC to 1, the next instruction address.',pc:1,mar:'0',mdr:'LOAD 6',cir:'LOAD 6',acc:'0'},
 {label:'Decode LOAD',text:'The CU decodes LOAD 6: bring the value at address 6 into ACC.',pc:1,mar:'0',mdr:'LOAD 6',cir:'LOAD 6',acc:'0'},
 {label:'Execute · address the data',text:'MAR holds 6; the address bus selects RAM location 6.',pc:1,mar:'6',mdr:'LOAD 6',cir:'LOAD 6',acc:'0',bus:'address',address:6},
 {label:'Execute · read the data',text:'A READ control signal requests the value at location 6.',pc:1,mar:'6',mdr:'LOAD 6',cir:'LOAD 6',acc:'0',bus:'control',address:6},
 {label:'Execute · receive 4',text:'The data bus transfers the value 4 from RAM into MDR.',pc:1,mar:'6',mdr:'4',cir:'LOAD 6',acc:'0',bus:'data',address:6},
 {label:'Execute · load ACC',text:'Copy 4 from MDR into ACC. The first instruction is complete.',pc:1,mar:'6',mdr:'4',cir:'LOAD 6',acc:'4'},
 {label:'Fetch again · next address',text:'Copy PC to MAR. The address bus now selects instruction address 1.',pc:1,mar:'1',mdr:'4',cir:'LOAD 6',acc:'4',bus:'address',address:1},
 {label:'Fetch again · request read',text:'A READ signal on the control bus requests the next instruction.',pc:1,mar:'1',mdr:'4',cir:'LOAD 6',acc:'4',bus:'control',address:1},
 {label:'Fetch again · receive instruction',text:'The instruction ADD 7 travels on the data bus into MDR.',pc:1,mar:'1',mdr:'ADD 7',cir:'LOAD 6',acc:'4',bus:'data',address:1},
 {label:'Fetch again · hold instruction',text:'Copy ADD 7 into CIR. PC advances to 2.',pc:2,mar:'1',mdr:'ADD 7',cir:'ADD 7',acc:'4'},
 {label:'Decode ADD',text:'The CU decodes ADD 7: add the value at address 7 to ACC.',pc:2,mar:'1',mdr:'ADD 7',cir:'ADD 7',acc:'4'},
 {label:'Execute · select address 7',text:'MAR holds 7 and the address bus selects data location 7.',pc:2,mar:'7',mdr:'ADD 7',cir:'ADD 7',acc:'4',bus:'address',address:7},
 {label:'Execute · request data',text:'The CU sends READ on the control bus for location 7.',pc:2,mar:'7',mdr:'ADD 7',cir:'ADD 7',acc:'4',bus:'control',address:7},
 {label:'Execute · receive 3',text:'The data bus brings 3 into MDR.',pc:2,mar:'7',mdr:'3',cir:'ADD 7',acc:'4',bus:'data',address:7},
 {label:'Execute · add with the ALU',text:'The ALU adds ACC’s 4 to the fetched 3. ACC holds the result, 7. Both instructions have been carried out.',pc:2,mar:'7',mdr:'3',cir:'ADD 7',acc:'7'}
];
export function performanceModel(cores:number,clock:number,cached:boolean,parallel:boolean){
 const rounds=parallel?Math.ceil(8/cores):8;
 return {rounds,memoryWait:cached?0:8,time:rounds/clock+(cached?0:8)};
}
export type PageState={ram:string[],disk:string[],message:string,moves:number};
export const initialPages=():PageState=>({ram:['A','B'],disk:['C','D'],message:'RAM has two spaces. Choose a page to use; a page outside RAM must be brought in.',moves:0});
export function requestPage(state:PageState,page:string):PageState{
 if(state.ram.includes(page))return {...state,message:`Page ${page} is already in RAM. No secondary-storage transfer is needed.`};
 const evicted=state.ram[0];
 return {ram:[state.ram[1],page],disk:[...state.disk.filter(p=>p!==page),evicted],moves:state.moves+2,message:`Move page ${evicted} from RAM to secondary storage, then load page ${page} into RAM. Two page transfers take extra time. This model replaces the first RAM slot; real systems choose pages using their own rules.`};
}
