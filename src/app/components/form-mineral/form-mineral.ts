import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mineral } from '../../models/mineral.model';
import { MineralValidationService } from '../../services/mineral-form';
//import { MineralService } from '../services/mineral.service';

@Component({
  selector: 'app-form-mineral',
  templateUrl: './form-mineral.html'
})
export class FormMineralComponent {
  form: FormGroup;
  tipoFormulario: 'extendido' | 'reducido' | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private mineralValidation: MineralValidationService,
    //private mineralService: MineralService
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      origen: ['', Validators.required],
      dureza: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      tamañoGrano: [1, Validators.required],
      clasificacion: ['', Validators.required],
      tamañoCristal: [0, Validators.required],
      temperaturaFormacion: [25, Validators.required],
      estructura: [''],
      textura: ['', Validators.required]
    });
  }

  seleccionarTipo(tipo: 'extendido' | 'reducido') {
    this.tipoFormulario = tipo;
  }

  enviarMineral() {
    const mineral = new Mineral(
      this.form.value.id,
      this.form.value.nombre,
      this.form.value.origen,
      this.form.value.dureza,
      this.form.value.tamañoGrano,
      this.form.value.clasificacion,
      this.form.value.tamañoCristal,
      this.form.value.temperaturaFormacion,
      this.form.value.estructura,
      this.form.value.textura
    );

    const error = this.mineralValidation.validar(form);
    if (error) {
      this.error = error;
      return;
    }

//    this.mineralService.setMineral(mineral);
    this.error = null;
  }
}
