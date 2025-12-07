import { IMisionable, IPilotable, ISistemaSalida, ICriterioValidacion} from './interfaces.model';
import { CriterioFactoria } from './criterios.model';
import { Mineral } from './mineral.model';

export class Mision implements IMisionable {
  criterio: ICriterioValidacion;
  constructor(
    public piloto: IPilotable,
    public salida: ISistemaSalida,
    public mineral : Mineral
  ) {
    this.criterio = new CriterioFactoria(this.mineral).criterio;
  }

  analiza(): boolean {
    return this.criterio.esValido(this.mineral);
  }
}
