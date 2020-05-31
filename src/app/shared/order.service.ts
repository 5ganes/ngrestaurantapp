import { environment } from './../../environments/environment';
import { OrderItem } from './order-item.model';
import { Order } from './order.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  formData : Order
  orderItems : OrderItem[]

  constructor(private http : HttpClient) { }

  saveOrUpdateOrder(){
    // console.log(this.formData)
    let body = {
      ...this.formData,
      orderItems : this.orderItems
    }
    return this.http.post(environment.apiURL + '/placeorder.php', body)

  }

  getOrderList(){
    return this.http.get(environment.apiURL + '/orders.php').toPromise()
  }

  getOrderById(orderId : number) : any{
    return this.http.get(environment.apiURL + '/getorderbyid.php?id=' + orderId).toPromise()
  }

  deleteOrder(orderId : number){
    return this.http.get(environment.apiURL + '/deleteorder.php?id=' + orderId).toPromise()

  }
}
