# Barbot

<img src="https://raw.githubusercontent.com/sidlauskaslukas/barbot/master/resources/barbot.jpg" alt="Barbot">

Barbot is an open source Arduino cocktail mixing robot controlled with the hybrid mobile app via Bluetooth. You can check how it works [here](https://youtu.be/1JVnOlu0Daw).

## Getting started

### Requirements
* Node.js
* Npm (Node comes with npm)
* Android SDK tools [ [installing Cordova requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#installing-the-requirements) ] or Xcode depending on which platform you want to use
* Arduino IDE

### Client
* Clone this repository
* From the client directory, run `npm install`
* Install Cordova globally `npm install -g cordova`
* Install Ionic CLI globally `npm install -g ionic`
* Run `ionic serve` in a terminal from the `client` directory
* At this point, Ionic CLI should open the app in your browser

### Barbot
* Clone this repository
* Start the Arduino IDE and open the `Barbot.ino`
* In Arduino IDE, select your board from the `Tools -> Board` menu (right now we're not supporting other boards than Arduino Mega)
* Select the serial port to which Arduino is connected from the `Tools -> Serial Port` menu
* Click the Verify button to see that the code is ok
* Click the Upload button
* If all goes well, that's it

## Required parts
* NEMA 17 stepper motor
* Pololu A4988 stepper driver
* Hitec HS-7955TG servo motor
* Pololu Micro Maestro 6-Channel servo controller
* Bluetooth module HC-05
* GT2 6mm wide timing belt
* GT2 timing pulley 20 teeth 5mm bore
* Timing belt bearing
* 2 x Chrome plated round rail 1200mm x 12mm
* 4 x SK12 12mm bore linear rail shaft support
* 4 x SC12UU aluminium pillow block housing
* 9 x 40ml Beaumont Metrix SL spirit measure
* 3 x Wall 3 bottle rack
* Endstop microswitch
* Arduino Mega 2560
* DC-DC converter (12V to 5V)
* AC power supply 12V (6.67A)
