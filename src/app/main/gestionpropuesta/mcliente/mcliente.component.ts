import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mcliente',
  templateUrl: './mcliente.component.html',
  styleUrls: ['./mcliente.component.scss']
})
export class MclienteComponent implements OnInit {

  constructor() { }
  filedata :File;

  fileProgress(fileInput:any):void{    
    this.filedata = <File>fileInput.target.files[0];    
  }

  uploadfile():void{
    const formData = new FormData();
    formData.append('file',this.filedata);
  }
  ngOnInit(): void {
  }
}
