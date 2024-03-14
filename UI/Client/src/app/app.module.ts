import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { BookCarComponent } from './book-car/book-car.component';
import { AgreementsComponent } from './agreements/agreements.component';
import { EditAgreementComponent } from './edit-agreement/edit-agreement.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AddCarComponent,
    EditCarComponent,
    BookCarComponent,
    AgreementsComponent,
    EditAgreementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user');
        },
        allowedDomains: ['localhost:5000'],
      },
    }),
  ],
  providers: [{

    provide: HTTP_INTERCEPTORS,

    useClass: AuthInterceptor,

    multi: true

  }], bootstrap: [AppComponent]
})
export class AppModule { }
