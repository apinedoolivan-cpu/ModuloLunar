import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mineral } from '../../models/mineral.model';
import { OrigenMaterialLunar, ClasificacionMaterialLunar, TexturaMaterialLunar } from '../../models/enums.model';
import { MineralService } from '../../services/mineral-form';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { BaseSistemaEntrada } from '../../models/entrada.model';

@Component({
  selector: 'app-form-mineral',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-mineral.html',
  styleUrls: ['./form-mineral.scss']
})
export class FormMineralComponent implements OnInit {
  form!: FormGroup;
  formularioVisible = false;
  tipoFormulario: 'extendido' | 'reducido' | null = null;
  formError: string | null = null;

  opcionesOrigen = Object.values(OrigenMaterialLunar) as string[];
  opcionesClasificacion = Object.values(ClasificacionMaterialLunar) as string[];
  opcionesTextura = Object.values(TexturaMaterialLunar) as string[];

  criterioSeleccionado = false;
  astronautaSeleccionado = false;

  constructor(
    private fb: FormBuilder,
    private mineralService: MineralService,
    private inicioMisionService: InicioMisionService
  ) {}

  ngOnInit(): void {
    this.inicioMisionService.criterio$.subscribe(c => {
      this.criterioSeleccionado = !!c;
    });
    this.inicioMisionService.astronauta$.subscribe(a => {
      this.astronautaSeleccionado = !!a;
    });
  }

  elegirFormulario(tipo: 'extendido' | 'reducido') {
    this.tipoFormulario = tipo;
    this.formularioVisible = true;

    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{4}[A-Z]{2}$/)]],
      nombre: ['', Validators.required],
      origen: ['', Validators.required],
      clasificacion: ['', Validators.required],
      textura: ['', Validators.required],
      dureza: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      tamañoGrano: [1, [Validators.required, Validators.min(1)]],
      tamañoCristal: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      temperatura: [25, [Validators.required, Validators.min(-100), Validators.max(100)]],
      estructura: ['']
    });
  }

  validarFormulario(): boolean {
    if (!this.form.valid) {
      const errores: string[] = [];
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.invalid) errores.push(`El campo "${key}" es inválido.`);
      });
      this.formError = errores.join(', ');
      return false;
    }
    this.formError = null;
    return true;
  }

  aceptarMineral() {
    if (!this.validarFormulario()) return;

    const v = this.form.value;
    const mineral = new Mineral(
      v.id, v.nombre, v.origen, v.dureza, v.tamañoGrano,
      v.clasificacion, v.tamañoCristal, v.temperatura, v.estructura, v.textura
    );

    this.mineralService.establecerMineral(mineral);
    this.formularioVisible = false;
  }
}
