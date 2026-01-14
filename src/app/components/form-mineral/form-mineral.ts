import { Component, ViewChild, ElementRef, inject, computed, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Mineral } from '../../models/mineral.model';
import { OrigenMaterialLunar, ClasificacionMaterialLunar, TexturaMaterialLunar } from '../../models/enums.model';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { MineralValidationService } from '../../services/form-mineral';
import { MineralService } from '../../services/mineral';
import { ScrollService } from '../../services/scroll';
import { TraduccionService } from '../../services/traduccion.service';

@Component({
  selector: 'app-form-mineral',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-mineral.html',
  styleUrls: ['./form-mineral.scss']
})
export class FormMineralComponent {

  private fb = inject(FormBuilder);
  private misionService = inject(InicioMisionService);
  private mineralValidationService = inject(MineralValidationService);
  private mineralService = inject(MineralService);
  private scrollService = inject(ScrollService);
  public traduccionService = inject(TraduccionService);

  form!: FormGroup;
  error: string | null = null;
  tipoFormulario: 'extendido' | 'reducido' | null = null;

  astronauta = this.misionService.astronauta;
  criterio = this.misionService.criterio;
  reiniciar = this.misionService.reiniciar;

  mostrarFormulario = computed(() => this.criterio() !== null && this.astronauta() !== null);

  opcionesOrigen = Object.values(OrigenMaterialLunar);
  opcionesClasificacion = Object.values(ClasificacionMaterialLunar);
  opcionesTextura = Object.values(TexturaMaterialLunar);

  @ViewChild('formReducidoDiv') formReducidoDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('formExtendidoDiv') formExtendidoDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('errorDiv') errorDiv!: ElementRef<HTMLParagraphElement>;

  constructor() {
    effect(() => {
      this.reiniciar();
      this.reiniciarFormulario();
    });
  }

  seleccionarTipo(tipo: 'extendido' | 'reducido') {
    this.tipoFormulario = tipo;
    this.crearFormulario();
    this.error = null;
    
    setTimeout(() => {
      if (tipo === 'reducido' && this.formReducidoDiv) {
        this.scrollService.scrollToElement(this.formReducidoDiv.nativeElement);
      } else if (tipo === 'extendido' && this.formExtendidoDiv) {
        this.scrollService.scrollToElement(this.formExtendidoDiv.nativeElement);
      }
    }, 0);
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
      this.error = this.traduccionService.errorTitulo() + '<br>' + this.traduccionService.errorMessageMineral(error).join('<br>');
      setTimeout(() => {
        if (this.errorDiv) {
          this.scrollService.scrollToElement(this.errorDiv.nativeElement);
        }
      }, 0);
      return;
    }

    this.mineralService.establecerMineral(mineral.capturar());
    this.error = null;

    setTimeout(() => {
      this.scrollService.scrollToAnchor('entrada-sistema');
    }, 0);
  }

  reiniciarFormulario() {
    if (this.form) this.form.reset();
    this.tipoFormulario = null;
    this.error = null;
  }
}
