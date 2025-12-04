import { Component, inject } from '@angular/core';
import { DiretoresInterface, DiretoresService } from './diretores-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diretores',
  imports: [FormsModule],
  templateUrl: './diretores.html',
  styleUrl: './diretores.css',
})
export class Diretores {
 private api = inject(DiretoresService); //

  filmes: DiretoresInterface[] = [];
  carregando = false;
  salvando = false;
  erro = '';

  nome = '';
  idade: number | null = null;
  curso = '';
  notasCsv = '';

  carregar() {
    this.carregando = true;
    this.api.listar().subscribe({
      next: xs => {
        this.filmes = xs;        // antes estava this.alunos
        this.carregando = false;
      },
      error: e => {
        this.erro = e.message ?? 'Falha ao carregar';
        this.carregando = false;
      }
    });
  }

  criar() {
    if (!this.nome || this.idade == null || !this.curso) return;

    const notas = this.notasCsv
      .split(',')
      .map(s => Number(s.trim()))
      .filter(n => !Number.isNaN(n));

    const diretor_: DiretoresInterface = {
      nome: this.nome,
      idade: Number(this.idade),
      curso: this.curso,
      notas
    };

    this.salvando = true;
    this.api.criar(diretor_)  // antes estava aluno_
      .subscribe({
        next: _ => {
          this.nome = '';
          this.idade = null;
          this.curso = '';
          this.notasCsv = '';
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
      error: e => this.erro = e.message ?? 'Falha ao excluir'
    });
  }

  ngOnInit() {
    this.carregar();
  }
}
