import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {OfertaService} from '../main/gestionpropuesta/oferta/oferta.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ofertaService :OfertaService,
    private _router: Router) {



   }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
       let _params= params['params'];
       
       this.ofertaService.getShared({url:_params['id']}).subscribe(data=>{
         
          let _state = JSON.parse(data.data.model); 
          this._router.navigate([data.data.redirect], { state: _state });     
       });

    });

  }

}
