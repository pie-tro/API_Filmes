import { Routes } from '@angular/router';
import { Filmes } from './filmes/filmes';
import { Diretores } from './diretores/diretores';
import { Home } from './home/home';

export const routes: Routes = [
    {path: 'filmes', component: Filmes},
    {path: 'diretores', component: Diretores},
    {path: '', component: Home}
];
