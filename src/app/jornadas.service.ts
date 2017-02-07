import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, Subject} from 'rxjs/Rx';
let $ = require('../../node_modules/jquery/dist/jquery.min.js');

@Injectable()
export class JornadasService {
	private key;
  private competition: number;
  private jornadas: Subject<any> = new Subject<any>();
  constructor( private ajax:Http) {
  	this.key="3dfd3559bf154c5b8d162b46b765c2ee";
    this.competition=436;
  }

  getLeague(cod){
    this.competition=cod;
    this.getCompetition();
  }

  getCompetition(){
    var that=this
    $.ajax({
      headers: { 'X-Auth-Token': this.key },
      url: `http://api.football-data.org/v1/competitions/${this.competition}/fixtures?timeFrame`,
      dataType: 'json',
      type: 'GET',
    }).done(response =>
      this.jornadas.next(response)
    );
  }

  changeCompetition(): Observable<any>{
    return this.jornadas.asObservable();
  }
}