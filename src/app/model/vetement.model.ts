import { Info } from './complement.model';
export interface Vetement{
  id?: number;
  nom?: string;
  prix?: number;
  taille?: number;
  img?: string;
  cpltInfor?: Info;
}
