import type {Question} from './content';

// Each row is [question, correct answer, two plausible alternatives, explanation].
// IDs are stable: edit wording in place rather than renumbering published questions.
type Scenario = readonly [string,string,string,string,string];
const scenarios:Record<string,Scenario[]>={
'1.1.1':[
 ['A computer stores a voice message. What are the stored data made of?','Patterns of 0s and 1s','Tiny copies of the speaker’s voice','Only the digits 0 to 9','Sound, like other data, is represented using binary patterns.'],
 ['A signal changes from the state labelled 0 to the state labelled 1. What changed?','One bit’s value','The whole computer switched on','The computer gained a new processor','A bit describes one of two signal states, not whether the whole computer is on.'],
 ['Why can two signal states represent many different messages?','Groups of bits can form different patterns','Each bit can hold any letter by itself','Every message must have just two letters','Many bits together give many patterns. Agreed rules give those patterns meaning.']],
'1.1.2':[
 ['A student reads binary 10 as ten. What should they check first?','The number system being used','The colour of the digits','Whether the computer is online','In binary, the left column is worth two, so 10 represents two.'],
 ['Which grouping helps convert 10110110 from binary to hexadecimal?','1011 | 0110','10 | 11 | 01 | 10','101 | 101 | 10','Each hex digit matches four bits. Group from the right.'],
 ['A zero is added to the left of binary 101. What happens to its value?','It stays five','It becomes ten','It becomes six','0101 still uses the four and one columns. A leading zero adds nothing.']],
'1.1.3':[
 ['A programmer writes a long binary memory address in hex. What becomes easier?','Reading and copying the address','Storing more bits in each memory cell','Making the CPU clock run faster','Hex uses fewer digits for the same value, so people can read it more easily.'],
 ['A colour code uses two hex digits for each colour component. How many bits do those two digits stand for?','Eight bits','Two bits','Sixteen bits','Each hex digit represents four bits; two digits represent eight.'],
 ['A MAC address is written in hexadecimal. Does this mean the device stops using binary?','No; hex is a convenient way for people to write the bits','Yes; its circuits now process sixteen signal states','Yes; binary is only used for sound','Hex changes the written representation, not how the computer represents data internally.']],
'1.1.4':[
 ['An eight-bit unsigned addition has a carry between two middle columns. Is that enough to prove overflow?','No; check whether the final sum fits in eight bits','Yes; every carry is overflow','No; eight-bit addition can never overflow','A carry inside the register is normal. Overflow means the full result needs more than eight bits.'],
 ['An unsigned eight-bit register already holds 255. What happens when 1 is added?','The full result needs a ninth bit','It stores 256 in eight bits','The result becomes a negative number in unsigned binary','255 + 1 = 256, written 100000000 in binary. Eight bits cannot hold it.'],
 ['To add two eight-bit binary numbers, where should you begin?','At the rightmost column','At the leftmost column','At whichever column has the most ones','Begin with the ones column on the right, then pass any carry left.']],
'1.1.5':[
 ['A logical right shift leaves an empty position on the left. What fills it?','0','The bit lost from the right','Always 1','Logical shifts insert zeros. They do not wrap lost bits around.'],
 ['An unsigned value is shifted left once and its leading 1 is lost. Can you safely say the stored value doubled?','No; losing a 1 changes the result','Yes; left shifts always double the stored value','Yes; the lost bit is kept at the other end','Doubling works only when the required bits fit in the register.'],
 ['An eight-bit pattern is shifted right three places. Which bits are discarded?','The original three rightmost bits','The original three leftmost bits','None; every bit returns at the other end','Bits that move beyond the right-hand end are lost.']],
'1.1.6':[
 ['In eight-bit two’s complement, what does a leading 1 tell you?','The value is negative','The value is greater than 127','The remaining seven bits must all be 0','The leftmost column has weight −128, making a leading-1 pattern negative.'],
 ['A student inverts the bits of +9 to find −9, then stops. What step is missing?','Add 1','Add 9','Remove the leftmost bit','To form the negative value, invert all eight bits and then add one.'],
 ['The same eight bits are read as unsigned and as two’s complement. Must they have the same denary value?','No; the leftmost place value differs','Yes; interpretation cannot affect a value','No; two’s complement uses nine bits','Unsigned uses a +128 column; two’s complement uses −128.']],
'1.2.1':[
 ['A messaging app must store Arabic, Chinese and English text. Which character set is the better fit?','Unicode','Standard ASCII alone','A bitmap resolution','Unicode supports a much wider range of writing systems than standard ASCII.'],
 ['A text file contains the character 8. What is stored for that character?','Its character code in binary','Always binary 00001000','A drawing of the digit in every text file','Text characters use character codes. The character 8 is different from the numeric value eight.'],
 ['Two applications agree on the same character set. Why does this help when exchanging text?','They can interpret each stored character code consistently','It guarantees the text has no spelling errors','It makes every text file use zero storage','A shared character set gives matching meanings to character codes.']],
'1.2.2':[
 ['Two recordings have the same duration and sample resolution. One takes more samples each second. Which has more uncompressed data?','The recording with the higher sample rate','The one with the lower sample rate','They must have identical sizes','More samples, with the same bits per sample, need more storage.'],
 ['A sample is stored using more bits. What can this improve?','How accurately its amplitude is represented','How many seconds the original sound lasted','How many pixels the recording contains','More bits allow more possible amplitude levels for each sample.'],
 ['A student says sample rate means bits per sample. What have they confused it with?','Sample resolution','Recording duration','Image resolution','Rate counts samples per second. Resolution is the number of bits used for each sample.']],
'1.2.3':[
 ['Two bitmaps have identical dimensions. One uses 16 bits per pixel instead of 8. What changes?','More colours can be represented at each pixel','There are twice as many pixels','The image width doubles','Colour depth changes the available colours, not the number of pixels.'],
 ['A bitmap is changed from 200 × 100 to 400 × 200 pixels. What happens to its pixel count?','It becomes four times as large','It doubles','It stays the same','Both dimensions double, so the number of pixels is multiplied by four.'],
 ['A picture has many pixels but only two colours. Which property limits its colour range?','Colour depth','The file name','The width alone','Colour depth sets how many different colour codes a pixel can have.']],
'1.3.1':[
 ['A file size is given in bits, but an answer is needed in bytes. What should you do?','Divide by 8','Multiply by 8','Divide by 1024 immediately','Eight bits make one byte. Convert to bytes before moving to KiB.'],
 ['Which unit is exactly 1024 MiB?','GiB','KiB','TiB','Each step up the binary storage units is a factor of 1024.'],
 ['A student treats one nibble as one byte. What is the mistake?','A nibble has four bits; a byte has eight','A nibble has eight bytes','A byte has four bits','A nibble is four bits, half of an eight-bit byte.']],
'1.3.2':[
 ['A sound size calculation uses a sample rate per second and a duration of two minutes. What must happen first?','Convert the duration to 120 seconds','Divide the rate by the colour depth','Use 2 as the number of seconds','The time unit must match the rate: two minutes is 120 seconds.'],
 ['Width × height × colour depth gives an image size in which unit?','Bits','Bytes automatically','MiB automatically','Colour depth is bits per pixel. Divide the result by eight to get bytes.'],
 ['Only the colour depth doubles. Dimensions stay the same. Ignoring headers, what happens to uncompressed bitmap size?','It doubles','It becomes four times as large','It stays the same','The pixel count is unchanged, but each pixel now needs twice as many bits.']],
'1.3.3':[
 ['A phone has little free storage. How can compression help?','The files can require fewer bits to store','It adds physical memory chips','It removes the need for storage','Compression reduces the amount of data needed for a file.'],
 ['A video call has limited bandwidth. Why might compressed video help?','Less data needs to be sent for the video','The cable becomes physically wider','The CPU no longer needs instructions','A smaller stream can need less data per second from the connection.'],
 ['Two copies of a file use the same connection. One is compressed to a smaller size. Why can it arrive sooner?','There is less data to transmit','Compression increases the connection’s data rate','The file no longer needs packets','At the same data rate, fewer bits take less time to send.']],
'1.3.4':[
 ['A compressed program must be restored exactly before it runs. Which method meets that need?','Lossless compression','Lossy compression','Removing every second instruction','Lossless compression allows the original file to be recovered exactly.'],
 ['RLE is applied to ABABAB, with a count stored for each run. Why might the result be larger?','Each run is only one character long','RLE always discards the letter B','RLE cannot store letters','Short runs still need counts, which can add more data than they save.'],
 ['A photo loses detail after lossy compression. Can decompression reliably recover the discarded original detail?','No; some original information was permanently removed','Yes; every compressed file keeps a hidden original','Yes; renaming the file restores the detail','Lossy compression does not keep enough information to restore the original exactly.']],
'2.1.1':[
 ['Packets for one message arrive in the order 3, 1, 2. What helps the receiver rebuild the message?','Packet sequence numbers','The screen resolution','The sender’s font choice','Sequence numbers let the receiver place the payload pieces in their original order.'],
 ['One route becomes busy while a message is being sent. How can packet switching help?','Packets can travel by other available routes','Every packet must wait for that one route','The message is changed into an image','Packet switching does not require all packets to follow one fixed route.'],
 ['Which part of a packet carries a piece of the message itself?','The payload','Only the destination address','Only the sequence number','The header supplies delivery information; the payload contains the transmitted data.']],
'2.1.2':[
 ['Two people use radios that let only one person speak at a time. Which direction of transmission matches this?','Half-duplex','Simplex','Full-duplex','Half-duplex allows both directions, but only one at a time.'],
 ['A link sends one bit after another along one data channel. What is this method?','Serial transmission','Parallel transmission','Full-duplex only','Serial describes sending bits one after another. Duplex describes the direction of communication.'],
 ['A video call lets both people speak and hear each other at once. Which direction is needed?','Full-duplex','Simplex','Half-duplex only','Full-duplex supports simultaneous communication in both directions.']],
'2.1.3':[
 ['A USB mouse is plugged into a computer. What can the same connection provide besides data transfer?','Electrical power for the device','Unlimited internet access','Extra CPU cores','USB can carry power as well as data for suitable connected devices.'],
 ['A student calls USB a parallel link because its cable contains several wires. What should they check?','How the data bits are transmitted','How many letters are in USB','Whether the connector is black','USB uses serial data transmission; having several wires does not make it parallel.'],
 ['Why is a standard USB interface useful for connecting peripherals?','Compatible devices can use a common connection standard','Every USB device has the same purpose','It removes the need for any device software','A shared interface makes connecting compatible devices more convenient.']],
'2.2.1':[
 ['A transmitted 0 arrives as a 1 because of electrical interference. What kind of problem occurred?','A data transmission error','A spelling error in the original message','A new encryption key was created','Interference can alter signal states and therefore change received bits.'],
 ['A receiver gets a complete file. Why should it still check the received data?','Some bits may have changed during transmission','Receiving all the bits proves their values are correct','Checking makes the file automatically smaller','A complete arrival does not guarantee that every received bit matches the original.'],
 ['Which event can introduce an error while data travels along a connection?','Noise affecting the signal','A user choosing a new wallpaper','A file having a short name','Noise or interference can change the signal carrying a bit.']],
'2.2.2':[
 ['An even-parity group arrives with an odd number of 1 bits. What does this indicate?','The parity check has detected an error','The received data are definitely correct','The data must be encrypted','The received count breaks the agreed even-parity rule.'],
 ['Two bits change in one group protected only by a parity bit. Why might the check miss the error?','The count can still have the expected odd or even parity','Parity always checks each bit against an original copy','The receiver automatically repairs both bits','An even number of changed bits can leave parity unchanged.'],
 ['A receiver sends received data back for comparison with the original. Which method is being used?','Echo check','Check digit','Data compression','An echo check compares the returned copy with the data that were sent.']],
'2.2.3':[
 ['A book’s ISBN is typed into a system. Why is its check digit useful?','It helps detect mistakes in the entered number','It tells the computer the book’s story','It encrypts the book’s title','A check digit is calculated from the other digits and checked after entry.'],
 ['The entered number fails its check-digit test. What is a sensible next action?','Check and enter the number again','Assume the computer knows the correct replacement','Remove the check digit from every number','A failed check warns of an error; it does not generally identify the correct number.'],
 ['A barcode passes its check-digit test. What can you conclude?','The test has not detected an entry error','The product’s price is definitely correct','Every possible entry error has been ruled out','Some errors can pass a check-digit test. It also does not verify unrelated facts such as price.']],
'2.2.4':[
 ['A sender does not receive an acknowledgement before its timer expires. What should ARQ do?','Resend the data','Assume delivery succeeded','Delete the receiver’s file','A timeout tells the sender to try again because successful reception was not confirmed.'],
 ['A receiver checks a block and finds no detected error. What message allows the sender to continue?','An acknowledgement','A new file extension','A compression ratio','An acknowledgement confirms successful receipt according to the error check.'],
 ['Why does ARQ need error detection as well as acknowledgements?','The receiver must decide whether the received data passed the check','An acknowledgement by itself repairs damaged bits','A timer can identify every changed bit','The check identifies detected errors; ARQ arranges another transmission when needed.']],
'2.3.1':[
 ['Someone intercepts a message in transit. What is encryption intended to protect?','The meaning of the message from unauthorised reading','The cable from being cut','The message from ever being copied','Encryption makes the content unreadable without the appropriate key; interception can still occur.'],
 ['A readable message is changed into ciphertext. What is needed to turn it back into readable form?','The appropriate decryption method and key','A larger monitor','A shorter file name','Decryption uses the matching method and key to recover plaintext.'],
 ['A student says encryption guarantees that a message arrives. What is wrong with this claim?','Encryption protects confidentiality, not delivery','Encrypted messages never use a network','Encryption always removes half the packets','Encryption protects the content from unauthorised reading. It does not guarantee arrival.']],
'2.3.2':[
 ['Two people use symmetric encryption. Which key arrangement do they need?','The same shared secret key','One public key for each bit','No key for decryption','Symmetric encryption uses the same secret key to encrypt and decrypt.'],
 ['A message is encrypted with its receiver’s public key. Which key decrypts it?','The receiver’s matching private key','Any sender’s private key','The same public key shared with everyone','The receiver keeps the matching private key secret and uses it for decryption.'],
 ['Which key in an asymmetric pair may be distributed openly?','The public key','The private key','Both keys must be public','The public key is shared; the private key is kept secret.']],
'3.1.1':[
 ['A program adds two scores. Which unit carries out the processing of its instructions?','The CPU','The keyboard','The display cable','The CPU fetches, decodes and executes program instructions.'],
 ['A microprocessor is fitted inside a device. What does the term describe?','A processor on a single integrated circuit','Any very small battery','A collection of files on a disk','A microprocessor implements a CPU on a single chip.'],
 ['Why does a CPU need instructions as well as data?','Instructions tell it what operations to carry out on the data','Data always contain every instruction automatically','Instructions are used only to display colours','The CPU follows instructions that specify how data should be processed.']],
'3.1.2':[
 ['The CPU needs the address of its next instruction. Which register provides it?','Program counter (PC)','Current instruction register (CIR)','Accumulator only','The PC holds the address of the next instruction to fetch.'],
 ['The CPU sends a memory address to main memory. Which register holds that address?','Memory address register (MAR)','Memory data register (MDR)','Current instruction register (CIR)','MAR holds the address; MDR holds the data being transferred.'],
 ['An instruction has just been fetched into the CIR. What happens before it is executed?','The control unit decodes it','The keyboard translates it into text','It is always saved as a new file','Decoding identifies the instruction’s operation before execution.']],
'3.1.3':[
 ['The CPU repeatedly needs the same instructions. How can cache help?','It can provide frequently used data and instructions quickly','It replaces every file on secondary storage','It makes RAM non-volatile','Cache is fast storage close to the processor for frequently needed data and instructions.'],
 ['A program can divide its work between several cores. What benefit might more cores provide?','More tasks can be processed at the same time','Every single instruction must take zero time','The computer no longer needs a clock','Multiple cores can process work in parallel when the program supports it.'],
 ['Two otherwise similar CPUs have different clock speeds. What does a higher clock speed provide?','More clock cycles each second','More bytes in every bit','More pixels in every instruction','Clock speed measures cycles per second. Other factors also affect overall performance.']],
'3.1.4':[
 ['A CPU receives an operation that is not in its instruction set. What is the problem?','The CPU has no defined instruction for that operation','The monitor cannot display enough colours','The keyboard must be replaced','The instruction set defines the machine instructions the CPU can understand and execute.'],
 ['Why can machine-code software for one processor family fail on another?','Their instruction sets can differ','All programs require the same screen size','Machine code is always a text document','A machine-code instruction is specific to the processor’s instruction set.'],
 ['Which item belongs to a CPU’s instruction set?','A supported operation such as loading data','The user’s list of passwords','A list of file names in a folder','An instruction set specifies supported operations, not the user’s stored documents.']],
'3.1.5':[
 ['A washing machine’s controller runs its wash cycle. Why is this an embedded system?','It performs a specific task within a larger device','It is used to write any kind of document','It must have a separate desktop monitor','An embedded computer has a dedicated role inside another device.'],
 ['Which is the clearest embedded-system example?','A microwave’s cooking controller','A laptop used for many unrelated tasks','A general-purpose office desktop','The microwave controller is designed for a particular task in that appliance.'],
 ['Why might an embedded controller have a limited user interface?','Its dedicated task needs only a few controls','It cannot contain a processor','It never receives input','A dedicated system may need only buttons, sensors and a small display.']],
'3.2.1':[
 ['A shop wants to read printed product codes quickly. Which input device is suitable?','Barcode scanner','Loudspeaker','Projector','A barcode scanner captures the code as input to the computer.'],
 ['A musician wants to record a performance. Which device captures the sound?','Microphone','Headphones','Monitor','A microphone turns sound into a signal that can be input to the computer.'],
 ['A touch screen both displays a menu and records a tap. Which part is an input function?','Detecting where the user tapped','Showing the menu’s colours','Lighting the display','Detecting the touch supplies data to the computer; displaying the menu is output.']],
'3.2.2':[
 ['A museum needs to show one computer presentation to a large group. Which output device is suitable?','Digital projector','Barcode reader','Microphone','A projector displays the computer’s visual output on a large surface.'],
 ['A computer sends a warning sound to headphones. What is the output?','The sound heard by the user','The key the user pressed','The stored warning file alone','Headphones produce sound from the computer’s output signal.'],
 ['A design must be produced as a physical three-dimensional model. Which device is suitable?','3D printer','2D scanner','Keyboard','A 3D printer builds a physical object from the computer’s model data.']],
'3.2.3':[
 ['A greenhouse system needs to know how wet the soil is. Which sensor is suitable?','Moisture sensor','Pressure sensor','Sound sensor','A moisture sensor measures water content, helping the controller decide when to water.'],
 ['An automatic lamp should turn on when the room becomes dark. Which sensor supplies the needed reading?','Light sensor','pH sensor','Gas sensor','A light sensor measures the light level around the lamp.'],
 ['A laboratory controller must monitor how acidic a solution is. Which sensor should it use?','pH sensor','Temperature sensor alone','Motion sensor','pH measures acidity or alkalinity; temperature alone cannot give that measurement.']],
'3.3.1':[
 ['A computer loses unsaved work when its power fails. Which storage held that working data?','RAM','ROM only','A file already saved on an SSD','RAM is volatile: its contents are lost without power.'],
 ['A device needs startup instructions that remain available without power. Which primary storage suits this?','ROM','RAM alone','The CPU’s clock','ROM is non-volatile and can hold startup instructions.'],
 ['Why does opening a program usually use RAM?','RAM holds instructions and data currently being used','RAM permanently archives every file','RAM reads printed documents','RAM provides working storage for running programs and their data.']],
'3.3.2':[
 ['A student wants a document to survive shutdown. What should they do?','Save it to non-volatile secondary storage','Leave it only in RAM','Increase the screen brightness','Secondary storage keeps saved data when power is switched off.'],
 ['Which task is a main purpose of secondary storage?','Keeping programs and files for later use','Decoding every CPU instruction','Measuring the CPU clock','Secondary storage retains data beyond the current running session.'],
 ['A saved application is opened. Where are its working instructions normally loaded?','Into RAM from secondary storage','From RAM into the keyboard','Into the monitor’s colour palette','The program is kept on secondary storage and loaded into RAM for use.']],
'3.3.3':[
 ['A drive reads data with a laser. Which storage method is it using?','Optical storage','Magnetic storage','Solid-state storage','Optical drives use light to read patterns on a disc.'],
 ['Which device stores data using electronic memory with no moving mechanical parts?','Solid-state drive','Magnetic hard disk','Optical disc drive','Solid-state storage stores data electronically rather than on moving discs.'],
 ['A hard disk records data by changing magnetic patterns. Which storage category is this?','Magnetic','Optical','Paper-based','Hard disks use magnetic storage on rotating platters.']],
'3.3.4':[
 ['RAM is nearly full while several applications are running. What can virtual memory use as extra working space?','Part of secondary storage','Unused screen pixels','The keyboard buffer only','Virtual memory uses secondary storage to hold data moved out of RAM.'],
 ['A laptop keeps moving working data between RAM and an SSD. Why might switching apps feel slower?','Moving data between RAM and secondary storage takes time','Virtual memory removes CPU cores','Secondary storage always runs faster than RAM','Secondary storage is generally slower than RAM, so repeated transfers reduce performance.'],
 ['Does virtual memory physically add more RAM chips?','No; it uses storage space as an extension of working memory','Yes; the operating system manufactures new chips','Yes; it turns the monitor into RAM','Virtual memory is a storage-management technique, not new physical RAM.']],
'3.3.5':[
 ['A photo is saved to cloud storage. Where is its data physically stored?','On a provider’s remote storage servers','Nowhere; the internet has no hardware','Only inside the URL text','Cloud storage uses real storage hardware managed by a remote provider.'],
 ['A student opens the same cloud file on a second device. What usually connects that device to the stored file?','A network connection to the storage service','An identical screen resolution','A local optical disc in both devices','The service supplies the stored data over a network.'],
 ['A cloud service stores extra copies of files on different servers. What benefit can this provide?','Better availability if one server fails','A guarantee that nobody needs a password','A guarantee that the internet never fails','Redundant copies can keep data available when individual storage systems fail.']],
'3.3.6':[
 ['A researcher needs a file while completely offline. Which arrangement is most reliable for that moment?','A saved local copy','A cloud-only copy requiring internet access','A link to a file not downloaded','A local copy can be opened without reaching a remote service.'],
 ['A team edits shared files from several locations. Which cloud-storage benefit is useful?','Access to shared files from connected devices','No need for access permissions','No possibility of service outages','Cloud storage can support sharing and access across locations, with suitable permissions.'],
 ['Why should a company consider the provider before storing confidential files in the cloud?','It is trusting another organisation to protect and handle the data','Cloud files cannot be encrypted','Cloud storage has no physical location','Security, access controls and provider reliability affect the risk of storing data remotely.']],
'3.4.1':[
 ['A desktop needs to send and receive network data. Which component provides its network interface?','Network interface card (NIC)','Sound card','Optical drive','A NIC allows a device to communicate with the network.'],
 ['A laptop uses Wi-Fi. Does it still need a network interface?','Yes; a wireless network interface handles communication','No; radio waves replace all network hardware','No; a microphone is enough','Wireless communication still needs network-interface hardware.'],
 ['A NIC is built into the motherboard rather than fitted as a separate card. Can it still provide network access?','Yes; the interface can be integrated','No; it must be removable','Only if it is also a printer','NIC describes the network-interface function, whether separate or built in.']],
'3.4.2':[
 ['A network-interface label shows six pairs of hex digits. Which address format is this?','A typical 48-bit MAC address','An IPv4 dotted-decimal address','A file’s storage size','A typical MAC address contains 48 bits, often shown as twelve hex digits.'],
 ['What does the manufacturer portion of a MAC address help identify?','The organisation that made the network interface','The user’s current password','The website currently being visited','Part of a MAC address identifies its manufacturer; the remaining part identifies the interface.'],
 ['A device moves to a different network. Which address is normally tied to the interface rather than assigned by that new network?','Its MAC address','Its newly assigned IP address','The URL of the network’s home page','The MAC address identifies the interface; IP addressing serves a different network role.']],
'3.4.3':[
 ['A device joins a network and is assigned a different IP address from last time. Which type of assignment is this?','Dynamic','Static','A character encoding','A dynamic IP address can change when it is assigned again.'],
 ['A server needs a consistent network address. Which kind of IP address may be suitable?','Static','An address that changes every minute','A barcode number','A static IP address stays fixed rather than being reassigned dynamically.'],
 ['Why is an IP address useful when sending data between networks?','It identifies the destination for routing','It tells the router the user’s password','It replaces every packet payload','Routers use destination IP addresses to direct packets towards the right network.']],
'3.4.4':[
 ['A home device sends data to a server on another network. Which device directs the packets out of the home network?','Router','Scanner','Loudspeaker','A router forwards packets between networks using addressing and routing information.'],
 ['A router has more than one possible next route for a packet. What guides its forwarding decision?','Its routing information and the destination IP address','The colour of the web page','The sender’s monitor size','The router uses its routing table to choose an appropriate next hop.'],
 ['What is a router’s main role rather than a NIC’s role?','Connecting networks and forwarding packets between them','Providing a single device with a network interface','Recording sound for the user','A NIC connects a device to a network; a router connects networks.']],
'4.1.1':[
 ['A student installs a photo editor. Which software category does it belong to?','Application software','An operating system kernel','Hardware firmware only','The editor helps the user carry out a task, so it is application software.'],
 ['Software manages the computer’s memory and devices. Which category best describes it?','System software','A spreadsheet document','A presentation file','System software manages the computer and supports applications.'],
 ['A disk utility organises storage rather than writing a user’s report. Why is it system software?','It helps manage and maintain the computer','It is always stored in ROM','It can never have a user interface','Its job supports the computer’s operation rather than creating the user’s work.']],
'4.1.2':[
 ['Two programs request the same printer. What operating-system function helps coordinate their output?','Peripheral management','Colour-depth conversion','Character-set design','The operating system manages shared devices and their requests.'],
 ['A running application needs more working space. Which operating-system function handles allocating RAM?','Memory management','Screen calibration','Password encryption only','Memory management allocates and tracks working memory for programs.'],
 ['A student creates folders and renames a file. Which operating-system function supports this?','File management','CPU manufacture','Packet encryption only','File management organises, locates and controls access to stored files.']],
'4.1.3':[
 ['What is the normal relationship between an app and the operating system?','The operating system provides services the app uses','Every app replaces the operating system','The operating system is just the app’s file name','Applications rely on operating-system services such as device and memory management.'],
 ['Startup code must run before the full operating system is loaded. Where can that code be kept?','In non-volatile firmware','Only in an unsaved document','Only in volatile RAM after shutdown','Firmware remains stored without power and helps start the computer.'],
 ['Which sequence describes starting a computer and opening an app?','Firmware starts the machine; the OS loads; the app runs using OS services','The app creates the hardware; firmware is written last','The keyboard loads every app before firmware runs','Startup firmware helps load the OS, which then supports applications.']],
'4.1.4':[
 ['A printer needs attention while the CPU is doing other work. How can it request a response?','Send an interrupt signal','Overwrite every running program','Change the CPU’s instruction set','An interrupt signals an event that may need the processor’s attention.'],
 ['Before handling an interrupt, why is the current task’s state saved?','So processing can resume from the right point','So the task can never run again','So the CPU no longer needs registers','Saving the current state allows the interrupted task to continue afterwards.'],
 ['Several interrupts arrive together. What helps the CPU decide which to handle first?','Their priorities','The alphabetical order of file names','The size of the monitor','Higher-priority interrupts can be handled before less urgent ones.']],
'4.2.1':[
 ['A team wants code that is easier for people to read and move between platforms. Which is usually more suitable?','A high-level language','Raw machine code for one CPU','A list of binary memory addresses','High-level languages use more readable constructs and are generally more portable.'],
 ['Why does a processor not directly execute ordinary high-level source code?','It needs translation into machine instructions','It can only execute pictures','High-level code contains no instructions','A translator converts source instructions into a form the processor can execute.'],
 ['A programmer needs close control over processor-specific operations. Which language level provides this?','Low-level','A document markup style only','A spreadsheet cell format','Low-level languages closely match the processor’s operations and architecture.']],
'4.2.2':[
 ['A program contains assembly mnemonics such as ADD. Which translator is needed?','Assembler','A web browser','A database query optimiser','An assembler translates assembly-language instructions into machine code.'],
 ['Why is ADD easier for a programmer to recognise than a machine-code bit pattern?','It is a meaningful mnemonic for an operation','It automatically runs on every CPU','It contains the answer to every addition','Mnemonics are short names that help people recognise machine operations.'],
 ['After assembly code is translated, what form can the target CPU execute?','Machine code','The original English comments only','A flowchart image','The assembler produces machine instructions for the target processor.']],
'4.2.3':[
 ['A translator works through source instructions one at a time during execution. Which type is this?','Interpreter','Assembler for every high-level language','Compiler that only creates an executable','An interpreter translates and executes the source step by step.'],
 ['A compiler successfully translates a program. What can it produce for later execution?','An executable or object code','Only a screenshot of the source','A guarantee that the algorithm is correct','Compiled output can run without translating the original source again.'],
 ['Why can a compiled program still produce a wrong answer even after syntax errors are fixed?','Its algorithm may contain a logic error','Compilation proves every result correct','Only interpreted programs can have logic errors','A translator checks language rules; testing is still needed to check behaviour.']],
'4.2.4':[
 ['A developer is finding an error while stepping through source instructions. Which translator can support that style of development?','An interpreter','A printer driver alone','A barcode scanner','Interpreted execution can make it convenient to examine one step at a time.'],
 ['A completed program will run many times. Which advantage can compilation provide?','Translation need not be repeated for each run','No testing is ever needed','Every computer must use the same hardware','A compiled executable has already been translated for its target platform.'],
 ['Why might sharing a compiled executable suit distribution better than sharing interpreted source?','Users can run the translated program without receiving its source code','The executable cannot contain bugs','Compilation makes the program free of charge','Compiled distribution can avoid giving users the original source, though platform requirements still apply.']],
'4.2.5':[
 ['An IDE colours keywords differently from other text. What feature is this?','Syntax highlighting','Automatic proof of correctness','Lossy compression','Syntax highlighting helps the programmer recognise different parts of the code.'],
 ['A student pauses a program at a chosen line to inspect variables. Which IDE feature is being used?','A breakpoint in the debugger','A colour picker','A file compressor','A breakpoint pauses execution so the program’s current state can be inspected.'],
 ['An IDE suggests a variable name after its first few letters are typed. Which feature helps here?','Code completion','Packet switching','Disk defragmentation','Code completion suggests names or constructs, reducing typing and some mistakes.']],
'5.1.1':[
 ['Email uses the internet, but is it necessarily part of the World Wide Web?','No; the web is one service using the internet','Yes; all internet traffic is a web page','No; email cannot use a network','The internet is the underlying network of networks; the web is one service on it.'],
 ['What is the World Wide Web mainly a collection of?','Linked pages and resources accessed using the internet','All physical network cables','Only messages sent by email','Web pages and related resources are linked and accessed through web services.'],
 ['A web service is temporarily unavailable, but other internet services work. Is that possible?','Yes; one service can fail while the network still operates','No; the internet and the web are identical','No; every service must stop together','Different services use the internet and can have separate failures.']],
'5.1.2':[
 ['In https://school.example/club, which part identifies the host’s domain?','school.example','https','/club','The domain identifies the host; the protocol and path have different roles.'],
 ['Two URLs have the same domain but different paths. What can the paths identify?','Different resources on the same website','Different keyboard layouts','The user’s MAC address','The path points to a particular resource or location within the site.'],
 ['Why does a browser need a full web address rather than just a page title?','The address identifies how and where to request the resource','Titles always contain encryption keys','A page title uniquely identifies every page worldwide','A URL gives the protocol, host and possibly a resource path.']],
'5.1.3':[
 ['A login form is sent over HTTPS. What protects the data while it travels?','Encryption of the connection','The page’s background colour','The length of the user name','HTTPS uses an encrypted connection to protect data in transit.'],
 ['What does plain HTTP lack compared with HTTPS?','The secure encrypted connection provided by HTTPS','The ability to request a page at all','The use of any server','HTTP can transfer web resources but does not itself provide HTTPS transport encryption.'],
 ['A fraudulent website uses HTTPS. Does HTTPS prove the business is trustworthy?','No; a secure connection does not prove the site’s claims are honest','Yes; HTTPS guarantees honest content','Yes; HTTPS checks every product advertised','HTTPS protects the connection. Users still need to assess the website itself.']],
'5.1.4':[
 ['A browser receives HTML for a page. What does it do with it?','Interprets it to display the page','Executes it as CPU machine code directly','Stores it only as a sound sample','The browser interprets page resources and renders the page for the user.'],
 ['A student wants to revisit a useful page next week. Which browser function helps?','Bookmarks','CPU clock control','RAM manufacture','A bookmark stores a convenient reference to a page’s URL.'],
 ['Why might a browser keep a cache of page resources?','To reuse downloaded resources and reduce repeated fetching','To guarantee the page never changes','To turn every web page into firmware','Cached resources can help pages load faster when they can be reused.']],
'5.1.5':[
 ['A browser has a domain name but needs the server’s IP address. Which service helps find it?','DNS','A printer queue','A character set','DNS resolves domain names to IP addresses.'],
 ['After locating the web server, what does the browser send to obtain a page?','A request for the resource','Its entire hard disk','A new processor instruction set','The browser requests the page using the appropriate web protocol.'],
 ['A server returns page resources. What still needs to happen before the user sees the page?','The browser renders the returned resources','The domain must become a MAC address','The keyboard must compile the web server','The browser interprets resources such as HTML and displays the result.']],
'5.1.6':[
 ['An online shop remembers items while you move between pages. What can a session cookie support?','Keeping track of that browsing session','Physically increasing the server’s RAM','Changing the network cable’s speed','Session cookies can help a site associate requests with the same session.'],
 ['A site remembers a language preference after the browser is reopened. Which cookie type can support this?','Persistent cookie','A session-only cookie that was deleted on closing','An image pixel with no stored state','A persistent cookie can remain until its expiry or deletion.'],
 ['Why might a user be concerned about tracking cookies?','They can help build a record of browsing activity','They are always executable viruses','They replace the computer’s operating system','Cookies can be used to recognise returning users and track activity, raising privacy concerns.']],
'5.2.1':[
 ['A payment uses currency that is stored and transferred electronically. What broad term describes it?','Digital currency','A paper receipt','A magnetic storage platter','Digital currency exists in electronic form rather than as physical notes or coins.'],
 ['Which statement correctly relates cryptocurrency to digital currency?','Cryptocurrency is one type of digital currency','Every digital payment must use a cryptocurrency','Digital currency always requires a paper coin','Cryptocurrencies are a category of digital currency, not the only kind.'],
 ['A customer transfers digital currency to pay for an online purchase. What has changed?','The electronic record of ownership or balances','The number of pixels in the website','The seller’s CPU instruction set','Digital payments update the system’s records of the transaction and funds.']],
'5.2.2':[
 ['Why are blocks linked using information from the previous block?','To make changes to earlier records detectable','To make old records unrelated to new ones','To remove the need to record transactions','Changing an earlier block affects the links that depend on it.'],
 ['A blockchain ledger is shared across participants. What does the ledger record?','Transactions arranged in linked blocks','Only the brightness of each participant’s monitor','Only unsaved RAM contents','A blockchain records transactions in blocks connected to earlier blocks.'],
 ['What makes secretly rewriting a widely shared blockchain more difficult?','Other participants have copies against which changes can be checked','Its files are always too large to copy','It never uses any form of checking','Distributed copies and the linked structure make unauthorised changes harder to conceal.']],
'5.3.1':[
 ['An email pretending to be a bank asks you to enter your password on a linked page. Which threat is this?','Phishing','Defragmentation','Lossless compression','Phishing uses deceptive messages to trick people into revealing information or taking unsafe actions.'],
 ['A program locks files and demands payment to restore access. Which threat fits?','Ransomware','A compiler','A browser bookmark','Ransomware prevents access to data, often by encrypting it, and demands payment.'],
 ['A service is flooded with requests until genuine users cannot use it. What is the attacker’s aim?','Denial of service','Making files easier to compress','Improving the website’s usability','A denial-of-service attack tries to overwhelm a service and prevent normal access.']],
'5.3.2':[
 ['An attacker learns a password, but sign-in also requires a separate one-time code. Which protection adds this extra barrier?','Two-step verification','A larger colour depth','A longer file extension','A separate verification step makes a stolen password alone less useful.'],
 ['Which protection can help recover work after files are damaged or encrypted by malware?','A usable separate backup','Only renaming the damaged files','Only increasing screen brightness','Backups allow clean data to be restored when the working copy is lost or damaged.'],
 ['Why should software security updates be installed?','They can fix known weaknesses attackers may exploit','They guarantee that users never make mistakes','They replace the need for every other protection','Updates can close known vulnerabilities; other security measures are still needed.']],
'6.1.1':[
 ['An automatic heater receives a temperature reading. What compares it with the target temperature?','The microprocessor or controller','The heating element alone','The display’s backlight','The controller processes sensor input and decides whether action is needed.'],
 ['A controller decides to open a greenhouse window. What carries out the physical action?','An actuator such as a motor','The temperature value itself','The program’s file name','An actuator turns the controller’s output into physical movement or another action.'],
 ['Why does an automated temperature system keep taking new readings?','To check conditions after each action and adjust again','To change the meaning of a degree each time','To avoid ever using a sensor','Repeated input lets the controller respond to changing conditions.']],
'6.1.2':[
 ['An automated factory works through the night. Which possible benefit does this illustrate?','Continuous operation without human tiredness','No need for maintenance','A guarantee that breakdowns never happen','Automation can operate for long periods, although maintenance and failures still need planning.'],
 ['A farm depends on automatic watering. What is a risk if the moisture sensor gives wrong readings?','The system may water at the wrong time','The water automatically changes into electricity','The software is guaranteed to correct every sensor fault','A controller can make a wrong decision when its input is wrong.'],
 ['A company replaces repetitive manual work with automation. Which disadvantage should it consider?','Changes to jobs and the need for training','All products must become less consistent','All energy use must fall to zero','Automation can change staffing needs and require training for new roles.']],
'6.2.1':[
 ['Which activity belongs to robotics?','Designing machines that can carry out programmed physical tasks','Only drawing a logo for a website','Only storing text in a database','Robotics concerns the design, construction and use of robots.'],
 ['Must a robot look like a person?','No; its design should suit the task','Yes; it must have a human-shaped face','Yes; it must always walk on two legs','Industrial arms and mobile machines can be robots without a human shape.'],
 ['A robot arm repeatedly places parts on a line under program control. What makes this a robotics application?','A programmable machine carries out a physical task','The factory has a website','The parts all have the same colour','The arm combines programmed control with physical action.']],
'6.2.2':[
 ['A mobile robot must notice an obstacle. Which component supplies information about its surroundings?','A sensor','Its painted logo','A stored product brochure','Sensors provide input about the environment for the controller to process.'],
 ['A robot must turn a wheel after receiving a command. Which component produces the movement?','A motor acting as an actuator','A light sensor alone','A text variable alone','Actuators, including motors, produce the robot’s physical actions.'],
 ['What is the controller’s role between sensing and moving?','Process the input and decide the output','Replace every mechanical component','Store only the robot’s colour','The controller uses its program and input data to determine the required action.']],
'6.2.3':[
 ['A robot inspects a dangerous radioactive area. What is a main benefit?','People can avoid direct exposure to the danger','The robot cannot suffer any damage','No operator or maintenance is ever needed','Robots can perform tasks in places where human exposure would be hazardous.'],
 ['A factory robot repeats the same welding movement. Which advantage is relevant?','Consistent, precise repetition','A guarantee of understanding every unusual situation','No setup cost','Robots can repeat programmed movements accurately, which suits repetitive production tasks.'],
 ['A new product needs a different assembly pattern. What may be needed before an existing robot can make it?','Reprogramming or changing its setup','Only changing the factory’s wallpaper','Nothing; every robot knows every new design','A robot’s program, tools or setup may need adapting for a different task.']],
'6.3.1':[
 ['An AI system recognises objects in pictures. Which ability is it attempting to simulate?','An aspect of human intelligence','The physical growth of a human body','Only the storage capacity of a disk','AI systems carry out tasks associated with intelligence, such as recognition and decision-making.'],
 ['Does describing a system as AI guarantee that all its decisions are correct?','No; its data and methods can still lead to errors','Yes; AI cannot be mistaken','Yes; AI always understands every situation','AI outputs need evaluation because systems can make mistakes.'],
 ['A system learns patterns from examples to classify new items. Which broad field includes this?','Artificial intelligence','Optical disc manufacture','Simple file renaming only','Learning patterns for classification is an application of AI.']],
'6.3.2':[
 ['An AI classifier is trained with many wrongly labelled examples. What is a likely concern?','It may learn misleading patterns','It will automatically correct every label','It no longer needs any data','Learning depends on training data, so poor examples can lead to poor predictions.'],
 ['An AI system uses rules to draw a conclusion from supplied facts. Which characteristic is being shown?','Reasoning','Only data storage','Only electrical power generation','Reasoning applies rules or relationships to reach conclusions from information.'],
 ['Must every AI system continually learn while it is being used?','No; some use fixed rules or previously trained models','Yes; otherwise it cannot be AI','Yes; every output rewrites every rule','AI can include learning, but not every system learns continuously during use.']],
'6.3.3':[
 ['An expert system asks about symptoms. Which part uses rules to reach a recommendation?','Inference engine','An optical drive','A colour-depth setting','The inference engine applies rules from the knowledge base to the supplied facts.'],
 ['Where does a rule-based expert system keep specialist facts and rules?','Knowledge base','The monitor’s pixels','A keyboard layout','The knowledge base contains the subject knowledge used to draw conclusions.'],
 ['How does machine learning differ from a system with only hand-written decision rules?','It can learn patterns from training data','It never needs input data','It always explains its decision perfectly','Machine learning develops a model from examples rather than relying only on explicitly written decision rules.']],
'7.1':[
 ['Before designing a school booking program, what should the analysis stage establish?','What users need and what the system must do','The final code before requirements are known','Only the colours of the buttons','Analysis identifies the problem, requirements and relevant information.'],
 ['A team draws a flowchart before writing code. Which development stage is this?','Design','Only final testing','Installing hardware','Design sets out how the solution will work.'],
 ['A program has been coded. Why should it be tested with planned data?','To check its behaviour against the requirements','To prove that no future error is possible','To remove the need to know the expected outputs','Testing compares actual results with expected results and helps reveal errors.']],
'7.2':[
 ['A library program is split into borrowing, returning and searching tasks. Which technique is this?','Decomposition','Encryption','Colour quantisation','Decomposition breaks a larger problem into smaller manageable parts.'],
 ['A structure diagram places smaller tasks below a main task. What does this show?','How the system is divided into sub-systems','The order of every CPU clock cycle','The binary code for each character','A structure diagram shows the hierarchy of tasks and sub-systems.'],
 ['A booking system stores reservations for later sessions. Which system component does this describe?','Storage','Input only','Output only','Storage keeps the reservation data so the system can use it again.']],
'7.3':[
 ['An algorithm adds all weekly sales and divides by seven. What is its purpose?','Find the average daily sales for the week','Find the largest individual sale','Sort the sales into ascending order','Adding the seven daily totals and dividing by seven gives their mean.'],
 ['An algorithm compares a target name with each list entry until it matches. What is its purpose?','Find the target in the list','Encrypt every name','Find the average name length without adding lengths','Checking entries for a target is a search.'],
 ['A program checks each temperature and increases a counter when it is below zero. What does its final counter show?','How many temperatures were below zero','The sum of all temperatures','The lowest temperature','The counter increases once per matching item, so it counts those items.']],
'7.4':[
 ['A linear search finds its target in the first position. What can it do next if only one match is needed?','Stop searching','Sort the whole list first','Add every remaining item','Once the required match is found, the search can stop.'],
 ['A bubble sort is arranging numbers in ascending order. Adjacent values are 12 then 5. What should happen?','Swap them','Keep them because 12 is larger','Delete both values','Ascending order needs the smaller value first, so 12 and 5 are swapped.'],
 ['Why should a maximum-finding algorithm not always start its maximum at zero?','A list of only negative numbers would give a wrong result','Zero cannot be stored in a variable','A maximum is always the last item','Starting with the first list value also works when all values are negative.']],
'7.5':[
 ['A form requires an age from 11 to 18 inclusive. Which validation check is most suitable?','Range check','Presence check alone','Visual verification only','A range check tests the age against its allowed lower and upper limits.'],
 ['A user enters the same password twice and the entries are compared. Which process is this?','Double-entry verification','A guarantee that the chosen password is secure','A check of the password against every possible value','Double entry checks that the two copies match; it does not prove the original value was suitable.'],
 ['A required field is left empty. Which validation check should reject it?','Presence check','A check of alphabetic order','A calculation of the mean','A presence check tests whether required data have been supplied.']],
'7.6':[
 ['A value must be from 20 to 40 inclusive. Which pair tests the upper boundary’s accepted and rejected sides?','40 and 41','30 and 31','21 and 22','40 is the largest accepted value; 41 is the next rejected integer.'],
 ['A whole-number score from 0 to 100 is required. Which is normal test data?','57','101','-1','57 is a typical valid value inside the allowed range.'],
 ['A whole-number age is required. Why test the input "twelve"?','It is abnormal data of the wrong type','It is the largest acceptable age','It is always a valid integer','An alphabetic word checks whether unsuitable non-numeric input is rejected.']],
'7.7':[
 ['During a dry-run, a statement changes Total. What should the trace table record?','Total’s new value at that step','Only Total’s final value after every loop','A guessed value without following the statement','A trace follows each executed step and records changes in variables and output.'],
 ['A branch condition is false. Should the trace execute the statements inside that IF branch?','No; follow the branch the condition selects','Yes; every statement must always be executed','Yes; trace tables ignore conditions','A dry-run must follow the same control flow as the algorithm.'],
 ['Why is a trace table useful when a loop gives the wrong answer?','It can show the first step where a value becomes wrong','It automatically rewrites the program','It proves all other inputs must be correct','Following the changing values can reveal where behaviour first differs from the expected result.']],
'7.8':[
 ['A loop meant to include index 10 stops at index 9. What kind of issue should you look for?','An incorrect loop boundary','A missing sound card','A wrong image colour depth','A boundary that stops too soon leaves the final item unprocessed.'],
 ['An algorithm adds Price to Total but never sets Total before the loop. What correction is needed?','Initialise Total to zero before accumulating','Set Total to zero inside every iteration','Remove the addition entirely','Initialising once gives a known starting value without erasing earlier additions.'],
 ['A search reports "not found" after checking only the first non-matching item. What is wrong?','It reports failure before checking the remaining items','It should never compare the target with items','It should sort characters by colour','Failure can be reported only when the required search has finished without a match.']],
'7.9':[
 ['An algorithm should accept a positive count only. Which precise condition rejects zero and negative values?','Count <= 0','Count > 0','Count = 1 only','Values at or below zero must be rejected when only positive counts are allowed.'],
 ['Which flowchart shape is normally used to choose between paths after testing a condition?','Diamond','Input/output parallelogram','Start/end terminator','A decision diamond represents a condition with alternative paths.'],
 ['A running total is meant to include each entered cost. Which statement does this?','Total ← Total + Cost','Total ← Cost','Cost ← Total','Adding Cost to the existing Total preserves and extends the accumulated sum.']],
'8.1.1':[
 ['A program stores a score that changes during a game. Which is appropriate?','A variable','A constant for that changing score','A comment only','A variable can hold a value that changes while the program runs.'],
 ['The maximum class size is fixed for a program’s run. Why use a named constant?','It gives the fixed value a clear name and one place to define it','It allows the value to change after every input','It removes the need to write any comparisons','A constant records a value that should not change during execution.'],
 ['After X ← 4 followed by X ← 9, what does X contain?','9','4 and 9 simultaneously','13','Assignment replaces the value currently held by X.']],
'8.1.2':[
 ['A program stores whether a door is open, using TRUE or FALSE. Which data type fits?','Boolean','Real','Character','A Boolean has two logical values: TRUE and FALSE.'],
 ['A price may be 7.25. Which data type can store the fractional value?','Real','Integer','Boolean','A real data type can represent numbers with a fractional part.'],
 ['A registration code begins with 0 and may contain letters. Which type is suitable?','String','Integer','Boolean','A string preserves the code’s characters, including leading zeros.']],
'8.1.3':[
 ['A statement asks the user to type a name and stores it. Which operation is this?','Input','Output only','A constant declaration only','Input brings a value into the program from a source such as the user.'],
 ['Why should a program show a prompt before asking for a value?','So the user knows what to enter','So the value automatically passes every check','So the input becomes encrypted without any other work','A useful prompt explains the expected input. Validation is a separate step.'],
 ['A program displays Total after calculating it. Which operation is this?','Output','Input','Assignment from the keyboard','Output communicates a result from the program.']],
'8.1.4':[
 ['A loop adds each mark to Total. Which operation counts the number of marks separately?','Count ← Count + 1','Count ← Count + Mark','Count ← Mark','Counting increases by one per item; totalling adds each item’s value.'],
 ['An IF statement chooses whether a discount applies. Which control structure is this?','Selection','Iteration only','An array declaration','Selection chooses a path according to a condition.'],
 ['A program joins "Blue" and "bird" to make "Bluebird". Which string operation is this?','Concatenation','Integer division','Logical NOT','Concatenation joins strings end to end.']],
'8.1.5':[
 ['A loop runs three times, and inside it another loop runs twice each time. How often does the inner body run?','Six times','Five times','Twice','The two inner iterations happen for each of the three outer iterations: 3 × 2.'],
 ['An IF statement is inside another IF statement. When is the inner condition tested?','When execution reaches it through the outer condition','Always, even if the outer branch is skipped','Only when the program has no input','Nested statements follow the outer statement’s control flow.'],
 ['Why must inner and outer loops use suitable separate counters?','Changing the wrong counter can disrupt the other loop','Two loops are forbidden from using variables','Separate counters make the loops infinite automatically','Each loop needs its own correctly managed position or count.']],
'8.1.6':[
 ['A routine calculates and returns a discounted price. Which kind of routine fits?','Function','A comment','An input prompt alone','A function returns a value to the part of the program that called it.'],
 ['A value is supplied to a routine when it is called. What does the routine’s parameter provide?','A named way for the routine to use that supplied value','A guarantee that the value is correct','A copy of the entire operating system','Parameters let a reusable routine work with values passed into it.'],
 ['A variable is declared inside a routine and is accessible only there. What is its scope?','Local','Global','Permanent file storage','A local variable belongs to the routine’s own scope.']],
'8.1.7':[
 ['A program uses a supplied ROUND routine instead of writing its own rounding code. What is the benefit?','It reuses an available routine for a common operation','It removes the need to know the arguments','It guarantees the whole program has no bugs','Library routines provide ready-made operations, but must still be called correctly.'],
 ['What does integer division DIV return for positive operands?','The whole-number quotient','Only the remainder','Always a fractional answer','DIV gives the integer quotient; MOD gives the remainder.'],
 ['A game needs a value that varies unpredictably between runs. Which library routine is appropriate?','RANDOM','ROUND alone','A fixed constant alone','RANDOM generates a pseudo-random value that can be used when variation is required.']],
'8.1.8':[
 ['Which identifier best explains a variable holding the number of absent students?','AbsentCount','X1','Thing','A meaningful identifier makes the variable’s purpose easier to understand.'],
 ['A complex calculation uses an unusual rule. What kind of comment is most helpful?','One explaining why that rule is needed','One repeating that the next line is a line','One containing an unrelated joke','Useful comments explain purpose or reasoning that the code alone may not make clear.'],
 ['The same task is copied into many places in a program. What can improve maintenance?','Move it into a reusable routine','Make every copy longer','Remove every identifier','A reusable routine lets a change be made in one place rather than many copies.']],
'8.2.1':[
 ['Scores is declared with indexes 1 to 5. Which index refers to its final element?','5','4','6','The declared bounds say which indexes are valid; the final one here is five.'],
 ['A grid stores three rows and four columns. What does one pair of indexes identify?','One cell at a row and column','The entire file name','Only the first row every time','A two-dimensional array uses two indexes to locate an element.'],
 ['A program uses a variable I as the index in Scores[I]. Why is this useful?','It can access different elements as I changes','It changes every element’s data type','It removes the array’s bounds','A variable index allows a program to choose or iterate over array positions.']],
'8.2.2':[
 ['Why use an array for the temperatures measured each day of a month?','It groups related values under one indexed name','It forces every day to have the same temperature','It makes storage unnecessary','An array keeps related values together and supports processing them with loops.'],
 ['A class stores 30 marks in an array. What is an advantage over 30 unrelated variable names?','A loop can process the marks using indexes','Every mark is automatically correct','The array sorts itself without code','Indexed values are convenient for repeated operations such as totalling or searching.'],
 ['Which data naturally suit a two-dimensional array?','Seats arranged by row and seat number','A single Boolean answer','One fixed discount rate','Two indexes match the row-and-column structure of the seating plan.']],
'8.2.3':[
 ['A loop reads A[1] through A[6]. What upper limit includes all six elements?','6','5','7 if A ends at 6','The loop should stop at the last valid index, six.'],
 ['A grid has rows 1 to 3 and columns 1 to 4. Which approach visits every cell?','An outer row loop and an inner column loop','A loop that visits only column 1','A loop that changes neither index','Nested iteration lets each row be combined with each column.'],
 ['A loop should store each new input in the next array element. Which statement uses the changing position?','INPUT Values[I]','INPUT Values[1] every time','OUTPUT Values[I] only','Using I as the index lets each iteration store its value in the intended element.']],
'8.3.1':[
 ['A game must remember a high score after the program closes. What is needed?','Save the score in a file','Keep it only in a local variable','Show it on screen once','A file on secondary storage can preserve data between runs.'],
 ['A program reads saved settings at startup. Why were those settings stored in a file?','So a later run can recover them','So the program never needs RAM','So users cannot ever change them','Files provide persistent data that programs can read again.'],
 ['Why is displaying a result not the same as saving it?','Display output alone does not provide a persistent stored copy','A displayed number cannot be real data','A saved file is always visible on screen','Output shows information; writing a file stores it for future use.']],
'8.3.2':[
 ['A program needs to read an existing text file. What should it do before reading?','Open the file for reading','Open it for writing and erase its contents','Close the file first and leave it closed','The correct file and access mode must be opened before data can be read.'],
 ['Why should a program close a file when it has finished writing?','To finish file operations and release the file resource','To remove every record from the file','To guarantee the file never changes again','Closing finishes the file operation and releases resources used for it.'],
 ['A program writes one line of text to a file. Where should a later READFILE get that line from?','The saved file opened for reading','A comment that mentions the file','The CPU clock register','READFILE reads stored data from the file, not from comments or unrelated hardware.']],
'9.1':[
 ['A table stores one pupil per row. What does each row represent?','A record','A field name only','The whole database program','A record groups the field values for one item, here one pupil.'],
 ['A school table has Name, Class and DateOfBirth columns. What are these columns?','Fields','Three separate operating systems','Three network packets','Each field describes one attribute stored for every record.'],
 ['A field stores a percentage from 0 to 100. What helps reject 150 at entry?','A suitable validation rule','Only a wider column on screen','Changing every value to text','A range validation rule can reject values outside 0 to 100.']],
'9.2':[
 ['A database stores a postcode that may contain letters and leading zeros. Which field type is suitable?','Text/alphanumeric','Integer','Boolean','A postcode is a code, not a value to calculate with; text preserves its characters.'],
 ['A field stores whether a library book is on loan. Which type suits a yes/no value?','Boolean','Real','Date/time','A Boolean field stores one of two logical states.'],
 ['A clinic must sort appointments by their actual date and time. Which type is suitable?','Date/time','Boolean','An integer containing only the day number','A date/time field stores the full temporal value for comparisons and sorting.']],
'9.3':[
 ['Two pupils share the same name. Why is Name unsuitable as their primary key?','It does not uniquely identify each pupil','It contains letters','It is too easy to read','A primary key must distinguish every record; names can repeat.'],
 ['A club assigns a different MemberID to every member. Why can it be a primary key?','Each ID uniquely identifies one member record','It must always contain the member’s age','It automatically encrypts the table','A unique, non-empty identifier is suitable for locating an individual record.'],
 ['What should happen if a new record repeats an existing primary-key value?','It should be rejected as a duplicate key','Both records should silently share the same identity','The key should be ignored','Primary-key values must remain unique across the table.']],
'9.4':[
 ['Which SQL clause chooses the table to query?','FROM','ORDER BY','WHERE','FROM identifies the source table.'],
 ['A query needs pupils with Age >= 14 and Class = "B". Which operator requires both conditions?','AND','OR','SUM','AND is true only when both required conditions hold.'],
 ['A query sorts Score with ORDER BY Score DESC. Which scores appear first?','The highest scores','The lowest scores','Only scores equal to zero','Descending order places larger values before smaller ones.']],
'10.1':[
 ['A gate symbol has a small inversion circle at its output. What does that circle indicate?','The output is inverted','The input is always 1','The wire is disconnected','An inversion circle means NOT is applied at that point.'],
 ['A triangle followed by a small output circle represents which single-input gate?','NOT','AND','OR','The standard NOT symbol is a triangle with an inversion circle.'],
 ['An AND gate symbol gains an inversion circle on its output. Which gate does it become?','NAND','NOR','XOR','NAND is the inverse of AND, shown by the output inversion circle.']],
'10.2':[
 ['An XOR gate receives two equal inputs. What output does it give?','0','1','It has no defined output','XOR outputs one only when its two inputs differ.'],
 ['Both inputs to a NOR gate are 0. What output does it give?','1','0','The output must alternate','OR would output zero, so NOR inverts that result to one.'],
 ['A NAND gate outputs 0. What must its two inputs be?','Both 1','Both 0','One 0 and one 1','AND is one only with two ones; NAND inverts that result to zero.']],
'10.3':[
 ['A lamp turns on only when switch A and switch B are both on. Which expression matches?','A AND B','A OR B','NOT A','AND requires both conditions to be true.'],
 ['An alarm sounds when a door is open and the system is armed. Which circuit matches?','An AND gate receiving DoorOpen and Armed','An OR gate receiving DoorOpen and Armed','A NOT gate receiving Armed alone','The alarm needs both inputs, so AND matches the requirement.'],
 ['For three independent binary inputs, how many rows are needed in a complete truth table?','8','3','6','Each input has two states, giving 2 × 2 × 2 = 8 combinations.']],
};

