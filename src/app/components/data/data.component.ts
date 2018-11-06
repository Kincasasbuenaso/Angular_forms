import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: [`.invalid-feedback{
              display:block}
              .ng-untouched .invalid-feedback{
                display:none;
              }
    `]
})
export class DataComponent implements OnInit {

  f:FormGroup;
  f2:FormGroup;

  usuario:Object = {
    nombreCompleto:{
      nombre:'Kin',
      apellido:'Casasbuenas'
    },
    email:'k@q.cl',
    hobbies:['play','pc','gym','comer'],
  }

  constructor() {
    console.log(this.usuario);

    this.f=new FormGroup({
      'nombre':new FormControl('',[Validators.required,Validators.minLength(3)]),
      'apellido':new FormControl('',Validators.required),
      'email':new FormControl('',[Validators.required,
                                  Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    });

    //se ejecuta cada vez que un valor cambia en el formulario
    this.f.valueChanges.subscribe(data=>{console.log(data)});

    // input especifico
    this.f.controls['apellido'].valueChanges.subscribe(data=>{console.log(data)});

    this.f2=new FormGroup({
      'nombreCompleto':new FormGroup
      ({
        'nombre':new FormControl('',[Validators.required,
                                     Validators.minLength(3)]),
        'apellido':new FormControl('',[Validators.required,this.noCasas])
      }),
      'email':new FormControl('',[Validators.required,
                                  Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'hobbies': new FormArray([
        new FormControl('correr',Validators.required)
      ]),
      'username':new FormControl('',Validators.required,this.validUsername),
      'password':new FormControl('',Validators.required),
      'passwordconfirmation':new FormControl();
    });

    //esto setea los valores en el formulario, sirve cuando quiera hacer un update de la data
    //this.f2.setValue(this.usuario);

    //asignar validador de password y el bind se utiliza ya que el objeto no esta en el mismo contexto
    this.f2.controls['passwordconfirmation'].setValidators([Validators.required,
                                                this.passwordEquals.bind(this.f2)]);

    // input especifico estado
    this.f2.controls['username'].statusChanges.subscribe(data=>{console.log(data)});
 }

  ngOnInit() {
  }

  guardar(){
    console.log(this.f.value);
  }

  guardarf2(){
    console.log(this.f2.value);
    //resetea los valores por el inicial del objeto usuario
    //this.f2.reset(this.usuario);
    //resetea los valores por los que le pase
    this.f2.reset({
      nombreCompleto:{
        nombre:'',
        apellido:''
      },
      email:''
    });
  }

  addHobbie(){
    (<FormArray>this.f2.controls['hobbies']).push(new FormControl('',Validators.required));
  }

  noCasas(control:FormControl):{[s:string]:boolean}{
    if(control.value =="Casas" || control.value =="casas"){
      return{
        nocasas:true
      }
    }

    return null;
  }

  passwordEquals(control:FormControl):{[s:string]:boolean}{
    let f2:any =this;
    if(control.value !== f2.controls['password'].value){
      return{
        passwordequals:true
      }
    }

    return null;
  }


  validUsername(control:FormControl):Promise<any>|Observable<any>{
    let promesa = new Promise((resolve, reject)=>{
                              setTimeout(()=>{
                                if(control.value==="Kin"){
                                  resolve({existe:true})
                                }
                                else{
                                  resolve(null)
                                }
                              },3000)
    })

    return promesa;
  }

}
