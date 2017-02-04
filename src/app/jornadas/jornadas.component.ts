import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';


@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class JornadasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
