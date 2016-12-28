import { Component, NgZone } from '@angular/core';
import { Events, NavController /*, NavParams */} from 'ionic-angular';

import { Barbot } from '../../providers/barbot';
import { SettingsIngredientsPage } from '../settings-ingredients/settings-ingredients';
import { SettingsRecipesPage } from '../settings-recipes/settings-recipes';

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
              private ngZone: NgZone
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
