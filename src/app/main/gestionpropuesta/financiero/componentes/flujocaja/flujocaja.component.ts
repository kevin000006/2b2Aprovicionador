import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FlujoCajaService } from './flujocaja.service';
import * as Cookies from 'js-cookie';
@Component({
  selector: 'FlujoCaja',
  templateUrl: './flujocaja.component.html',
  styleUrls: ['./flujocaja.component.css'],
})
export class FlujoCajaComponent implements OnInit {
  ofertaBase = { id: 0 };
  currentUser: any = { nombres: '', apellidos: '', nombrecorto: '' };
  columns:any;
  displayedColumns:any;
  widthTabla:number;
  dataSource:any;
  constructor(
    private _decimalPipe: DecimalPipe, 
    private servicioFlujoCaja: FlujoCajaService,
    private _router: Router,
    ) { }
  ngOnInit(): void {         
    if (Cookies.get('currentUser') === undefined) {
        this._router.navigate(['pages/auth/login-2'], { state: {} });
    }
    else {
        if (window.sessionStorage.getItem('oferta') != null) {
            this.ofertaBase = JSON.parse(window.sessionStorage.getItem('oferta'));
        }        
    }
    this.servicioFlujoCaja.Obtenerflujocaja(this.ofertaBase.id).subscribe(data => {       
      if(data !=null){
        var contador = 0;
        this.columns = data.filter((item) => { return item.concepto_id == 0; }).map((item) => {
          contador++
          if (contador == 1) {
            return {
              columnDef: "tipo",
              header: "Tipo",
              width: true,
              cell: (element: any) => `${element.nombre}`
            }
          } else {
            return {
              columnDef: "periodo" + item.periodo,
              width: false,
              header: this.RetornarNombreMeses(item.mes) + "-" + item.anio.toString().substr(2, 4),
              cell: (element: any) => {
                if (`${element["periodo" + item.periodo]}` === 'undefined' || `${element["periodo" + item.periodo]}` === '-') {
                  return '-';
                } else {
                  return this._decimalPipe.transform(element["periodo" + item.periodo], "1.2-2")
                }
              }
            }
          }
        });
        this.displayedColumns = this.columns.map(c => c.columnDef);
        this.widthTabla = (this.columns.length * 100) + 150;  
        this.dataSource = this.getPivotArray(data.filter((item) => { return item.concepto_id !== 0; }), "nombre", "periodo", "montosoles");
        console.log(this.dataSource );
      }
    });    
  }
  RetornarNombreMeses(NroMeses): string {
    var nombreMeses = "";
    switch (NroMeses) {
      case 1:
        nombreMeses = "Ene";
        break;
      case 2:
        nombreMeses = "Feb";
        break;
      case 3:
        nombreMeses = "Mar";
        break;
      case 4:
        nombreMeses = "Abr";
        break;
      case 5:
        nombreMeses = "May";
        break;
      case 6:
        nombreMeses = "Jun";
        break;
      case 7:
        nombreMeses = "Jul";
        break;
      case 8:
        nombreMeses = "Ago";
        break;
      case 9:
        nombreMeses = "Set";
        break;
      case 10:
        nombreMeses = "Oct";
        break;
      case 11:
        nombreMeses = "Nov";
        break;
      case 12:
        nombreMeses = "Dic";
        break;
    }

    return nombreMeses;
  }
  getPivotArray(dataArray, rowIndex, colIndex, dataIndex): any[] {
    var result = {}, ret = [];
    var newCols = [];
    for (var i = 0; i < dataArray.length; i++) {
      if (!result[dataArray[i][rowIndex]]) {
        result[dataArray[i][rowIndex]] = {};
      }
      result[dataArray[i][rowIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];

      //To get column names
      if (newCols.indexOf(dataArray[i][colIndex]) == -1) {
        newCols.push(dataArray[i][colIndex]);
      }
    }
    newCols.sort();
    //Add content 
    for (var key in result) {
      var item = {};
      item[rowIndex] = key;
      //item["width"] = "220px";
      for (var i = 0; i < newCols.length; i++) {
        item[colIndex + newCols[i]] = result[key][newCols[i]] || "-";
      }
      ret.push(item);
    }
    return ret;
  }
}