import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { GKSalesApi } from '../pages/shared/gk-sales-service';
import { NewUpdateRequestPage } from '../pages/new-update-request/new-update-request';
import { SaleslistPage } from '../pages/saleslist/saleslist';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { ClientsPage } from '../pages/clients/clients';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NewUpdateRequestPage,
    SaleslistPage,
    ProgressBarComponent,
    ClientsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NewUpdateRequestPage,
    SaleslistPage,
    ProgressBarComponent,
    ClientsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
