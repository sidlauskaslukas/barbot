#include <AccelStepper.h>
#include <PololuMaestro.h>

#define maestroSerial SERIAL_PORT_HARDWARE_OPEN

//const byte enablePin = 6; // Stepper driver enable pin
const byte stepPin = 3; // Stepper driver step pin
const byte dirPin = 4; // Stepper driver dir pin
const byte endStopPin = 5; // Endstop pin

const int maxPosition = -4995; // TODO: invert
const int numberOfIngredients = 30; // Number of ingredients

String serialBuffer = "";

String ingredients[numberOfIngredients];

int counter = 0;
int lastIndex = 0;

AccelStepper stepper(1, stepPin, dirPin); // Define a stepper and the pins it will use
MicroMaestro maestro(maestroSerial); // Define a servo controller

void setup() {
  Serial.begin(9600);
  maestroSerial.begin(9600); // Servo controller
  Serial2.begin(9600); // Bluetooth module
  stepper.setMaxSpeed(500);
  //stepper.setAcceleration(20); // Turned off because stepper motor skipping steps
  //stepper.setEnablePin(enablePin); // Doesn't work for unknown reason
  //stepper.enableOutputs();
  pinMode(endStopPin, INPUT_PULLUP); // Initialize endstop pin with the internal pull-up resistor enabled
  homeXAxis(); // Return the machine's home position for the X axis
}

void homeXAxis() {
  int endStopState = digitalRead(endStopPin);
  
  while (endStopState == HIGH) {
    stepper.moveTo(100);
    stepper.setSpeed(500);
    stepper.runSpeed();
    endStopState = digitalRead(endStopPin);
  }

  stepper.moveTo(stepper.currentPosition() - 50);
  while (stepper.distanceToGo() != 0) {
    stepper.setSpeed(-150);
    stepper.runSpeed();
  }

  endStopState = digitalRead(endStopPin);

  while (endStopState == HIGH) {
    stepper.moveTo(1000);
    stepper.setSpeed(150);
    stepper.runSpeed();
    endStopState = digitalRead(endStopPin);
  }
  stepper.setCurrentPosition(0);
}

void loop() {

  while(Serial2.available() > 0) {
    char ch = Serial2.read();
    serialBuffer += ch;
    if (ch == '\n') {
      
      //Serial.print(serialBuffer);
      
      for(int i=0; i<serialBuffer.length(); i++) {
        if(serialBuffer.substring(i, i+1) == ",") {
          ingredients[counter] = serialBuffer.substring(lastIndex, i);
          lastIndex = i + 1;
          counter++;
        }

        if(i == serialBuffer.length() - 1) {
          ingredients[counter] = serialBuffer.substring(lastIndex, i);
        }
      }

      for(int z=0; z<numberOfIngredients; z++) {
        Serial.println(ingredients[z]);
        if(ingredients[z] != "0") {
          parseInput(ingredients[z]);
        }
      }

      for(int y=0; y<numberOfIngredients; y++) {
        ingredients[y] = "0";
      }
      
      serialBuffer = "";
      counter = 0;
      lastIndex = 0;      
    }
  }
  
}

void parseInput(String input) {
  input.trim();
  byte command = input.charAt(0);

  switch(command) {
    case 'H':
      homeXAxis();
      break;
    case 'X':
      moveXTo(input);
      break;
    case 'F':
      pour(input);
      break;
  }
}

void moveXTo(String input) {
  int pos = input.substring(1).toInt();

  Serial.print("X goes to: ");
  Serial.println(pos);
  
  if(pos < 0 && pos >= maxPosition) {
    stepper.moveTo(pos);
    while(stepper.distanceToGo() != 0) {
      if(pos < stepper.currentPosition()) {
        stepper.setSpeed(-500);
      } else {
        stepper.setSpeed(500);
      }
      stepper.runSpeed(); 
    }
  } else {
    Serial.println("Position should be between -4995 and 0");
  }
}

void pour(String input) {
  int times = input.substring(1).toInt();
  int count = 0;

  for(int i=0; i<times; i++) { 
    maestro.setTarget(0, 8000);
    delay(2200);
    maestro.setTarget(0, 4684);
    if(times - 1 > count) {
      delay(3000);
    } else {
      delay(400);
    }
    count++;
  }
}

