// Copyright (C) Pololu Corporation.  See LICENSE.txt for details.

#include "PololuMaestro.h"

Maestro::Maestro(Stream &stream,
                 uint8_t resetPin,
                 uint8_t deviceNumber,
                 bool CRCEnabled)
{
  _stream = &stream;
  _deviceNumber = deviceNumber;
  _resetPin = resetPin;
  _CRCEnabled = CRCEnabled;
}

void Maestro::reset()
{
  if (_resetPin != noResetPin)
  {
    digitalWrite(_resetPin, LOW);
    pinMode(_resetPin, OUTPUT); // Drive low.
    delay(1);
    pinMode(_resetPin, INPUT); // Return to high-impedance input (reset is
                               // internally pulled up on Maestro).
    delay(200); // Wait for Maestro to boot up after reset.
  }
}

void Maestro::setTargetMiniSSC(uint8_t channelNumber, uint8_t target)
{
  _stream->write(miniSscCommand);
  _stream->write(channelNumber);
  _stream->write(target);
}

void Maestro::goHome()
{
  writeCommand(goHomeCommand);
  writeCRC();
}

void Maestro::stopScript()
{
  writeCommand(stopScriptCommand);
  writeCRC();
}

void Maestro::restartScript(uint8_t subroutineNumber)
{
  writeCommand(restartScriptAtSubroutineCommand);
  write7BitData(subroutineNumber);
  writeCRC();
}

void Maestro::restartScriptWithParameter(uint8_t subroutineNumber,
                                         uint16_t parameter)
{
  writeCommand(restartScriptAtSubroutineWithParameterCommand);
  write7BitData(subroutineNumber);
  write14BitData(parameter);
  writeCRC();
}

void Maestro::setTarget(uint8_t channelNumber, uint16_t target)
{
  writeCommand(setTargetCommand);
  write7BitData(channelNumber);
  write14BitData(target);
  writeCRC();
}

void Maestro::setSpeed(uint8_t channelNumber, uint16_t speed)
{
  writeCommand(setSpeedCommand);
  write7BitData(channelNumber);
  write14BitData(speed);
  writeCRC();
}

void Maestro::setAcceleration(uint8_t channelNumber, uint16_t acceleration)
{
  writeCommand(setAccelerationCommand);
  write7BitData(channelNumber);
  write14BitData(acceleration);
  writeCRC();
}

uint16_t Maestro::getPosition(uint8_t channelNumber)
{
  writeCommand(getPositionCommand);
  write7BitData(channelNumber);
  writeCRC();

  while (_stream->available() < 2);
  uint8_t lowerByte = _stream->read();
  uint8_t upperByte = _stream->read();
  return (upperByte << 8) | (lowerByte & 0xFF);
}

uint8_t Maestro::getMovingState()
{
  writeCommand(getMovingStateCommand);
  writeCRC();

  while (_stream->available() < 1);
  return _stream->read();
}

uint16_t Maestro::getErrors()
{
  writeCommand(getErrorsCommand);
  writeCRC();

  while (_stream->available() < 2);
  uint8_t lowerByte = _stream->read();
  uint8_t upperByte = _stream->read();
  return (upperByte << 8) | (lowerByte & 0xFF);
}

uint8_t Maestro::getScriptStatus()
{
  writeCommand(getScriptStatusCommand);
  writeCRC();

  while (_stream->available() < 1);
  return _stream->read();
}

void Maestro::writeByte(uint8_t dataByte)
{
  _stream->write(dataByte);

  if(_CRCEnabled)
  {
    _CRCByte ^= dataByte;
    for (uint8_t j = 0; j < 8; j++)
    {
      if (_CRCByte & 1)
      {
        _CRCByte ^= CRC7Polynomial;
      }
      _CRCByte >>= 1;
    }
  }
}

void Maestro::writeCRC()
{
  if(_CRCEnabled)
  {
    _stream->write(_CRCByte);
    _CRCByte = 0; // Reset CRCByte to initial value.
  }
}

void Maestro::writeCommand(uint8_t commandByte)
{
  if (_deviceNumber != deviceNumberDefault)
  {
    writeByte(baudRateIndication);
    write7BitData(_deviceNumber);
    write7BitData(commandByte);
  }
  else
  {
    writeByte(commandByte);
  }
}

void Maestro::write7BitData(uint8_t data)
{
  writeByte(data & 0x7F);
}

void Maestro::write14BitData(uint16_t data)
{
  writeByte(data & 0x7F);
  writeByte((data >> 7) & 0x7F);
}

MicroMaestro::MicroMaestro(Stream &stream,
                           uint8_t resetPin,
                           uint8_t deviceNumber,
                           bool CRCEnabled) : Maestro(stream,
                                                      resetPin,
                                                      deviceNumber,
                                                      CRCEnabled)
{
}

MiniMaestro::MiniMaestro(Stream &stream,
                         uint8_t resetPin,
                         uint8_t deviceNumber,
                         bool CRCEnabled) : Maestro(stream,
                                                    resetPin,
                                                    deviceNumber,
                                                    CRCEnabled)
{
}

void MiniMaestro::setPWM(uint16_t onTime, uint16_t period)
{
  writeCommand(setPwmCommand);
  write14BitData(onTime);
  write14BitData(period);
  writeCRC();
}

void MiniMaestro::setMultiTarget(uint8_t numberOfTargets,
                                 uint8_t firstChannel,
                                 uint16_t *targetList)
{
  writeCommand(setMultipleTargetsCommand);
  write7BitData(numberOfTargets);
  write7BitData(firstChannel);

  for (int i = 0; i < numberOfTargets; i++)
  {
    write14BitData(targetList[i]);
  }

  writeCRC();
}
