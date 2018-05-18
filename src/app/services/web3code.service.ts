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
        
        resolve(balance);
      })  
      
    }) as string;
    return Promise.resolve(this.balance);
  }



  

  public async bet_ether(a,chc,amt): Promise<number> {                              //bet by ether
    // var count=0;
    let account:string = '';
      await this.getAccount().then(address => this.account = address);
       
  return new Promise((resolve, reject) => {
  this._tokenContract.betting(a,chc,0,{from:account,value:this._web3.toWei(amt,'ether'),gas: 600000},function(err,result) 
  {  
  if(result) {
    
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }

  
  public async bet_token(a,chc,amt): Promise<number> {                               //bet by tokens
    // var count=0;
    let account:string = '';
      await this.getAccount().then(address => this.account = address);
       
  return new Promise((resolve, reject) => {
  this._tokenContract.betting(a,chc,amt,{from:account,value:0,gas: 600000},function(err,result) 
  {  
  if(result) {
    
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }

  public async increase_ether(bid,choice,amt): Promise<number> {                               //increase betted ETher
    // var count=0;
    let account:string = '';
      await this.getAccount().then(address => this.account = address);     
  return new Promise((resolve, reject) => {
  this._tokenContract.increase(bid,choice,0,{from:account,value:this._web3.toWei(amt,'ether'),gas: 600000},function(err,result) 
  {  
  if(result) {
    
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }

  public async increase_token(bid,choice,amt): Promise<number> {                               //increase betted token
    let account:string = '';
      await this.getAccount().then(address => this.account = address);  
  return new Promise((resolve, reject) => {
  this._tokenContract.increase(bid,choice,this._web3.toWei(amt,'ether'),{from:account,value:0,gas: 600000},function(err,result) 
  {  
  if(result) {
    
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }
    

  public async decrease_ether(bid,choice,amt): Promise<number> {                               //decrease betted ETher
    // var count=0;
    let account:string = '';
      await this.getAccount().then(address => this.account = address);     
  return new Promise((resolve, reject) => {
  this._tokenContract.decrease(bid,choice,this._web3.toWei(amt,'ether'),{from:account,value:0,gas: 600000},function(err,result) 
  {  
  if(result) {
    
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }

  public async decrease_token(bid,choice,amt): Promise<number> {                               //decrease betted token
    let account:string = '';
      await this.getAccount().then(address => this.account = address);  
  return new Promise((resolve, reject) => {
  this._tokenContract.decrease(bid,choice,this._web3.toWei(amt,'ether'),{from:account,value:0,gas: 600000},function(err,result) 
  {  
  if(result) {
    
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }
    
  
  public async cancel_bet(bid): Promise<number> {                                                 //Cancelling the bet
    let account:string = '';
    await this.getAccount().then(address => this.account = address);  
  return new Promise((resolve, reject) => {
  this._tokenContract.trader_cancel_bet_and_widthdraw(bid,{from:account,gas: 600000},function(err,result) 
  {  
  if(result) {
    
  } 
  else
   {
    reject(err);
  }
  });
  }) as Promise<number>;
  }


  public async stake(): Promise<number> {
    let meta=this;
    let account = await this.getAccount();
  
    return new Promise((resolve, reject) => {
      
      meta._tokenContract.broker_map.call(account, function (err, result) {
        resolve(meta._web3.fromWei(result[0],'ether'));

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

        resolve(result);
      });
    }) as Promise<number>;
  }
  
  public async check_bro(): Promise<number> {
    // var count=0;
    let account:string = '';
      await this.getAccount().then(address => this.account = address);
       
  return new Promise((resolve, reject) => {
  this._tokenContract.broker_map(account,{from:account,gas: 600000},function(err,result) {    //check broker
  if(result) {
    alert(result);
    if(result[2]=="true")
    {
      
      
      
      }
    else
    {
        
        

    }
  } 
  else {
    reject(err);
  }
  });
  }) as Promise<number>;
  }
  
  public async a_s_e(ether): Promise<number> {
    return new Promise((resolve,reject) => {
      this._tokenContract.add_stake(0,{from:this._web3.eth.defaultAccount,value:this._web3.toWei(ether,'ether'),gas: 600000},function (err, result)
       {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async a_s_t(token): Promise<number> {
    return new Promise((resolve,reject) => {
      this._tokenContract.add_stake(this._web3.toWei(token,'ether'),{from:this._web3.eth.defaultAccount,value:0,gas: 600000},function (err, result)
       {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async getToken(not): Promise<number> {
        //  let account:string = '';
        // await this.getAccount().then(address => this.account = address);
        //let account:string = '';
        
        console.log(this._web3.eth.defaultAccount);
        
            
    return new Promise((resolve, reject) => {
     this._tokenContract.token_transaction(0,{from:this._web3.eth.defaultAccount,value:this._web3.toWei(not,'ether'),gas: 600000},function(err,result) //purchase token
     {
       if(result) {
         
         
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
        
            
return new Promise((resolve, reject) => {
this._tokenContract.token_transaction(this._web3.toWei(not,'ether'),{from:account,value:0,gas: 600000},function(err,result) //exchange token 
{
if(result) {
  
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
  
  return new Promise((resolve,reject) => {
   return meta._tokenContract.broker_set_game(name,price,time,{from:account,gas: 600000},function (err,result) {
    if(err)
     {
     
      reject(err);
    }
    alert(result);
    
     resolve(result);
    meta.particular_brokers_bet_list(account);
    });
  }) as Promise<number>;
 
}

public async particular_User_bet(account): Promise<number> {
   
  let meta = this; 
  console.log("*******************");
  
    console.log(account);
    
  return new Promise((resolve,reject) => {

          return meta._tokenContract.game_id(function (error,result) {
          
          console.log(result.toNumber());
          
           for(var a=1;a<=result.toNumber();a++) 
             {
                meta._tokenContract.betting_map.call(account,10,function (err,resu) {

                  console.log(resu[2].toNumber());
                                   
                  if(err)
                {    
                  reject(err); 
                }
                else
                {     
                  if(resu[1].toNumber()==0 && resu[2].toNumber()==0 && resu[3]==false) //not betted
                  {
                    

                  }   
                  else  if(resu[1].toNumber()==0 && resu[2].toNumber()==0 && resu[3]==true) //exited bet
                  {
                    
                  }
                  else if(resu[1].toNumber() > 0 || resu[2].toNumber() > 0 ) //betted
                  {
                    meta._tokenContract.betting_map.call(account,a,function (e,res) 
                     {                                
                       meta._tokenContract.game_set_map.call(a,function (er,re) {

                         console.log(re);
                         var name=re[0];
                         var s = '';
                           for (var k= 0; k < name.length; k += 2)
                          {
                            s+= String.fromCharCode(parseInt(name.substr(k, 2), 16));
                           }
                       
                      if(re[4].toNumber()==0)//pending
                      {
                                               
                        $("#user_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+re[0]+'</td><td>'+re[1]+'</td><td>'+re[2]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+"Pending"+'</td></tr>');
                      }
                      else if(re[4].toNumber()==10)//low
                      {        
                        $("#user_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+s+"/"+re[1]+'</td><td>'+re[2]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+"Low"+'</td></tr>');
                      }
                      else if(re[4].toNumber()==11)//high
                      {        
                        $("#user_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+s+"/"+re[1]+'</td><td>'+re[2]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+"High"+'</td></tr>');
                      }
                      else if(re[4].toNumber()==12)//draw
                      {        
                        $("#user_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+s+"/"+re[1]+'</td><td>'+re[2]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+"Draw"+'</td></tr>');
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
                        
                        
                       for(var index=0;index<resu.toNumber();index++)
                        {
                          // alert("abcde");
                        meta._tokenContract.get_game_set_map_value.call(a,index,function (er,res) 
                         {
                           meta._tokenContract.betting_map.call(res,a,function (e,re) 
                           {
                            tot_ether=tot_ether+re[1];
                            tot_tokens=tot_tokens+re[2];
                           })
                          })
                        }
                            var name=resul[0];
                            var s = '';
                              for (var k= 0; k < name.length; k += 2)
                             {
                               s+= String.fromCharCode(parseInt(name.substr(k, 2), 16));
                              }
                           if(resul[4].toNumber()==0)//pending
                              {
                      
                                $("#total_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+s+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Pending..."+'</td></tr>');
                                
                            } 
                            else if(resul[4].toNumber()==10)//low
                              {         alert(resul[0]) 
                                $("#total_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+s+"/"+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Low"+'</td></tr>');
                              }
                            else if(resul[4].toNumber()==11)//high
                              {          alert(resul[0])
                                $("#total_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+s+"/"+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"High"+'</td></tr>');
                              }
                              else if(resul[4].toNumber()==12)//draw
                              {          alert(resul[0])
                                $("#total_bet_list").append('<tr><td rowspan="1">'+a+'</td><td>'+s+"/"+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Draw"+'</td></tr>');
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
  console.log(account);
  
  return new Promise((resolve,reject) => {
     return meta._tokenContract.game_id(function (error,result) {
        
        console.log(result.toNumber());
        
          for(var a=1;a<=result.toNumber();a++) 
          {
            meta._tokenContract.game_set_map.call(a,function (erro,resul) {
               if(erro)
                {    
                  reject(erro); 
                }
                else  
                {     
                  if( account == resul[3])
                  {
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
                     var name=resul[0];
                      var s = '';
                              for (var k= 0; k < name.length; k += 2)
                             {
                               s+= String.fromCharCode(parseInt(name.substr(k, 2), 16));
                              }
                     if(resul[4].toNumber()==0)//pending
                    {
                     
                      
                         $("#broker_list").append('<tr><td>'+a+'</td><td>'+s+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Pending..."+'</td></tr>');                         
                    }
                     else if(resul[4]==10)//low
                    {
                         $("#broker_list").append('<tr><td>'+a+'</td><td>'+s+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Low"+'</td></tr>');                         
                    }
                     else if(resul[4]==11)//high
                    {
                        $("#broker_list").append('<tr><td>'+a+'</td><td>'+s+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"High"+'</td></tr>');                         
                    }
                     else if(resul[4]==12)//draw
                    {
                        $("#broker_list").append('<tr><td>'+a+'</td><td>'+resul[0]+'</td><td>'+resul[1].toNumber()+'</td><td>'+resul[2].toNumber()+'</td><td>'+resu+'</td><td>'+tot_ether+'</td><td>'+tot_tokens+'</td><td>'+"Draw"+'</td></tr>');                         
                    }

                })
            }
            else
            {
                
                
            }
              }
          })
        }
  
      resolve(result);
      
    });
  }) as Promise<number>;
}


public async set_result(gid,res): Promise<number> {
  let meta = this;
  let account:string = '';
  await this.getAccount().then(address => this.account = address);
  return new Promise((resolve,reject) => {
   return meta._tokenContract.admin_setting_result_and_distribute_money(gid,res,{from:account,gas: 600000},function (err,result) {
    if(err)
     {
     
      reject(err);
    } 
     resolve(result);
    meta.particular_brokers_bet_list(account);
    });
  }) as Promise<number>;
 
}




}

  