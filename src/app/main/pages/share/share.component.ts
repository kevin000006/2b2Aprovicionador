import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {OfertaService} from '../../../main/gestionpropuesta/oferta/oferta.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ShareComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ofertaService :OfertaService,
    private _router: Router, private _fuseConfigService: FuseConfigService) {

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
      let _params= params['params'];
      
      this.ofertaService.getShared({codigo:_params['id']}).subscribe(data=>{

         if(data== null || data == [])
         {
           this._router.navigate(['pages/auth/login-2'], { state: {} });    
           return;
         }else{

           let _state = JSON.parse(data[0].data); 
           let url = data[0].url;
           this._router.navigate([url], { state: _state });  
         }
  
      });

   });
  }

}
