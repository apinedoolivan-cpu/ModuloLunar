import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioMisionService } from '../../services/inicio-mision.service';
import { Astronauta } from '../../models/astronauta.model';
import { ICriterioValidacion } from '../../models/interfaces.model';

@Component({
  selector: 'app-datos-mision',
  imports: [CommonModule],
  templateUrl: './datos-mision.html',
  styleUrl: './datos-mision.scss',
})

export class DatosMisionComponent implements OnInit {
  astronauta: Astronauta | null = null;
  criterio: ICriterioValidacion | null = null;
  fechaInicio = new Date();

  constructor(private misionService: InicioMisionService) {}

  ngOnInit() {
    this.misionService.astronauta$.subscribe(a => this.astronauta = a);
    this.misionService.criterio$.subscribe(c => this.criterio = c);
    
  }
  
}
