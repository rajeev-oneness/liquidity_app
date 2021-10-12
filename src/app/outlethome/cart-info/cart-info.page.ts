import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.page.html',
  styleUrls: ['./cart-info.page.scss'],
})
export class CartInfoPage implements OnInit {

  public userDetails : any = {};
  public shopDetails : any = {};
  
  public cartItem: {cart: CARTSITEM[];};

  constructor(private _apiService : ApiServiceService,private _router:Router)  {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.shopDetails = JSON.parse(localStorage.getItem('shopDetails'));
    this.cartItem = {cart : []};
  }

  ngOnInit() {
    this.existingCartCheck(); // checking the Existing cart
  }

  existingCartCheck(){
    let existingCart = JSON.parse(localStorage.getItem('allCartItems'));
    if(existingCart != null){
      this.cartItem.cart = existingCart;
    }
    console.log('Existing Cart Info',this.cartItem.cart);
  }

  totalCartValue = '0'; // Total Cart Value
  currentCartValue(){
    this.totalCartValue = this.cartItem.cart.reduce((accumulator:any, current:any) => parseFloat(accumulator) + parseFloat(current.calculatedPrice), 0);
    return this.totalCartValue;
  }

  removeProductItem(index,product){
    
  }
}

interface CARTSITEM {
  categoryType : string, // liquor, food, combo, soft-beverage
  categoryId : string,
  subCategoryId : string,
  outletId : string,
  outletName : string,
  outletImage : string,
  itemId : string,
  itemName : string,
  highPrice : string,
  lowPrice : string,
  currentPrice : string,
  quantity : string,
  calculatedPrice : any,
  description : string,
}
