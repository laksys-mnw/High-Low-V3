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
      // wcs.getAccount().then(account => this.account = account);
      // wcs.getUserBalance().then(balance => this.balance = balance);      
      // wcs.stake().then(ether => this.ether = ether); 
      // wcs.stake().then(token => this.token = token);   
     }
  cb()
  {
  let name :string = $('#a').val();
  let price = $('#b').val();
  let time =1626369026;
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
  ngOnInit() {
    this.wcs.stake();
    this.wcs.Token();
  
  }

}
