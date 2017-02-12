import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, Subject} from 'rxjs/Rx';
let $ = require('../../node_modules/jquery/dist/jquery.min.js');

@Injectable()
export class JornadasService {
	private key:string; //key-Token for API ACCESS
  private league: Subject<any> = new Subject<any>(); //Competition Grouped by schedules selected
  private clasification: Subject<any> = new Subject<any>(); //Clasification Selected
  private teamsLeague: Subject<any> = new Subject<any>(); //Teams for clasification selected

  //Competitions codes Sorted(LFP,Premier,SerieA,Ligue1,Bundes,Champions)
  private codes = new Array();

  
  private cod:number;//Codes index

  private dates= new Array(); //Dates Array Sorted

  private pagination= new Array();//Pagination Schedule
  
  private competitions = new Array(); //Leagues Sorted, Same as codes

  private schedulesSorted = new Array(); // Schedules Sorted as vector 38x10

  private clasif=new Array();// Clasification Array sorted

  private teams=new Array(); //Multidimensional Array Teams Sorted by competition

  private date:number //Number of pagination index based to Date()

  private jsonClasif:any;

  private listJson=new Array();

  constructor( private ajax:Http) {
  	this.key="3dfd3559bf154c5b8d162b46b765c2ee";
    this.cod=0;
    this.codes=[436,426,438,434,430];
    this.jsonClasif={1:{"total":{},"casa":{}, "fuera":{}}};
    this.askTeams();
    
    this.askLeagues();

    this.timer();

    
    // this.changeSchedule(this.cod);
    this.askClasifications();
    
  }


  timer(){
    setTimeout(()=>{
      this.iterableLeagues();
      this.iterableDates();
      this.changeClasification();
      this.changeLeague();
      this.changeTeams();
      this.createJsonsClasif();
    },4000);
  }
  //Change Competition Code from Navbar.ts <select>
  changeSchedule(cod){
    this.cod=cod;
    this.changeLeague();
    this.changeClasification();
    this.changeTeams();
  }

  createJsonsClasif(){
    for (var i = 0; i < this.clasif.length; ++i) {
      this.createJsonClasif(i);
    }
  }

  changeLeague(){
    this.league.next(this.schedulesSorted[this.cod])
  }

  //Change clasification (clasif[index])
  changeClasification(){
    this.clasification.next(this.listJson[this.cod]);
  }

  //Change teams from code
  changeTeams(){
    this.teamsLeague.next(this.teams[this.cod]);
  }

/////////////////////////////////////////////////GETTERS//////////////////////
  getCode(){
    return this.cod;
  }
  varDate(){
    this.date=this.dates[this.cod];
    return this.date;
  }
  getPagination(){
    return this.pagination[this.cod];
  }
///////////////////////////////////////////////END GETTERS////////////////////////////




///////////////////////////////////////////////////////API CALLS ITERATOR/////////////////////////////////////////////////////////

  askLeagues(){
    for (let i=0;i<this.codes.length;i++){
      this.askLeague(this.codes[i],i);
    }
  }

  askClasifications(){
    for (let i=0;i<this.codes.length;i++){
      this.askClasification(this.codes[i], i);
    }
  }

  askTeams(){
    for (let i=0;i<this.codes.length;i++){
      this.askTeam(this.codes[i]);
    }
  }

//////////////////////////////////////////////////////END API CALLS ITERATOR//////////////////////////////////////////////////////

//////////////////////////////////////////////////////OBSERVABLES//////////////////////////////////////////////////////////////////
  callLeague(): Observable<any>{
    return this.league.asObservable();
  }

  callClasification(): Observable<any>{
    return this.clasification.asObservable();
  }

  callTeams(): Observable<any>{
    return this.teamsLeague.asObservable();
  }

///////////////////////////////////////////////////////END OBSERVABLES////////////////////////////////////////////////////////////////////

///////////////////////////////////////////API CALLS////////////////////////////////////////////////////////////////////////////////
  askTeam(cod){
    $.ajax({
      headers: { 'X-Auth-Token': this.key },
      url: `http://api.football-data.org/v1/competitions/${cod}/teams`,
      dataType: 'json',
      type: 'GET',
    }).done(response =>{
      this.teams.push(response);
    });
  }

  askClasification(cod, i){
    // this.clasif.push([]);
    $.ajax({
      headers: { 'X-Auth-Token': this.key },
      url: `http://api.football-data.org/v1/competitions/${cod}/leagueTable`,
      dataType: 'json',
      type: 'GET',
    }).done(response =>{
      this.clasif.push(response);
    });
  }

