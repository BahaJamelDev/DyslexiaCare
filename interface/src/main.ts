import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AProposComponent } from 'src/app/components/a-propos/a-propos.component';
import { ContactComponent } from './app/components/contact/contact.component';
import { AcceuilComponent } from './app/components/acceuil/acceuil.component';
import  {RegistrationComponent } from './app/components/registration/registration.component';
import { ExercicesComponent } from './app/components/exercices/exercices.component';
import { LoginComponent } from './app/components/login/login.component';
import { DyslexiaTestComponent } from './app/components/dyslexia-test/dyslexia-test.component';
import { provideHttpClient } from '@angular/common/http';




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
          component: AcceuilComponent
        },
        { path : 'home' ,
          component : HomeComponent
        },
        { 
          path: 'a-propos', 
          component: AProposComponent 
        },
        { path : 'contact' , 
          component : ContactComponent
        } ,
        {path : 'register' ,
          component :  RegistrationComponent
         
        } , 
        { path : 'exercice' ,
          component : ExercicesComponent
        } , 
        {
          path : 'login' , component : LoginComponent
        } ,
        {path : 'test' ,component : DyslexiaTestComponent} 
       
      ]),
      provideHttpClient()
    ]
  }).catch(err => console.error(err));

