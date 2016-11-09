import {Component} from '@angular/core';
import {Events, Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Dialogs, Toast, Splashscreen, BluetoothSerial} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {RecipesData} from './providers/recipes/recipes';
import {Barbot} from './providers/barbot/barbot';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [RecipesData, Barbot]
})
export class MyApp {  

  private rootPage: any;
  private connection: any;

  constructor(private events: Events, 
              private platform: Platform
  ) {
    this.rootPage = TabsPage;

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
        this.connection = BluetoothSerial.connect('20:15:12:18:65:92').subscribe(
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

ionicBootstrap(MyApp);
