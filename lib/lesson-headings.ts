// Headings tell students which idea they are working on, without repeating the instructions.
import {transmissionHeadings} from './transmission';
export const lessonHeadings:Record<string,{opening:string,explanation:string,demo:string,worked:string}>={
 '1.1.2':{opening:'Start with tens and ones',explanation:'Read and build numbers',demo:'Build and convert a number',worked:'Convert 45, step by step'},
 '1.1.3':{opening:'Make a long bit pattern easier to read',explanation:'Four bits become one hex digit',demo:'Read a colour using hex',worked:'Shorten a sixteen-bit pattern'},
 '1.1.4':{opening:'What happens when two ones meet?',explanation:'Add one column at a time',demo:'Watch each carry move left',worked:'Add 13 and 7'},
 '1.1.5':{opening:'Move the bits, change the value',explanation:'Keep track of the bits that are lost',demo:'Shift an eight-bit pattern',worked:'Shift 13 right once'},
 '1.1.6':{opening:'How can eight bits store a negative number?',explanation:'Give the leftmost column a negative value',demo:'Build a signed number',worked:'Represent −5 in eight bits'},
 '1.2.1':{opening:'Give every character a code',explanation:'Compare ASCII and Unicode',demo:'Try letters, languages and symbols',worked:'Store the letter A'},
 '1.2.2':{opening:'Record a wave, one measurement at a time',explanation:'Separate sample rate from resolution',demo:'Change the stored measurements',worked:'Compare two recording settings'},
 '1.2.3':{opening:'A picture is a grid of pixels',explanation:'Separate pixels from colour choices',demo:'Change the pixels and colour depth',worked:'Count the data in a small image'},
 '1.3.1':{opening:'Count data in groups',explanation:'Follow the storage units',demo:'Convert between storage units',worked:'Convert bits to KiB'},
 '1.3.2':{opening:'Count the items, then the bits',explanation:'Calculate image and sound data',demo:'Change a file-size calculation',worked:'Find an image size in KiB'},
 '1.3.3':{opening:'Why make a file smaller?',explanation:'Storage, transmission time and bandwidth',demo:'See how a smaller file helps',worked:'Explain three compression benefits'},
 '1.3.4':{opening:'Can the original data be recovered?',explanation:'Compare lossy, lossless and RLE',demo:'Remove detail or shorten repeated data',worked:'Encode a run of characters'}
};

Object.assign(lessonHeadings,transmissionHeadings);
