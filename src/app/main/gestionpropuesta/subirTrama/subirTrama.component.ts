import { Component, OnInit } from '@angular/core';
import { SubirTramaService } from './subirTrama.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModelMaestras } from './ModelMaestras';
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
  lista: ModelMaestras[] = [];
  filedata: File;
  fromDatosGenerales: FormGroup;
  panelOpenState = false;
  cboMaestraCtrl: FormControl;
  FileCtrl: FormControl;

  constructor(
    private subirTramaService: SubirTramaService,
    public activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {

    this.cboMaestraCtrl = new FormControl('', [Validators.required]);
    this.FileCtrl = new FormControl('', [Validators.required]);


    this.fromDatosGenerales = new FormGroup({
      cboMaestra: this.cboMaestraCtrl,
      File: this.FileCtrl
    });

    this.lista.push(new ModelMaestras("1", "Maestra 1", "ciudad al lado del mar"));
    this.lista.push(new ModelMaestras("2", "Maestra 2", "ciudad gastronomica"));
    this.lista.push(new ModelMaestras("3", "Maestra 2", "ciudad cultural"));
    this.state$ = window.history.state;
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
    let entidad: any = {
      Usuario: this.state$,
      IdMaestra: "",
      UrlFile: responseAzureStorage._response.request.url
    };
    await this.subirTramaService.GuardarArchivo(entidad);
    this.fromDatosGenerales.reset({
      cboMaestra: '',
      File: ''     
    });
  }
}
