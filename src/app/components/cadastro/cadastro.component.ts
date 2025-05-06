import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from '../../services/cadastro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  carregando = false;
  mensagemErro = '';

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      firstName: ['', Validators.required],
      birthDate: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      this.carregando = true;
      this.mensagemErro = '';

      const usuarioInfo = {
        ...this.cadastroForm.value,
        image: 'https://i.pravatar.cc/300', // Imagem padrão
      };

      const sucessoCadastro = this.cadastroService.registrar(usuarioInfo);

      if (sucessoCadastro) {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      } else {
        this.mensagemErro = 'Usuário já cadastrado.';
      }

      this.carregando = false;
    }
  }
}
