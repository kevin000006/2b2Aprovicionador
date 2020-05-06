import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
    selector: 'app-redirect-bandeja',
    templateUrl: './shared.component.html',
    styleUrls: ['./shared.component.scss']
  })

export class RedirectBandejaComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private _router: Router) {}


        ngOnInit(): void {
            debugger;
            let _base = JSON.parse(localStorage.getItem('bandeja')) || [];
            this.route.paramMap.subscribe(params => {
                let _params= params['params'];
                let data = _base.find(x => x.codigo == _params['id']);

                   this._router.navigate([data.url], { state: data.model });     
             });

        }

}