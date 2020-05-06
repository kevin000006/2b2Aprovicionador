import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oferta-cabecera',
  templateUrl: './oferta-cabecera.component.html',
  styleUrls: ['./oferta-cabecera.component.scss']
})
export class OfertaCabeceraComponent implements OnInit {

  constructor() { }
  @Input() ofertaBase:any={};

  ngOnInit(): void {
  }

}
