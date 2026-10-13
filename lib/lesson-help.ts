import {courseHelp} from './course-registry';
import {hardwareHelp} from './hardware';
import {type TermId} from './glossary';
import {transmissionHelp} from './transmission';
export const lessonHelp:Record<string,{terms:TermId[],simple:string,example:string}>={
 '1.1.2':{terms:['bit','denary','binary','hexadecimal','place','nibble','base'],simple:'Think of choosing boxes with 8, 4, 2 or 1 counters. To make ten, choose the 8 box and the 2 box. Write 1 for a box you use and 0 for one you leave out.',example:'Six is 4 + 2. In the 8, 4, 2 and 1 columns, choose only 4 and 2: 0110. The 0s tell us to leave out 8 and 1.'},
 '1.1.3':{terms:['hexadecimal','nibble','binary','encoding','memory','mac','rgb'],simple:'Imagine rewriting a long number with fewer symbols. Its value stays the same. Hex gives us one symbol for each group of four binary bits.',example:'1111 1111 has two four-bit groups. Each 1111 is fifteen, which hex writes as F. The shorter way to write the same value is FF.'},
 '1.1.4':{terms:['carry','unsigned','register','overflow'],simple:'If a column contains two ones, pair them. That pair is worth one unit of the column on the left. Keep any single one left over in the current column.',example:'Add 00000001 and 00000001. The two ones make a pair: carry 1 left and leave 0 here. The result is 00000010, worth two.'},
 '1.1.5':{terms:['shift','register','unsigned'],simple:'Picture the bits on a row of seats. A right shift moves every bit one seat right. A bit pushed off the end is lost, and the empty seat on the left gets 0.',example:'00000100 shifted right once becomes 00000010. Four becomes two. Shifting it left once instead gives 00001000, worth eight.'},
 '1.1.6':{terms:['complement','invert','place','unsigned'],simple:'The far-left column now has a negative value. A 1 there adds −128 to the total; the other columns still add positive amounts.',example:'To make −2 in eight bits: write +2 as 00000010, swap the bits to 11111101, then add one to get 11111110.'},
 '1.2.1':{terms:['character','ascii','unicode','encoding','byte'],simple:'Think of a list that gives each letter a ticket number. The computer stores that number using bits. A bigger list can include more languages and symbols.',example:'B has ASCII code 66. Since 66 is 64 + 2, its eight-bit pattern is 01000010. The code tells us which character to display.'},
 '1.2.2':{terms:['amplitude','sample','rate','resolution'],simple:'Imagine measuring the height of a wave with a ruler. Taking measurements more often captures more changes over time. A ruler with more marked levels lets each measurement be more accurate.',example:'In one second, four samples with two bits each use 4 × 2 = 8 bits. Eight samples with two bits each use 16 bits. Four samples with four bits each also use 16 bits.'},
 '1.2.3':{terms:['bitmap','pixel','depth','palette'],simple:'Think of a mosaic made of little squares. More squares can show finer detail. Giving each square more colours is a separate change.',example:'A 2 × 2 image has four pixels. At two bits per pixel, each can use one of four colours, and the pixel data uses 4 × 2 = 8 bits: one byte.'},
 '1.3.1':{terms:['bit','nibble','byte','kibibyte'],simple:'You can count the same amount in small or large groups. A byte groups eight bits; a KiB groups 1024 bytes. Bigger groups mean a smaller number of groups.',example:'8192 bits ÷ 8 = 1024 bytes. Then 1024 bytes ÷ 1024 = 1 KiB. We have changed the unit, not the amount of data.'},
 '1.3.2':{terms:['bitmap','pixel','depth','sample','rate','resolution','mono','byte','header'],simple:'Count how many items the file stores. Then multiply by the bits needed for each item. Finally, change bits to the unit the question asks for.',example:'An 8 × 8 image has 64 pixels. At two bits each, that is 128 bits. Divide by eight to get 16 bytes, ignoring the header.'},
 '1.3.3':{terms:['compression','bandwidth','byte'],simple:'If a delivery van takes two boxes each trip, fewer boxes mean fewer trips. Compression reduces the data to send; it does not make the connection faster.',example:'A smaller recording leaves more space on your phone. It has fewer bits to send over the same connection and needs less bandwidth when streamed.'},
 '1.3.4':{terms:['compression','lossless','lossy','rle','encoding'],simple:'Some methods keep everything but write repeated information more briefly. Other methods remove differences. Only the first kind can give back the exact original.',example:'AAABB becomes (3,A) (2,B). Decoding writes three As then two Bs, giving AAABB again. With one byte per count and character, five bytes become four, ignoring headers.'}
};

Object.assign(lessonHelp,transmissionHelp);

Object.assign(lessonHelp,hardwareHelp);

Object.assign(lessonHelp,courseHelp);
