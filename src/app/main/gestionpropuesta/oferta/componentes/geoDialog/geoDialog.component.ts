import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeocodeService } from './geocode.service';
import { locatioModel } from './location-model';
declare var google: any;
//https://stackblitz.com/edit/angular-google-maps-demo?file=app%2Fapp.component.html

@Component({
    selector: 'GaoDialog',
    templateUrl: 'geoDialog.component.html',
    styleUrls: ['geoDialog.component.css'],
})
export class GeodialogComponent {    
    locationGobal: locatioModel[] = [];    
    lat: number = 51.678418;//Seteamo valores por default
    lng: number = 7.809007;//Seteamo valores por default
    zoom: number;
    public pickedLat: number;
    public pickedLon: number;     
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<GeodialogComponent>,
        private geocodeService: GeocodeService,
        private ref: ChangeDetectorRef,
    ) {
        if (data) {        
        }
    }
    ngOnInit(): void {
        if (this.pickedLat < 1) this.pickedLat = this.lat;
        if (this.pickedLon < 1) this.pickedLon = this.lng;
        let variable: any = this.data;      

    //    var locationmodel = new locatioModel() ;
    //    locationmodel.lat=-11.9904611,
    //    locationmodel.lng=-77.09691,
    //    locationmodel.label="Estoy Aqui",
    //    locationmodel.draggable=true,
    //    this.locationGobal.push(locationmodel);        


        //falta agregar el metodo de spinner
        //this.loading = true;
        this.geocodeService.geocodeAddress(variable.direccion).subscribe((location: Location) => {            
            let locat: any = location;
            this.pickedLat = locat.lat;
            this.pickedLon = locat.lng;

            // var locationmodel = new locatioModel() ;
            // locationmodel.lat=locat.lat,
            // locationmodel.lng=-locat.lng,
            // locationmodel.label="Estoy Aqui",
            // locationmodel.draggable=true,
            // this.locationGobal.push(locationmodel); 
            
            this.zoom = 17;
            // this.loading = false;
            this.ref.detectChanges();
        });
    }
    markerDragEnd(event) {
        this.pickedLat = event.coords.lat;
        this.pickedLon = event.coords.lng;
    }
}