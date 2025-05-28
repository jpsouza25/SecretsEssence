import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/agendamentos/home.component';
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
        path: 'home',
        component:HomeComponent,
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
