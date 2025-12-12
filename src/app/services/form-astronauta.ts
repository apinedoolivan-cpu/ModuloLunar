import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AstronautaValidationService {

  validar(form: FormGroup): string | null {
    if (!form.valid) {
      const errores: string[] = [];

      const id = form.get('id');
      const edad = form.get('edad');

      if (id?.invalid) errores.push('El ID debe tener el formato AGM001 (3 letras + 3 números)');
      if (edad?.invalid || edad?.value < 18 || edad?.value > 65) errores.push('La edad debe estar entre 18 y 65');

      return errores.length > 0 ? "Errores encontrados:<br>" + errores.join('<br>') : null;
    }
    return null;
  }
}