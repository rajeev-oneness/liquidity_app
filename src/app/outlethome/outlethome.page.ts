import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-outlethome',
  templateUrl: './outlethome.page.html',
  styleUrls: ['./outlethome.page.scss'],
})
export class OutlethomePage implements OnInit {
  
  public userDetails = {id:"63",name:"Rajeev Ranjan Prakash",email:"rrpit9@gmail.com",mobile:"8804809613",password:"ab1e5cb87bca828b54a4a24c2b37ea8f",image:"",gender:"0",dob:null,otp:"123456",is_verified:"1",is_active:"1",is_deleted:"0"};
  public shopDetails = {id:"10",name:"Liquidity Outlet_2",image:"http://demo91.co.in/dev/liquidity/assets/upload/shops/1613808061_Outlet_Image_2.jpg",address:"Pushpanjali Chamber, Second Floor,Kolkata",city_id:"1",email:"outlettwo@liquidity.in",password:"e10adc3949ba59abbe56e057f20f883e",phone:"9999999999",rating:"0",review:"",offer_rate:"0",offer_text:"OFFERS Coming Soon !!!",house_rules:"Please Visit Terms and Condition Page www.liquiditybars.in",is_active:"1",is_deleted:"0"};
  
  public cartItem: {cart: CARTSITEM[];};
  public currentSuperCategory = 'liquor';

  constructor(private _apiService : ApiServiceService) {
    this.cartItem = {cart : []};
  }

  ngOnInit() {
    this.changeSuperCategory('liquor'); // clicking the Liquor Section by default
  }

  changeSuperCategory(categoryType){
    this.currentSuperCategory = categoryType;
    if(categoryType == 'liquor'){
      this.getLiquorSubCategoryInfo(1); // for Liquor Category
    }else if(categoryType == 'food'){
      this.getOtherAllProductInfo(2,'food'); // for Food Product Info
    }else if(categoryType == 'soft-beverage'){
      this.getOtherAllProductInfo(3,'soft-beverage'); // for Soft Beverage Product Info
    }else if(categoryType == 'combo'){
      this.getOtherAllProductInfo(4,'combo'); // for Combo Product Info
    }
  }
  
  public liquorSubCategoryInfo : any = [];
  getLiquorSubCategoryInfo(categoryId){
    this._apiService.getLiquorSubCategoryInfo(categoryId).subscribe(
      res => {
        if(res.status == 1 || res.status == '1'){
          this.liquorSubCategoryInfo = res.sub_categories;
          // this.getLiquorProductInfo('2'); // getting the Product Info for First SeubCategory
        }
        console.log(res);
      },err => {
        console.log(err);
      }
    )
  }
  
  public liquorProductInfo : any = [];
  getLiquorProductInfo(liquorSubCategory){
    this._apiService.getLiquorProductInfo(liquorSubCategory.id,this.shopDetails.id).subscribe(
      res => {
        if(res.status == 1 || res.status == '1'){
          this.liquorProductInfo = res.products;
        }
        console.log(res);
      },err => {
        console.log(err);
      }
    )
  }

  public foodProductInfo : any = [];
  public softBeverageProductInfo : any = [];
  public comboProductInfo : any = [];

  getOtherAllProductInfo(categoryId,categoryType){
    this._apiService.getOtherAllProductInfo(categoryId,this.shopDetails.id).subscribe(
      res => {
        if(res.status == 1 || res.status == '1'){
          if(categoryType == 'food'){
            this.foodProductInfo = res.products;
          }else if(categoryType == 'soft-beverage'){
            this.softBeverageProductInfo = res.products;
          }else if(categoryType == 'combo'){
            this.comboProductInfo = res.products;
          }
        }
        console.log(res,categoryType);
      },err => {
        console.log(err);
      }
    )
  }



  increamentProductCounter(productInfo,categoryType){
    console.log(productInfo,categoryType);
  }

  decreamentProductCounter(productInfo,categoryType){
    console.log(productInfo,categoryType);
  }

  public addToCart: {
    cart: CARTSITEM[];
  };
}

interface CARTSITEM {
  categoryType : string, // liquor, food, combo, soft-beverage
  subCategoryId : string,
  outletId : string,
  outletName : string,
  outletImage : string,
  itemId : string,
  itemName : string,
  highPrice : string,
  lowPrice : string,
  currentPrice : string,
  quantity : number,
  calculatedPrice : string,
  description : string,
}
