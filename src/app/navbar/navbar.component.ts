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
    this.competition=0;
  }

  ngOnInit() {

  }

  getCompetition(index){
    if (index){
      this.servicio.changeSchedule(index);
    }
  }

}
