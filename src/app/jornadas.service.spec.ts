/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JornadasService } from './jornadas.service';

describe('JornadasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JornadasService]
    });
  });

  it('should ...', inject([JornadasService], (service: JornadasService) => {
    expect(service).toBeTruthy();
  }));
});
