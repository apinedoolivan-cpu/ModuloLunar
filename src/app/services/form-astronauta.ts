import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AstronautaValidationService {

  validar(form: FormGroup): string[] | null {
    if (!form.valid) {
      const errores: string[] = [];

      const id = form.get('id');
      const edad = form.get('edad');

      if (id?.invalid) errores.push('ID_ASTRO_INVALIDO');
      if (edad?.invalid || edad?.value < 18 || edad?.value > 65) errores.push('EDAD_INVALIDA');

      return errores;
    }
    return null;
  }
}