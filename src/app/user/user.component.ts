import { Component, OnInit } from '@angular/core';
import { Web3codeService } from '../services/web3code.service';
// import { ContractService } from '../services/contract-service.service';
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
      wcs.getAccount().then(acc => this.acc = acc);
      wcs.getAccount().then(acc => wcs.particular_User_bet(acc));
      wcs.getAccount().then(acc => wcs.all_bet_list());
      
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
    bt(a)
    {
      alert();
      var opt:any = $('#option').val();
      var amt:any = $('#bet_input').val();

      console.log(opt,amt);
      
      if(opt==0)
      {
        this.wcs.bet_ether(a,opt,amt);

      }
      else if(opt==1)
      {
        this.wcs.bet_token(a,opt,amt);

      }
    }
  ngOnInit() 
  {  
  }

}
