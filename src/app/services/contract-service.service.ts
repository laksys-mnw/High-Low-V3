import { Injectable } from '@angular/core';
import { Web3codeService } from '../services/web3code.service';
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;

let tokenAbi = require('./hlbcontract.json');

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private _account: string = null;
  private _web3: any;
  // public not:any;

  constructor(private wcs:Web3codeService) {  }
 
  


  
}
