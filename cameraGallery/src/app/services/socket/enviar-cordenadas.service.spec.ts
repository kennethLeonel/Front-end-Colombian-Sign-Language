import { TestBed } from '@angular/core/testing';

import { EnviarCordenadasService } from './enviar-cordenadas.service';

describe('EnviarCordenadasService', () => {
  let service: EnviarCordenadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarCordenadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
