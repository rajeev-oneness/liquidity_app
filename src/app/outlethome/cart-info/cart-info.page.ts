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

  decreamentProductCounter(productInfo,categoryType){ // decareament the product
    let value = this.cartItem.cart.find(item => item.itemId === productInfo.itemId);
    if(value == undefined){}
    else{
      let currentQuantity = (parseInt(String(value.quantity)) - 1).toString();
      // console.log('currentQuantity => '+currentQuantity);
      if(currentQuantity > '0'){
        value.quantity = (parseInt(String(value.quantity)) - 1).toString();
        value.calculatedPrice = String(parseFloat(value.currentPrice) * parseInt(value.quantity));
      }else if(currentQuantity <= '0'){
        value.quantity = '0';value.calculatedPrice = '0';
        this.cartItem.cart = this.cartItem.cart.filter(item => item.itemId !== productInfo.itemId); // removing the item from cart
        // console.log('Now Cart',this.cartItem.cart);
      }
    }
    this.updateCartItemToLocalStorage(); // updating the Cart in to LocalStorage
  }

  increamentProductCounter(productInfo,categoryType){ // increament the Product
    let value = this.cartItem.cart.find(item => item.itemId === productInfo.itemId);
    if(value != undefined){
      value.quantity = (parseInt(String(value.quantity)) + 1).toString();
      value.calculatedPrice = String(parseFloat(value.currentPrice) * parseInt(value.quantity)); 
    }
    this.updateCartItemToLocalStorage(); // updating the Cart in to LocalStorage
    // console.log(this.cartItem.cart);
  }

  existingCartCheck(){
    let existingCart = JSON.parse(localStorage.getItem('allCartItems'));
    if(existingCart != null){
      this.cartItem.cart = existingCart;
      this.checkCurrentCartValue(); // Cheking the Current Cart Value
    }
    console.log('Existing Cart Info',this.cartItem.cart);
  }

  totalCartValue = '0'; // Total Cart Value
  checkCurrentCartValue(){
    this.totalCartValue = this.cartItem.cart.reduce((accumulator:any, current:any) => parseFloat(accumulator) + parseFloat(current.calculatedPrice), 0);
  }

  removeProductItem(index){
    this.cartItem.cart.splice(index, 1);
    this.updateCartItemToLocalStorage();
  }

  updateCartItemToLocalStorage(){ // updating the Cart in to LocalStorage
    localStorage.setItem('allCartItems',JSON.stringify(this.cartItem.cart));
    this.checkCurrentCartValue(); // Checking the Cart value
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
