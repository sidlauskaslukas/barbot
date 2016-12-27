import { Injectable } from '@angular/core';
import { BluetoothSerial } from 'ionic-native';
import 'rxjs/add/operator/map';

@Injectable()
export class Barbot {

  constructor() {
  }

  getStatus() {
    return new Promise((resolve, reject) => {
      BluetoothSerial.isConnected().then(
        success => {
          resolve({code: 0, statusText: 'Connected', buttonText: 'Disconnect'});
        },
        error => {
          resolve({code: 1, statusText: 'Not Connected', buttonText: 'Connect'});
        }
      );
    });
  }

}
