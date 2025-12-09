import { IPilotable } from './astronauta.model';
import { ICriterioValidacion } from './criterios.model';
import { ISistemaSalida } from './salida.model';
import { Mineral } from './mineral.model';

export interface IMisionable {
  analiza(): boolean;
}
export class Mision implements IMisionable {
  constructor(

    public criterio: ICriterioValidacion,
    public piloto: IPilotable,
    public salida: ISistemaSalida,
    public mineral : Mineral
  ) {
    
  }

  analiza(): boolean {
    return this.criterio.esValido(this.mineral);
  }
}
