#ifndef CONFIGURATION_H
#define CONFIGURATION_H

#define maestroSerial SERIAL_PORT_HARDWARE_OPEN

// Pins
#define X_STEP_PIN 3 // Stepper driver step pin
#define X_DIR_PIN 4 // Stepper driver dir pin
#define X_ENDSTOP_PIN 5 // Endstop pin

#define X_HOME_SPEED 150
#define X_SPEED 700
#define X_MAX_SPEED 1500
#define X_ACCELERATION 3000
#define X_MAX_POS -4995

// Servo motor
#define SERVO_MAX_POS 4120
#define SERVO_MIN_POS 6000
#define SERVO_RAISE_SPEED 30
#define SERVO_RELEASE_SPEED 0

#endif

