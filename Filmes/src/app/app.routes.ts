import { Routes } from '@angular/router';
import { Filmes } from './filmes/filmes';
import { Diretores } from './diretores/diretores';

export const routes: Routes = [
    {path: 'filmes', component: Filmes},
    {path: 'diretores', component: Diretores},
];
