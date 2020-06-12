import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { PlantaExternaModel } from 'app/main/gestionpropuesta/models/oferta';

@Injectable()

export class PlantaExternaService{

  dataChange: BehaviorSubject<PlantaExternaModel[]> = new BehaviorSubject<PlantaExternaModel[]>([]);

  constructor(private http: HttpClient) { }

  get data(): PlantaExternaModel[] {
    return this.dataChange.value;
  }
   
  
  getPlantaExternaAll(param:any):void{    
    this.http.post<PlantaExternaModel[]>('/moneda/findAll',param).subscribe(data => {
      let data_:PlantaExternaModel[]=[];
      
      for(let a=0; a < 100; a++){
        
        data_.push({
            selected:false,accion:'BEFQ',circuito:'838017',operacion:'BAJA EQUIPO',
            item:(a+1).toString(),cantidad:'1',clasificacion:'NO ESTANDAR',tipo:'ROUTER',
            marca:'CISCO',fabricante:'77091',modelo:'CISCO 2500-2600',
            descripcion:'ROUTER TELDAD C1 L', serie:'706/53112',propiedad:'ALQUILER'
        });
      }
      this.dataChange.next(data_);
    });    
  }
  
  
}