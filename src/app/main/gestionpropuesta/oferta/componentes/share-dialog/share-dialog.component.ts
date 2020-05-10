import { Globals } from '../../../../../globals'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { OfertaService } from '../../oferta.service';
import { Guid } from "guid-typescript";


@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {

  urlShared: string = '';

  constructor(public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ofertaService: OfertaService) { }

  ngOnInit(): void {
  }


  obtenerUrl(): void {
    let codigo = Guid.create().toString();

    this.urlShared = "procesando....";
    codigo = codigo.split('-').join('');
    let _urlShare = Globals.webURL + '/shared/' + codigo;

    let param = {
      codigo: codigo,
      url: '/gestion-propuesta/oferta',
      data: JSON.stringify(this.data)
    };

    this.ofertaService.generarUrl(param).subscribe(data => {

      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = _urlShare;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      this.urlShared = _urlShare;
    });

  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
