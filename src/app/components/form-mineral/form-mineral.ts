import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Mineral } from '../../models/mineral.model';
import { OrigenMaterialLunar, ClasificacionMaterialLunar, TexturaMaterialLunar } from '../../models/enums.model';
import { Astronauta } from '../../models/astronauta.model';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { MineralValidationService } from '../../services/form-mineral';
import { MineralService } from '../../services/mineral';
import { ICriterioValidacion } from '../../models/interfaces.model';


@Component({
  selector: 'app-form-mineral',
  imports: [ReactiveFormsModule],
  templateUrl: './form-mineral.html',
  styleUrls: ['./form-mineral.scss']
})
export class FormMineralComponent {
  tipoFormulario: 'extendido' | 'reducido' | null = null;
  form!: FormGroup;
  error: string[] | null = null;
  criterio: ICriterioValidacion | null = null;
  astronauta: Astronauta | null = null;

  opcionesOrigen = Object.values(OrigenMaterialLunar);
  opcionesClasificacion = Object.values(ClasificacionMaterialLunar);
  opcionesTextura = Object.values(TexturaMaterialLunar);

  constructor(
    private fb: FormBuilder,
    private misionService: InicioMisionService,
    private mineralValidationService: MineralValidationService,
    private mineralService: MineralService
  ) {}

  ngOnInit() {
    this.misionService.astronauta$.subscribe(a => this.astronauta = a);
    this.misionService.criterio$.subscribe(c => this.criterio = c);
    this.misionService.reiniciar$.subscribe(() => {
    this.reiniciarFormulario();
  });
  }

  seleccionarTipo(tipo: 'extendido' | 'reducido') {
    this.tipoFormulario = tipo;
    this.crearFormulario();
    this.error = null;
  }

  private crearFormulario() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      origen: ['', Validators.required],
      dureza: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      tamanoGrano: [null, [Validators.required, Validators.min(0.1)]],
      clasificacion: ['', Validators.required],
      tamanoCristal: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      temperatura: [null, [Validators.required]],
      textura: ['', Validators.required], 
      estructura: ['']
    });
  }

  enviar() {
    const mineral = new Mineral(
      this.form.value.id,
      this.form.value.nombre,
      this.form.value.origen,
      this.form.value.dureza,
      this.form.value.tamanoGrano,
      this.form.value.clasificacion,
      this.form.value.tamanoCristal,
      this.form.value.temperatura,
      this.form.value.estructura,
      this.form.value.textura
    );
    const error = this.mineralValidationService.validar(this.form);
    if (error && error.length > 0) {
      this.error = error;
      return;
    }
    this.mineralService.establecerMineral(mineral.capturar());
    this.error = null;
  }
  reiniciarFormulario() {
    this.form.reset();
    this.tipoFormulario = null;
    this.error = null;
  }
}
