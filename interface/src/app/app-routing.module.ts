import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { LoginComponent } from './components/login/login.component';
import { ExercicesComponent } from './components/exercices/exercices.component';
const routes: Routes = [
  {path :'' , component : AcceuilComponent},
  {path : 'home' , component : HomeComponent},
  { path: 'a-propos', component: AProposComponent },
  {path : 'contact' , component : ContactComponent} ,
  {path : 'login' , component : LoginComponent} , 
  {path : 'exercice' , component : ExercicesComponent}
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
  exports: [RouterModule, RouterOutlet] // Export RouterOutlet
})
export class AppRoutingModule { }