import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FlujoCajaService } from './flujocaja.service';
@Component({
  selector: 'FlujoCaja',
  templateUrl: './flujocaja.component.html',
  styleUrls: ['./flujocaja.component.css'],
})
export class FlujoCajaComponent implements OnInit {

  // columns = dataSourceList.filter((item) => { return item.concepto_id == 0; }).map((item) => {
  //   if (item.nombre == "tipo") {
  //     return {
  //       columnDef: item.nombre,
  //       header: "Tipo",
  //       width: true,
  //       cell: (element: any) => `${element.nombre}`
  //     }
  //   } else {
  //     return {
  //       columnDef: "periodo" + item.periodo,
  //       width: false,
  //       header: this.RetornarNombreMeses(item.mes) + "-" + item.anio.toString().substr(2, 4),
  //       cell: (element: any) => {
  //         if (`${element["periodo" + item.periodo]}` === 'undefined' || `${element["periodo" + item.periodo]}` === '-') {
  //           return '-';
  //         } else {
  //           return this._decimalPipe.transform(element["periodo" + item.periodo], "1.2-2")
  //         }
  //       }
  //     }
  //   }
  // });
  // displayedColumns = this.columns.map(c => c.columnDef);
  // widthTabla = (this.columns.length * 100) + 150;  
  // dataSource = this.getPivotArray(dataSourceList.filter((item) => { return item.concepto_id !== 0; }), "nombre", "periodo", "montosoles");