export const expandedQuestions:Question[]=Object.entries(scenarios).flatMap(([objective,rows])=>rows.map(([prompt,answer,wrong1,wrong2,model],i)=>{
 const options=[answer,wrong1,wrong2];
 const offset=(i+objective.replaceAll('.','').split('').reduce((n,c)=>n+Number(c),0))%3;
 return {id:`extra-scenario-${objective}-${i+1}`,objective,difficulty:i+1,type:'choice',prompt,answer,options:[...options.slice(offset),...options.slice(0,offset)],marks:1,model,error:'Review the explanation and try another example.'};
}));

function calculation(objective:string,series:string,index:number,difficulty:number,prompt:string,answer:string|number,model:string){
 expandedQuestions.push({id:`extra-calc-${objective}-${series}-${index+1}`,objective,difficulty,type:'numeric',prompt,answer:String(answer),marks:1,model,error:'Follow the worked calculation, then try another set of values.'});
}
const bits=(n:number,width=8)=>n.toString(2).padStart(width,'0');
const hex=(n:number)=>n.toString(16).toUpperCase();

// These finite, published sets are reproducible. They do not create new IDs at runtime.
// Conversion values remain positive and within the syllabus's sixteen-bit limit.
for(const [i,n] of [19,46,83,157,218,347,2053,49164].entries()){
 const width=n>255?16:8, pattern=bits(n,width);
 const weights=[...pattern].flatMap((digit,j)=>digit==='1'?[2**(width-j-1)]:[]);
 calculation('1.1.2','binary-denary',i,2,`Read binary ${pattern} as an unsigned number. What is its denary value?`,n,`Use only the columns containing 1: ${weights.join(' + ')} = ${n}.`);
 calculation('1.1.2','denary-hex',i,3,`Convert denary ${n} to hexadecimal. Do not include a base label.`,hex(n),`${pattern.match(/.{4}/g)!.join(' | ')} gives ${hex(n).padStart(width/4,'0').split('').join(' | ')}. Leaving out any leading zero, the hexadecimal value is ${hex(n)}.`);
 calculation('1.1.2','hex-binary',i,3,`Write hexadecimal ${hex(n)} in binary. Give exactly 16 bits.`,bits(n,16),`Pad the hex value to four digits: ${hex(n).padStart(4,'0')}. Each digit gives four bits: ${bits(n,16).match(/.{4}/g)!.join(' | ')}.`);
}
for(let i=0;i<16;i++){
 const a=17+i*13,b=9+i*11,sum=a+b;
 calculation('1.1.4','stored-sum',i,sum>255?4:2,`An unsigned eight-bit register adds ${bits(a)} and ${bits(b)}. Give exactly 8 bits stored after the addition, discarding any ninth bit.`,bits(sum&255),`${a} + ${b} = ${sum}. ${sum>255?`The full result needs nine bits, so overflow occurs. Discard the extra 256: ${sum} − 256 = ${sum-256}.`:'The sum fits, so there is no overflow.'} The stored result is ${bits(sum&255)}.`);
 const value=23+i*13,places=1+i%3,left=i%2===0,result=left?(value<<places)&255:value>>places;
 calculation('1.1.5','shift',i,3,`Logically shift ${bits(value)} ${left?'left':'right'} by ${places} ${places===1?'place':'places'} in an eight-bit register. Give exactly 8 bits.`,bits(result),`Move every bit ${places} ${places===1?'place':'places'} ${left?'left':'right'}, fill the ${left?'right':'left'} with zeros and discard bits past the other end. ${bits(value)} becomes ${bits(result)} (${result} in denary).`);
 const signed=i%2?i*5+6:-(i*7+3),encoded=bits(signed&255),encode=i%4<2;
 calculation('1.1.6',encode?'encode':'decode',i,3,encode?`Represent ${signed<0?'−'+(-signed):'+'+signed} in eight-bit two’s complement. Give exactly 8 bits.`:`The eight-bit two’s complement pattern is ${encoded}. What signed denary value does it represent?`,encode?encoded:signed,signed<0?`Write +${-signed}: ${bits(-signed)}. Invert: ${bits((~(-signed))&255)}. Add 1: ${encoded}. This represents ${signed}.`:`The leftmost bit is 0. ${encoded} is ordinary positive binary for ${signed}.`);
 const start=i+2,repeats=i%4+2,step=i%3+2,trace=Array.from({length:repeats+1},(_,j)=>start+j*step);
 calculation('7.7','accumulator-trace',i,2,`Dry-run these steps: X ← ${start}; then repeat X ← X + ${step} exactly ${repeats} times. What is X at the end?`,trace.at(-1)!,`Record X after each assignment: ${trace.join(' → ')}. The starting assignment is not one of the ${repeats} repetitions.`);
 const A=(i>>2)&1,B=(i>>1)&1,C=i&1,second=i>=8,first=second?Number(!(A||B)):Number(A&&B),output=second?Number(first&&C):Number(first||C);
 calculation('10.3','combined-gates',i,3,`Inputs are A = ${A}, B = ${B}, C = ${C}. Find the output of ${second?'(NOT (A OR B)) AND C':'(A AND B) OR C'}. Give 0 or 1.`,output,second?`A OR B = ${Number(Boolean(A||B))}; NOT gives ${first}. Then ${first} AND ${C} = ${output}.`:`A AND B = ${first}. Then ${first} OR ${C} = ${output}.`);
}

