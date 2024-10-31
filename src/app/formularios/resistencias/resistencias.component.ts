import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";

interface ResultadoTolerancia {
  tolerancia: number;
  realizaCalculo: number;
  bandaTolerancia: number;
  banda1: string;
  banda2: string;
  banda3: string;
  estiloBanda1: string;
  estiloBanda2: string;
  estiloBanda3: string;
  coloresTolerancia: string;
  valor: number;
  valorMax: number;
  valorMin: number;
}

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styles: ``
})
export default class ResistenciasComponent implements OnInit {
  dataList: ResultadoTolerancia | any;
  dataContador: any;
  ohm = 0;
  formulario!: FormGroup;
  resultado: string | null = null;
  toleranciaFinal = 0;
  toleranciaFinalMin = 0;
  dataSave: ResultadoTolerancia = {
    tolerancia: 0,
    realizaCalculo: 0,
    bandaTolerancia: 0,
    banda1: "",
    banda2: "",
    banda3: "",
    estiloBanda1: "",
    estiloBanda2: "",
    estiloBanda3: "",
    coloresTolerancia: "",
    valor: 0,
    valorMax: 0,
    valorMin: 0,
  };

  constructor() { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      banda1: new FormControl('', Validators.required),
      banda2: new FormControl('', Validators.required),
      banda3: new FormControl('', Validators.required),
      tolerancia: new FormControl('', Validators.required),
    });
  }

  registrarColores(): void {
    const colores: { [key: number]: string } = {
      0: 'Negro', 1: 'Café', 2: 'Rojo', 3: 'Naranja', 4: 'Amarillo',
      5: 'Verde', 6: 'Azul', 7: 'Violeta', 8: 'Gris', 9: 'Blanco'
    };

    const coloresTolerancia: { [key: string]: string } = {
      'oro': '#FFD700', 'plata': '#C0C0C0'
    };

    const coloresBanda3: { [key: number]: string } = {
      1: 'Negro', 10: 'Café', 100: 'Rojo', 1000: 'Naranja', 10000: 'Amarillo',
      100000: 'Verde', 1000000: 'Azul', 10000000: 'Violeta', 100000000: 'Gris', 1000000000: 'Blanco'
    };

    const coloresBackground: { [key: number]: string } = {
      0: '#000000', 1: '#6F4E37', 2: '#FF0000', 3: '#FFA500', 4: '#FFFF00',
      5: '#008000', 6: '#0000FF', 7: '#8A2BE2', 8: '#808080', 9: '#FFFFFF'
    };

    const coloresBackground2: { [key: number]: string } = {
      1: '#000000', 10: '#6F4E37', 100: '#FF0000', 1000: '#FFA500', 10000: '#FFFF00',
      100000: '#008000', 1000000: '#0000FF', 10000000: '#8A2BE2', 100000000: '#808080', 1000000000: '#FFFFFF'
    };

    let banda1 = this.formulario.get('banda1')?.value;
    let banda2 = this.formulario.get('banda2')?.value;
    let banda3 = this.formulario.get('banda3')?.value;
    let tolerancia = this.formulario.get('tolerancia')?.value;
    let realizaCalculo = banda1 + banda2;

    this.dataSave = {
      tolerancia: tolerancia,
      realizaCalculo: realizaCalculo,
      bandaTolerancia: banda3,
      banda1: colores[banda1],
      banda2: colores[banda2],
      banda3: coloresBanda3[banda3],
      estiloBanda1: coloresBackground[banda1],
      estiloBanda2: coloresBackground[banda2],
      estiloBanda3: coloresBackground2[banda3],
      coloresTolerancia: coloresTolerancia[tolerancia],
      valor: 0,
      valorMax: 0,
      valorMin: 0
    };

    let dataList = JSON.parse(localStorage.getItem('dataList') || '[]');
    dataList.push(this.dataSave);
    localStorage.setItem('dataList', JSON.stringify(dataList));

    console.log('Colores registrados:', this.dataSave);
    this.dataContador = JSON.parse(localStorage.getItem('dataList') || '[]');
    
  }

  calcularResistencias(): void {
    this.dataContador = JSON.parse(localStorage.getItem('dataList') || '[]');
    if (this.dataContador.length > 0) {
      for (let i = 0; i < this.dataContador.length; i++) {
        let ohm = parseInt(this.dataContador[i].realizaCalculo) * parseInt(this.dataContador[i].bandaTolerancia);
        this.dataContador[i].valor = ohm;

        if (this.dataContador[i].tolerancia == 'oro') {
          this.dataContador[i].valorMax = ohm + (ohm * 0.05);
          this.dataContador[i].valorMin = ohm - (ohm * 0.05);
        } else if (this.dataContador[i].tolerancia == 'plata') {
          this.dataContador[i].valorMax = ohm + (ohm * 0.10);
          this.dataContador[i].valorMin = ohm - (ohm * 0.10);
        }

        console.log('Resistencia calculada:', this.dataContador[i]);
      }

      localStorage.setItem('dataList', JSON.stringify(this.dataContador));
    } else {
      this.resultado = 'No hay datos para calcular';
    }
  }

  limpiar(): void {
    localStorage.clear();
    this.dataList = null;
    this.dataContador = null;
  }

  dameData(): void {
    this.dataContador = JSON.parse(localStorage.getItem('dataList') || '[]');
    console.log(this.dataContador);
  }
}
