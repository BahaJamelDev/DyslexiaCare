import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path : 'home' , component : HomeComponent} 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Optional configurations for Angular 15
      useHash: false, // Whether to use hash-based routing
      initialNavigation: 'enabledBlocking', // Controls initial navigation behavior
      scrollPositionRestoration: 'enabled' 
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
