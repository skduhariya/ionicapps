import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NewUpdateRequestPage } from '../new-update-request/new-update-request';
import { GKSalesApi } from '../shared/gk-sales-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ModalOptions } from 'ionic-angular/components/modal/modal-options';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Modal } from 'ionic-angular/components/modal/modal';
import { SaleslistPage } from '../saleslist/saleslist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userDetails: any;
  portfolio: any;
  public currencyFilter = 'inr';
  private brands: any;
  private courseData: any;
  private insertedList: any;
  private updtReqData:any;

  dashboardData: any = {};

  private dahsBoardSalesINR: any = {
    currency: 'INR',
    data: [{ per: '80% - 100%', ibmSales: 15000.00, certSales: 0, digitalSales: 0, gkSales: 0 },
    { per: '50% - 80%', ibmSales: 15000.00, certSales: 0, digitalSales: 0, gkSales: 0 },
    { per: '30% - 50%', ibmSales: 0, certSales: 0, digitalSales: 0, gkSales: 0 },
    { per: '0% - 30%', ibmSales: 15000.00, certSales: 0, digitalSales: 0, gkSales: 0 }]
  };

  private dashBoardUSD: any = {
    currency: 'USD',
    data: [{ per: '80% - 100%', ibmSales: 15000.00, certSales: 0, digitalSales: 0, gkSales: 0 },
    { per: '50% - 80%', ibmSales: 150.00, certSales: 340.00, digitalSales: 0, gkSales: 0 },
    { per: '30% - 50%', ibmSales: 0, certSales: 158.34, digitalSales: 0, gkSales: 0 },
    { per: '0% - 30%', ibmSales: 15000.00, certSales: 0, digitalSales: 0, gkSales: 0 }]
  };

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private menuCtrl: MenuController,
    private navParams: NavParams,
    private gkService: GKSalesApi,
    private loadingController: LoadingController,
    private modalCtrl: ModalController) {

  }

  getOverAll(ibmSales, certSales, digitalSales, gkSales) {
    //console.log("ibmSales: ", ibmSales, ' certSales: ', certSales, ' digitalSales: ', digitalSales, ' gkSales: ', gkSales);

    if (ibmSales == null) {
      ibmSales = 0;
    }
    if (certSales == null) {
      certSales = 0;
    }
    if (digitalSales == null) {
      digitalSales = 0;
    }
    if (gkSales == null) {
      gkSales = 0;
    }



    let total = parseInt(ibmSales) + parseInt(certSales) + parseInt(digitalSales) + parseInt(gkSales);
    return total;
  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad DashboardPage');
    console.log('dahsBoardSalesINR: ', this.dahsBoardSalesINR);
    this.filterCurrency();



    this.viewCtrl.showBackButton(false);
    // this.menuCtrl.enable(true, "hamburger-menu");

    this.userDetails = this.navParams.get('loginData');
    console.log("this.userDetails: ", this.userDetails);

    // this.getInsertedList();



    //this.navCtrl.setRoot(DashboardPage);
  }
  logout() {
    this.navCtrl.pop();
  }
  filterCurrency() {
    console.log("this.divisionFilte: ", this.currencyFilter);
    this.dashboardData = {};

    if (this.currencyFilter === 'usd') {
      console.log('inside if ... usd');
      this.dashboardData = this.dashBoardUSD;
    } else {
      this.dashboardData = this.dahsBoardSalesINR;
    }

    console.log("this.dashboardData: ", this.dashboardData);

  }
  openNewRequest() {
    let data =  {
      userData : JSON.parse(this.userDetails)[0],
      updtReqData:''
    }
    this.navCtrl.push(NewUpdateRequestPage, { data: data });
  }
  showList() {
    // const myReqOptions: ModalOptions = {
    //   enableBackdropDismiss: false
    // }

    // let modalData = {
    //   userData: this.insertedList

    // };

    //this.navCtrl.push(SaleslistPage);
    this.navCtrl.push(SaleslistPage, { data: JSON.parse(this.userDetails)[0] });
    // const newReq: Modal = this.modalCtrl.create(SaleslistPage, { data: JSON.stringify(modalData) }, myReqOptions);
    // newReq.present();

    // newReq.onDidDismiss((data) => {
    //   console.log("Dismiss Modal: ", data);


    // });

  }




}
