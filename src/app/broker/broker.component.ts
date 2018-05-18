import { Component, OnInit } from '@angular/core';
import { Web3codeService } from '../services/web3code.service';
import $ from "jquery";

@Component({
  selector: 'app-user',
  templateUrl: './broker.component.html',
   styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit {
  public account:string;
  public balance:number;
  public ether:number;
  public token:number;

  
   constructor(private wcs:Web3codeService)
     {
      wcs.getAccount().then(account => this.account = account);
      wcs.getAccount().then(account => wcs.particular_brokers_bet_list(account));
      wcs.stake();
      wcs.Token();
     }
  cb()
  {
  let name :string = $('#a').val();
  let price = $('#b').val();
  let time =1626623239;
  this.wcs.creat_bt(name,price,time);
  }
 gt()
 {
  var n:any = $('#num').val();
     var not = n/1000;
  this.wcs.getToken(not);
 }
 et()
 {
  var n:any = $('#num').val();
  var not = n/1000;
  this.wcs.exchange_token(not);
 }
 a_e()
 {
  let eth:number = $('#noe').val();  
  this.wcs.a_s_e(eth);
 }
 a_t()
 {
 let tk:number = $('#tkn').val();
 this.wcs.a_s_t(tk);
 }

  ngOnInit() 
  {
        
  }

}
