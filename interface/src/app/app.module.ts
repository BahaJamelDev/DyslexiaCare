import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // 📌 Importer ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes }  from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { DictationComponent } from './components/dictation/dictation.component';




@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      timeOut: 5000,
      progressAnimation: 'increasing'
    }),
    FormsModule

  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
