import { environment } from './../../../environments/environment';
import { Customer } from './../../shared/customer.model';
import { CustomerService } from './../../shared/customer.service';
import { OrderItemsComponent } from './../order-items/order-items.component';
import { OrderService } from './../../shared/order.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  customerList : Customer[]
  isValid : boolean = true

  constructor(public service : OrderService, 
    private dialog : MatDialog, 
    private customerService : CustomerService,
    private router : Router,
    private toastr : ToastrService,
    private currentRoute : ActivatedRoute) { }

  ngOnInit(): void {
    let orderId = this.currentRoute.snapshot.params.id;
    if(orderId == null){
      this.resetForm()
    }
    else{
      this.service.getOrderById(parseInt(orderId)).then(res => {
        console.log(res)
        // console.log(res.order)
        this.service.formData = res.order
        this.service.orderItems = res.orderDetails
        // console.log(this.service.orderItems)
      })
    }

    this.customerService.getCustomerList().then(res => {
      this.customerList = res as Customer[]
    })

  }

  resetForm(form? : NgForm){
    if(form = null)
      form.resetForm()
    this.service.formData = {
      id : null,
      orderNumber : Math.floor(100000 + Math.random() * 900000).toString(),
      customerId : 0,
      paymentMethod : '',
      grandTotal : 0,
      deletedOrderItemIds : ''
    }
    this.service.orderItems = []
  }

  addOrEditOrderItem(orderItemIndex, orderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true
    dialogConfig.disableClose = true
    dialogConfig.width = "50%"
    dialogConfig.data = {
      orderItemIndex,
      orderId
    }
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal()
    })
  }

  onDeleteOrderItem(orderItemId : number, index : number){
    if(orderItemId != null)
      this.service.formData.deletedOrderItemIds += orderItemId + ','
    this.service.orderItems.splice(index, 1)
    this.updateGrandTotal()
  }

  updateGrandTotal(){
    // console.log(this.service.formData)
    // console.log(this.service.orderItems)
    this.service.formData.grandTotal = this.service.orderItems.reduce((prev, curr) => {
      // console.log(prev)
      return prev + curr.total
    }, 0)
    // this.service.formData.grandTotal = parseFloat(this.service.formData.grandTotal.toFixed(2))
  }

  onSubmit(form : NgForm){
    if(this.validateForm()){
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success('Order Posted Successfully', 'Restaurant App')
        this.router.navigate(['/orders'])
        // console.log(res);
      })
    }
  }

  validateForm(){
    this.isValid = true
    if(this.service.formData.customerId == 0)
      this.isValid = false
    else if(this.service.orderItems.length == 0)
      this.isValid = false
    return this.isValid
  }

}
