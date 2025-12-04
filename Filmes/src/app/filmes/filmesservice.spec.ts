import { TestBed } from '@angular/core/testing';

import { FilmesService } from './filmesservice';

describe('Filmesservice', () => {
  let service: FilmesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
