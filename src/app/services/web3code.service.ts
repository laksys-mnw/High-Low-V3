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
public _tokenContractAddress: string = "0xc18cb67daef73e39d7436a90a8a42e775f76a801";

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
            console.log(accs);
            
            if (accs.length === 0) {
              alert(
                'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
              );
              return;
            }
            resolve(accs[0]);
          })
        }) as string;
    
        this._web3.eth.defaultAccount = this.account;
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



  

  public async bet_ether(a,opt,amt): Promise<number> {   //bet by ether
    // var count=0;
    let account:string = '';
      await this.getAccount().then(address => this.account = address);
       console.log(account);
  return new Promise((resolve, reject) => {
  this._tokenContract.betting(a,opt,0,{from:account,value:this._web3.toWei(amt,'ether'),gas: 600000},function(err,result) 
  {  
  if(result) {
    console.log(result);
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }

  
  public async bet_token(a,opt,amt): Promise<number> {   //bet by tokens
    // var count=0;
    let account:string = '';
      await this.getAccount().then(address => this.account = address);
       console.log(account);
  return new Promise((resolve, reject) => {
  this._tokenContract.betting(a,opt,amt,{from:account,value:0,gas: 600000},function(err,result) 
  {  
  if(result) {
    console.log(result);
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }

  
  public async stake(): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      
      this._tokenContract.broker_map.call(account, function (err, result) {
        // alert("Staked_ether"+result[0]);
        resolve(result);

      });

    }) as Promise<number>;
  }

  public async Token(): Promise<number> {
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.broker_map.call(account, function (err, result) {
        if(err != null) {
          reject(err);
        }
        // alert("Staked_Token"+result[1]);

        resolve(result);
      });
    }) as Promise<number>;
  }
  
  public async check_bro(): Promise<number> {
    // var count=0;
    let account:string = '';
      await this.getAccount().then(address => this.account = address);
       console.log(account);
  return new Promise((resolve, reject) => {
  this._tokenContract.broker_map(account,{from:account,gas: 600000},function(err,result) {    //check broker
  if(result) {
    alert(result);
    if(result[2]=="true")
    {
      console.log("Existing Broker..."); 
      console.log(typeof(account));
      
      }
    else
    {
        console.log("Not a Existing Broker..."); 
        console.log(typeof(account));

    }
  } 
  else {
    reject(err);
  }
  });
  }) as Promise<number>;
  }
  

  public async getToken(not): Promise<number> {
         let account:string = '';
        await this.getAccount().then(address => this.account = address);
        console.log(account);
            
    return new Promise((resolve, reject) => {
     this._tokenContract.token_transaction(0,{from:account,value:this._web3.toWei(not,'ether'),gas: 600000},function(err,result) //purchase token
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

 public async exchange_token(not): Promise<number> {
  let account:string = '';
        await this.getAccount().then(address => this.account = address);
        console.log(account);
            
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

  
public async creat_bt(name,price,time): Promise<number> {
  let meta = this;
  let account:string = '';
  await this.getAccount().then(address => this.account = address);
  console.log("create"+account);
  return new Promise((resolve,reject) => {
   return meta._tokenContract.broker_set_game(name,price,time,{from:account,gas: 600000},function (err,result) {
    if(err)
     {
     
      reject(err);
    }
    alert(result);
    console.log("game received");
     resolve(result);
    meta.particular_brokers_bet_list(account);
    });
  }) as Promise<number>;
 
}

public async particular_User_bet(account): Promise<number> {
   
  let meta = this; 
  return new Promise((resolve,reject) => {

          return meta._tokenContract.game_id(function (error,result) {
          console.log("Total Number of games......"+result.toNumber());
           for(var a=1;a<=result.toNumber();a++) 
             {
                meta._tokenContract.betting_map.call(account,a,function (err,resu) {
                  if(err)
                {    
                  reject(err); 
                }
                else
                {     
                  if(resu[1]==0 && resu[2]==0 && resu[3]==false) //not betted
                  {
                    console.log("Not Betted");

                  }   
                  else  if(resu[1]==0 && resu[2]==0 && resu[3]==true) //exited bet
                  {
                    console.log("Exited Bet");
                  }
                  else if(resu[1]>0 || resu[2]>0 ) //betted
                  {
                    meta._tokenContract.betting_map.call(account,a,function (e,res) 
                     {                                
                       meta._tokenContract.game_set_map.call(a,function (er,re) {
                       console.log("check Length "+re[4].length); 
                      if(re[5]==0)//pending
                      {
                        $("#user_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+re[0]+"/"+re[1]+'</td><td>'+re[2]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+"Low"+'</td><td style="color:green">'+re[3]+" &#9650;"+'</td><td style="color:red">'+re[4]+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+result[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
                      }
                      else if(re[5]==10)//low
                      {        
                        $("#user_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+re[0]+"/"+re[1]+'</td><td>'+re[2]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+"Low"+'</td><td style="color:green">'+re[3]+" &#9650;"+'</td><td style="color:red">'+re[4]+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+result[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
                      }
                      else if(re[5]==11)//high
                      {        
                        $("#user_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+re[0]+"/"+re[1]+'</td><td>'+re[2]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+"High"+'</td><td style="color:green">'+re[3]+" &#9650;"+'</td><td style="color:red">'+re[4]+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+result[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
                      }
                      else if(re[5]==12)//draw
                      {        
                        $("#user_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+re[0]+"/"+re[1]+'</td><td>'+re[2]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+"Draw"+'</td><td style="color:green">'+re[3]+" &#9650;"+'</td><td style="color:red">'+re[4]+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+result[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
                      }
                  })
                })
                                     
              }
        
            }
          })
          }
  
      resolve(result);
      
    });
  }) as Promise<number>;
}


public async all_bet_list(): Promise<number> {
  let meta = this;
  var tot_ether=0;
  var tot_tokens=0;
   return new Promise((resolve,reject) => {

         return meta._tokenContract.game_id.call(function (error,result) {
            console.log("Total No.of games "+result.toNumber());
            console.log("hello")
            for(var a=1;a<=result.toNumber();a++) 
            {
              //alert(result.toNumber())
               meta._tokenContract.game_set_map.call(a,function (erro,resul) {
                    if(erro){    
                        reject(erro); 
                    }
                    else{     
                      // alert(resul); 
                      meta._tokenContract.length_of_game_set_map.call(a,function (err,resu) 
                      {
                        console.log("REsult"+resu.toNumber());
                        console.log(resul[4].toNumber());                             
                       for(var index=0;index<resu.toNumber();index++)
                        {
                          alert("abcde");
                        meta._tokenContract.get_game_set_map_value.call(a,index,function (er,res) 
                         {
                           meta._tokenContract.betting_map.call(res,a,function (e,re) 
                           {
                            tot_ether=tot_ether+re[1];
                            tot_tokens=tot_tokens+re[2];
                           })
                          })
                        }
                           if(resul[4].toNumber()==0)//pending
                              {
                                // if(resul[2].toNumber()>1626562777)
                                {
                                $("#total_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+resul[0]+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td><button type="button" class="button" value="Create Bet" data-toggle="modal" data-target="#betting" (onclick)=bt(a)>Bet</td></tr>');
                                }
                            } 
                            else if(resul[4].toNumber()==10)//low
                              {        
                                $("#total_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+resul[0]+"/"+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Low"+'</td></tr>');
                              }
                            else if(resul[4].toNumber()==11)//high
                              {        
                                $("#total_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+resul[0]+"/"+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"High"+'</td></tr>');
                              }
                              else if(resul[4].toNumber()==12)//draw
                              {        
                                $("#total_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+resul[0]+"/"+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Draw"+'</td></tr>');
                              }
                          })                  
                       } 
                      
                    })              
            } 
            resolve(result);
        });
 }) as Promise<number>;
}




public async particular_brokers_bet_list(account): Promise<number> {
   
  let meta = this; 
  var tot_ether=0;
  var tot_tokens=0;
  return new Promise((resolve,reject) => {
     return meta._tokenContract.game_id(function (error,result) {
        console.log(result.toNumber());
        console.log("Broker table")
          for(var a=0;a<result.toNumber();a++) 
          {
            meta._tokenContract.game_set_map.call(a,function (erro,resul) {
                console.log(account)
                console.log("*************");
                console.log(resul[3]);
                console.log("*************");            
                console.log(account == resul[3]);
               if(erro)
                {    
                  reject(erro); 
                }
                else  
                {     
                  if( account == resul[3])
                  {
                    console.log("Account Matches!..");

                    meta._tokenContract.length_of_game_set_map.call(a,function (err,resu) 
                    {
                      for(var index=0;index<resu;index++)//edit
                      {
                      meta._tokenContract.get_game_set_map_value.call(a,index,function (er,res) 
                       {
                         meta._tokenContract.betting_map.call(res,a,function (e,re) 
                         {
                          tot_ether=tot_ether+re[1];
                          tot_tokens=tot_tokens+re[2];
                         })     
                    
                       })
                     } 
                     if(resul[4].toNumber()==0)//pending
                    {
                         $("#broker_list").append('<tr><td>'+a+'</td><td>'+resul[0]+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Pending..."+'</td></tr>');                         
                    }
                     else if(resul[4]==10)//low
                    {
                         $("#broker_list").append('<tr><td>'+a+'</td><td>'+resul[0]+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Low"+'</td></tr>');                         
                    }
                     else if(resul[4]==11)//high
                    {
                        $("#broker_list").append('<tr><td>'+a+'</td><td>'+resul[0]+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"High"+'</td></tr>');                         
                    }
                     else if(resul[4]==12)//draw
                    {
                        $("#broker_list").append('<tr><td>'+a+'</td><td>'+resul[0]+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Draw"+'</td></tr>');                         
                    }

                })
            }
            else
            {
                console.log("Account Doesn't Match");
                
            }
              }
          })
        }
  
      resolve(result);
      
    });
  }) as Promise<number>;
}







}

  