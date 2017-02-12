import { Component, OnInit } from '@angular/core';
import { JornadasService } from '../jornadas.service';


@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
 
})
export class JornadasComponent implements OnInit {
  private jornadas= new Array();
  private schedule=new Array();
  private date:any;
  private pagination:any;
  private code:number;
  private n:number;

  constructor(private servicio:JornadasService) {
    this.n=0
  }

  ngOnInit() {
    setTimeout(()=>{
      this.n++;
      this.servicio.changeLeague();
      this.pagination=this.servicio.getPagination();
      this.date=this.servicio.varDate();
      this.schedule=this.jornadas[this.date]
    },4000)

    this.servicio.callLeague().subscribe(
        data => {
            this.jornadas=data;
            this.pagination=this.servicio.getPagination();
            this.date=this.servicio.varDate();
        });

  }
  changeJornada(num){
    this.date=num
    console.log(this.jornadas[num])
  }
}