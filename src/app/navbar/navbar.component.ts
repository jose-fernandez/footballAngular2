import { Component, OnInit } from '@angular/core';
import { JornadasService } from '../jornadas.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {
	private competition: number;
  constructor( private servicio:JornadasService) {
  	this.competition=436;
  }

  ngOnInit() {
  	
  }

  getCompetition(){
  	this.servicio.getLeague(this.competition);
  }

}
