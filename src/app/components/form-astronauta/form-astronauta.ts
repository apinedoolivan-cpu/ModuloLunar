import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AstronautaValidationService } from '../../services/form-astronauta';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { Astronauta } from '../../models/astronauta.model';
import { OrigenMaterialLunar } from '../../models/enums.model';

@Component({
  selector: 'app-form-astronauta',
  imports: [ ReactiveFormsModule],
  templateUrl: './form-astronauta.html',
  styleUrl: './form-astronauta.scss',
})
export class FormularioAstronautaComponent implements OnInit{
  form: FormGroup;
  formError: string | null = null;
  astronautaActual: Astronauta | null = null;
  criterio: OrigenMaterialLunar | null = null;
  visible = true;

  constructor(private fb: FormBuilder, private misionService: InicioMisionService, 
    private astronautaService: AstronautaValidationService) {
    this.form = this.fb.group({
      id: ['', [Validators.pattern(/^[A-Z]{3}[0-9]{3}$/)]],
      nombre: [''],
      edad: [null, [Validators.min(18), Validators.max(80)]]
    });
  }

  ngOnInit() {
    this.misionService.criterio$.subscribe(c => this.criterio = c);
  }

  aceptarAstronauta() {
    const error = this.astronautaService.validar(this.form);
    if (error) {
      this.formError = error;
      return;
    }

    const id = this.form.get('id')?.value?.trim() || 'AGM001';
    const nombre = this.form.get('nombre')?.value?.trim() || 'Agmunsen';
    const edad = this.form.get('edad')?.value || 40;

    this.astronautaActual = new Astronauta(id, nombre, edad);
    this.visible = false;
    this.misionService.establecerAstronauta(this.astronautaActual);
  }
}
