/// <reference types="@angular/localize" />
import '@angular/localize/init';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

bootstrapApplication(App)
  .catch(err => console.error(err));