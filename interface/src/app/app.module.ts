import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // 📌 Importer ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './components/test/test.component';


@NgModule({
  declarations: [
  
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
