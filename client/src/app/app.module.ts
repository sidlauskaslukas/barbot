import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { RecipesPage } from '../pages/recipes/recipes';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsIngredientsPage } from '../pages/settings-ingredients/settings-ingredients';
import { SettingsRecipesPage } from '../pages/settings-recipes/settings-recipes';
import { SettingsRecipePage } from '../pages/settings-recipe/settings-recipe';
import { RecipesFilterPage } from '../pages/recipes-filter/recipes-filter';
import { SettingsIngredientPage } from '../pages/settings-ingredient/settings-ingredient';
import { AddIngredientPage } from '../pages/add-ingredient/add-ingredient';
import { RecipesData } from '../providers/recipes-data';
import { Barbot } from '../providers/barbot';

@NgModule({
  declarations: [
    MyApp,
    RecipesPage,
    RecipesFilterPage,
    SettingsPage,
    SettingsIngredientsPage,
    SettingsRecipesPage,
    SettingsRecipePage,
    SettingsIngredientPage,
    AddIngredientPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipesPage,
    RecipesFilterPage,
    SettingsPage,
    SettingsIngredientsPage,
    SettingsRecipesPage,
    SettingsRecipePage,
    SettingsIngredientPage,
    AddIngredientPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecipesData,
    Barbot
  ]
})
export class AppModule {}
