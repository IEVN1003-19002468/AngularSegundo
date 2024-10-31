import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Empleados {
  matricula: string;
  nombre: string;
  edad: number;
  email: string;
  horasTrabajadas: number;
  horasExtras: number;
  horasXPagar: number;
  sueldo: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
})
export default class EmpleadosComponent implements OnInit {
  formGroup!: FormGroup;
  empleados: Empleados[] = [];
  isModifica: boolean = true;
  nominaTotal: number = 0;
  muestraBoton: boolean = true;
  muestraTabla: boolean = false;
  empleadosContador: any;
  empleadoModificado: Empleados | null = null;
  modalAbierto: boolean = false;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.initForm();

    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      edad: [''],
      email: [''],
      horasTrabajadas: [''],
    });
  }

  registrarEmpleado(): void {
    this.nominaTotal = 0;
    const { matricula, nombre, edad, email, horasTrabajadas } = this.formGroup.value;
    let sueldo = 0;
    let horasExtras = 0;
    let horasXPagar = 0;
    let horasTrabajasSinExtras = 0;

    if (horasTrabajadas > 40) {
      sueldo = (40 * 70) + (horasTrabajadas - 40) * 140;
      horasTrabajasSinExtras = horasTrabajadas - (horasTrabajadas - 40);
      horasExtras = (horasTrabajadas - 40) * 140;
      horasXPagar = horasTrabajasSinExtras * 70;
    } else {
      sueldo = horasTrabajadas * 70;
      horasXPagar = horasTrabajadas * 70;
    }

    const nuevoEmpleado: Empleados = {
      matricula: matricula,
      nombre: nombre,
      edad: edad,
      email: email,
      horasTrabajadas: horasTrabajadas,
      horasExtras: horasExtras,
      horasXPagar: horasXPagar,
      sueldo: sueldo,
    };

    this.empleados.push(nuevoEmpleado);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.formGroup.reset();
    
    this.actualizarNominaTotal();
  }

  buscaModificaEmpleado(): void {
    const matricula = this.formGroup.get('matricula')?.value;
    const empleado = this.empleados.find(emp => emp.matricula === matricula);

    if (empleado) {
      this.formGroup.patchValue({
        nombre: empleado.nombre,
        edad: empleado.edad,
        email: empleado.email,
        horasTrabajadas: empleado.horasTrabajadas,
      });
      this.empleadoModificado = empleado;
      this.muestraBoton = false;
    } else {
      //alert('No se encontró el empleado con la matrícula indicada');
      this.muestraBoton = true;
    }
  }
  // Abre el modal
  abrirModal(): void {
    this.modalAbierto = true;
  }

  // Cierra el modal
  cerrarModal(): void {
    this.modalAbierto = false;
  }
  modificarEmpleado(): void {
    if (this.empleadoModificado) {
      const { matricula, nombre, edad, email, horasTrabajadas } = this.formGroup.value;
      let sueldo = 0;
      if (horasTrabajadas > 40) {
        sueldo = (40 * 70) + (horasTrabajadas - 40) * 140;
      } else {
        sueldo = horasTrabajadas * 70;
      }

      this.empleadoModificado.nombre = nombre;
      this.empleadoModificado.edad = edad;
      this.empleadoModificado.email = email;
      this.empleadoModificado.horasTrabajadas = horasTrabajadas;
      this.empleadoModificado.sueldo = sueldo;

      localStorage.setItem('empleados', JSON.stringify(this.empleados));
      this.formGroup.reset();
      this.empleadoModificado = null;
      this.actualizarNominaTotal();
    } else {
      console.log('No hay empleado seleccionado para modificar');
    }
  }

  eliminarEmpleado(): void {
    const matricula = this.formGroup.get('matricula')?.value;
    const indice = this.empleados.findIndex(emp => emp.matricula === matricula);
    if (indice !== -1) {
      this.empleados.splice(indice, 1);
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
      this.formGroup.reset();
      this.actualizarNominaTotal();

    } else {
      console.log('No se encontró el empleado con la matrícula indicada');
    }
  }

  actualizarNominaTotal(): void {
    this.nominaTotal = this.empleados.reduce((total, empleado) => total + empleado.sueldo, 0);
  }

  mostrarEmpleados(): void {
     this.muestraTabla = true;
  }
}
