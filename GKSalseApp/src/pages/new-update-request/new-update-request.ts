import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GKSalesApi } from '../shared/gk-sales-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ModalOptions } from 'ionic-angular/components/modal/modal-options';
import { ClientsPage } from '../clients/clients';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Modal } from 'ionic-angular/components/modal/modal';

/**
 * Generated class for the NewUpdateRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-update-request',
  templateUrl: 'new-update-request.html',
})
export class NewUpdateRequestPage {

  reqData: any;
  empName: string;
  courses: any;
  course_code_name: any;
  newreq: any = { business_status: 30 };
  showOtherBrand: boolean = false;
  portfolio: any;
  courseData: any;
  enableEndDt: boolean = false;
  mindt: any;
  enableSattus: boolean = false;
  enablePO: boolean = false;
  clientList: any;
  showGroup = null;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private gkService: GKSalesApi,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUpdateRequestPage');

    console.log("this.navParams.get('data'): ", this.navParams.get('data'));
    let dd = this.navParams.get('data');
    this.reqData = dd.userData;

    setTimeout(() => {
      console.log('hello');
      if (dd.updtReqData != '') {
        this.newreq = dd.updtReqData;
        this.enableSattus = true;
        this.course_code_name = this.newreq.course_code + '-' + this.newreq.course_name;
        this.enableEndDt = true;

        console.log("this.course_code_name: ", this.course_code_name);
      }
      this.getSalesClients();

    }, 500);





    //this.newreq['created_by'] = this.reqData;



    console.log("this.reqData: ", this.reqData);
    console.log("this.newreq: ", this.newreq);

    this.getPortfolio();
  }

  enableEndDate() {
    this.enableEndDt = true;
    this.mindt = this.newreq['start_date'];
    this.newreq['end_date'] = this.mindt;
    // console.log("this.maxdt: ", this.maxdt);
    this.getDutration();



  }

  changeStatus() {
    let sts = this.newreq.business_status;
    console.log("sts: " + sts);
    if (parseInt(sts) == 100) {
      this.enablePO = true;
    }
  }
  showClients() {
    const myReqOptions: ModalOptions = {
      enableBackdropDismiss: false
    }


    const client: Modal = this.modalCtrl.create(ClientsPage, { data: this.clientList }, myReqOptions);
    client.present();

    client.onDidDismiss((data) => {
      console.log("Dismiss Modal: ", data);

     // this.insertNRequest(data);
    });


  }
  getDutration() {
    let sdt = this.newreq['start_date'];
    let edt = this.newreq['end_date'];

    var date1 = new Date(sdt);
    var date2 = new Date(edt);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.newreq.course_duration = diffDays + 1;

    // let dur = this.newreq['end_date'] - this.newreq['start_date'];
    console.log("dur: " + diffDays);
    console.log("this.newreq['start_date']: " + this.newreq['start_date']);
    console.log("this.newreq['end_date']: ", this.newreq['end_date']);

    this.newreq.start_date = sdt;


    console.log("this.newreq: ", this.newreq);



  }

  changeBrand() {
    const val = this.newreq.brand;
    console.log("brand val: " + val);

    if (val === 'Others') {
      this.showOtherBrand = true;
    } else {
      this.showOtherBrand = false;
    }
    console.log("va: " + val);
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }

  insertNRequest(newReqData) {
    var loader = this.loadingController.create({
      content: 'Please wait ...',
      dismissOnPageChange: true
    });
    loader.present();
    console.log("in insertion newReqData: ", newReqData);


    this.gkService.insertNewRequest(newReqData)
      .subscribe(
      data => {
        loader.dismiss();
        // this.movies = data.results;
        // console.log(data);
        if (data['_body'] !== null) {
          // console.log("inside if: ");

          // this.courseData = data['_body'];

          console.log('this.course code: ', data['_body']);
          this.navCtrl.pop();

          let toast = this.toastCtrl.create({
            message: 'Details has been submitted Successfully',
            duration: 2000,
            position: 'middle'
          });

          toast.onDidDismiss(() => {
            // console.log('Dismissed toast');
          });

          toast.present();

          // this.navCtrl.push(DashboardPage, { loginData: data['_body'] });
        }

      },
      err => {
        loader.dismiss();
        console.log(err);
      },
      () => console.log('data inserted'));
  }

  getPortfolio() {
    // this.newreq['sales_spoc'] = this.reqData.emp_name;
    // this.newreq['created_by'] = this.reqData.email_id;



    var loader = this.loadingController.create({
      content: 'Please wait',
      dismissOnPageChange: true
    });
    loader.present();

    this.gkService.getPortfolios()
      .subscribe(
      data => {
        // this.movies = data.results;
        this.getCourseCode();
        console.log(data);
        // loader.dismiss();
        if (data['_body'] !== null) {
          // console.log("inside if: ");

          this.portfolio = JSON.parse(data['_body']);
          console.log('this.portfolio: ', this.portfolio);

          // this.navCtrl.push(DashboardPage, { loginData: data['_body'] });
        }

      },
      err => {
        console.log(err);
        loader.dismiss();

      },
      () => console.log('portfolio call Complete'));
  }
  getCourseCode() {
    var loader = this.loadingController.create({
      content: 'Getting Data',
      dismissOnPageChange: true
    });
    loader.present();

    this.gkService.getcourseCode()
      .subscribe(
      data => {
        loader.dismiss();
        // this.movies = data.results;
        console.log(data);
        if (data['_body'] !== null) {
          // console.log("inside if: ");

          this.courseData = JSON.parse(data['_body']);

          console.log('this.course code: ', this.courseData);

          // this.navCtrl.push(DashboardPage, { loginData: data['_body'] });
        }

      },
      err => {
        loader.dismiss();
        console.log(err);

      },
      () => console.log('getcourses modal call Complete'));
  }

  getCourseCodeName() {

    console.log("course_code_name: ", this.course_code_name);
    let crsname_code = this.course_code_name.split('-');
    console.log("crsname_code: ", crsname_code);

    this.newreq.course_code = crsname_code[0];
    this.newreq.course_name = crsname_code[1];
    this.newreq.sales_spoc = this.reqData.emp_name;
    this.newreq.created_by = this.reqData.email_id;


    console.log("this.newreq: in chnage code name: ", this.newreq);
  }

  getSalesClients() {

    var loader = this.loadingController.create({
      content: 'Getting Data',
      dismissOnPageChange: true
    });
    loader.present();

    this.gkService.getClients()
      .subscribe(
      data => {
        loader.dismiss();
        // this.movies = data.results;
        // console.log(data);
        if (data['_body'] !== null) {
          // console.log("inside if: ");

          this.clientList = JSON.parse(data['_body']);

          console.log('getSalesClients : ', this.clientList);

          // this.navCtrl.push(DashboardPage, { loginData: data['_body'] });
        }

      },
      err => {
        loader.dismiss();
        console.log(err);

      },
      () => console.log('clientList  call Complete'));
  }

  submitNewReq() {
    this.insertNRequest(this.newreq);
  }

}
