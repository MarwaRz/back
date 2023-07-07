import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AdminComponent } from './admin/admin.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderDetaisComponent } from './order-detais/order-detais.component';
import { ProductResolveService } from './product-resolve.service';
import { RegisterComponent } from './register/register.component';
import { ShowProductDetailesComponent } from './show-product-detailes/show-product-detailes.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { CreateFormateurComponent } from './create-formateur/create-formateur.component';
import { UpdateFormateurComponent } from './update-formateur/update-formateur.component';
import { ListFormateurComponent } from './list-formateur/list-formateur.component';

import { ImprimerComponent } from './imprimer/imprimer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'addNewProduct', component: AddNewProductComponent , canActivate:[AuthGuard], data:{roles:['Admin']},
     resolve: {
            product: ProductResolveService
          }},
  { path: 'showProductDetailes' , component: ShowProductDetailesComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'orderInformation' , component: OrderDetaisComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'buyProduct' , component: BuyProductComponent, canActivate:[AuthGuard], data:{roles:['User']},
  resolve: {
         productDetails: BuyProductResolverService} },
  { path: 'orderConfirm', component: OrderConfirmationComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },

  { path: 'myOrders', component: MyOrdersComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'register', component: RegisterComponent },


  { path:'addformateur',component:CreateFormateurComponent , canActivate:[AuthGuard], data:{roles:['Admin'] }} ,

  { path:'modifierformateur/:id',component:UpdateFormateurComponent , canActivate:[AuthGuard], data:{roles:['Admin'] }},
  { path:'listformateur',component:ListFormateurComponent , canActivate:[AuthGuard], data:{roles:['Admin'] }},
  { path:'imprimer',component : ImprimerComponent,canActivate:[AuthGuard], data:{roles:['Admin'] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}