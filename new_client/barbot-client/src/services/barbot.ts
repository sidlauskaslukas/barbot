import { BleClient } from '@capacitor-community/bluetooth-le';

export interface BarbotAPI {
  scan: () => Promise<any>,
  connect: () => Promise<any>
  send: (command: string) => Promise<any>
}

export const barbotApi = (): BarbotAPI => {

  async function scan() {
    try {
      await BleClient.initialize();
      // scan for available devices and pick a device from a dialog
      const device = await BleClient.requestDevice();
      // store BleDevice in the localStorage
    } catch (e) {
      console.log('something went wrong: ', e);
    }
  }

  async function connect() {
    // connect BleDevice if available
    // otherwise scan for available devices and ask to pick a device
  }

  async function send(command: string) {
    // check if connected
    // send(command);
  }

  return {
    scan,
    connect,
    send
  }
};
