import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecipesPage } from '../recipes/recipes';
import { BarbotPage } from '../barbot/barbot';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = RecipesPage;
  tab2Root = BarbotPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }
}
