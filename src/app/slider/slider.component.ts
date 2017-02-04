import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
