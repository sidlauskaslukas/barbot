import {Component} from '@angular/core';
import {RecipesPage} from '../recipes/recipes';
import {BarbotPage} from '../barbot/barbot';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = RecipesPage;
    this.tab2Root = BarbotPage;
  }
}
