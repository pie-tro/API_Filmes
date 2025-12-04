import { Component, inject } from '@angular/core';
import { FilmesInterface, FilmesService } from './filmesservice';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-filmes',
  imports: [FormsModule, RouterModule],
  templateUrl: './filmes.html',
  styleUrl: './filmes.css',
})
export class Filmes {

  private api = inject(FilmesService); //

  filmes: FilmesInterface[] = [];
  carregando = false;
  salvando = false;
  erro = '';

  titulo ='';
  genero = '';
  ano_lancamento: number | null = null;
  duracao_minutos: number | null = null;
  classificacao_indicativa: number | null = null;
  assistido = false;
  

carregar() {
  this.carregando = true;
  this.api.listar().subscribe({
    next: xs => {
      this.filmes = xs;
      this.carregando = false;
    },
    error: e => {
      this.erro = e.message ?? 'Falha ao carregar';
      this.carregando = false;
    }
  });
}

criar() {
  if (
    !this.titulo ||
    !this.genero ||
    this.ano_lancamento == null ||
    this.duracao_minutos == null ||
    this.classificacao_indicativa == null
  ) return;

  const filme_: FilmesInterface = {
    titulo: this.titulo,
    genero: this.genero,
    ano_lancamento: Number(this.ano_lancamento),
    duracao_minutos: Number(this.duracao_minutos),
    classificacao_indicativa: Number(this.classificacao_indicativa),
    assistido: this.assistido
  };

  this.salvando = true;
  this.api.criar(filme_).subscribe({
    next: _ => {
      // limpar o formulário
      this.titulo = '';
      this.genero = '';
      this.ano_lancamento = null;
      this.duracao_minutos = null;
      this.classificacao_indicativa = null;
      this.assistido = false;

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
    console.log("id com problema " + id);
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
