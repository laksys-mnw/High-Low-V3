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
    bt()
    {
      
      var opt:any = parseInt($( "#myselect").val());
      var id:any = parseInt($('#bet_id').val());
      var chc:any = parseInt($( "#mychoice").val());      
      var amt:any = parseInt($('#bet_input').val());

      console.log(opt,id,chc,amt);
      
      if(opt==0)
      {
         this.wcs.bet_ether(id,chc,amt);

      }
      else if(opt==1)
      {
         this.wcs.bet_token(id,chc,amt);

      }
    }

    inc()
    {
      var choice:any = parseInt($( "#mychoice").val());
      var bid:any = parseInt($('#bet_id').val());
      var amt:any = parseInt($('#amt').val());
      console.log(choice,bid);
      if(choice==0)
      {
      // this.wcs.increase_ether(bid,choice,amt);
      }
      else if(choice==1)
      {
        // this.wcs.increase_token(bid,choice,)
      }

    }


  ngOnInit() 
  {  
  }

}