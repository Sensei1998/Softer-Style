import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';
import { Vetement } from './../model/vetement.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  vet: Vetement;
  id: number;
  contenu: Vetement[]=[];
    constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
    private plt: Platform,
    private navCtrl: NavController
  ) { this.plt.ready().then(()=>{
    this.loading();
  }) }

  ngOnInit() {
    this.route.paramMap.subscribe(param =>{
      this.id = +param.get('id');
     this.getVet(this.id);
    });
  }


  getVet(id: number): Vetement{
    this.storage.getById(id).then(ve =>{
      this.vet = ve;
    });
    return this.vet;
  }



  sup(item: Vetement){
    this.storage.delVet(item.id).then((id) => {
      console.log(this.contenu);
      this.contenu.splice(id.id, 1);
      this.navCtrl.navigateRoot(`home`);
      window.location.reload();
    });
  }
  loading(){
    this.storage.getVet().then(item =>{
      this.contenu = item;

    });
  }

}
