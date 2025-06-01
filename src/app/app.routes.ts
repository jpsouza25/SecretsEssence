import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { ListagemComponent } from './components/listagem/listagem.component';

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
    component: HomeComponent,
  },
  {
    path: 'listagem',
    component: ListagemComponent
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent,
  },
  {
    path: 'favoritos',
    component: FavoritosComponent,
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
  },


];
