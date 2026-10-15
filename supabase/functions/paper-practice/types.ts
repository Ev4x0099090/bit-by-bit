export type CodeDraft={text:string,fields:Record<string,string>,choice:string,language:string};
export type CriterionResult={id:number,description:string,awarded:number,maximum:number,status:'correct'|'partial'|'incorrect',evidence:string|null};
export type MarkResult={question_id:string,marks_awarded:number,maximum_marks:number,percentage:number,criteria:CriterionResult[],feedback:{summary:string,strengths:string[],improvements:string[]},confidence:number,requires_review:boolean};
export type PaperSession={paperId:string,currentTask:string,startedAt:number,updatedAt:number,completedAt:number|null,status:'in_progress'|'marking'|'complete',answers:Record<string,CodeDraft>,results:Record<string,MarkResult>,earned:number|null,maximumMarks:number,grade:string|null,requiresReview:boolean};
export type LessonCodeResult={taskId:string,draft:CodeDraft,result:MarkResult,at:number};
export type PaperPracticeState={sessions:PaperSession[],lessonResults:LessonCodeResult[],authenticated:boolean,configured:boolean};
