import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DecimalPipe } from '@angular/common';
import { FlujoCajaService } from './flujocaja.service';
import { DialogfinancierTecnicaComponent } from '../dialogfinancieroTecnica/dialogfinancieroTecnica.component';
import * as Cookies from 'js-cookie';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'FlujoCaja',
  templateUrl: './flujocaja.component.html',
  styleUrls: ['./flujocaja.component.css'],
})
export class FlujoCajaComponent implements OnInit {
  ofertaBase = { id: 0 };
  currentUser: any = { nombres: '', apellidos: '', nombrecorto: '' };
  columns: any;
  colores: boolean = true;
  displayedColumns: any;
  widthTabla: number;
  dataSource: any;
  constructor(
    private _decimalPipe: DecimalPipe,
    private servicioFlujoCaja: FlujoCajaService,
    private _router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
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
    this.ListarFlujoCaja();
  }
  ListarFlujoCaja() : void{
    this.dataSource  =  null;
    this.servicioFlujoCaja.Obtenerflujocaja(this.ofertaBase.id).subscribe(data => {
      if (data != null) {        
        var contador = 0;
        debugger;
        var newItem = 
          {
            concepto_id: 0,
            periodo: 0,
            anio: 0,
            mes: 0,
            montosoles: null,
            montodolares: null,
            nombre: "tipo",
            parametros: null,
            grupo: ""
          }  
        
        data.splice(0,0,newItem);
        this.columns = data.filter((item) => { return item.concepto_id == 0; }).map((item) => {
          // contador++
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
        debugger;
        this.displayedColumns = this.columns.map(c => c.columnDef);
        this.widthTabla = (this.columns.length * 100) + 150;
        this.dataSource = this.getPivotArray(data.filter((item) => { return item.concepto_id !== 0; }), "nombre", "periodo", "montosoles");
        
        let lisPivoteado=data.filter((item) => { return item.concepto_id != 0; });//Obtenemos el listado a pivotear
        const listDistinct = [...new Map(lisPivoteado.map(item =>[item["nombre"], item])).values()];//Obtenenos el distinct de un list por una columna

        this.dataSource = this.dataSource.map(item=>{
          var objectoFiltrado = listDistinct.find(obj=>{return obj.nombre === item.nombre});
          item.grupo = objectoFiltrado.grupo;
          item.parametros = objectoFiltrado.parametros;
          return item;
        });
        console.log(this.dataSource);
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
  ActualizarFlujoCaja():void{
    this.ListarFlujoCaja();
  }
  editarPorcentaje(row: any): void {


    const dialogRef = this.dialog.open(DialogfinancierTecnicaComponent, {
      width: '650px',
      data: {
        titulo: row.nombre,
        valor : row.parametros.split(";")[1],
        buttonText: {
          ok: 'Guardar',
          cancel: 'Cancelar'
        }
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.respuesta) {
        const a = document.createElement('a');
        a.click();
        a.remove();        
        let listParametros=[];
        listParametros.push(row.parametros.split(";")[0])
        listParametros.push(res.valor);
        row.parametros = listParametros.join(';')  
        let request = {
          concepto_id: 0,
          descripcion: "",
          nombre: "",
          oferta_id: 0,
          parametro_id: 0,
          parametro_oferta_id:Number(row.parametros.split(";")[0]),
          usuario_id: 0,
          valor: res.valor          
        };        
        this.servicioFlujoCaja.guardarparametrooferta(request).subscribe((res: any) => {
          console.log(res);
          if(res!=null){
            this.toastr.success('Se proceso correctamente la información!', '', {
              progressBar: true,
              progressAnimation: 'increasing',
              closeButton: true
            });
          }
        });       
      }
    });    
  }  
}