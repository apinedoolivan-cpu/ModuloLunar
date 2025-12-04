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
      const nombre = form.get('nombre');
      const edad = form.get('edad');

      if (id?.invalid) errores.push('El ID debe tener el formato AGM001 (3 letras + 3 números)');
      if (nombre?.invalid || !nombre?.value?.trim()) errores.push('El nombre es obligatorio');
      if (edad?.invalid || edad?.value < 18 || edad?.value > 65) errores.push('La edad debe estar entre 18 y 65');

      return errores.length > 0 ? "ERROR: "+errores.join(', ') : null;
    }
    return null;
  }
}