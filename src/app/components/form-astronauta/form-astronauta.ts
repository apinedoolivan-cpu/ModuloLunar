import { Component, ViewChild, ElementRef, inject, computed, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScrollService } from '../../services/scroll';
import { AstronautaValidationService } from '../../services/form-astronauta';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { Astronauta } from '../../models/astronauta.model';
import { TraduccionService } from '../../services/traduccion.service';

@Component({
  selector: 'app-form-astronauta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-astronauta.html',
  styleUrls: ['./form-astronauta.scss'],
})
export class FormularioAstronautaComponent {

  private fb = inject(FormBuilder);
  private misionService = inject(InicioMisionService);
  private astronautaService = inject(AstronautaValidationService);
  private scrollService = inject(ScrollService);
  public traduccionService = inject(TraduccionService);

  criterio = this.misionService.criterio;
  astronauta = this.misionService.astronauta;
  reiniciar = this.misionService.reiniciar;

  form: FormGroup = this.fb.group({
    id: ['', [Validators.pattern(/^[A-Z]{3}[0-9]{3}$/)]],
    nombre: [''],
    edad: [null, [Validators.min(18), Validators.max(80)]]
  });

  formError: string | null = null;

  mostrarForm = computed(() =>
    this.criterio() !== null && this.astronauta() === null
  );

  @ViewChild('errorDiv') errorDiv!: ElementRef<HTMLParagraphElement>;

  constructor() {
    effect(() => {
      this.reiniciar();
      this.reiniciarFormulario();
    });
  }

  aceptarAstronauta() {
    const error = this.astronautaService.validar(this.form);

    if (error) {
      this.formError = this.traduccionService.errorTitulo() + '<br>' + this.traduccionService.errorMessageAstro(error).join('<br>');

      setTimeout(() => {
        if (this.errorDiv) {
          this.scrollService.scrollToElement(this.errorDiv.nativeElement);
        }
      });
      return;
    }

    const id = this.form.get('id')?.value?.trim() || 'AGM001';
    const nombre = this.form.get('nombre')?.value?.trim() || 'Agmunsen';
    const edad = this.form.get('edad')?.value || 40;

    const nuevo = new Astronauta(id, nombre, edad);

    this.misionService.establecerAstronauta(nuevo);
    this.reiniciarFormulario();
  }
  reiniciarFormulario() {
    if (this.form) this.form.reset();
    this.formError = null;
  }
}
