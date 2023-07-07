import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout : string = "";
     productDetails : Product[]=[];
    orderDetails: OrderDetails={
    fullName : '',
	  fullAddress: '',
	  contactNumber : '',
	  alternateContactNumber : '',
	  orderProductQuantityList : []
  }
  constructor( private activatedRoute: ActivatedRoute,
    private productService : ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productDetails= this.activatedRoute.snapshot.data['productDetails'];

    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {idFormation: x.idFormation, quantity: 1
        }
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm : NgForm){
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"])
      },
      (err) => {
        console.log(err);
      }
    );

  }

  getQuantityForProduct(idFormation){
    const filterProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.idFormation === idFormation
    );
    return filterProduct[0].quantity;

  }

  getCalculatedTotal(idFormation, productDiscountedPrice){
    const filterProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.idFormation === idFormation
    );
    return filterProduct[0].quantity*productDiscountedPrice;

  }

  onQuantityChanged(q, idFormation){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.idFormation=== idFormation
    )[0].quantity=q;
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price=this.productDetails.filter(product => product.idFormation=== productQuantity.idFormation)[0].productDiscountedPrice
        grandTotal+=price*productQuantity.quantity;
      }
    );
    return grandTotal;
  }

}
