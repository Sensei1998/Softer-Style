import { Vetement } from './../model/vetement.model';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const item = 'my-key';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  items: Vetement[]=[];
  idMax = 1;

  /* vetement: Vetement[] = [{
    id: 1,
    nom: 'pull',
    taille: 5,
    img: '',
    prix: 10,
    cpltInfor:{
      statut: true,
      categorie: 'Homme',
      couleur: 'Noir',
    }},
    {
      id: 2,
      nom: 'shirt',
      taille: 4,
      img: '',
      prix: 10,
      cpltInfor:{
        statut: true,
        categorie: 'Homme',
        couleur: 'Noir',
      }
    }]; */

  constructor(private storage: Storage) {this.OnInit(); }

  OnInit(){
    this.storage.create();
  }

  addVet(ve: Vetement): Promise<any>{
        return this.storage.get(item).then((vets: Vetement[]) =>{
    if(vets){
      // ve.id = this.idMax;
      vets.push(ve);
      return this.storage.set(item, vets);

    }else{

      return this.storage.set(item, [ve]);

    }
        });
  }

  getVet(): Promise<Vetement[]>{
    return this.storage.get(item);

  }

  updateVet(ve: Vetement): Promise<any>{
    return this.storage.get(item).then((vets: Vetement[]) =>{
      if(!vets || vets.length === 0 ){
        return null;
      }

      let newVets: Vetement[]= [];

      for(let i of vets){
        if(i.id === ve.id) {
          newVets.push(ve);
        } else{
          newVets.push(i);
        }
      }

      return this.storage.set(item, newVets);

          });
  }

  delVet(id: number): Promise<Vetement>{
    return this.storage.get(item).then((vets: Vetement[]) =>{
 if(!vets || vets.length ===0){
   return null;
 }
 let keep: Vetement[]= [];
 for(let v of vets){
   if(v.id !== id){
     keep.push(v);
   }
 }
 return this.storage.set(item, keep);

    });
  }
 getId(): Promise<any>{
    return this.storage.get(item).then((vet: Vetement[]) =>{
      if(!vet || vet.length ===0){
        window.location.reload();
        console.log(this.idMax);
        return this.idMax;

      }else{
        for(let i of vet){
          if(i.id >= this.idMax){
            this.idMax = i.id + 1;
            console.log(this.idMax);
            window.location.reload();
            return this.idMax;
          }
        }
      }

    });

  }

  loading(){
    this.getVet().then(ite =>{
      this.items = ite;
    });
  }

  getById(id: number): Promise<Vetement>{
    return this.storage.get(item).then((vets: Vetement[]) =>{
      if(!vets || vets.length ===0){
        return null;
      }
      let keep: Vetement;
      for(let v of vets){
        if(v.id === id){
          keep=v;
        }
      }
      return keep;
});
  }
}

