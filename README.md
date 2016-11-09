# Barbot

<img src="https://raw.githubusercontent.com/sidlauskaslukas/barbot/master/resources/barbot.jpg" alt="Barbot">

Barbot is a cocktail mixing robot controlled with the hybrid mobile app via Bluetooth.

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
* Install Ionic CLI globally `npm install -g ionic@2.0.0-beta.32`
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