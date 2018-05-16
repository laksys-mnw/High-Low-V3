import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

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


  ngOnInit() {
  }

}
