import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NewUpdateRequestPage } from '../new-update-request/new-update-request';
import { GKSalesApi } from '../shared/gk-sales-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


/**
 * Generated class for the SaleslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saleslist',
  templateUrl: 'saleslist.html',
})
export class SaleslistPage {
  reqData: any;
  userDetails: any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private gkService: GKSalesApi,
    private loadingController: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleslistPage');
    this.userDetails = this.navParams.get('data');
    console.log("this.reqData ", this.userDetails);
    this.getInsertedList();
  }


  updateList(uData) {
    console.log('uData: ', uData);

    let data = {
      userData: this.userDetails,
      updtReqData: uData
    }
    console.log("data: " + data);

    this.navCtrl.push(NewUpdateRequestPage, { data: data });
  }


  getInsertedList() {
    console.log("inside getInsertedList ...");
    var loader = this.loadingController.create({
      content: 'Please wait',
      dismissOnPageChange: true
    });
    loader.present();
    console.log("this.userDetails[0].email_id: " + this.userDetails.email_id);

    this.gkService.getUserRequestData(this.userDetails.email_id).subscribe(
      data => {
        // this.movies = data.results;

        console.log("insertedList: ", data);
        // loader.dismiss();
        if (data['_body'] !== null) {
          // console.log("inside if: ");

          this.reqData = JSON.parse(data['_body']);
          console.log('this.insertedList: ', this.reqData);

          // this.navCtrl.push(DashboardPage, { loginData: data['_body'] });
        }

      },
      err => {
        console.log(err);
        loader.dismiss();

      },
      () => console.log('portfolio call Complete'));
  }

}
