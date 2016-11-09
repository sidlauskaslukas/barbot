#include "AccelStepper.h"
#include "PololuMaestro.h"
#include "Configuration.h"

const int numberOfIngredients = 30; // Number of ingredients

String serialBuffer = "";
String ingredients[numberOfIngredients];

int counter = 0;
int lastIndex = 0;

AccelStepper stepper(1, X_STEP_PIN, X_DIR_PIN); // Define a stepper and the pins it will use
MicroMaestro maestro(maestroSerial); // Define a servo controller

void setup() {
  Serial.begin(9600); // Serial port for debugging
  maestroSerial.begin(9600); // Servo controller
  Serial2.begin(9600); // Bluetooth module
  stepper.setMaxSpeed(X_MAX_SPEED);
  pinMode(X_ENDSTOP_PIN, INPUT_PULLUP); // Initialize endstop pin with the internal pull-up resistor enabled
  homeXAxis(); // Return the machine's home position for the X axis
}

void homeXAxis() {
  int endStopState = digitalRead(X_ENDSTOP_PIN);
  
  while (endStopState == HIGH) {
    stepper.moveTo(100);
    stepper.setSpeed(X_SPEED);
    stepper.runSpeed();
    endStopState = digitalRead(X_ENDSTOP_PIN);
  }

  stepper.moveTo(stepper.currentPosition() - 50);
  while (stepper.distanceToGo() != 0) {
    stepper.setSpeed(X_HOME_SPEED * -1);
    stepper.runSpeed();
  }

  endStopState = digitalRead(X_ENDSTOP_PIN);

  while (endStopState == HIGH) {
    stepper.moveTo(1000);
    stepper.setSpeed(X_HOME_SPEED);
    stepper.runSpeed();
    endStopState = digitalRead(X_ENDSTOP_PIN);
  }
  stepper.setCurrentPosition(0);
}

void loop() {

  while(Serial2.available() > 0) {
    char ch = Serial2.read();
    serialBuffer += ch;
    if (ch == '\n') {
      
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

  if(pos < 0 && pos >= X_MAX_POS) {
    stepper.setAcceleration(X_ACCELERATION);
    stepper.moveTo(pos);
      if(pos < stepper.currentPosition()) {
        stepper.setSpeed(-100);
      } else {
        stepper.setSpeed(100);
      }
    while(stepper.distanceToGo() != 0) {
      stepper.run(); 
    }
  } else {
    Serial.println("Position should be between -4995 and 0");
  }
}

void pour(String input) {
  int count = 0; // pour counter
  int times = 0; // times to pour
  int holdDuration = 0; // time duration to hold dispenser in open position
  int waitDuration = 0; // time duration to wait till next pour
  
  for(int z=0; z<input.length(); z++) {
    byte parameter = input.substring(z, z+1).charAt(0);

    switch(parameter) {
      case 'F':
        times = getParameterValue(input, z);
        break;
      case 'H':
        holdDuration = getParameterValue(input, z);
        break;
      case 'W':
        waitDuration = getParameterValue(input, z);
        break;
    }
  }

  if(holdDuration > 0 && waitDuration > 0) {
    for(int i=0; i<times; i++) {
      maestro.setSpeed(0, SERVO_RAISE_SPEED);
      maestro.setTarget(0, SERVO_MAX_POS);
      delay(holdDuration);
      maestro.setSpeed(0, SERVO_RELEASE_SPEED);
      maestro.setTarget(0, SERVO_MIN_POS);
      if(times - 1 > count) {
        delay(waitDuration);
      } else {
        delay(600);
      }
      count++;
    }
  } else {
    Serial.println("Hold and wait duration parameters cannot be lower than or equal to 0");
  }
}

int getParameterValue(String input, int z) {
  for(int y=z+1; y<input.length(); y++) {
    if(input.substring(y, y+1) == " ") {
      return input.substring(z+1, y).toInt();
      break;
    }
    if(y == input.length() - 1) {
      return input.substring(z+1, y+1).toInt();
    }
  }
}
