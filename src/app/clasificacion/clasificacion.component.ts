import { Component, OnInit } from '@angular/core';
import { JornadasService } from '../jornadas.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {
	private listClasif:any;
  private orderClasif= new Array();
	private act:number;
  private n:number;
  private listTeams=new Array();
  constructor(private servicio:JornadasService) {
  	this.act=0;
    this.n=0;
  }

  ngOnInit() {
    setTimeout(()=>{
      this.n++;
      this.servicio.changeTeams();
      this.servicio.changeClasification();
      this.tabs(this.act);
    },300)
  	this.servicio.callClasification().subscribe(
        data => {
            this.listClasif=data;
            if(this.listClasif)
              this.tabs(this.act);
        });
    this.servicio.callTeams().subscribe(
        data => {
            this.listTeams=data;
        });
    
  }
  tabs(n){
  	this.act=n;
    this.orderClasif=[];
    if(n===0){
      for (let i=0;i<this.listClasif.length;i++){
        this.orderClasif.push(this.listClasif[i].total);
      }
    }else if(n===1){
      for (let i=0;i<this.listClasif.length;i++){
        this.orderClasif.push(this.listClasif[i].home);
      }
    }else{
      for (let i=0;i<this.listClasif.length;i++){
        this.orderClasif.push(this.listClasif[i].away);
      }
    }

  }
  order(x, y){
    return eval(`team.${x}.y`);
  }
}