const conversions:[number,string,string,number][]=[
 [3,'KiB','bytes',1024],[7,'KiB','bytes',1024],[5,'MiB','KiB',1024],[9,'GiB','MiB',1024],
 [4,'TiB','GiB',1024],[6,'PiB','TiB',1024],[2,'EiB','PiB',1024],[3,'MiB','bytes',1024**2],
 [512,'bytes','KiB',1/1024],[1536,'bytes','KiB',1/1024],[2560,'KiB','MiB',1/1024],[4608,'MiB','GiB',1/1024],
 [20480,'bits','bytes',1/8],[49152,'bits','KiB',1/8/1024],[6,'bytes','bits',8],[9,'nibbles','bits',4],
];
conversions.forEach(([value,from,to,factor],i)=>{
 const stages=from==='bits'&&to==='KiB'?`${value} ÷ 8 = ${value/8} bytes; ${value/8} ÷ 1024 = ${value*factor} KiB`:`${value} ${factor<1?'÷ '+1/factor:'× '+factor} = ${value*factor} ${to}`;
 const rule=from==='nibbles'?'One nibble has four bits. ':from==='bits'||to==='bits'?'One byte has eight bits. ':'Each step between binary storage units has a factor of 1024. ';
 calculation('1.3.1','unit-conversion',i,i<8?2:3,`Convert ${value} ${from} to ${to}. Use binary storage units where needed. Give the number only.`,value*factor,`${rule}${stages}.`);
});

