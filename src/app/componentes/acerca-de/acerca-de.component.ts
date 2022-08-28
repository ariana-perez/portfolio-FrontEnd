import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/model/about';
import { persona } from 'src/app/model/persona.model';
import { AboutService } from 'src/app/service/about.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})

export class AcercaDeComponent implements OnInit {
  persona: persona = new persona("","","");
  about: About[] = []; 
 
  constructor(public personaService: PersonaService, private aboutServ: AboutService, private tokenService: TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {this.persona = data})
  
    this.cargarAbout();

    if(this.tokenService.getToken()){
      this.isLogged= true;
    } else {
      this.isLogged = false;
    }

  };
  cargarAbout():void{
    this.aboutServ.lista().subscribe(
      data => {this.about=data;})
  }

  delete(id?: number) {
    if (confirm("Desea eliminar?") == true) {
      if (id != undefined) {
        this.aboutServ.delete(id).subscribe(
          data => {
            this.cargarAbout();
          }, err => {
            alert("No se pudo eliminar")
          }
        )
      }
    } else {
      alert("cancelado")
    }
  }
  
}

