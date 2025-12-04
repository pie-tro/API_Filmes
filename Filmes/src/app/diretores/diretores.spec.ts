import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diretores } from './diretores';

describe('Diretores', () => {
  let component: Diretores;
  let fixture: ComponentFixture<Diretores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diretores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diretores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
