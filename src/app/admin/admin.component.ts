import { Component, OnInit } from '@angular/core';
import { Web3codeService } from '../services/web3code.service';
import $ from "jquery";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private wcs:Web3codeService)
 { 
  wcs.getAccount().then(acc => wcs.all_bet_list());
 }

  hourglass() {
    var a;
    a=(document.getElementById("div1") as HTMLInputElement).value;
    a.innerHTML = "&#xf251;";
    setTimeout(function () {
        a.innerHTML = "&#xf252;";
      }, 1000);
    setTimeout(function () {
        a.innerHTML = "&#xf253;";
      }, 2000);
  }

  result()
    {
    
      var res:any = parseInt($( "#result").val());
      var gid:any = parseInt($('#bet_id').val());
      console.log(gid,res);
      this.wcs.set_result(gid,res);
    }

  ngOnInit() 
  {
  }

}