const images:[number,number,number,'bytes'|'KiB'|'MiB'][]=[
 [32,64,4,'bytes'],[48,32,8,'bytes'],[128,96,4,'KiB'],[256,128,16,'KiB'],
 [512,256,8,'KiB'],[512,512,24,'MiB'],[1024,128,16,'MiB'],[1024,1024,4,'MiB'],
];
images.forEach(([width,height,depth,unit],i)=>{
 const raw=width*height*depth,bytes=raw/8,divisor=unit==='bytes'?1:unit==='KiB'?1024:1024**2;
 calculation('1.3.2','bitmap-size',i,3,`A bitmap is ${width} × ${height} pixels with ${depth} bits per pixel. Ignoring headers and compression, find its size in ${unit}. Give the number only.`,bytes/divisor,`${width} × ${height} = ${width*height} pixels. Multiply by ${depth}: ${raw} bits. Divide by 8: ${bytes} bytes.${divisor>1?` Divide by ${divisor}: ${bytes/divisor} ${unit}.`:''}`);
});
const sounds:[number,number,number,'seconds'|'minutes','bytes'|'KiB'|'MiB'][]=[
 [1024,8,3,'seconds','bytes'],[2048,16,7,'seconds','KiB'],[4096,8,11,'seconds','KiB'],[8192,16,15,'seconds','KiB'],
 [2048,8,1,'minutes','KiB'],[4096,16,2,'minutes','MiB'],[8192,8,3,'minutes','MiB'],[1024,16,5,'minutes','KiB'],
];
sounds.forEach(([rate,resolution,duration,timeUnit,unit],i)=>{
 const seconds=timeUnit==='minutes'?duration*60:duration,raw=rate*resolution*seconds,bytes=raw/8,divisor=unit==='bytes'?1:unit==='KiB'?1024:1024**2;
 calculation('1.3.2','audio-size',i,3,`A mono recording lasts ${duration} ${timeUnit}. It uses ${rate} samples per second and ${resolution} bits per sample. Ignoring headers and compression, find its size in ${unit}. Give the number only.`,bytes/divisor,`${timeUnit==='minutes'?`${duration} minutes = ${seconds} seconds. `:''}${rate} × ${resolution} × ${seconds} = ${raw} bits. Divide by 8: ${bytes} bytes.${divisor>1?` Divide by ${divisor}: ${bytes/divisor} ${unit}.`:''}`);
});
for(let i=0;i<8;i++){
 const prices=[i+3,i+7,i+11,i+15],limit=i+9,matched=prices.filter(n=>n>=limit),sum=i%2===0,result=sum?matched.reduce((a,b)=>a+b,0):matched.length;
 calculation('9.4',sum?'sql-sum':'sql-count',i,3,`Items has four records with Price values ${prices.join(', ')} and no empty values. What number does SELECT ${sum?'SUM(Price)':'COUNT(*)'} FROM Items WHERE Price >= ${limit} return?`,result,`The matching prices are ${matched.join(' and ')}. ${sum?`SUM adds them: ${matched.join(' + ')} = ${result}.`:`COUNT counts matching records: ${result}.`}`);
}
for(let i=0;i<12;i++){
 const values=[i+4,i+7,i+10,i+13],sum=i<6;
 calculation('8.2.3',sum?'array-total':'array-update',i,2,sum?`Values[1..4] contains ${values.join(', ')}. Total starts at 0. A loop runs I from 1 to 4, adding Values[I] to Total each time. What is the final Total?`:`Values[1..4] contains ${values.join(', ')}. Execute Values[3] ← Values[1] + Values[4]. What value is now in Values[3]?`,sum?values.reduce((a,b)=>a+b,0):values[0]+values[3],sum?`Visit all four indexes: ${values.join(' + ')} = ${values.reduce((a,b)=>a+b,0)}.`:`Index 1 holds ${values[0]} and index 4 holds ${values[3]}. Replace index 3 with ${values[0]} + ${values[3]} = ${values[0]+values[3]}; the other elements stay unchanged.`);
}
