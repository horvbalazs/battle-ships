import { TestBed } from '@angular/core/testing';

import { BattleShipsService } from './battle-ships.service';

describe('BattleShipsService', () => {
  let service: BattleShipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleShipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
