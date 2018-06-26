import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewUpdateRequestPage } from './new-update-request';

@NgModule({
  declarations: [
    NewUpdateRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(NewUpdateRequestPage),
  ],
})
export class NewUpdateRequestPageModule {}
