import { Platform, NavController } from '@ionic/angular';
import { Vetement } from './../model/vetement.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-add-vet',
  templateUrl: './add-vet.page.html',
  styleUrls: ['./add-vet.page.scss'],
})
export class AddVetPage implements OnInit {
  items: Vetement[]= [];
  i: Vetement;
  id = 1;
  form: FormGroup = this.fb.group({
    nom:[[], Validators.required],
    prix: [[], Validators.required],
    taille: [[], Validators.required],
    img: [[], Validators.required],

      status: [[], Validators.required],
      categorie: [[], Validators.required],
      couleur: [[], Validators.required]

  });






  constructor(private fb: FormBuilder,
    private storageService: StorageService,
    private plt: Platform,
    private navCtrl: NavController) { this.plt.ready().then(()=>{
      this.loading(); });}

  ngOnInit() {
  }

  addItem(){

    if(this.form.valid){
      let v: Vetement = {
        id: Date.now(),
        nom: this.form.get('nom')?.value,
        prix: this.form.get('prix')?.value,
        taille: this.form.get('taille')?.value,
        img: this.form.get('img')?.value,
        cpltInfor:{
          statut: this.form.get('status')?.value,
          categorie: this.form.get('categorie')?.value,
          couleur: this.form.get('couleur')?.value
        }
      };
      this.storageService.addVet(v);
      this.navCtrl.navigateRoot(`home`)

    }
  }

  previousState(){
    window.history.back();
  }

  onChange(){
    this.i.cpltInfor.statut = true;
  }

    getId(): number{
      this.storageService.getId().then((v: Vetement) =>{
        this.id = v.id + 1;

      });
      console.log(this.id);

      return this.id;

    }

    loading(){
      this.storageService.getVet().then(item =>{
        this.items = item;

      });



}
}
