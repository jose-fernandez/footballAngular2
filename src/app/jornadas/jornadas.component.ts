import { Component, OnInit } from '@angular/core';

import { JornadasService } from '../jornadas.service';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
 
})
export class JornadasComponent implements OnInit {
  private competition={fixtures:[{awayTeamName:'Loading...'}]};
  constructor(private servicio:JornadasService) {
    var that=this;
    this.servicio.changeCompetition().subscribe(
      data => { this.competition=data; console.log(this.competition);}
    );
  }

  ngOnInit() {
    
    
  }
  tables(){
    // if (this.competition === 440){
    //   this.tableChampion();}
    // else{this.tableLeague()}
    this.tableLeague()
  }

  tableChampion(){

  }
  tableLeague(){

  }
}
