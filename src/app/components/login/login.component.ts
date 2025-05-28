import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  carregando = false;
  mensagemErro = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.carregando = true;
      this.mensagemErro = '';

      const { username, password } = this.loginForm.value;

      const loginSucesso = this.loginService.login(username, password);

      if (loginSucesso) {
        this.router.navigate(['/home']);
      } else {
        this.mensagemErro = 'Usuário ou senha inválidos.';
      }

      this.carregando = false;
    }
  }

  navegarParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
