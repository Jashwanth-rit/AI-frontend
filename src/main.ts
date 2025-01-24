/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Bootstrap the application with appConfig
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
