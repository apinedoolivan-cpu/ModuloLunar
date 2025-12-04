import { ISistemaEntrada } from "./interfaces.model";

export abstract class BaseSistemaEntrada implements ISistemaEntrada {
  tipoFormulario: 'extendido' | 'reducido';

  constructor(tipo: 'extendido' | 'reducido') {
    this.tipoFormulario = tipo;
  }

  abstract mostrarFormulario(): void;
}
