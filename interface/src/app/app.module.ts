import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // 📌 Importer ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes }  from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      timeOut: 5000,
      progressAnimation: 'increasing'
    })
    
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
