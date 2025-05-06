import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'agendamentos',
        component:AgendamentosComponent,
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
  
];