  askLeague(cod, i){
    this.competitions.push([]);
    $.ajax({
      headers: { 'X-Auth-Token': this.key },
      url: `http://api.football-data.org/v1/competitions/${cod}/fixtures`,
      dataType: 'json',
      type: 'GET',
    }).done(response =>{
      this.competitions[i]=response;
    });
  }
//////////////////////////////////////////////////////END CALLS////////////////////////////////////////////////////////////
  

  iterableLeagues(){
    for (let i=0; i<this.competitions.length;i++){
      if(this.competitions[i].fixtures.length===306)
        this.sortLeagues(i,9);
      else this.sortLeagues(i,10)
    }
  }

  sortLeagues(index, len){
    this.pagination.push([]);
    this.schedulesSorted.push([]);

    for (let i=0;i<Math.ceil(this.competitions[index].fixtures.length/len);i++){
        this.schedulesSorted[index].push([]);
        this.pagination[index].push(i);
    }
    for(let j=0;j<this.competitions[index].fixtures.length;j++){
        this.schedulesSorted[index][this.competitions[index].fixtures[j].matchday-1].push(this.competitions[index].fixtures[j])
    }
  }

  iterableDates(){
    for (let i=0;i<this.competitions.length;i++){
      this.dates.push(this.getDate(i))
    }
   }
  //Return de index pagination
  


  getDate(index){
    let secToday=new Date().getTime();
    for (let i=0;i<this.schedulesSorted[index].length;i++){
      let ini= new Date(this.schedulesSorted[index][i][0].date).getTime();
      let secIni=new Date(this.schedulesSorted[index][i][1].date).getTime();
      let end= new Date(this.schedulesSorted[index][i][this.schedulesSorted[index][i].length-1].date).getTime();
      let secEnd=new Date(this.schedulesSorted[index][i][this.schedulesSorted[index][i].length-2].date).getTime();
      if (secToday>=ini && secToday<=end && secToday<=secEnd){
        return i;
      }else if(secToday<=ini && secToday<=secIni){
        return i-1;
      }
    }
  }


  createJsonClasif(index){
    this.listJson.push([]);
    for(let j=0;j<this.clasif[index].standing.length;j++){
        this.listJson[index].push(this.jsonClasif[j]={"total":{"pos":this.clasif[index].standing[j].position,
                                     "img":this.clasif[index].standing[j].crestURI,
                                     "name":this.clasif[index].standing[j].teamName,
                                     "pts":this.clasif[index].standing[j].points,
                                     "pg":this.clasif[index].standing[j].playedGames,
                                     "win":this.clasif[index].standing[j].wins,
                                     "draw":this.clasif[index].standing[j].draws,
                                     "lose":this.clasif[index].standing[j].losses,
                                     "goal":this.clasif[index].standing[j].goals,
                                     "goalAg":this.clasif[index].standing[j].goalsAgainst},

                            "home":{ "pos":this.clasif[index].standing[j].position,
                                     "img":this.clasif[index].standing[j].crestURI,
                                     "name":this.clasif[index].standing[j].teamName,
                                     "pts":(3*this.clasif[index].standing[j].home.wins+
                                            this.clasif[index].standing[j].home.draws),
                                     "pg":(this.clasif[index].standing[j].home.wins+
                                            this.clasif[index].standing[j].home.losses+
                                            this.clasif[index].standing[j].home.draws),
                                     "win":this.clasif[index].standing[j].home.wins,
                                     "draw":this.clasif[index].standing[j].home.draws,
                                     "lose":this.clasif[index].standing[j].home.losses,
                                     "goal":this.clasif[index].standing[j].home.goals,
                                     "goalAg":this.clasif[index].standing[j].home.goalsAgainst},

                            "away":{ "pos":this.clasif[index].standing[j].position,
                                     "img":this.clasif[index].standing[j].crestURI,
                                     "name":this.clasif[index].standing[j].teamName,
                                     "pts":(3*this.clasif[index].standing[j].away.wins+
                                            this.clasif[index].standing[j].away.draws),
                                     "pg":(this.clasif[index].standing[j].away.wins+
                                            this.clasif[index].standing[j].away.losses+
                                            this.clasif[index].standing[j].away.draws),
                                     "win":this.clasif[index].standing[j].away.wins,
                                     "draw":this.clasif[index].standing[j].away.draws,
                                     "lose":this.clasif[index].standing[j].away.losses,
                                     "goal":this.clasif[index].standing[j].away.goals,
                                     "goalAg":this.clasif[index].standing[j].away.goalsAgainst}}
      )
    }
  }

}