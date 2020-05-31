import { OrderService } from './../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList
  constructor(private orderService : OrderService, 
    private http : HttpClient,
    private router :Router,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.refreshOrderList()
  }

  refreshOrderList(){
    this.orderService.getOrderList().then(res => {
      this.orderList = res
    })
  }

  openForEdit(orderId : number){
    this.router.navigate(['/order/edit/' + orderId])
  }

  deleteOrder(orderId : number){
    this.orderService.deleteOrder(orderId).then(res => {
      this.refreshOrderList()
      this.toastr.success('Order Deleted Successfully', 'Restaurant App')
    })
  }

}
