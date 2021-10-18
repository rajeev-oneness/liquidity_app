import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { getExactDate, validateEmail } from 'src/app/service/globalFuction';
import { isNumberKey } from 'src/app/service/globalFuction';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.page.html',
  styleUrls: ['./cart-info.page.scss'],
})
export class CartInfoPage implements OnInit {
  /********** From Global Function *********/
  public isNumberKey = isNumberKey;
  public getExactDate = getExactDate;

  public userDetails : any = {};
  public shopDetails : any = {};
  public cartItem: {cart: CARTSITEM[];};
  public deviceId : any = '';

  public minDate : string = getExactDate(0,0,1);
  public maxData : string = getExactDate(1,0,0);
  
  public bookingForm = {
    paymentFrom: 'online',bookingFor: 'myself',
    mobile : '',email : '',
    date : this.minDate,time : '10:00',
  }

  constructor(private _apiService : ApiServiceService,private _router:Router)  {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.shopDetails = JSON.parse(localStorage.getItem('shopDetails'));
    this.deviceId = JSON.parse(localStorage.getItem('userDeviceInfo'));
    this.cartItem = {cart : []};
    this.bookingForm.mobile = this.userDetails.mobile;
    this.bookingForm.email = this.userDetails.email;
  }

  ngOnInit() {
    this.existingCartCheckFromLocalStorage(); // checking the Existing cart
    this.uniqueOutletDataFunction(); // Unique Outlet id Function
  }

  decreamentProductCounter(productInfo,categoryType){ // decareament the product
    var itemInfo = this.cartItem.cart.find(item => item.itemId === productInfo.itemId);
    if(itemInfo == undefined){}
    else{
      let currentQuantity = (parseInt(String(itemInfo.quantity)) - 1).toString();
      // console.log('currentQuantity => '+currentQuantity);
      if(currentQuantity > '0'){
        itemInfo.quantity = (parseInt(String(itemInfo.quantity)) - 1).toString();
        itemInfo.calculatedPrice = String(parseFloat(itemInfo.currentPrice) * parseInt(itemInfo.quantity));
      }else if(currentQuantity <= '0'){
        itemInfo.quantity = '0';itemInfo.calculatedPrice = '0';
        this.cartItem.cart = this.cartItem.cart.filter(item => item.itemId !== productInfo.itemId); // removing the item from cart
        // console.log('Now Cart',this.cartItem.cart);
      }
      this.updateCartItemToLocalStorage(); // updating the Cart in to LocalStorage
      this.addItemToCartToServer(itemInfo,categoryType); // updating the cart into Server
    }
  }

  increamentProductCounter(productInfo,categoryType){ // increament the Product
    let itemInfo = this.cartItem.cart.find(item => item.itemId === productInfo.itemId);
    if(itemInfo != undefined){
      let nextQuantity = (parseInt(String(itemInfo.quantity)) + 1).toString();
      if(parseInt(nextQuantity) > parseInt(itemInfo.maxQuantity)){
        console.log('You can not add more than '+ itemInfo.quantity +' quantity');
      }else{
        itemInfo.quantity = nextQuantity;
        itemInfo.calculatedPrice = String(parseFloat(itemInfo.currentPrice) * parseInt(itemInfo.quantity));
      }
      this.updateCartItemToLocalStorage(); // updating the Cart in to LocalStorage
      this.addItemToCartToServer(itemInfo,categoryType); // updating the cart into Server
    }
  }

  existingCartCheckFromLocalStorage(){
    let existingCart = JSON.parse(localStorage.getItem('allCartItems'));
    if(existingCart != null){
      this.cartItem.cart = existingCart;
      this.checkCurrentCartValue(); // Cheking the Current Cart Value
    }
    console.log('Existing Cart Info',this.cartItem.cart);
  }

  public totalCartValue = '0'; // Total Cart Value
  checkCurrentCartValue(){
    this.totalCartValue = this.cartItem.cart.reduce((accumulator:any, current:any) => parseFloat(accumulator) + parseFloat(current.calculatedPrice), 0);
  }

  removeProductItem(index,cartInfo){
    this.cartItem.cart.forEach((element,index)=>{
      if(element.itemId == cartInfo.itemId){
        element.quantity = '0'; // setting the Quantity to be Zero
        this.addItemToCartToServer(element,cartInfo.categoryType); // updating the cart into Server
        this.cartItem.cart.splice(index,1);
      }
    });
    this.updateCartItemToLocalStorage();
  }

  addItemToCartToServer(itemDetails,categoryType){ // updating the Cart in to Server
    var isLiquor = '0';
    if(categoryType == 'liquor'){
      isLiquor = '1';
    }
    const mainForm = new FormData();
    mainForm.append('device_id',this.deviceId);
    mainForm.append('product_id',itemDetails.itemId);
    mainForm.append('product_name',itemDetails.itemName);
    mainForm.append('price',itemDetails.currentPrice);
    mainForm.append('quantity',itemDetails.quantity);
    mainForm.append('is_liquor',isLiquor);
    this._apiService.saveOrUpdateItemsToUserCart(mainForm).subscribe(
      res => {
        console.log(res);
      },err => {
        console.log(err);
      },
    )
  }

  updateCartItemToLocalStorage(){ // updating the Cart in to LocalStorage
    localStorage.setItem('allCartItems',JSON.stringify(this.cartItem.cart));
    this.checkCurrentCartValue(); // Checking the Cart value
    this.uniqueOutletDataFunction(); // updating filter
  }

  public uniqueOutletData : any = [];
  uniqueOutletDataFunction(){
    // Unique Outlet Data
    this.uniqueOutletData = this.cartItem.cart.filter((thing, i, arr) => {
      return arr.indexOf(arr.find(t => t.outletId === thing.outletId)) === i;
    });
  }

  uniqueOutletItemFilter(outletInfo){
    var sameOutletItemList =  this.cartItem.cart.filter(function(item) {
      return item.outletId == outletInfo.outletId;
    });
    return sameOutletItemList;
  }

  /************************** Booking Start ************************/
  paymentOptionChange(event){
    console.log(event.detail.value);
  }

  bookingForOptionChange(event){
    let radioName = event.detail.value;
    let mobile = '',email = '';
    if(radioName == 'myself'){
      mobile = this.userDetails.mobile;
      email = this.userDetails.email;
    }
    this.bookingForm.mobile = mobile;
    this.bookingForm.email = email;
  }
  
  /************************** Proceed to Pay *****************************/
  proceedToPay(){
    if(this.bookingForm.mobile == '' || this.bookingForm.mobile.length != 10){
      console.log('mobile number must be 10 digits');
    }else if(this.bookingForm.email == '' || !validateEmail(this.bookingForm.email)){
      console.log('invalid email address given');
    }
    console.log(this.bookingForm);
  }
}

interface CARTSITEM {
  categoryType : string, // liquor, food, combo, soft-beverage
  categoryId : string,
  subCategoryId : string,
  subCategoryName : string,
  outletId : string,
  outletName : string,
  outletRating : string,
  outletImage : string,
  itemId : string,
  itemName : string,
  highPrice : string,
  lowPrice : string,
  currentPrice : string,
  quantity : string,
  maxQuantity : string,
  calculatedPrice : any,
  description : string,
}
