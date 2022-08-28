import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { About } from 'src/app/model/about';
import { AboutService } from 'src/app/service/about.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-new-about',
  templateUrl: './new-about.component.html',
  styleUrls: ['./new-about.component.css']
})
export class NewAboutComponent implements OnInit {
  nombreA: string = '';
  descripcionA: string = '';

  constructor(private servAbout: AboutService, private router: Router, private activatedRouter: ActivatedRoute,
    private tokenService: TokenService) { }


    isLogged = false;

  ngOnInit(): void {
      const id = this.activatedRouter.snapshot.params['id'];
      if (this.tokenService.getToken()) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
      if (this.isLogged) {
  
  
    } else {
      alert("No autorizado")
      this.router.navigate(['']);
  
    }
  }

onCreate():void{
    const about = new About(this.nombreA, this.descripcionA);
    this.servAbout.save(about).subscribe(data =>{
      alert("Agregado con éxito");
      this.router.navigate(['']);
    }, err =>{
      alert("Falló");
      this.router.navigate(['']);
    }
    )
  }
}
