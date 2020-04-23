import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubirTramaService } from './subirTrama.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { BandejaModel, ClienteModel, EstadoModel } from '../models/oferta';
import { ModelMaestras } from './ModelMaestras';
import { AddDialogComponent } from '../dialogs/add/add.component'
import { DeleteDialogComponent } from '../dialogs/delete/delete.component'
import { fuseAnimations } from '@fuse/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-bandeja',
  templateUrl: './subirTrama.component.html',
  animations: fuseAnimations,
  styleUrls: ['./subirTrama.component.css']
})

export class SubirTramaComponent implements OnInit {
  usuario: Object;
  lista: ModelMaestras[] = [];
  filedata: File;
  fromDatosGenerales: FormGroup;

  cboMaestraCtrl: FormControl;
  FileCtrl: FormControl;

  constructor(
    private subirTramaService: SubirTramaService,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    debugger;
    this.usuario = JSON.parse(localStorage.getItem('u'));
    this.cboMaestraCtrl = new FormControl('', [Validators.required]);
    this.FileCtrl = new FormControl('', [Validators.required]);


    this.fromDatosGenerales = new FormGroup({
      cboMaestra: this.cboMaestraCtrl,
      File: this.FileCtrl
    });

    this.lista.push(new ModelMaestras(1, "Clientes", "Valtx"));
    this.lista.push(new ModelMaestras(2, "Ofertas", "Valtx"));
  }
  fileProgress(fileInput: any): void {
    this.filedata = <File>fileInput.target.files[0];
  }

  async  clickGuardar() {
    if (!this.fromDatosGenerales.valid)
      return;

    const uuid = this.subirTramaService.generateUUID();
    const filename = uuid + "." + this.filedata.name.split(".").reverse()[0];
    const responseAzureStorage = await this.subirTramaService.uploadFile(this.filedata, filename);
    debugger;
    let entidad: any = {
      idusuario: Object(this.usuario)["id"],
      idmaestra: this.fromDatosGenerales.value.cboMaestra,
      url: responseAzureStorage._response.request.url,
      fecha: new Date()
    };
    await this.subirTramaService.GuardarArchivo(entidad);
    this.fromDatosGenerales.reset({
      cboMaestra: '',
      File: ''
    });
  }
}
