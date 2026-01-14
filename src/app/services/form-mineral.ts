import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MineralValidationService {

  validar(form: FormGroup): string[] | null {
    const errores: string[] = [];
    const controles = form.controls;

    const valores = form.value;

    const regexID = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
    if (valores.id && !regexID.test(valores.id)) {
      errores.push('ID_MINERAL_INVALIDO');
    }

    if (valores.dureza < 1 || valores.dureza > 10) {
      errores.push('DUREZA_INVALIDA');
    }

    if (valores.tamanoGrano <= 0) {
      errores.push('TAMANO_GRANO_INVALIDO');
    }

    if (valores.tamanoCristal < 0 || valores.tamanoCristal > 10) {
      errores.push('TAMANO_CRISTAL_INVALIDO');
    }

    if (valores.temperatura < -100 || valores.temperatura > 100) {
      errores.push('TEMPERATURA_INVALIDA');
    }

    return errores.length > 0 ? errores : null;
  }
}
