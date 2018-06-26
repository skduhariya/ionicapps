import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
  }
  ionViewWillLoad() {
    // console.log('ionViewDidLoad NewRequestPage');
    let data = this.navParams.get('data');
    

    

    //this.newreq['empname'] =  this.reqData.emp_name;
    console.log("data: in modal this.courses:  ", data);

  }

  closeClients() {
    let data = {"name":"sandy"}
    this.viewCtrl.dismiss(data);
  }

}
