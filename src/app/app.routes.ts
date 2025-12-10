import { Routes, RouterModule } from '@angular/router';
import { FormularioAstronautaComponent } from './components/form-astronauta/form-astronauta';
import { SeleccionCriterioComponent } from './components/seleccion-criterio/seleccion-criterio';

export const routes: Routes = [
  { path: 'form-astronauta', component: FormularioAstronautaComponent },
  { path: 'servicio-criterio', component: SeleccionCriterioComponent },
  { path: '', redirectTo: 'servicio-criterio', pathMatch: 'full' },
];

export const AppRouting = RouterModule.forRoot(routes, {
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0], 
});