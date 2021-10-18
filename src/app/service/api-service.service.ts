import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

var _apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private header;

  constructor(private _http : HttpClient,private _router : Router) {
    this.header = new HttpHeaders();
    // this.header = new HttpHeaders()
        // .set("Authorization", 'Bearer '+localStorage.getItem("accessToken"))
        // .set("Accept","application/json");
  }

  getLiquorSubCategoryInfo(categoryId){
      return this._http.get<any>(_apiUrl + 'fetchSubCategories/'+categoryId,{headers: this.header});
  }

  getLiquorProductInfo(liquorCategoryId,shopId){
    return this._http.get<any>(_apiUrl + 'fetchProducts/'+liquorCategoryId+'/'+shopId,{headers: this.header});
  }

  getOtherAllProductInfo(categoryId,shopId){
    return this._http.get<any>(_apiUrl + 'fetchOtherProductsByCategory/'+categoryId+'/'+shopId,{headers: this.header});
  }

  saveOrUpdateItemsToUserCart(itemInfo){
    return this._http.post<any>(_apiUrl + 'addToCart',itemInfo,{headers: this.header});
  }

  getUserDeviceCartInfo(deviceIdForm){
    return this._http.post<any>(_apiUrl + 'getCartDetails',deviceIdForm,{headers: this.header});
  }
}
