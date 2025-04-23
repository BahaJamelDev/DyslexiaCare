import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ExercicesComponent } from './components/exercices/exercices.component';
import { LoginComponent } from './components/login/login.component';
import { DyslexiaTestComponent } from './components/dyslexia-test/dyslexia-test.component';
import {DictationComponent} from "./components/dictation/dictation.component";
import {DyslexiaServicesComponent} from "./components/dyslexia-service/dyslexia-service.component";
import {RecommendationComponent} from "./components/recommendation/recommendation.component";


export const routes: Routes = [
  {path :'' , component : AcceuilComponent},
  {path : 'home' , component : HomeComponent},
  { path: 'a-propos', component: AProposComponent },
  {path : 'contact' , component : ContactComponent} ,
  {path : 'register' , component : RegistrationComponent},
  {path : 'exercice' , component : ExercicesComponent} ,
  {path : 'login' , component : LoginComponent} ,
  {path : 'test' , component:DyslexiaTestComponent},
  {path:'dictation' , component :DictationComponent} ,
  {path : 'services', component:DyslexiaServicesComponent} ,
  {path : 'recommendation' , component:RecommendationComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled'
    }),
    RouterOutlet // Add RouterOutlet to imports
  ],
  exports: [RouterModule, RouterOutlet ] // Export RouterOutlet
})


export class AppRoutingModule { }
