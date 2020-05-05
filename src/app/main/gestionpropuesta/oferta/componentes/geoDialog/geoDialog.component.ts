import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioModel } from 'app/model/Usuario';
import { Router } from '@angular/router';

export interface GeoDlgData {
    direccion: string;
    lat: string;
    lng: string;
  }

@Component({
    selector: 'GaoDialog',
    templateUrl: 'geoDialog.component.html',
    styleUrls: ['geoDialog.component.css'],
})
export class GeodialogComponent {
    message: string = "Hola soy la geolocacion?"
    lat: number = 51.678418;
    lng: number = 7.809007;
    public pickedLat: number;
    public pickedLon: number;

    // confirmButtonText = "Yes"
    // cancelButtonText = "Cancel"
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: GeoDlgData,
        private dialogRef: MatDialogRef<GeodialogComponent>) {
        if (data) {
            // this.message = data.message || this.message;
            // if (data.buttonText) {
            //     this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
            //     this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            // }
        }
    }

    ngOnInit(): void {
        if (this.pickedLat < 1) this.pickedLat = this.lat;
        if (this.pickedLon < 1) this.pickedLon = this.lng;
    }  

    // onConfirmClick(): void {
    //     this.dialogRef.close(true);
    // }
    onMapClick(event): void{
        this.pickedLat = event.coords.lat;
        this.pickedLon = event.coords.lng;
    }
}

