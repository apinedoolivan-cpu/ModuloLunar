import { IMisionable, IPilotable, ISistemaEntrada, ISistemaSalida, ICriterioValidacion} from './interfaces.model';
import { CriterioFactoria } from './criterios.model';
import { Mineral } from './mineral.model';

export class Mision implements IMisionable {
  criterio: ICriterioValidacion;
  mineral: Mineral
  constructor(
    public piloto: IPilotable,
    public entrada: ISistemaEntrada,
    public salida: ISistemaSalida
  ) {
    this.mineral = this.salida.muestra();
    this.criterio = new CriterioFactoria(this.mineral).criterio;
  }

  analiza(): boolean {
    return this.criterio.esValido(this.mineral);
  }
}
