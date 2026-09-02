import {bootstrapApplication} from '@angular/platform-browser';
import {App} from './app/app';
import { provideRouter} from '@angular/router';
import routeConfig from './app/routes';
import { appConfig } from './app/app.config';


bootstrapApplication(App, {
  providers: [...appConfig.providers, provideRouter(routeConfig)],
}).catch((err) =>
  console.error(err),
);
