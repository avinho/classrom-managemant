import { APP_INITIALIZER, enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';

import { provideHttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { DbnameVersionService } from './app/database/dbname-version.service';
import { InitializeAppService } from './app/database/initialize.app.service';
import { SQLiteService } from './app/database/sqlite.service';
import { StorageService } from './app/database/storage.service';
import { environment } from './environments/environment';
import { provideServiceWorker } from '@angular/service-worker';

if (environment.production) {
  enableProdMode();
}

// --> Below only required if you want to use a web platform
const platform = Capacitor.getPlatform();
if (platform === 'web') {
  // Web platform
  // required for toast component in Browser
  pwaElements(window);

  // required for jeep-sqlite Stencil component
  // to use a SQLite database in Browser
  jeepSqlite(window);

  window.addEventListener('DOMContentLoaded', async () => {
    const jeepEl = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepEl);
    await customElements.whenDefined('jeep-sqlite');
    jeepEl.autoSave = true;
  });
}
// Above only required if you want to use a web platform <--

// Define the APP_INITIALIZER factory
export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

bootstrapApplication(AppComponent, {
  providers: [
    SQLiteService,
    InitializeAppService,
    StorageService,
    DbnameVersionService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
});

register();
