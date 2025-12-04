import { TestBed } from '@angular/core/testing';

import { DiretoresService } from './diretores-service';

describe('DiretoresService', () => {
  let service: DiretoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiretoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
