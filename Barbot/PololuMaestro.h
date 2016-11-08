// Copyright (C) Pololu Corporation.  See LICENSE.txt for details.

/*! \file PololuMaestro.h
 *
 * This is the main header file for the Pololu Maestro Servo Controller library
 * for Arduino.
 *
 *
 * For an overview of the library's features, see
 * https://github.com/pololu/maestro-arduino. That is the main repository for
 * the library.
 */

#pragma once

#include <Arduino.h>
#include <Stream.h>

/*! \brief Main Maestro class that handles common functions between the Micro
 *  Maestro and Mini Maestro.
 *
 * The subclasses, MicroMaestro and MiniMaestro inherit all of the functions
 * from Maestro. The Maestro class is not meant to be instantiated directly; use
 * the MicroMaestro or MiniMaestro subclasses instead.
 */
class Maestro
{
  public:
    /** \brief The default device number, used to construct a MicroMaestro or
        MiniMaestro object that will use the compact protocol.
     */
    static const uint8_t deviceNumberDefault = 255;

    /** \brief The default reset pin is no reset pin, used to construct a
        MicroMaestro or MiniMaestro object that will not have a reset pin.
     */
    static const uint8_t noResetPin = 255;

    /** \brief Resets the Maestro by toggling the \p resetPin, if a \p resetPin
     * was given.
     *
     * By default this function will do nothing. If the \p resetPin was
     * specified while constructing the Maestro object, it will toggle that pin.
     * That pin needs to be wired to the Maestro's RST pin for it to reset the
     * servo controller.
     */
    void reset();

    /** \brief Sets the \a target of the servo on \a channelNumber using the
     * Mini SSC protocol.
     *
     * @param channelNumber A servo number from 0 to 254.
     *
     * @param target A target position from 0 to 254.
     *
     */
    void setTargetMiniSSC(uint8_t channelNumber, uint8_t target);

    /** \brief Sets the \a target of the servo on \a channelNumber.
     *
     * @param channelNumber A servo number from 0 to 127.
     *
     * @param target A number from 0 to 16383.
     *
     * If the channel is configured as a servo, then the target represents the
     * pulse width to transmit in units of quarter-microseconds. A \a target
     * value of 0 tells the Maestro to stop sending pulses to the servo.
     *
     * If the channel is configured as a digital output, values less than 6000
     * tell the Maestro to drive the line low, while values of 6000 or greater
     * tell the Maestro to drive the line high.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void setTarget(uint8_t channelNumber, uint16_t target);

    /** \brief Sets the \a speed limit of \a channelNumber.
     *
     * @param channelNumber A servo number from 0 to 127.
     *
     * @param speed A number from 0 to 16383.
     *
     * Limits the speed a servo channel’s output value changes.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void setSpeed(uint8_t channelNumber, uint16_t speed);

     /** \brief Sets the \a acceleration limit of \a channelNumber.
     *
     * @param channelNumber A servo number from 0 to 127.
     *
     * @param acceleration A number from 0 to 16383.
     *
     * Limits the acceleration a servo channel’s output value changes.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void setAcceleration(uint8_t channelNumber, uint16_t acceleration);

    /** \brief Sends the servos and outputs to home position.
     *
     * If the "On startup or error" setting for a servo or output channel is set
     * to "Ignore", the position will be unchanged.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void goHome();

    /** \brief Stops the script.
     *
     * Stops the script, if it is currently running.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void stopScript();

    /** \brief Starts loaded script at specified \a subroutineNumber location.
     *
     * @param subroutineNumber A subroutine number defined in script's compiled
     * code.
     *
     * Starts the loaded script at location specified by the subroutine number.
     * Subroutines are numbered in the order they are defined in loaded script.
     * Click the "View Compiled Code..." button and look at the subroutine list
     * to find the number for a particular subroutine.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void restartScript(uint8_t subroutineNumber);

    /** \brief Starts loaded script at specified \a subroutineNumber location
     *  after loading \a parameter on to the stack.
     *
     * @param subroutineNumber A subroutine number defined in script's compiled
     * code.
     *
     * @param parameter A number from 0 to 16383.
     *
     * Similar to the \p restartScript function, except it loads the parameter
     * on to the stack before starting the script at the specified subroutine
     * number location.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void restartScriptWithParameter(uint8_t subroutineNumber, uint16_t parameter);

    /** \brief Gets the position of \a channelNumber.
     *
     * @param channelNumber A servo number from 0 to 127.
     *
     * @return two-byte position value
     *
     * If channel is configured as a servo, then the position value represents
     * the current pulse width transmitted on the channel in units of
     * quarter-microseconds.
     *
     * If the channel is configured as a digital output, a position value less
     * than 6000 means the Maestro is driving the line low, while a position
     * value of 6000 or greater means the Maestro is driving the line high.
     *
     * If channel is configured as an input, then the position value represents
     * the voltage measured. Analog inputs for channels 0-11: their values range
     * from 0 to 1023, representing 0 to 5V. Digital inputs for channels 12-23:
     * their values are exactly 0 or exactly 1023.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    uint16_t getPosition(uint8_t channelNumber);

    /** \brief Gets the moving state for all configured servo channels.
     *
     * @return 1 if at least one servo limited by speed or acceleration is still
     * moving, 0 if not.
     *
     * Determines if the servo outputs have reached their targets or are still
     * changing and will return 1 as as long as there is at least one servo that
     * is limited by a speed or acceleration setting.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    uint8_t getMovingState();

    /** \brief Gets if the script is running or stopped.
     *
     * @return 1 if script is stopped, 0 if running.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    uint8_t getScriptStatus();

    /** \brief Gets the error register.
     *
     * @return Two-byte error code.
     *
     * Returns the error register in two bytes then all the error bits are
     * cleared on the Maestro. See the Errors section of the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    uint16_t getErrors();

    /** \cond
    *
    * This should be considered a private implementation detail of the library.
    **/
  protected:
    Maestro(Stream &stream,
            uint8_t resetPin,
            uint8_t deviceNumber,
            bool CRCEnabled);

