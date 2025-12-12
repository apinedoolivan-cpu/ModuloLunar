import { Routes, RouterModule } from '@angular/router';
import { SeleccionCriterioComponent } from './components/seleccion-criterio/seleccion-criterio';

export const routes: Routes = [
  { path: '', component: SeleccionCriterioComponent }, 
];

export const AppRouting = RouterModule.forRoot(routes, {
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0], 
});