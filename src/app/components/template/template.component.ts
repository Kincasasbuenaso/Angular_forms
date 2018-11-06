import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  `.invalid-feedback{display:block}`
  ]
})
export class TemplateComponent {

  //datos por defecto
  usuario:Object={
    nombre:null,
    apellidos:null,
    email:null,
    pais:"COP",
    sexo:"Hombre",
    acepta:false
  }

  //objeto para carga de paises en el select
  paises = [{
    codigo:"COP",
    nombre:"Colombia"
  },
  {
    codigo:"BRA",
    nombre:"Brasil"
  },
  {
    codigo:"CLP",
    nombre:"Chile"
  }
]

sexos = ["Mujer","Hombre"]

  constructor() { }

  ngOnInit() {
  }

  Save(f:NgForm){
    console.log('Formulario enviado');
    console.log("Objeto Form: ", f);
    console.log("valores: ", f.value);
  }

}
