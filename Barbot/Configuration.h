#ifndef CONFIGURATION_H
#define CONFIGURATION_H

#define maestroSerial SERIAL_PORT_HARDWARE_OPEN

// Stepper driver
#define X_INTERFACE_TYPE 1 // Stepper motor interface type
#define X_STEP_PIN 3 // Stepper driver step pin
#define X_DIR_PIN 4 // Stepper driver dir pin

// Stepper motor
#define X_PARK_SPEED 150 // Parking speed
#define X_HOME_SPEED 700 // Homing speed
#define X_MAX_SPEED 1500 // The maximum speed in steps per second the X axis accelerate up to
#define X_ACCELERATION 3000 // Acceleration/deceleration rate in steps per second per second
#define X_MAX_POS -4995 // The maximum position for the X axis

// Servo motor
#define SERVO_MAX_POS 4120 // Servo hold position
#define SERVO_MIN_POS 6000 // Servo normal position
#define SERVO_RAISE_SPEED 30 // The speed of the servo when travelling from the normal to the hold position
#define SERVO_RELEASE_SPEED 0 // The speed of the servo when travelling from the hold to the normal position

// Endstop
#define X_ENDSTOP_PIN 5 // Endstop pin

// Other
#define TOTAL_ACTIONS 30 // Total number of actions
#define DELAY_BETWEEN_INGREDIENTS 600 // Time duration to wait before travelling to the next ingredient

// Neopixel
#define STRIP_PIN 48 // Which pin on the Arduino is connected to the NeoPixels?
#define NUMPIXELS 12 // How many NeoPixels are attached to the Arduino?

#endif
