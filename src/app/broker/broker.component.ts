import { Component, OnInit } from '@angular/core';
import { Web3codeService } from '../services/web3code.service';
import { ContractService } from '../services/contract-service.service';
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
  
  ngOnInit() {
    this.wcs.stake();
    this.wcs.Token();
  
  }

}
