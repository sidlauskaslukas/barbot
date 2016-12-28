import { Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { StatusBar, Dialogs, Toast, Splashscreen, BluetoothSerial } from 'ionic-native';

import { RecipesPage } from '../pages/recipes/recipes';
import { BARBOT } from './barbot-config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = RecipesPage;

  private connection: any;

  constructor(private events: Events,
              platform: Platform
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.listenToEvents();
      this.connect();
    });
  }

  listenToEvents() {
    this.events.subscribe('barbot:connect', () => {
      this.connect();
    });

    this.events.subscribe('barbot:disconnect', () => {
      this.disconnect();
    });
  }

  connect() {
    // Ask user for permission to turn on Bluetooth
    BluetoothSerial.enable().then(
      status => {
        this.events.publish('barbot:connecting');
        Toast.show('Connecting to Barbot...', '20000', 'bottom').subscribe(toast => {});
        console.log('Bluetooth is enabled. Connecting to Barbot.');
        // Connect to Barbot
        this.connection = BluetoothSerial.connect(BARBOT.MAC_ADDRESS).subscribe(
          status => {
            this.events.publish('barbot:connected');
            Toast.hide().then(
              success => {
                Toast.show('Connected to Barbot', '4000', 'bottom').subscribe(toast => {});
              }
            );
          },
          reason => {
            this.events.publish('barbot:disconnected');
            if(reason === 'Device connection was lost') {
              Toast.show('Connection with Barbot was lost', '4000', 'bottom').subscribe(toast => {});
              return;
            }
            Toast.hide().then(status => {});
            Dialogs.confirm('Unable to connect to Barbot. Try again?', 'Unable to connect', ['Yes', 'No']).then(
              selection => {
                if(selection === 1) {
                  this.connect();
                }
              }
            );
            console.log('Unable to connect to Barbot: ' + reason);
          }
        );
      },
      reason => {
        this.events.publish('barbot:disconnected');
        if(reason === 'cordova_not_available') return;
        console.log('Bluetooth is not enabled. Ask user for permission again.');
        this.connect();
      }
    );
  }

  disconnect() {
    this.connection.unsubscribe();
    this.events.publish('barbot:disconnected');
  }

}
