import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {path :'' , component : HomeComponent},
  {path : 'home' , component : HomeComponent},
  { path: 'a-propos', component: AProposComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }

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