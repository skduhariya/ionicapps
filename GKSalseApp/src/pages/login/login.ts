import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { GKSalesApi } from '../shared/gk-sales-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  currentYr:Number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingController: LoadingController,
    private alertCtrl : AlertController,
    private gkService: GKSalesApi
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    console.log("Email: " + this.email + " this.password: " + this.password);

    if (this.email != undefined && this.password != undefined && this.email.trim() != '' && this.password.trim() != '') {
      //   console.log(this.email);

      var loader = this.loadingController.create({
        content: 'Please wait',
        dismissOnPageChange: true
      });
      loader.present();
      this.gkService.validateLogin(this.email, this.password)
        .subscribe(
        data => {
          // this.movies = data.results;
          console.log(data['_body']);
          if (data['_body'] !== null) {
            console.log("inside if: ");
            this.navCtrl.push(HomePage, { loginData: data['_body'] });
          } else {
            loader.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Email Id or Password Incorrect',
              buttons: ['OK']
            });
            alert.present();
          }

        },
        err => {
          console.log(err);
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Connection Timeout, Please try again!!',
            buttons: ['Close']
          });
          alert.present();
        },
        () => console.log('login call Complete'));

    } else {
      //loader.dismiss();
     // this.navCtrl.push(DashboardPage);
      let alert = this.alertCtrl.create({
        title: 'Please Enter EmailId and password!',
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
