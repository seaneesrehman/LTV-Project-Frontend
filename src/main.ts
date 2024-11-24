// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: FormsModule },
    provideHttpClient()
  ]
});
