import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FileInputService } from '../fileinput/fileinput.service';
import { catchError, map } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { AlertSuccessComponent } from '../alertSuccess/alertSuccess.component';
import { of } from 'rxjs';
import { SubirTramaService } from '../../../subirTrama/subirTrama.service';

@Component({
  selector: 'FileInput',
  templateUrl: './fileinput.component.html',
  styleUrls: ['./fileinput.component.css'],
})
//https://www.ahmedbouchefra.com/angular/angular-9-8-tutorial-example-upload-files-with-formdata-httpclient-rxjs-and-material-progressbar/
export class FileInputComponent implements OnInit {
  showSpinner: boolean;
  color: ThemePalette = 'warn';
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  IdOferta : string;
  usuario: { nombres: '', apellidos: '', id: 0 };
  public listArchivo: any = [];
  public listRespnse: any = [];
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;

  constructor(
    private subirTrama: SubirTramaService,
    private fileInputService: FileInputService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FileInputComponent>
  ) {
    if (data) {
      this.IdOferta =  data.id;
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }
  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('u'));
    this.showSpinner = true;
    var requestListarFies = {
      modulo_id: this.IdOferta,
      usuario_id: this.usuario.id
    };
    this.fileInputService.listFilesContainers(requestListarFies).subscribe((res: any) => {
      debugger;
      if (res != null)
        this.listArchivo = res;
      this.showSpinner = false;
    });
  }
  deleteFile(item: any): void {
    const dialogRef = this.dialog.open(AlertConfirmComponent, {
      width: '450px',
      data: {
        message: '¿Esta seguro que desea eliminar el archivo?',
        buttonText: {
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        if (item.adjunto_id == 0) {//Eliminanos el objecto que esta en memoria
          var ObjectIndex = this.listArchivo.findIndex(function (obj) { return obj.id === item.id; });//Obtenemos el Index del List del Objeto     
          this.listArchivo.splice(ObjectIndex, 1);
        } else {//Eliminamos el objecto que esta registrado en el sistema
          this.fileInputService.deleteFileContainers(item.adjunto_id).subscribe((res: any) => {
            var ObjectIndex = this.listArchivo.findIndex(function (obj) { return obj.id === item.id; });//Obtenemos el Index del List del Objeto     
            this.listArchivo.splice(ObjectIndex, 1);
            this.dialog.open(AlertSuccessComponent, {
              width: '700px',
              data: {
                message: 'Se elimino correctamente!',
                buttonText: { ok: 'Aceptar' }
              }
            });
          });
        }
      }
    });
  }
  descargar(item: any): void {
    this.subirTrama.downloadBlobl(item.archivo_nombre);
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        console.log(this.usuario);
        this.listArchivo.push({
          id: this.listArchivo.length > 0 ? this.listArchivo[0].id + 1 : this.listArchivo.length + 1, // por revisar el ordenamiento 
          adjunto_id: "",
          nombre: file.name,
          createdDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss a'),
          adjuntoUsuario: this.usuario.nombres + " " + this.usuario.apellidos,
          tx_tamanioArchivo: this.bytesToSize(file.size),
          file: file,
          inProgress: false, //Si esta el false el progreebar estara ocultado si es true el progressbar se mostrara
          progress: 0,
          usuario: this.usuario,
          idUsuario: this.usuario.id.toString()
        });
      }
      this.listArchivo.sort(this.compareValues('id', 'desc'));
      console.log(this.listArchivo);
    };
    fileUpload.click();
  }
  onCancelcick(): void {
    this.dialogRef.close();
  }
  btnGuardarArchivo() {
    var listArchivosAGuardar = this.listArchivo.filter(function (el) { return el.adjunto_id == ""; });//obtenemos los elementos que guardaremos en la base de datos
    listArchivosAGuardar.forEach(obj => {
      debugger;
      obj.inProgress = true;
      const formData = new FormData();
      formData.append('file', obj.file);
      formData.append('usuario_id', obj.idUsuario);
      formData.append('modulo_id', this.IdOferta);
      this.fileInputService.uploadToContainers(formData).pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              obj.progress = Math.round(event.loaded * 100 / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          obj.inProgress = false;
          return of(`${obj.name} fallo la cargar.`);
        })
      ).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          this.listRespnse.push(event.body);
          if (this.listRespnse.length == listArchivosAGuardar.length) {//si la carga ha sido satisfactorio
            setTimeout(() => { this.dialogRef.close(true); }, 1000);// el modal se ocultara en 2 segundos           
          }
        }
      });
    });
  }
  private bytesToSize(bytes): String {
    var sizes = ['n/a', 'bytes', 'Kb', 'Mb', 'Gb', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var i = +Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + ' ' + sizes[isNaN(bytes) ? 0 : i + 1];
  }

  private compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
}