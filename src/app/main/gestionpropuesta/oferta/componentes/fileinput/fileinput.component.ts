import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'FileInput',
  templateUrl: './fileinput.component.html',
  styleUrls: ['./fileinput.component.css'],
})
//https://www.ahmedbouchefra.com/angular/angular-9-8-tutorial-example-upload-files-with-formdata-httpclient-rxjs-and-material-progressbar/
export class FileInputComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  usuario: Object;
  public listArchivo: any = [];
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;  

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FileInputComponent>) {
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
  }
  deleteFile(id: number): void {
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
        var ObjectIndex = this.listArchivo.findIndex(function (obj) { return obj.id === id; });//Obtenemos el Index del List del Objeto     
        this.listArchivo.splice(ObjectIndex, 1);
      }
    });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        //this.files.push({ data: file, inProgress: false, progress: 0 });
        var tamanoarchivo = Math.round((file.size / 1024));        
        this.listArchivo.push({
          id: this.listArchivo.length + 1,
          tx_nombre_archivo: file.name,
          tx_extension_archivo: file.type.split(".")[1],//obtenemos la extension del archivo
          tx_fechacrea: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
          tx_horacrea: this.datePipe.transform(new Date(), 'hh:mm:ss a'),
          usuario: this.usuario,
          tx_tamanioArchivo: this.bytesToSize(file.size),
          // inProgress: false, 
          // progress: 0
        });
      }      
    };
    fileUpload.click();
  }
  onCancelcick(): void {
    this.dialogRef.close();
  }
  btnGuardarARchivo(): void {
    // const formData = new FormData();
    // formData.append('file', file.data);
    // file.inProgress = true;
    // this.uploadService.upload(formData).pipe(  
    //   map(event => {  
    //     switch (event.type) {  
    //       case HttpEventType.UploadProgress:  
    //         file.progress = Math.round(event.loaded * 100 / event.total);  
    //         break;  
    //       case HttpEventType.Response:  
    //         return event;  
    //     }  
    //   }),  
    //   catchError((error: HttpErrorResponse) => {  
    //     file.inProgress = false;  
    //     return of(`${file.data.name} upload failed.`);  
    //   })).subscribe((event: any) => {  
    //     if (typeof (event) === 'object') {  
    //       console.log(event.body);  
    //     }  
    //   });  
    this.dialogRef.close(true);
  }
  private bytesToSize(bytes): String {
    var sizes = ['n/a', 'bytes', 'Kb', 'Mb', 'Gb', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var i = +Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + ' ' + sizes[isNaN(bytes) ? 0 : i + 1];
  }  
  
}

