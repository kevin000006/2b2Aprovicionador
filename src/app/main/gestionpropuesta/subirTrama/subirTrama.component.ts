import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubirTramaService } from './subirTrama.service';
import { BandejaModel, ClienteModel, EstadoModel } from '../models/oferta';
import { ModelMaestras } from './ModelMaestras';
import { AddDialogComponent } from '../dialogs/add/add.component'
import { DeleteDialogComponent } from '../dialogs/delete/delete.component'
import { fuseAnimations } from '@fuse/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bandeja',
  templateUrl: './subirTrama.component.html',
  animations: fuseAnimations,
  styleUrls: ['./subirTrama.component.css']
})

export class SubirTramaComponent implements OnInit {
  state$: Observable<object>;  
  lista:ModelMaestras[]=[];
  filedata: File;

  constructor(
    private subirTramaService: SubirTramaService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute
  ) {  
  }

  fileProgress(fileInput: any): void {
    this.filedata = <File>fileInput.target.files[0];
  }
  clickGuardar(): void {
    const formData = new FormData();
    formData.append('file', this.filedata);
    this.subirTramaService.GuardarArchivo(formData).subscribe(
      (res) => {
        // if (res.Status == "OK") {
        //     var listGaleria = JSON.parse(res.DataJson)
        //     this.listarGaleria(listGaleria);
        // }
      }
    );
  }
  ngOnInit(): void {   
    this.lista.push(new ModelMaestras("1","Maestra 1","ciudad al lado del mar"))
    this.lista.push(new ModelMaestras("2","Maestra 2","ciudad gastronomica"))
    this.lista.push(new ModelMaestras("3","Maestra 2","ciudad cultural"))
  }
}
