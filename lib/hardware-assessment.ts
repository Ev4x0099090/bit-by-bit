import type {Question} from './content';
type Item=[string,string,string[],string];
const groups:Record<string,Item[]>={
 '3.1.2':[
 ['In Von Neumann architecture, where are instructions and data stored?','In the same memory',['In the same memory','Only on separate optical discs','Only inside the screen'],'Instructions and data share the same memory in Von Neumann architecture.'],
 ['Which register holds the instruction currently being decoded?','CIR',['CIR','PC','MAR'],'The CIR holds the current instruction. PC holds the next instruction address; MAR holds the address being accessed.'],
 ['The CPU sends a read signal to RAM. Which bus carries that signal?','Control bus',['Control bus','Data bus','Address bus'],'Read is a control signal, carried on the control bus.']],
 '3.1.3':[
 ['Which memory keeps frequently needed data close to the CPU?','Cache',['Cache','Optical disc','Printer buffer'],'Cache provides fast access to frequently needed instructions and data.'],
 ['Which task is most likely to benefit from extra CPU cores?','Several independent calculations',['Several independent calculations','One step that must wait for the previous step','Displaying a fixed paper page'],'Independent work can be shared between cores.'],
 ['What does a clock speed of 2 GHz describe?','Two billion clock cycles per second',['Two billion clock cycles per second','Two instructions in total','Two billion bytes of storage'],'GHz counts billions of cycles each second. It does not guarantee the same number of completed instructions.']],
 '3.1.4':[
 ['What is an instruction set?','All commands a CPU can process',['All commands a CPU can process','All files on an SSD','Only keyboard shortcuts'],'An instruction set contains the commands supported by the CPU.'],
 ['Which form of instructions can a CPU execute directly?','Machine code',['Machine code','Ordinary English','An image of a command'],'Machine code contains the binary instructions a processor executes directly.'],
 ['Two CPU designs use different instruction sets. What follows?','A command supported by one may not be supported by the other',['A command supported by one may not be supported by the other','Every binary pattern must mean the same thing','Neither CPU can process data'],'Supported commands and their machine-code patterns depend on the design.']],
 '3.1.5':[
 ['Which is an embedded system?','A washing machine’s wash controller',['A washing machine’s wash controller','A laptop running many different applications','A paper instruction book'],'The controller is built into a larger device for a dedicated function.'],
 ['What makes a computer an embedded system?','A dedicated function within a larger device',['A dedicated function within a larger device','Always having no screen','Always being connected to the internet'],'Its role within the larger device defines it. Screens and connectivity can vary.'],
 ['Which use best shows a general-purpose computer?','A PC used for writing, drawing and games',['A PC used for writing, drawing and games','A car braking controller','A vending-machine payment controller'],'A general-purpose PC can run a wide range of applications.']],
 '3.2.1':[
 ['Which input device is suitable for recording a voice?','Microphone',['Microphone','Speaker','Laser printer'],'A microphone captures sound as input data.'],
 ['A touch screen locates a finger from interrupted light beams. Which type is it?','Infra-red',['Infra-red','Resistive','Capacitive'],'Infra-red touch screens detect where beams across the screen are interrupted.'],
 ['Which device captures an object’s surface shape for a digital model?','3D scanner',['3D scanner','2D document scanner','Barcode scanner'],'A 3D scanner measures surface points to build a digital model with depth.']],
 '3.2.2':[
 ['Which device is an output device?','Speaker',['Speaker','Microphone','Optical mouse'],'A speaker turns computer output into sound.'],
 ['Which projector uses tiny tilting mirrors?','DLP projector',['DLP projector','LCD projector','Inkjet printer'],'DLP projectors direct light using a chip of tiny mirrors.'],
 ['An inkjet printer forms a page using what method?','Spraying tiny drops of liquid ink',['Spraying tiny drops of liquid ink','Fusing toner powder using heated rollers','Measuring a page with a scanner'],'Inkjet nozzles place liquid ink drops on paper. Toner and heated rollers describe laser printing.']],
 '3.2.3':[
 ['Which sensor measures how hot a room is?','Temperature',['Temperature','Acoustic','Flow'],'A temperature sensor measures hot or cold.'],
 ['A greenhouse needs the amount of water vapour in the air. Which sensor fits?','Humidity',['Humidity','Moisture','Level'],'Humidity measures water vapour in air. Moisture measures water in a material such as soil.'],
 ['A safety system must detect sudden changes in a car’s motion. Which sensor fits?','Accelerometer',['Accelerometer','pH','Gas'],'An accelerometer measures acceleration: changes in motion.']],
 '3.3.1':[
 ['Which memory is volatile?','RAM',['RAM','ROM','A saved USB flash drive'],'RAM loses its contents when its power is switched off.'],
 ['Why does a computer need ROM as well as RAM?','To retain essential instructions without power',['To retain essential instructions without power','To erase startup instructions at switch-off','To replace all working memory'],'ROM retains instructions such as startup instructions; RAM provides a changing workspace.'],
 ['Which statement correctly compares RAM and ROM in normal use?','RAM is read and written; ROM is normally read',['RAM is read and written; ROM is normally read','Both lose all contents without power','ROM stores only unsaved documents'],'RAM holds changing programs and data; ROM normally holds fixed instructions.']],
 '3.3.2':[
 ['Which is an example of secondary storage?','SSD',['SSD','CPU accumulator','RAM'],'An SSD keeps saved programs and data more permanently.'],
 ['What is a main purpose of secondary storage?','Keep saved data when power is off',['Keep saved data when power is off','Carry out every CPU calculation','Display every result'],'Secondary storage provides non-volatile storage for programs and data.'],
 ['Which statement describes CPU access to secondary storage?','Needed data is loaded into primary memory for processing',['Needed data is loaded into primary memory for processing','The CPU treats an SSD as directly accessed RAM','Secondary storage cannot hold programs'],'Secondary storage is not directly accessed by the CPU; needed data is transferred to primary memory.']],
 '3.3.3':[
 ['Which device uses magnetic platters?','Hard disk drive',['Hard disk drive','SD card','Blu-ray disc'],'An HDD stores magnetic states on rotating platters.'],
 ['What are tracks and sectors in an HDD?','Circular paths and their divided sections',['Circular paths and their divided sections','Laser colours and speaker sounds','CPU commands and registers'],'Tracks are circular paths on a platter; sectors divide those tracks into sections.'],
 ['What allows flash memory to keep data without moving parts?','Charge stored in electronic cells with transistors and gates',['Charge stored in electronic cells with transistors and gates','A rotating magnetic platter','A laser reading paper'],'Flash memory uses electronic cells with control and floating gates to retain charge.']],
 '3.3.4':[
 ['Why might a computer use virtual memory?','Available RAM is not enough for the needed data',['Available RAM is not enough for the needed data','Its monitor has no power','It needs to print a page'],'Virtual memory makes secondary-storage space available for pages outside RAM.'],
 ['What is moved between RAM and virtual memory?','Pages of data',['Pages of data','Physical CPU cores','Screen panels'],'A page is a fixed-size block of data moved as required.'],
 ['Why can repeated use of virtual memory reduce performance?','Page transfers to and from secondary storage take time',['Page transfers to and from secondary storage take time','It doubles the number of CPU cores','It makes RAM permanently larger'],'Fetching pages from secondary storage is slower than using pages already in RAM.']],
 '3.3.5':[
 ['Where are cloud files physically stored?','On storage devices used by remote servers',['On storage devices used by remote servers','Only in the air','Only inside a web address'],'Cloud storage still needs real servers and physical storage.'],
 ['What does uploading a file mean?','Sending it from a device to a remote service',['Sending it from a device to a remote service','Receiving it from a remote service','Deleting its only copy'],'Upload is the direction from the user’s device to the remote service.'],
 ['A remote-only file has not been downloaded. What is needed to retrieve it?','A working network connection and access to the service',['A working network connection and access to the service','Only an offline screen','No physical server'],'Remote access depends on reaching the server over a network.']],
 '3.3.6':[
 ['Which feature is an advantage of a saved local copy?','It can be opened without internet access',['It can be opened without internet access','It never needs backup','It always has unlimited capacity'],'Local copies can be used offline, but still need protection and backups.'],
 ['Which is a benefit of cloud storage for a group project?','Authorised members can access shared files from different devices',['Authorised members can access shared files from different devices','It removes all privacy concerns','It requires no physical equipment'],'Remote shared access can support group work. Permissions and privacy still matter.'],
 ['A location has an unreliable internet connection. Which cloud-storage disadvantage matters most?','Remote-only files may be unavailable when the connection fails',['Remote-only files may be unavailable when the connection fails','All local files must disappear','A printer cannot use paper'],'Link the disadvantage to the context: remote access needs a working connection.']],
 '3.4.1':[
 ['What does NIC stand for?','Network interface card',['Network interface card','New instruction calculator','Network image colour'],'NIC stands for network interface card; it can also be called a network interface controller.'],
 ['Why does a computer need a suitable NIC?','To provide the hardware interface for network access',['To provide the hardware interface for network access','To replace its entire CPU','To store every cloud server locally'],'The NIC provides the required hardware for sending and receiving network data.'],
 ['Which statement about NICs is correct?','They may be integrated into a computer and are assigned MAC addresses at manufacture',['They may be integrated into a computer and are assigned MAC addresses at manufacture','They must always be removable cards','They need no hardware connection'],'A NIC can be integrated or added separately; its manufacturer MAC is assigned during manufacture.']],
 '3.4.2':[
 ['What does a MAC address identify?','A network interface',['A network interface','A document’s page count','A screen resolution'],'A MAC address identifies the network interface.'],
 ['How is a usual 48-bit MAC address commonly written?','Six pairs of hexadecimal digits',['Six pairs of hexadecimal digits','Four denary groups only','One letter only'],'Six pairs contain 12 hex digits, each representing four bits: 48 bits in total.'],
 ['In a common manufacturer-assigned MAC address, what does the last half provide?','The interface’s serial code within the manufacturer allocation',['The interface’s serial code within the manufacturer allocation','The current IP address','The file size'],'The first half identifies the manufacturer; the second provides a serial code for the interface.']],
 '3.4.3':[
 ['How many bits does an IPv4 address contain?','32',['32','128','48'],'IPv4 uses four groups of eight bits, making 32 bits.'],
 ['Which description matches a dynamic IP address?','An allocated address that can change on a new allocation',['An allocated address that can change on a new allocation','An address that must change every second','A manufacturer code that can never change'],'Dynamic allocation can provide a different available address later, but does not have to do so every time.'],
 ['Why does IPv6 provide a larger address space than IPv4?','It uses 128 bits instead of 32 bits',['It uses 128 bits instead of 32 bits','It uses fewer possible combinations','It removes network addresses'],'More address bits give vastly more possible address combinations.']],
 '3.4.4':[
 ['What is a router’s main forwarding role?','Send packets between networks towards their destinations',['Send packets between networks towards their destinations','Turn every file into a photograph','Store only startup instructions'],'Routers connect networks and forward packets along suitable routes.'],
 ['Which information helps a router choose a packet’s next route?','Destination IP address',['Destination IP address','Keyboard colour','Monitor brightness'],'The router examines the destination IP address using routing information.'],
 ['Which pair describes functions a home router can provide?','Connect the local network to the internet and allocate local IP addresses',['Connect the local network to the internet and allocate local IP addresses','Replace RAM and print every document','Convert all files into machine code and replace the CPU'],'A router can connect networks and provide local IP address allocation.']]
};
export const moreHardwareQuestions:Question[]=Object.entries(groups).flatMap(([objective,items])=>items.map(([prompt,answer,options,model],i)=>({id:`hw-${objective}-${i+1}`,objective,difficulty:i+1,type:'choice' as const,prompt,answer,options,model,marks:1,error:'Revisit the labelled activity and check which part performs this job.'})));
export const hardwareWrittenPrompts:Record<string,string>={
 '3.1.1':'Explain the CPU’s role in an input–process–output example, and define a microprocessor.',
 '3.1.2':'Explain how shared memory, CPU registers, the CU/ALU and buses work together in a fetch–decode–execute cycle.',
 '3.1.3':'Explain how extra cores, a larger cache and a higher clock speed can affect CPU performance.',
 '3.1.4':'Explain what an instruction set is, how commands are represented, and why two CPU designs might support different commands.',
 '3.1.5':'Explain what an embedded system is, give examples, and contrast it with a general-purpose computer.',
 '3.2.1':'Explain why input devices are needed, give suitable choices for different data, and compare touch-screen methods.',
 '3.2.2':'Explain why output devices are needed, compare printer methods, and give suitable display or physical-output examples.',
 '3.2.3':'Explain how to choose suitable sensors, distinguishing humidity from moisture and flow from level. Use a context to justify a choice.',
 '3.3.1':'Explain primary storage, RAM and ROM, including their roles and whether contents remain without power.',
 '3.3.2':'Explain why secondary storage is needed and how saving and loading connect it to primary memory.',
 '3.3.3':'Describe how magnetic, optical and solid-state storage work, giving an example of each.',
 '3.3.4':'Explain why virtual memory is used, how pages move, and why it can slow a computer.',
 '3.3.5':'Explain cloud storage, the physical equipment it uses, and the directions of uploading and downloading.',
 '3.3.6':'Compare local and cloud storage for a student who needs both offline access and shared files.',
 '3.4.1':'Explain what a NIC does, how it can be supplied, and when its manufacturer MAC address is assigned.',
 '3.4.2':'Explain a MAC address’s purpose, usual format and two parts.',
 '3.4.3':'Explain an IP address’s purpose, compare IPv4 with IPv6, and distinguish static from dynamic allocation.',
 '3.4.4':'Explain how a router forwards packets and how it can connect a local network and allocate addresses.'
};
