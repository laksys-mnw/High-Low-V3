import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { UserComponent } from './user/user.component';
import { BrokerComponent } from './broker/broker.component';
import { Web3codeService } from './services/web3code.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    BrokerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Web3codeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
