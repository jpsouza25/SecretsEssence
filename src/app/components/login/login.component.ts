import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
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
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

onSubmit() {
  if (this.loginForm.invalid) {
    return;
  }

  this.carregando = true;
  this.mensagemErro = '';

  const { username, password } = this.loginForm.value;

  if (this.loginService.login(username, password)) {
    this.router.navigate(['/home']);
  } else {
    this.mensagemErro = 'Credenciais inválidas. Verifique:';
    console.log('Tentativa falhou para:', username);
    console.log('Usuários registrados:', this.loginService.obterUsuarios());
  }

  this.carregando = false;
}

  navegarParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  private marcarCamposComoSujos() {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Métodos auxiliares para validação no template
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}