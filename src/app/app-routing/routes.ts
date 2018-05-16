import { Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { BrokerComponent } from '../broker/broker.component';
import { AdminComponent } from '../admin/admin.component';
import {HeaderComponent} from '../header/header.component';
export  const  routes: Routes = [
    { path: 'admin',     component: AdminComponent  },
    { path: 'user',  component:UserComponent },
    { path: 'broker',     component: BrokerComponent  },
     { path: '', redirectTo: '/admin', pathMatch: 'full' }
  ];