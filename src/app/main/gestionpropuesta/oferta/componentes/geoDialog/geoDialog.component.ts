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
        
    }
    ngOnInit(): void {
        if ((this.data.latitud == 0) || (this.data.longitud == 0)){
            let variable: any = this.data;
            this.geocodeService.geocodeAddress(variable.direccion).subscribe((location: Location) => {            
                //console.log("doing this ...");
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
                this.ref.detectChanges();
            });
        }else{
            this.pickedLat = this.data.latitud;
            this.pickedLon = this.data.longitud;
            this.zoom = 17;
            this.ref.detectChanges();
        }

    //    var locationmodel = new locatioModel() ;
    //    locationmodel.lat=-11.9904611,
    //    locationmodel.lng=-77.09691,
    //    locationmodel.label="Estoy Aqui",
    //    locationmodel.draggable=true,
    //    this.locationGobal.push(locationmodel);        


        //falta agregar el metodo de spinner
        //this.loading = true;
        
    }

    closeDialog():void{
        this.dialogRef.close({lat:this.pickedLat,lng:this.pickedLon});
    }

    markerDragEnd(event) {
        this.pickedLat = event.coords.lat;
        this.pickedLon = event.coords.lng;
    }
}