import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vetement } from '../model/vetement.model';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  i: Vetement;
  id: number;

  form2: FormGroup = this.fb.group({
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
  private route: ActivatedRoute,
  private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param =>{
      this.id = +param.get('id');
     this.getVet();


     this.form2 = this.fb.group({

        nom:[[], Validators.required],
        prix: [[], Validators.required],
        taille: [[], Validators.required],
        img: [[], Validators.required],

          status: [[], Validators.required],
          categorie: [[], Validators.required],
          couleur: [[], Validators.required]



    });
    });
  }

  addItem(){

    if(this.form2.valid){
      let v: Vetement = {
        id: this.id,
        nom: this.form2.get('nom')?.value,
        prix: this.form2.get('prix')?.value,
        taille: this.form2.get('taille')?.value,
        img: this.form2.get('img')?.value,
        cpltInfor:{
          statut: this.form2.get('status')?.value,
          categorie: this.form2.get('categorie')?.value,
          couleur: this.form2.get('couleur')?.value
        }
      };
      this.storageService.updateVet(v);
     this.navCtrl.navigateRoot(`home`);

    }
  }

  getId(): number{
    this.storageService.getId().then((v: Vetement) =>{
      this.id = v.id;

    });
    console.log(this.id);

    return this.id;

  }
  previousState(){
    window.history.back();
  }


  getVet(): void{

    this.storageService.getById(this.id).then(ve =>{
      this.i = ve;
      this.form2.get('nom')?.setValue(this.i.nom);
      this.form2.get('prix')?.setValue(this.i.prix);
      this.form2.get('taille')?.setValue(this.i.taille);
      this.form2.get('img')?.setValue(this.i.img);
      this.form2.get('categorie')?.setValue(this.i.cpltInfor.categorie);
      this.form2.get('status')?.setValue(this.i.cpltInfor.statut);
      this.form2.get('couleur')?.setValue(this.i.cpltInfor.couleur);
    });

  }

  onChange(){
    this.i.cpltInfor.statut = true;
  }
}
