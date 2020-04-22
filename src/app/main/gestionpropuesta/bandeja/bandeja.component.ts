import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {BandejaService} from './bandeja.service';
import {BandejaModel, ClienteModel, EstadoModel} from '../models/oferta';
import {AddDialogComponent} from '../dialogs/add/add.component'
import {DeleteDialogComponent} from '../dialogs/delete/delete.component'
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  animations: fuseAnimations,
  styleUrls: ['./bandeja.component.scss']
})

export class BandejaComponent implements OnInit {

  lstBandeja= new Array<BandejaModel>();
  lstCliente= new Array<ClienteModel>();
  lstEstado= new Array<EstadoModel>();
  checked = false;

  displayedColumns: string[] = ['menu','codigo','version','oportunidad','cliente','descripcion','estado'];
  constructor(private bandejaService : BandejaService, public dialog : MatDialog) { 

   

    this.bandejaService.getClienteAll()
    .subscribe( data => this.lstCliente = data);

    this.bandejaService.getEstadoAll()
    .subscribe( data => this.lstEstado = data);

    this.getofertasAll();

  }
 
  getofertasAll():void{
    this.bandejaService.getBandejaAll()
    .subscribe(data => this.lstBandeja = data);
  }

  addNew():void{
  
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data:{
        data:new BandejaModel(),
        lstCliente: this.lstCliente,
        lstEstado: this.lstEstado
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getofertasAll();
      }
    });

  }
  
  editItem(oferta:BandejaModel):void{

    console.log(oferta);
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data:{
        data:oferta,
        lstCliente: this.lstCliente,
        lstEstado: this.lstEstado
      } 
      } );

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getofertasAll();
      }
    });      
  }

  deleteItem(oferta:BandejaModel):void{
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: oferta
      } );

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getofertasAll();
      }
    });
  }



  ngOnInit(): void {
  }

}
