import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AProposComponent } from 'src/app/components/a-propos/a-propos.component';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter([
        { 
          path: '', 
          component: HomeComponent 
        },
        { 
          path: 'a-propos', 
          component: AProposComponent 
        },
        // Ajoutez cette redirection pour les routes inconnues
        { 
          path: '**', 
          redirectTo: '' 
        }
      ])
    ]
  }).catch(err => console.error(err));

