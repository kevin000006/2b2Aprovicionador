import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component,Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {BandejaModel,ClienteModel, EstadoModel} from '../../models/oferta';
import {BandejaService} from '../../bandeja/bandeja.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddDialogComponent {

  title = "Agregar Oferta";
  lstCliente= new Array<ClienteModel>();
  lstEstado= new Array<EstadoModel>();
  dato = new BandejaModel();

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private bandejaService : BandejaService) { 

                console.log(data.data);
                if(data.data.id > 0){
                  this.title= "Modificar Oferta";
                }
                this.lstEstado = data.lstEstado;
                this.lstCliente = data.lstCliente;
                this.dato = data.data;
              
  }

  compareEstado(c1: any, c2:any): boolean {     
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'requerido' :
      this.formControl.hasError('email') ?  'email no valido' :
        '';
  }

    submit() {
      // emppty stuff
      }

    confirmAdd(){

      

      this.bandejaService.newOferta(this.dato).subscribe(res => { });
     // console.log(this.dato);

    }
   

}
