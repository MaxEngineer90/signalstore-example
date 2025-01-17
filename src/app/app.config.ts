import {ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';


import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';
import {Configuration} from '../config/configuration';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes), provideHttpClient(),
    {
      provide: Configuration,
      useValue: new Configuration("http://localhost:3000/todos")
    }]
};