    void writeByte(uint8_t dataByte);
    void writeCRC();
    void writeCommand(uint8_t commandByte);
    void write7BitData(uint8_t data);
    void write14BitData(uint16_t data);
  /** \endcond **/

  private:
    static const uint8_t CRC7Polynomial = 0x91;
    static const uint8_t baudRateIndication = 0xAA;

    static const uint8_t miniSscCommand = 0xFF;
    static const uint8_t setTargetCommand = 0x84;
    static const uint8_t setSpeedCommand = 0x87;
    static const uint8_t setAccelerationCommand = 0x89;
    static const uint8_t getPositionCommand = 0x90;
    static const uint8_t getMovingStateCommand = 0x93;
    static const uint8_t getErrorsCommand = 0xA1;
    static const uint8_t goHomeCommand = 0xA2;
    static const uint8_t stopScriptCommand = 0xA4;
    static const uint8_t restartScriptAtSubroutineCommand = 0xA7;
    static const uint8_t restartScriptAtSubroutineWithParameterCommand = 0xA8;
    static const uint8_t getScriptStatusCommand = 0xAE;

    uint8_t _deviceNumber;
    uint8_t _resetPin;
    bool _CRCEnabled;
    uint8_t _CRCByte;
    Stream *_stream;
};

class MicroMaestro : public Maestro
{
  public:
    /** \brief Create a MicroMaestro object.
     *
     * @param stream A class that descends from Stream, like SoftwareSerial or
     * one of the Hardware Serial ports.
     *
     * @param resetPin The pin used by reset() to reset the Maestro. The default
     * value is Maestro::noResetPin, which makes reset() do nothing.
     *
     * @param deviceNumber The device number configured on the Serial Settings
     * tab in the Maestro Control Center. When deviceNumber is anything but
     * Maestro::deviceNumberDefault, the Maestro communicates via the Pololu
     * protocol. Otherwise, it uses the Compact protocol.
     *
     * @param CRCEnabled When true, the object computes the CRC value for a
     * command packet and sends it at the end. The Maestro also has to have the
     * Enable CRC option checked on the Serial Settings tab of the Maestro
     * Control Center.
     */
    MicroMaestro(Stream &stream,
                 uint8_t resetPin = noResetPin,
                 uint8_t deviceNumber = deviceNumberDefault,
                 bool CRCEnabled = false);
};

class MiniMaestro : public Maestro
{
  public:
    /** \brief Create a MiniMaestro object.
     *
     * @param stream A class that descends from Stream, like SoftwareSerial or
     * one of the Hardware Serial ports.
     *
     * @param resetPin The pin used by reset() to reset the Maestro. The default
     * value is Maestro::noResetPin, which makes reset() do nothing.
     *
     * @param deviceNumber The device number configured on the Serial Settings
     * tab in the Maestro Control Center. When deviceNumber is anything but
     * Maestro::deviceNumberDefault, the Maestro communicates via the Pololu
     * protocol. Otherwise, it uses the Compact protocol.
     *
     * @param CRCEnabled When true, the object computes the CRC value for a
     * command packet and sends it at the end. The Maestro also has to have the
     * Enable CRC option checked on the Serial Settings tab of the Maestro
     * Control Center.
     *
     * The MiniMaestro object adds serial commands only availabe on the Mini
     * Maestro servo controllers: setPWM and setMultiTarget.
     */
    MiniMaestro(Stream &stream,
                uint8_t resetPin = noResetPin,
                uint8_t deviceNumber = deviceNumberDefault,
                bool CRCEnabled = false);

    /** \brief Sets the PWM specified by \a onTime and \a period in units of
     * 1/48 microseconds.
     *
     * @param onTime A number from 0 to 16320.
     *
     * @param period A number from 4 to 16384.
     *
     * Sets the PWM output to the specified on time and period, in units of 1/48
     * microseconds.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void setPWM(uint16_t onTime, uint16_t period);

    /** \brief Sets multiple targets starting with the channel specified by \a
     *  firstChannel to a list of values listed in \a targetList for a
     *  contiguous block of channels specified by \a numberOfTargets.
     *
     * @param numberOfTargets A number from 0 to 24.
     *
     * @param firstChannel A channel number from 0 to (24 -
     * \a numberOfTargets)
     *
     * @param targetList An array of numbers from 0 to 16383.
     *
     * The target value representation based on the channel's configuration
     * (servo and output) is the same as the Set Target command.
     *
     * See the Serial Interface section in the [Maestro User's
     * Guide](http://www.pololu.com/docs/0J40) for more details.
     *
     * The compact protocol is used by default. If the %deviceNumber was given
     * to the constructor, it uses the Pololu protocol.
     */
    void setMultiTarget(uint8_t numberOfTargets,
                        uint8_t firstChannel,
                        uint16_t *targetList);

  private:
    static const uint8_t setPwmCommand = 0x8A;
    static const uint8_t setMultipleTargetsCommand = 0x9F;
};
