import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { BarbotPage } from '../pages/barbot/barbot';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipesFilterPage } from '../pages/recipes-filter/recipes-filter';
import { RecipesData } from '../providers/recipes-data';
import { Barbot } from '../providers/barbot';

@NgModule({
  declarations: [
    MyApp,
    BarbotPage,
    RecipesPage,
    TabsPage,
    RecipesFilterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BarbotPage,
    RecipesPage,
    TabsPage,
    RecipesFilterPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecipesData,
    Barbot
  ]
})
export class AppModule {}
