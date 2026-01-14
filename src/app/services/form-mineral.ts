import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MineralValidationService {

  validar(form: FormGroup): string[] | null {
    const errores: string[] = [];
    const valores = form.value;

    for (const campo of Object.keys(valores)) {

      if (campo === 'estructura') {
        continue;
      }
      const valor = valores[campo];
      if (
        valor === null ||
        (typeof valor === 'string' && valor.trim() === '')
      ) {
        errores.push('CAMPO_' + campo.toUpperCase());
      }
    }

    if (valores.id) {
      const regexID = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
      if (!regexID.test(valores.id)) {
        errores.push('ID_MINERAL_INVALIDO');
      }
    }

    if (valores.dureza !== null) {
      if (valores.dureza < 1 || valores.dureza > 10) {
        errores.push('DUREZA_INVALIDA');
      }
    }

    if (valores.tamanoGrano !== null ) {
      if (valores.tamanoGrano <= 0) {
        errores.push('TAMANO_GRANO_INVALIDO');
      }
    }

    if (valores.tamanoCristal !== null) {
      if (valores.tamanoCristal < 0 || valores.tamanoCristal > 10) {
        errores.push('TAMANO_CRISTAL_INVALIDO');
      }
    }

    if (valores.temperatura !== null) {
      if (valores.temperatura < -100 || valores.temperatura > 100) {
        errores.push('TEMPERATURA_INVALIDA');
      }
    }

    return errores.length > 0 ? errores : null;
  }
}
