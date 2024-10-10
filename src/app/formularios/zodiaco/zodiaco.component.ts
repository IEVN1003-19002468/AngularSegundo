
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
interface ResultadoZodiaco {
  nombre: string;

  dia: number;
  mes: number;
  anio: number;
  sexo: string;
  animal: string;
  img: string;

}
@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './zodiaco.component.html',
  
})
export class ZodiacoComponent {
  formulario!: FormGroup;

  resultado: ResultadoZodiaco | null = null;

  constructor() { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      a_paterno: new FormControl('', Validators.required),
      a_materno: new FormControl('', Validators.required),
      dia: new FormControl('', Validators.required),
      mes: new FormControl('', Validators.required),
      anio: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),


    });
  }
  generarZodiaco(): void {
    const signosChinos = [
      "Rata", "Buey", "Tigre", "Conejo", "Dragón",
      "Serpiente", "Caballo", "Cabra", "Mono",
      "Gallo", "Perro", "Cerdo"
    ];
    
    let nombre = this.formulario.get('nombre')?.value;
    let a_paterno = this.formulario.get('a_paterno')?.value;
    let a_materno = this.formulario.get('a_materno')?.value;
    let dia = this.formulario.get('dia')?.value;
    let mes = this.formulario.get('mes')?.value;
    let anio = parseInt(this.formulario.get('anio')?.value);
    const ciclo = (anio - 1924) % 12;
    let signo = signosChinos[ciclo];
    let sexo = this.formulario.get('sexo')?.value;
    let edad = 2024 - anio;
    let animal = '';
    let img='';
    let nombreCom = nombre + " " + a_paterno + " " + a_materno;
    console.log(ciclo);
    switch (ciclo) {
      case 0:
          img='https://upload.wikimedia.org/wikipedia/commons/0/04/Rat.svg';
        break;
      case 1:
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ox.svg/800px-Ox.svg.png';
        break;
      case 2:
          img='https://upload.wikimedia.org/wikipedia/commons/e/e3/Tiger.svg';
        break;
      case 3:
          img='https://upload.wikimedia.org/wikipedia/commons/2/24/Rabbit.svg';
        break;
      case 4:
          img='https://upload.wikimedia.org/wikipedia/commons/b/b2/Dragon.svg';
        break;
      case 5:
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Snake.svg/1200px-Snake.svg.png';
        break;
      case 6:
          img='https://upload.wikimedia.org/wikipedia/commons/7/76/Horse.svg';
        break;
      case 7:
          img='https://upload.wikimedia.org/wikipedia/commons/2/2d/Goat.svg';
        break;
      case 8:
          img='https://upload.wikimedia.org/wikipedia/commons/b/b8/Monkey.svg';
        break;
      case 9:
          img='https://upload.wikimedia.org/wikipedia/commons/0/06/Rooster.svg';
        break;
      case 10:
          img='https://upload.wikimedia.org/wikipedia/commons/4/4a/Dog_2.svg';
        break;
      case 11:
          img='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Boar.svg/800px-Boar.svg.png';
        break;
    
      default:
        img='https://upload.wikimedia.org/wikipedia/commons/0/04/Rat.svg';

        break;
    }
    this.resultado = {
      nombre: nombreCom,

      dia: dia,
      mes: mes,
      anio: edad,
      sexo: sexo,
      animal: signo,
      img:img
    };

  }
}
