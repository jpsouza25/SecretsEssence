import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AgendarComponent } from './components/agendar/agendar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

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
        path: 'cadastro',
        component: CadastroComponent,
      },
      {
        path: 'agendamentos',
        component:AgendamentosComponent,
      },
      {
        path: 'agendar',
        component: AgendarComponent,
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
      },

  
];
