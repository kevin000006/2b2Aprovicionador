import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'FileInput',
    templateUrl: './fileinput.component.html',
    styleUrls: ['./fileinput.component.css'],
})
export class FileInputComponent {
    message: string = "Are you sure?"
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    constructor(
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
    deleteFile(): void {
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
            // this.dataSource.data.splice(this.dataSource.data.indexOf(item.id), 1);
            // this.dataSource = new MatTableDataSource<ServicioElement>(dataSourceList);
          }
        });
      }
    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
    onCancelcick(): void {
        this.dialogRef.close();
    }    
}

