import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MineralValidationService {

  validar(form: FormGroup): string[] {
    const errores: string[] = [];
    const controles = form.controls;

    const valores = form.value;

    for (const campo of Object.keys(controles)) {
      if (campo.toLowerCase().includes('estructura')) {
        continue; 
      }
      const valor = (controles[campo].value ?? '').toString().trim();

      if (valor === '') {
        const nombreVisible =
          campo.charAt(0).toUpperCase() + campo.slice(1);
        errores.push(`El campo "${nombreVisible}" es obligatorio.`);
      }
    }
    const regexID = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
    if (valores.id && !regexID.test(valores.id)) {
      errores.push('El ID debe seguir el formato LLDDDDLL (ejemplo: AB1234CD).');
    }

    if (valores.dureza < 1 || valores.dureza > 10) {
      errores.push('La dureza debe estar entre 1 y 10.');
    }

    if (valores.tamanoGrano <= 0) {
      errores.push('El tamaño de grano debe ser mayor que 0.');
    }

    if (valores.tamanoCristal < 0 || valores.tamanoCristal > 10) {
      errores.push('El tamaño de cristal debe estar entre 0 y 10.');
    }

    if (valores.temperatura < -100 || valores.temperatura > 100) {
      errores.push('La temperatura debe estar entre -100 y 100 Cº.');
    }

    return errores;
  }
}
