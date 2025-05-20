import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendar',
  imports: 
  [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule

  ],
  templateUrl: './agendar.component.html',
  styleUrl: './agendar.component.css'
})
export class AgendarComponent {
  etapaAtual: number = 1;
  // etapa 1
  formStep1: FormGroup;
  // etapa 2
  formStep2: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
) {
    this.formStep1 = this.fb.group({
      dataEvento: ['', Validators.required],
      descricao: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.min(2)]],
    });

    this.formStep2 = this.fb.group({
      sala: [],
      periodos: [],
    })
  }
  etapaPassada(etapa: number) {
    this.etapaAtual = etapa;
  }

  proximaEtapa(etapa: number) {
    this.etapaAtual = etapa;
  }
}
