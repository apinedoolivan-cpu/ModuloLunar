import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MineralValidationService {

  validar(form: FormGroup): string | null {
    if (!form.valid) {
      const errores: string[] = [];

      const id = form.get('id')?.value?.trim();
      const nombre = form.get('nombre')?.value?.trim();
      const dureza = form.get('dureza')?.value;
      const tamañoGrano = form.get('tamañoGrano')?.value;
      const tamañoCristal = form.get('tamañoCristal')?.value;
      const temperatura = form.get('temperatura')?.value;

      const regexID = /^[A-Z]{3}[0-9]{3}$/;

      if (!id || !regexID.test(id)) errores.push('El ID debe tener el formato AGM001 (3 letras + 3 números).');
      if (!nombre) errores.push('El nombre es obligatorio.');
      if (dureza < 1 || dureza > 10) errores.push('La dureza debe estar entre 1 y 10.');
      if (tamañoGrano <= 0) errores.push('El tamaño de grano debe ser mayor que 0.');
      if (tamañoCristal < 0 || tamañoCristal > 10) errores.push('El tamaño de cristal debe estar entre 0 y 10.');
      if (temperatura < -100 || temperatura > 100) errores.push('La temperatura debe estar entre -100 y 100 K.');

      return errores.length > 0 ? errores.join(', ') : null;
    }
    return null;
  }
}
