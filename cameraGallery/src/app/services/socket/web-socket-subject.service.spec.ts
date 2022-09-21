import { TestBed } from '@angular/core/testing';

import { WebSocketSubjectService } from './web-socket-subject.service';

describe('WebSocketSubjectService', () => {
  let service: WebSocketSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
