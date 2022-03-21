import { NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Vetement } from './../model/vetement.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../service/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items: Vetement[]= [];







  constructor(private storageService: StorageService, private plt: Platform,private toast: ToastController,
    private navCtrl: NavController) {this.plt.ready().then(()=>{
    this.loading();
  }); }

  ngOnInit() {
  }

  del(item: Vetement){
    this.storageService.delVet(item.id).then((id) => {
      this.items.splice(id.id, 1);
      window.location.reload();
    });
  }

  loading(){
    this.storageService.getVet().then(item =>{
      this.items = item;

    });
  }

  getDetails(item: Vetement){
    return this.storageService.getById(item.id);
  }

  onClick(id: number){
    this.navCtrl.navigateForward(`edit/${id}`);
  }
  onClick1(id: number){
    this.navCtrl.navigateForward(`details/${id}`);
  }
}
