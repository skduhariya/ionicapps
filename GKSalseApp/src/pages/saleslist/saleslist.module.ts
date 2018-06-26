import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleslistPage } from './saleslist';

@NgModule({
  declarations: [
    SaleslistPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleslistPage),
  ],
})
export class SaleslistPageModule {}
