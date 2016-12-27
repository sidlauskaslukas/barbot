import { Component, NgZone} from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { Barbot } from '../../providers/barbot/barbot';

@Component({
  templateUrl: 'build/pages/barbot/barbot.html',
})
export class BarbotPage {

	status: any;
	buttonDisabled = false;

  constructor(private events: Events, 
  						private nav: NavController, 
  						private barbot: Barbot,
  						private ngZone: NgZone
  ) {
  	this.listenToEvents();
  }

  ionViewDidEnter() {
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

  handleButtonClick() {
  	this.buttonDisabled = true;
  	if(this.status.code) {
  		this.events.publish('barbot:connect');
  	} else {
  		this.events.publish('barbot:disconnect');	
  	}
  }

}