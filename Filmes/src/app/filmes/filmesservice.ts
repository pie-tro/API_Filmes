import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FilmesInterface {
  _id?: string;
  titulo: string;
  genero: string;
  ano_lancamento: number;
  duracao_minutos: number;
  classificacao_indicativa: number;
  assistido: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FilmesService {
  private http = inject(HttpClient);
  private base = `http://localhost:3000/filmes`;

  listar():Observable<FilmesInterface[]>{
    return this.http.get<FilmesInterface[]>(this.base);
  }
  buscarPorId(id: string): Observable<FilmesInterface>{
    return this.http.get<FilmesInterface>(`${this.base}/${id}`);
  }
  criar(filme:FilmesInterface): Observable<FilmesInterface>{
    console.log(filme);
    return this.http.post<FilmesInterface>(this.base, filme);
  }
  atualizar(id: string, filme: Partial<FilmesInterface>): Observable<FilmesInterface>{
    return this.http.patch<FilmesInterface>(`${this.base}/${id}`,filme);
  }
  excluir(id: string){
    return this.http.delete(`${this.base}/${id}`);
  }
}
