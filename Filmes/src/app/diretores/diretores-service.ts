import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DiretoresInterface {
  _id?: string;
  nome: string;
  idade: number;
  curso: string;
  notas: number[];
}
@Injectable({
  providedIn: 'root',
})
export class DiretoresService {
  private http = inject(HttpClient);
  private base = `http://localhost:3000/filmes`;

  listar():Observable<DiretoresInterface[]>{
    return this.http.get<DiretoresInterface[]>(this.base);
  }
  buscarPorId(id: string): Observable<DiretoresInterface>{
    return this.http.get<DiretoresInterface>(`${this.base}/${id}`);
  }
  criar(diretor:DiretoresInterface): Observable<DiretoresInterface>{
    console.log(diretor);
    return this.http.post<DiretoresInterface>(this.base, diretor);
  }
  atualizar(id: string, diretor: Partial<DiretoresInterface>): Observable<DiretoresInterface>{
    return this.http.patch<DiretoresInterface>(`${this.base}/${id}`,diretor);
  }
  excluir(id: string){
    return this.http.delete(`${this.base}/${id}`);
  }
}
