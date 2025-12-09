import { IMisionable, IPilotable, ISistemaSalida, ICriterioValidacion} from './interfaces.model';
import { Mineral } from './mineral.model';

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
