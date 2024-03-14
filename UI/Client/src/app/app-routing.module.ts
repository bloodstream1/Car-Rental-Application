import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { BookCarComponent } from './book-car/book-car.component';
import { AgreementsComponent } from './agreements/agreements.component';
import { EditAgreementComponent } from './edit-agreement/edit-agreement.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'car/edit-car/:id', component: EditCarComponent },
  { path: 'agreements/edit-agreement/:id', component: EditAgreementComponent },
  { path: 'car/book-car/:id', component: BookCarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-car', component: AddCarComponent },
  // {path:'',component:ProductsComponent},
  // {path:'product-details/:id',component:ProductDetailsComponent},
  { path: 'agreements', component: AgreementsComponent },
  // {path:'orders',component:OrdersComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppRoutingModule { }
