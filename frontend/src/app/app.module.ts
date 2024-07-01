import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactFormComponent,
    ContactDetailsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [provideNgxMask(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
