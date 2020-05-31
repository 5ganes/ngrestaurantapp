import { RouterModule } from '@angular/router';
import { OrderService } from './shared/order.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import {MatDialogModule} from '@angular/material/dialog'; // angular material module

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [ OrderItemsComponent ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
