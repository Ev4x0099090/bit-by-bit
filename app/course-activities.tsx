'use client';
import * as S from './course-software-activities';
import * as W from './course-web-activities';
import * as A from './course-automation-activities';
import * as G from './course-algorithm-activities';
import * as P from './course-programming-activities';
import * as D from './course-data-activities';
export function CourseActivity({id}:{id:string}){let activity;switch(id){
case '4.1.1':activity=<S.SoftwareSort/>;break;case '4.1.2':activity=<S.OsDesk/>;break;case '4.1.3':activity=<S.BootStack/>;break;case '4.1.4':activity=<S.InterruptDesk/>;break;
case '4.2.1':activity=<S.LanguageLevels/>;break;case '4.2.2':activity=<S.MnemonicAssembler/>;break;case '4.2.3':activity=<S.TranslatorWorkbench/>;break;case '4.2.4':activity=<S.TranslatorRuns/>;break;case '4.2.5':activity=<S.IdeTools/>;break;
case '5.1.1':activity=<W.InternetServices/>;break;case '5.1.2':activity=<W.UrlParts/>;break;case '5.1.3':activity=<W.WebTransfer/>;break;case '5.1.4':activity=<W.BrowserModel/>;break;case '5.1.5':activity=<W.PageJourney/>;break;case '5.1.6':activity=<W.CookieSessions/>;break;case '5.2.1':activity=<W.DigitalPayment/>;break;case '5.2.2':activity=<W.BlockchainLedger/>;break;case '5.3.1':activity=<W.SecurityCatalogue/>;break;case '5.3.2':activity=<W.SecurityCatalogue defence/>;break;
case '6.1.1':activity=<A.FeedbackLab/>;break;case '6.1.2':activity=<A.FeedbackLab faults/>;break;case '6.2.1':activity=<A.RobotBuilder/>;break;case '6.2.2':activity=<A.RobotBuilder features/>;break;case '6.2.3':activity=<A.RobotRoles/>;break;case '6.3.1':activity=<A.ExpertPlant comparison/>;break;case '6.3.2':activity=<A.LearningClassifier/>;break;case '6.3.3':activity=<A.AiMethods/>;break;
case '7.1':activity=<G.LifeCycle/>;break;case '7.2':activity=<G.SystemMap/>;break;case '7.3':activity=<G.AlgorithmPurpose/>;break;case '7.4':activity=<G.StandardAlgorithms/>;break;case '7.5':activity=<G.DataChecks/>;break;case '7.6':activity=<G.TestDataLab/>;break;case '7.7':activity=<G.TraceTable/>;break;case '7.8':activity=<G.DebugLab/>;break;case '7.9':activity=<G.AlgorithmBuilder/>;break;
case '8.1.1':activity=<P.NamedValues/>;break;case '8.1.2':activity=<P.DataTypes/>;break;case '8.1.3':activity=<P.InputOutput/>;break;case '8.1.4':activity=<P.ProgrammingPatterns/>;break;case '8.1.5':activity=<P.NestedBlocks/>;break;case '8.1.6':activity=<P.RoutineCalls/>;break;case '8.1.7':activity=<P.LibraryFunctions/>;break;case '8.1.8':activity=<P.MaintainableCode/>;break;case '8.2.1':activity=<P.ArrayLab/>;break;case '8.2.2':activity=<P.ArrayLab mode="compare"/>;break;case '8.2.3':activity=<P.ArrayLab mode="iterate"/>;break;case '8.3.1':activity=<P.FilePersistence/>;break;case '8.3.2':activity=<P.FileOperations/>;break;
case '9.1':activity=<D.RecordTable/>;break;case '9.2':activity=<D.DatabaseTypes/>;break;case '9.3':activity=<D.RecordTable keys/>;break;case '9.4':activity=<D.SqlBuilder/>;break;
case '10.1':activity=<D.GateExplorer symbols/>;break;case '10.2':activity=<D.GateExplorer/>;break;case '10.3':activity=<D.LogicCircuit/>;break;
default:throw new Error(`Missing activity for ${id}`);
}return <div className={`course-activity cw-unit-${id.split('.')[0]}`} data-course-activity={id}>{activity}</div>}
