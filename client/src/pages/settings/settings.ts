import { Component, NgZone } from '@angular/core';
import { Events, NavController /*, NavParams */} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Barbot } from '../../providers/barbot';
import { SettingsIngredientsPage } from '../settings-ingredients/settings-ingredients';
import { SettingsRecipesPage } from '../settings-recipes/settings-recipes';
import { RecipesData } from '../../providers/recipes-data';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  status: any;
  buttonDisabled: boolean = false;



  constructor(public nav: NavController,
              private events: Events,
              private barbot: Barbot,
              public atrCtrl: AlertController,
              private ngZone: NgZone,
              public recipesData: RecipesData
  ) {
    this.listenToEvents();
  }

  ngOnInit() {
    this.updateStatus();
  }

  updateStatus() {
    this.barbot.getStatus().then(status => {
      this.status = status;
    });
  }

  listenToEvents() {
    this.events.subscribe('barbot:connecting', () => {
      this.buttonDisabled = true;
    });

    this.events.subscribe('barbot:connected', () => {
      this.buttonDisabled = false;
      this.ngZone.run(() => {
        this.updateStatus();
      });
    });

    this.events.subscribe('barbot:disconnected', () => {
      this.buttonDisabled = false;
      this.ngZone.run(() => {
        this.updateStatus();
      });
    });
  }


  showPromptAlert() {
  let alert = this.atrCtrl.create({
    title: 'Clear local data',
    inputs: [
      {
        name: 'pin',
        placeholder: 'Enter pin',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('You Clicked on Cancel');
        }
      },
      {
        text: 'Clear Data',
        handler: data => {
          if (data.pin == '2345') {
            this.recipesData.clearData();
            this.recipesData.init();
          } else {
            // invalid login
            return false;
          }

        }
      }
    ]
  });
  alert.present();
}
  presentIngredients() {
    this.nav.push(SettingsIngredientsPage);
  }

  presentRecipes() {
    this.nav.push(SettingsRecipesPage);
  }

  handleButtonClick() {
    this.buttonDisabled = true;
    if(this.status.code) {
      this.events.publish('barbot:connect');
    } else {
      this.events.publish('barbot:disconnect');
    }
  }

}
