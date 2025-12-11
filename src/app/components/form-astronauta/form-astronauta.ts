import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AstronautaValidationService } from '../../services/form-astronauta';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { Astronauta } from '../../models/astronauta.model';
import { ICriterioValidacion } from '../../models/criterios.model';

@Component({
  selector: 'app-form-astronauta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-astronauta.html',
  styleUrls: ['./form-astronauta.scss'],
})
export class FormularioAstronautaComponent {

  form: FormGroup;
  formError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private misionService: InicioMisionService,
    private astronautaService: AstronautaValidationService
  ) {
    this.form = this.fb.group({
      id: ['', [Validators.pattern(/^[A-Z]{3}[0-9]{3}$/)]],
      nombre: [''],
      edad: [null, [Validators.min(18), Validators.max(80)]]
    });
  }

  get criterio(): ICriterioValidacion | null {
    return this.misionService.criterio();
  }

  get astronautaActual(): Astronauta | null {
    return this.misionService.astronauta();
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

    const astronauta = new Astronauta(id, nombre, edad);
    this.misionService.establecerAstronauta(astronauta);
    this.formError = null;
  }

  mostrar(): boolean {
    return this.criterio !== null && this.astronautaActual === null;
  }
}
