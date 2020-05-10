import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector: 'app-redirect',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
  })
  export class RedirectBandejaComponent implements OnInit {

    constructor(private route: ActivatedRoute,
      private _router: Router,
       private _fuseConfigService: FuseConfigService) {
  
        this._fuseConfigService.config = {
          layout: {
              navbar: {
                  hidden: true
              },
              toolbar: {
                  hidden: true
              },
              footer: {
                  hidden: true
              },
              sidepanel: {
                  hidden: true
              }
          }
      };
       }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {        
        let dataBase = JSON.parse( window.localStorage.getItem('bandeja') || '[]');
        let _params= params['params'];
        let _id = _params['id'];
        let data = dataBase.find(x => x.codigo == _id);
       
        if(data== null || data == [])
        {
            this._router.navigate(['pages/auth/login-2'], { state: {} });    
            return;
        }else{

            let _state = data.model; 
            let url = data.url;
            this._router.navigate([url], { state: _state });  
        }

       
  
     });
    }
  
  }