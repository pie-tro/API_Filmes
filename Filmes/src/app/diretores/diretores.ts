import { Component, inject, OnInit } from '@angular/core';
import { DiretoresInterface, DiretoresService } from './diretores-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diretores',
  imports: [FormsModule],
  templateUrl: './diretores.html',
  styleUrl: './diretores.css',
})
export class Diretores implements OnInit {
 private api = inject(DiretoresService); //

  diretores: DiretoresInterface[] = [];
  carregando = false;
  salvando = false;
  erro = '';


  nome = '';
  nacionalidade = '';
  data_nascimento = '';
  estilo = '';
  ativo = true;

 carregar() {
  this.carregando = true;

  this.api.listar().subscribe({
    next: xs => {
      this.diretores = xs;
      this.carregando = false;
    },
    error: e => {
      this.erro = e.message ?? 'Erro ao carregar';
      this.carregando = false;
    }
  });
}

criar() {
  if (!this.nome || !this.nacionalidade || !this.data_nascimento || !this.estilo || this.ativo == null) {
    return;
  }

  const diretor_: DiretoresInterface = {
    nome: this.nome,
    nacionalidade: this.nacionalidade,
    data_nascimento: this.data_nascimento,
    estilo: this.estilo,
    ativo: this.ativo
  };

  this.salvando = true;

  this.api.criar(diretor_).subscribe({
    next: _ => {
      this.nome = '';
      this.nacionalidade = '';
      this.data_nascimento = '';
      this.estilo = '';
      this.ativo = false;

      this.salvando = false;
      this.carregar();
    },
    error: e => {
      this.erro = e.message ?? 'Falha ao criar';
      this.salvando = false;
    }
  });
}

excluir(id?: string) {
  if (!id) {
    console.log("id inválido: " + id);
    return;
  }

  this.api.excluir(id).subscribe({
    next: _ => this.carregar(),
    error: e => {
      this.erro = e.message ?? 'Falha ao excluir';
    }
  });
}


  ngOnInit() {
    this.carregar();
  }
}
