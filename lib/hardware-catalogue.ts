export type Device={name:string,need:string,steps:[string,string,string],example:string};
export const inputDevices:Device[]=[
 {name:'Keyboard',need:'Enter letters, numbers and commands.',steps:['Press a key','Its switch identifies the key','Send the key code to the computer'],example:'Type a paragraph for a school report.'},
 {name:'Optical mouse',need:'Point, select and move objects on a screen.',steps:['Light shines on the surface','A sensor takes images and compares changes','Send the direction and distance moved'],example:'Move a pointer to select a drawing tool.'},
 {name:'Microphone',need:'Capture sound.',steps:['Sound waves make a part vibrate','The vibration changes an electrical signal','Convert the signal to digital sound data'],example:'Record speech for a language lesson.'},
 {name:'Digital camera',need:'Capture a photograph or video.',steps:['A lens focuses light','A light-sensitive sensor measures it','Store the measurements as digital image data'],example:'Take a picture for a school website.'},
 {name:'Barcode scanner',need:'Read the number encoded in a printed barcode.',steps:['Shine light across bars and spaces','A sensor detects different reflections','Decode the pattern and send its number'],example:'Find a product record and price at a checkout. The barcode identifies the product; the price comes from the database.'},
 {name:'QR code scanner',need:'Read data from a two-dimensional square code.',steps:['A camera captures the square pattern','Software locates and reads its light and dark areas','Decode the stored data'],example:'Read a website address from a poster.'},
 {name:'Resistive touch screen',need:'Enter a position by pressing the screen.',steps:['Press two flexible conducting layers together','The contact changes the measured voltage','Calculate and send the touch position'],example:'Use a stylus or gloved finger on a suitable screen.'},
 {name:'Capacitive touch screen',need:'Enter a position using a conducting touch.',steps:['A finger touches the screen','Its effect changes the electrical capacitance','Calculate and send the touch position'],example:'Tap a phone screen. Ordinary non-conducting gloves may not work.'},
 {name:'Infra-red touch screen',need:'Detect a touch using a grid of light beams.',steps:['Infra-red beams cross the screen','A finger interrupts some beams','Find the position where beams were interrupted'],example:'Select an option on a large public display.'},
 {name:'2D scanner',need:'Make a flat digital copy of a document or photograph.',steps:['Move a light across the page','Sensors measure the reflected light','Build a digital image of the page'],example:'Scan a paper drawing into a computer.'},
 {name:'3D scanner',need:'Capture the shape of an object.',steps:['Scan the object from different positions','Measure points on its surface, often using reflected light','Combine the points into a digital 3D model'],example:'Capture the shape of a part so it can be measured on screen.'}
];
export const outputDevices:Device[]=[
 {name:'Actuator',need:'Turn a computer signal into a physical action.',steps:['Receive a control signal','Operate a motor, valve or other mechanism','Move something or change a physical condition'],example:'A computer opens a valve to water plants.'},
 {name:'DLP projector',need:'Project an image using tiny moving mirrors.',steps:['A light source shines onto a chip of tiny mirrors','Mirrors tilt to direct light towards or away from the lens; colours are combined','A lens projects the image'],example:'Show a presentation on a classroom wall.'},
 {name:'LCD projector',need:'Project an image using liquid crystal panels.',steps:['Light passes through liquid crystal panels','The panels control how much red, green and blue light passes','Combine the light and project it through a lens'],example:'Display a lesson to a large class.'},
 {name:'LCD screen',need:'Display changing images and text.',steps:['A backlight supplies light','Liquid crystals control light through coloured subpixels','The subpixels form the screen image'],example:'A laptop screen displays a document.'},
 {name:'LED screen',need:'Display images using light-emitting diodes.',steps:['Send signals to the display','LEDs produce the required light','Coloured light forms the image'],example:'Large LED displays can use red, green and blue LEDs as pixels. Many screens sold as “LED monitors” are LCD panels with an LED backlight.'},
 {name:'Inkjet printer',need:'Produce a paper copy using drops of liquid ink.',steps:['Move the print head across the paper','Nozzles spray tiny drops of ink in the required positions','Feed the paper through to build the image'],example:'Print a colour photograph at home.'},
 {name:'Laser printer',need:'Produce a paper copy using toner powder.',steps:['A laser forms an electrical charge pattern on a drum','Toner sticks to the pattern and transfers to paper','Heated rollers fuse the toner to the paper'],example:'Print many text documents in a school office.'},
 {name:'Speaker',need:'Produce sound from computer data.',steps:['Convert digital sound data into a changing electrical signal','The signal drives a coil and cone','The vibrating cone moves air to create sound waves'],example:'Play the sound in a video.'},
 {name:'3D printer',need:'Build a physical object from a digital model.',steps:['Software divides the model into thin layers','The printer deposits or sets material for one layer','Repeat the layers to build the object'],example:'Make a prototype of a new product.'}
];
export const sensors=[
 {name:'Acoustic',quantity:'Sound level',unit:'dB',example:'Check whether noise in a factory is too loud.'},
 {name:'Accelerometer',quantity:'Acceleration',unit:'m/s²',example:'Detect a sudden change in motion in a car.'},
 {name:'Flow',quantity:'Rate of fluid flow',unit:'L/min',example:'Measure how quickly water passes through a pipe.'},
 {name:'Gas',quantity:'Gas concentration',unit:'ppm',example:'Detect a harmful gas in a room.'},
 {name:'Humidity',quantity:'Water vapour in the air',unit:'% relative humidity',example:'Monitor damp air in a greenhouse.'},
 {name:'Infra-red',quantity:'Infra-red radiation',unit:'detected / not detected',example:'Detect a warm person moving past a security sensor.'},
 {name:'Level',quantity:'Height of liquid or material',unit:'cm',example:'Check how full a water tank is.'},
 {name:'Light',quantity:'Light intensity',unit:'lux',example:'Switch street lights on when it gets dark.'},
 {name:'Magnetic field',quantity:'Magnetic field strength or presence',unit:'detected / not detected',example:'Detect whether a magnet on a door is close to its frame.'},
 {name:'Moisture',quantity:'Water content of a material',unit:'% water content',example:'Check whether soil needs watering.'},
 {name:'pH',quantity:'How acidic or alkaline a solution is',unit:'pH',example:'Monitor the acidity of water in a fish tank.'},
 {name:'Pressure',quantity:'Force per unit area',unit:'kPa',example:'Monitor air pressure inside a tyre.'},
 {name:'Proximity',quantity:'How near an object is',unit:'cm / detected',example:'Detect a car close to a parking barrier.'},
 {name:'Temperature',quantity:'How hot or cold something is',unit:'°C',example:'Check the temperature inside a fridge.'}
];