  columns:any;
  displayedColumns:any;
  widthTabla:number;
  dataSource:any;
  constructor(
    private _decimalPipe: DecimalPipe, 
    private servicioFlujoCaja: FlujoCajaService,) { }
  ngOnInit(): void {
    
    this.servicioFlujoCaja.Obtenerflujocaja(2).subscribe(data => { 
      console.log(data);
      if(data !=null){
        this.columns = dataSourceList.filter((item) => { return item.concepto_id == 0; }).map((item) => {
          if (item.nombre == "tipo") {
            return {
              columnDef: item.nombre,
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
        this.dataSource = this.getPivotArray(dataSourceList.filter((item) => { return item.concepto_id !== 0; }), "nombre", "periodo", "montosoles");
      }
    });
    // debugger;
    //var output = this.getPivotArray(dataSourceList.filter((item) => { return item.concepto_id !== 0; }), "nombre", "periodo", "montosoles");    
    // console.log(ELEMENT_DATA);
    //console.log(output);
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
const dataSourceList: FlujoCajaElement[] = [

  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 0, anio: 0, mes: 0, montosoles: 0, montodolares: 0, nombre: 'tipo' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 1, anio: 2020, mes: 5, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 2, anio: 2020, mes: 6, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 3, anio: 2020, mes: 7, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 4, anio: 2020, mes: 8, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 5, anio: 2020, mes: 9, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 6, anio: 2020, mes: 10, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 7, anio: 2020, mes: 11, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 8, anio: 2020, mes: 12, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 9, anio: 2021, mes: 1, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 10, anio: 2021, mes: 2, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 11, anio: 2021, mes: 3, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 12, anio: 2021, mes: 4, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 13, anio: 2021, mes: 5, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 14, anio: 2021, mes: 6, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 0, periodo: 15, anio: 2021, mes: 7, montosoles: 0, montodolares: 0, nombre: 'null' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 4, anio: 2020, mes: 8, montosoles: 6, montodolares: 228571, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 5, anio: 2020, mes: 9, montosoles: 7, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 6, anio: 2020, mes: 10, montosoles: 8, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 7, anio: 2020, mes: 11, montosoles: 9, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 8, anio: 2020, mes: 12, montosoles: 10, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 9, anio: 2021, mes: 1, montosoles: 11, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 10, anio: 2021, mes: 2, montosoles: 12, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 11, anio: 2021, mes: 3, montosoles: 13, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 12, anio: 2021, mes: 4, montosoles: 14, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 13, anio: 2021, mes: 5, montosoles: 15, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 14, anio: 2021, mes: 6, montosoles: 16, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 100, periodo: 15, anio: 2021, mes: 7, montosoles: 17, montodolares: 2, nombre: 'INGRESOS' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 101, periodo: 4, anio: 2020, mes: 8, montosoles: 1, montodolares: 28571, nombre: 'Ingreso Unico' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 4, anio: 2020, mes: 8, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 5, anio: 2020, mes: 9, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 6, anio: 2020, mes: 10, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 7, anio: 2020, mes: 11, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 8, anio: 2020, mes: 12, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 9, anio: 2021, mes: 1, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 10, anio: 2021, mes: 2, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 11, anio: 2021, mes: 3, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 12, anio: 2021, mes: 4, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 13, anio: 2021, mes: 5, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 14, anio: 2021, mes: 6, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 102, periodo: 15, anio: 2021, mes: 7, montosoles: 7, montodolares: 2, nombre: 'Ingreso Recurente' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 4, anio: 2020, mes: 8, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 5, anio: 2020, mes: 9, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 6, anio: 2020, mes: 10, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 7, anio: 2020, mes: 11, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 8, anio: 2020, mes: 12, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 9, anio: 2021, mes: 1, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 10, anio: 2021, mes: 2, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 11, anio: 2021, mes: 3, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 12, anio: 2021, mes: 4, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 13, anio: 2021, mes: 5, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 14, anio: 2021, mes: 6, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 203, periodo: 15, anio: 2021, mes: 7, montosoles: 2884185, montodolares: 82405286, nombre: '3.5 Ghz' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 4, anio: 2020, mes: 8, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 5, anio: 2020, mes: 9, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 6, anio: 2020, mes: 10, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 7, anio: 2020, mes: 11, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 8, anio: 2020, mes: 12, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 9, anio: 2021, mes: 1, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 10, anio: 2021, mes: 2, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 11, anio: 2021, mes: 3, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 12, anio: 2021, mes: 4, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 13, anio: 2021, mes: 5, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 14, anio: 2021, mes: 6, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 205, periodo: 15, anio: 2021, mes: 7, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 4, anio: 2020, mes: 8, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 5, anio: 2020, mes: 9, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 6, anio: 2020, mes: 10, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 7, anio: 2020, mes: 11, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 8, anio: 2020, mes: 12, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 9, anio: 2021, mes: 1, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 10, anio: 2021, mes: 2, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 11, anio: 2021, mes: 3, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 12, anio: 2021, mes: 4, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 13, anio: 2021, mes: 5, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 14, anio: 2021, mes: 6, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 206, periodo: 15, anio: 2021, mes: 7, montosoles: 387072, montodolares: 110592, nombre: 'Seg sat VSAT  (Internet) No Stock  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 4, anio: 2020, mes: 8, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 5, anio: 2020, mes: 9, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 6, anio: 2020, mes: 10, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 7, anio: 2020, mes: 11, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 8, anio: 2020, mes: 12, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 9, anio: 2021, mes: 1, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 10, anio: 2021, mes: 2, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 11, anio: 2021, mes: 3, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 12, anio: 2021, mes: 4, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 13, anio: 2021, mes: 5, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 14, anio: 2021, mes: 6, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 207, periodo: 15, anio: 2021, mes: 7, montosoles: 1194375, montodolares: 34125, nombre: 'Seg sat Clear Channel  Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 4, anio: 2020, mes: 8, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 5, anio: 2020, mes: 9, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 6, anio: 2020, mes: 10, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 7, anio: 2020, mes: 11, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 8, anio: 2020, mes: 12, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 9, anio: 2021, mes: 1, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 10, anio: 2021, mes: 2, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 11, anio: 2021, mes: 3, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 12, anio: 2021, mes: 4, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 13, anio: 2021, mes: 5, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 14, anio: 2021, mes: 6, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 208, periodo: 15, anio: 2021, mes: 7, montosoles: 290304, montodolares: 82944, nombre: 'Seg sat VSAT  (IP VPN) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 4, anio: 2020, mes: 8, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 5, anio: 2020, mes: 9, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 6, anio: 2020, mes: 10, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 7, anio: 2020, mes: 11, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 8, anio: 2020, mes: 12, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 9, anio: 2021, mes: 1, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 10, anio: 2021, mes: 2, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 11, anio: 2021, mes: 3, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 12, anio: 2021, mes: 4, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 13, anio: 2021, mes: 5, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 14, anio: 2021, mes: 6, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 209, periodo: 15, anio: 2021, mes: 7, montosoles: 774144, montodolares: 221184, nombre: 'Seg sat VSAT  (Internet) Residual  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 4, anio: 2020, mes: 8, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 5, anio: 2020, mes: 9, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 6, anio: 2020, mes: 10, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 7, anio: 2020, mes: 11, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 8, anio: 2020, mes: 12, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 9, anio: 2021, mes: 1, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 10, anio: 2021, mes: 2, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 11, anio: 2021, mes: 3, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 12, anio: 2021, mes: 4, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 13, anio: 2021, mes: 5, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 14, anio: 2021, mes: 6, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 221, periodo: 15, anio: 2021, mes: 7, montosoles: 116122, montodolares: 3317771, nombre: 'Mantenimiento Servicio Satelital  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 4, anio: 2020, mes: 8, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 5, anio: 2020, mes: 9, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 6, anio: 2020, mes: 10, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 7, anio: 2020, mes: 11, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 8, anio: 2020, mes: 12, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 9, anio: 2021, mes: 1, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 10, anio: 2021, mes: 2, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 11, anio: 2021, mes: 3, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 12, anio: 2021, mes: 4, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 13, anio: 2021, mes: 5, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 14, anio: 2021, mes: 6, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 224, periodo: 15, anio: 2021, mes: 7, montosoles: 3888885, montodolares: 111111, nombre: 'Alquier SONDA' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 226, periodo: 13, anio: 2021, mes: 5, montosoles: 1284, montodolares: 366857143, nombre: 'Desinstalación SONDA  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 4, anio: 2020, mes: 8, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 5, anio: 2020, mes: 9, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 6, anio: 2020, mes: 10, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 7, anio: 2020, mes: 11, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 8, anio: 2020, mes: 12, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 9, anio: 2021, mes: 1, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 10, anio: 2021, mes: 2, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 11, anio: 2021, mes: 3, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 12, anio: 2021, mes: 4, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 13, anio: 2021, mes: 5, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 14, anio: 2021, mes: 6, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 239, periodo: 15, anio: 2021, mes: 7, montosoles: 300, montodolares: 85714286, nombre: 'Gestion de Soc' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 4, anio: 2020, mes: 8, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 5, anio: 2020, mes: 9, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 6, anio: 2020, mes: 10, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 7, anio: 2020, mes: 11, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 8, anio: 2020, mes: 12, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 9, anio: 2021, mes: 1, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 10, anio: 2021, mes: 2, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 11, anio: 2021, mes: 3, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 12, anio: 2021, mes: 4, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 13, anio: 2021, mes: 5, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 14, anio: 2021, mes: 6, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 240, periodo: 15, anio: 2021, mes: 7, montosoles: 66, montodolares: 18857143, nombre: 'Renting Equipo de Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 241, periodo: 4, anio: 2020, mes: 8, montosoles: 2, montodolares: 571428571, nombre: 'Costo Venta Seguridad  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 242, periodo: 4, anio: 2020, mes: 8, montosoles: 7784, montodolares: 2224, nombre: 'Traslado VSAT  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 243, periodo: 4, anio: 2020, mes: 8, montosoles: 9429, montodolares: 2694, nombre: 'Traslado CCHH+SPCR+SPAT  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 4, anio: 2020, mes: 8, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 5, anio: 2020, mes: 9, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 6, anio: 2020, mes: 10, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 7, anio: 2020, mes: 11, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 8, anio: 2020, mes: 12, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 9, anio: 2021, mes: 1, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 10, anio: 2021, mes: 2, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 11, anio: 2021, mes: 3, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 12, anio: 2021, mes: 4, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 13, anio: 2021, mes: 5, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 14, anio: 2021, mes: 6, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 244, periodo: 15, anio: 2021, mes: 7, montosoles: 100, montodolares: 28571429, nombre: 'Otros  ' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 245, periodo: 4, anio: 2020, mes: 8, montosoles: 100, montodolares: 28571429, nombre: 'Otros 2' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 245, periodo: 5, anio: 2020, mes: 9, montosoles: 100, montodolares: 28571429, nombre: 'Otros 2' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 245, periodo: 6, anio: 2020, mes: 10, montosoles: 100, montodolares: 28571429, nombre: 'Otros 2' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 245, periodo: 7, anio: 2020, mes: 11, montosoles: 100, montodolares: 28571429, nombre: 'Otros 2' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 245, periodo: 8, anio: 2020, mes: 12, montosoles: 100, montodolares: 28571429, nombre: 'Otros 2' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 245, periodo: 9, anio: 2021, mes: 1, montosoles: 100, montodolares: 28571429, nombre: 'Otros 2' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 246, periodo: 4, anio: 2020, mes: 8, montosoles: 3969, montodolares: 1134, nombre: 'Otros   3' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 246, periodo: 5, anio: 2020, mes: 9, montosoles: 3969, montodolares: 1134, nombre: 'Otros   3' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 246, periodo: 6, anio: 2020, mes: 10, montosoles: 3969, montodolares: 1134, nombre: 'Otros   3' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 246, periodo: 7, anio: 2020, mes: 11, montosoles: 3969, montodolares: 1134, nombre: 'Otros   3' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 246, periodo: 8, anio: 2020, mes: 12, montosoles: 3969, montodolares: 1134, nombre: 'Otros   3' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 246, periodo: 9, anio: 2021, mes: 1, montosoles: 3969, montodolares: 1134, nombre: 'Otros   3' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 4, anio: 2020, mes: 8, montosoles: 8, montodolares: 228571, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 5, anio: 2020, mes: 9, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 6, anio: 2020, mes: 10, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 7, anio: 2020, mes: 11, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 8, anio: 2020, mes: 12, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 9, anio: 2021, mes: 1, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 10, anio: 2021, mes: 2, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 11, anio: 2021, mes: 3, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 12, anio: 2021, mes: 4, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 13, anio: 2021, mes: 5, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 14, anio: 2021, mes: 6, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 2, concepto_id: 300, periodo: 15, anio: 2021, mes: 7, montosoles: 7, montodolares: 2, nombre: 'MARGEN OPERATIVO' },
  { flujo_caja_id: 1, oferta_id: 5, concepto_id: 250, periodo: 16, anio: 2021, mes: 8, montosoles: 80694444, montodolares: 23055556, nombre: 'Depreciación Inversión Routers/ Modems ' },
];
export interface FlujoCajaElement {
  flujo_caja_id: number;
  oferta_id: number;
  concepto_id: number;
  periodo: number;
  anio: number;
  mes: number;
  montosoles: number;
  montodolares: number;
  nombre: string;
}