import { Component, OnInit } from '@angular/core';
import { SubirTramaService } from './subirTrama.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ModelMaestras } from './ModelMaestras';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-bandeja',
  templateUrl: './subirTrama.component.html',
  animations: fuseAnimations,
  styleUrls: ['./subirTrama.component.css']
})

export class SubirTramaComponent implements OnInit {

  loading = false;
  state$: Observable<object>;
  usuario: Object;
  lista: ModelMaestras[] = [];
  filedata: File;
  fromDatosGenerales: FormGroup;

  cboMaestraCtrl: FormControl;
  FileCtrl: FormControl;

  constructor(
    private subirTramaService: SubirTramaService,
    public activatedRoute: ActivatedRoute,
    private _snack: MatSnackBar
  ) {
  }
  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('u'));
    this.cboMaestraCtrl = new FormControl('', [Validators.required]);
    this.FileCtrl = new FormControl('', [Validators.required]);


    this.fromDatosGenerales = new FormGroup({
      cboMaestra: this.cboMaestraCtrl,
      File: this.FileCtrl
    });

    this.lista.push(new ModelMaestras("1", "Maestra Acceso", "acceso"));
    this.lista.push(new ModelMaestras("2", "Maestra Equipo", "equipo"));
    this.lista.push(new ModelMaestras("3", "Maestra Tarifa", "tarifa"));
    this.lista.push(new ModelMaestras("4", "Maestra Cliente", "cliente"));
    this.state$ = window.history.state;
  }
  fileProgress(fileInput: any): void {
    this.filedata = <File>fileInput.target.files[0];
  }
  async  clickGuardar() {
    this.loading = true;
    if (!this.fromDatosGenerales.valid)
      return;

    const uuid = this.subirTramaService.generateUUID();
    const filename = uuid + "." + this.filedata.name.split(".").reverse()[0];
    const responseAzureStorage = await this.subirTramaService.uploadFile(this.filedata, filename);
    let entidad: any = {
      usuario: Object(this.usuario)["id"].toString(),
      tipo: this.fromDatosGenerales.value.cboMaestra.id,
      url: responseAzureStorage._response.request.url,
      fecha: new Date().toString(),
      entity: this.fromDatosGenerales.value.cboMaestra.descripcion
        //falta completar esta linea y validar 
    };
    console.log(entidad);
    await this.subirTramaService.GuardarArchivo(entidad).subscribe(res => {
      this.loading = false;
      this._snack.open('Se registro un total de ' + res.totalRecord + 'filas.', 'Ok', {
        duration: 2000,
      });
    });
    this.fromDatosGenerales.reset({
      cboMaestra: '',
      File: ''     
    });
  }
}
