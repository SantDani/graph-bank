import { TestBed } from '@angular/core/testing';

import { ReadFilesService } from './read-files.service';

describe('ReadFilesService', () => {
  let service: ReadFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
