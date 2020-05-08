import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FileInputService } from '../fileinput/fileinput.service';
import { catchError, map } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { of } from 'rxjs';
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
  usuario: { nombres: '', apellidos: '' };
  public listArchivo: any = [];
  public listRespnse: any = [];
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;

  constructor(
    private fileInputService: FileInputService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FileInputComponent>
  ) {
    if (data) {
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
    this.fileInputService.listFilesContainers().subscribe((res: any) => {
      this.listArchivo = res;
      this.showSpinner = false;
    });
  }
  deleteFile(item: any): void {
    debugger;
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
        if (item.archivoId.trim() == "") {//Eliminanos el objecto que esta en memoria
          var ObjectIndex = this.listArchivo.findIndex(function (obj) { return obj.id === item.id; });//Obtenemos el Index del List del Objeto     
          this.listArchivo.splice(ObjectIndex, 1);
        } else {//Eliminamos el objecto que esta registrado en el sistema
          this.fileInputService.deleteFileContainers(item.archivoId).subscribe((res: any) => {
            debugger;
            var ObjectIndex = this.listArchivo.findIndex(function (obj) { return obj.id === item.id; });//Obtenemos el Index del List del Objeto     
            this.listArchivo.splice(ObjectIndex, 1);

            this.dialog.open(AlertConfirmComponent, {
              width: '450px',
              data: {
                message: 'Se elimino correctamente!',
                buttonText: {
                  ok: 'Aceptar'
                }
              }
            });

          });
        }
      }
    });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        var tamanoarchivo = Math.round((file.size / 1024));
        this.listArchivo.push({
          id: this.listArchivo.length + 1,
          archivoId: "",
          archivoNombre: file.name,
          createdDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss a'),
          adjuntoUsuario: this.usuario,
          tx_tamanioArchivo: this.bytesToSize(file.size),
          file: file,
          inProgress: false, //Si esta el false el progreebar estara ocultado si es true el progressbar se mostrara
          progress: 0
        });
      }
    };
    fileUpload.click();
  }
  onCancelcick(): void {
    this.dialogRef.close();
  }
  btnGuardarArchivo() {
    this.listArchivo.forEach(obj => {
      obj.inProgress = true;
      const formData = new FormData();
      formData.append('file', obj.file);
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
        debugger;
        if (typeof (event) === 'object') {
          this.listRespnse.push(event.body);
          if (this.listRespnse.length == this.listArchivo.length) {
            console.log("carga satifactoriao");
          }
        }
      });
      // this.uploadFile(file);  
    });
    //this.dialogRef.close(true);
  }
  private bytesToSize(bytes): String {
    var sizes = ['n/a', 'bytes', 'Kb', 'Mb', 'Gb', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var i = +Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + ' ' + sizes[isNaN(bytes) ? 0 : i + 1];
  }

}

