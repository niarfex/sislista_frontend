/// <reference types="@angular/localize" />
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//import { AppModule } from './app/app.module';
import { RootModule } from './root.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
//platformBrowserDynamic().bootstrapModule(AppModule)
platformBrowserDynamic().bootstrapModule(RootModule)
  .catch(err => console.error(err));
