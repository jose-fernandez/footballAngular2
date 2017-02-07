import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AlertModule } from 'ng2-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { JornadasService } from './jornadas.service';
import { JornadasComponent } from './jornadas/jornadas.component';



// Se definen las rutas de la app. Cada una se corresponde con un componente
const routes: Routes = [
    // La ruta '' indica la ruta por defecto (antiguo index.html)
    { path: '', component: SliderComponent },
    { path: 'Jornadas', component: JornadasComponent },
    //{ path: 'Clasificacion', component: DirectivasEstructuralesComponent },

    // { path: 'rutasHijas', component: RutasHijasYParametrosComponent,
    //     children:[
    //       {path: "parametros", component: UsarServicioComponent}

    //     ] }, 
    // Cualquier otra ruta no considerada en las entradas anteriores -> ERROR
    //{ path: '**', component: PageNotFoundComponent }
];
export const routing = RouterModule.forRoot(routes);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    JornadasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),

    HttpModule,
    routing
  ],
  providers: [JornadasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
