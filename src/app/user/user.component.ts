import { Component, OnInit } from '@angular/core';
import { Web3codeService } from '../services/web3code.service';
import { ContractService } from '../services/contract-service.service';
import $ from "jquery";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public acc:string;
  public bal:number;
  

  constructor(private wcs:Web3codeService)
     {
      // wcs.getAccount().then(acc => this.acc = acc);
      // wcs.getUserBalance().then(bal => this.bal = bal);      

     }
  
  ngOnInit() {
  }

}
