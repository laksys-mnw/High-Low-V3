import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
declare let require: any;
declare let window: any;
import $ from "jquery";

let tokenAbi = require('./hlbcontract.json');


@Injectable({
  providedIn: 'root'
})
export class Web3codeService {
public account: string = null;
public balance:number;
public  _web3: any;

public _tokenContract: any;
public _tokenContractAddress: string = "0xff0c10e856284ee57e045bc3380f21ed80b6a52f";

   constructor() {
    if (typeof window.Web3 !== 'undefined') 
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);
      this._web3.version.getNetwork((err, netId) => {
          switch (netId) {
            case "1":
              console.log('This is mainnet')
              break
            case "2":
              console.log('This is the deprecated Morden test network.')
              break
            case "3":
              console.log('This is the ropsten test network.')
              break
            case "4":
              console.log('This is the Rinkeby test network.')
              break
            case "42":
              console.log('This is the Kovan test network.')
              break
            default:
              console.log('This is an unknown network.')
          }
      })
      this.getAccount();
      this._tokenContract = this._web3.eth.contract(tokenAbi).at(this._tokenContractAddress);
    }

  
  public async getAccount(): Promise<string> {
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }
  
          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          console.log(accs[0]);

          resolve(accs[0]);
        })
      }) as string;
     }
  
    return Promise.resolve(this.account);
  }
   

  public async getUserBalance(): Promise<number> {
    let account = await this.getAccount();  
     this.account = await new Promise((resolve, reject) => {

      this._web3.eth.getBalance(account, (err, balance) => {
        balance = this._web3.fromWei(balance, "ether") + ""
        console.log(balance);
        
        resolve(balance);
      })  
      
    }) as string;
    return Promise.resolve(this.balance);
  }
  
  public async stake(): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.broker_map(account, function (err, result) {
        alert("Staked_ether"+result[0]);
        resolve(result);

      });

    }) as Promise<number>;
  }

  public async Token(): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.broker_map(account, function (err, result) {
        if(err != null) {
          reject(err);
        }
        alert("Staked_Token"+result[1]);

        resolve(result);
      });
    }) as Promise<number>;
  }
  
  public async check_bro(): Promise<number> {
    // var count=0;
  let account = await this.getAccount();
  return new Promise((resolve, reject) => {
  this._tokenContract.broker_map(account,{from:account,gas: 600000},function(err,result) {    //check broker
  if(result) {
    alert(result);
    if(result[2]=="true")
    {
      console.log("Existing Broker..."); 
      }
    else
    {
        console.log("Not a Existing Broker..."); 
    }
  } 
  else {
    reject(err);
  }
  });
  }) as Promise<number>;
  }
  

  public async getToken(): Promise<number> {
         var n:any = $('#num').val();
         var not = n/1000;
    let account = await this.getAccount();
    return new Promise((resolve, reject) => {
     this._tokenContract.token_transaction.sendTransaction(0,{from:account,value:this._web3.toWei(not,'ether'),gas: 600000},function(err,result) //purchase token
     {
       if(result) {
         console.log(result);
         
           } 
       else {
         reject(err);
       }
     });
   }) as Promise<number>;
 }

 public async exchange_token(): Promise<number> {
  var n:any = $('#num').val();
  var not = n/1000;
let account = await this.getAccount();
return new Promise((resolve, reject) => {
this._tokenContract.token_transaction(this._web3.toWei(not,'ether'),{from:account,value:0,gas: 600000},function(err,result) //exchange token 
{
if(result) {
  console.log(result);
} 
else {
  reject(err);
}
//  resolve(this._web3.fromWei(result));  
});
}) as Promise<number>;
}

  
public async creat_bt(): Promise<number> {
  let name :string = $('#a').val();
  let price = $('#b').val();
  let time =1626369026;
  let account = await this.getAccount();
  return new Promise((resolve,reject) => {
    this._tokenContract.broker_set_game(name,price,time,{from:account,gas: 600000},function (err, result) {
      alert(result);
      resolve(result);
    });
  }) as Promise<number>;
}

public async bet_list(): Promise<number> {
   let account = await this.getAccount();
   let meta = this;
  return new Promise((resolve,reject) => {

          return meta._tokenContract.game_id(function (error,result) {
          console.log(result.toNumber());
          console.log("hello")
          for(var a=0;a<result.toNumber();a++) 
          {
            alert("Worksssssss"+a);
          return meta._tokenContract.game_set_map(a,function (error,result) {
            if(result)
            {          
              if(account==result[3])
              {
                alert("True");
                $("#broker_list").append('<tr><td rowspan="1">'+result[0]+'</td><td>'+result[1]+"/"+result[2]+'</td><td>'+result[1]+'</td><td>'+new Date(result[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(result[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+result[3]+" &#9650;"+'</td><td style="color:red">'+result[4]+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+result[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
              }
              else
              {
                alert("False")
              }
              
              }
            })
          }
  
      resolve(result);
      
    });
  }) as Promise<number>;
}







}

  