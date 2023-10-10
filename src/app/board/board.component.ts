import {Component, OnInit} from '@angular/core';
import {BattleShipsService} from '../battle-ships.service';
import {Position, Ship, TileState} from '../battle-ships';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {
  public readonly TileState = TileState;
  public ships: Ship[] = [];
  public guesses: Position[] = [];
  public tiles: TileState[][] = [];
  constructor(private battleShipsService: BattleShipsService) {
    for (let i = 0; i < 10; i++) {
      this.tiles.push(new Array(10).fill(TileState.EMPTY));
    }
  }

  ngOnInit() {
    this.battleShipsService.getGameData().pipe(
    ).subscribe(({shipTypes, layout, status}) => {
      layout.forEach(item => {
        this.ships.push({
          type: item.ship,
          total: shipTypes[item.ship].size,
          hits: 0,
          positions: item.positions,
        })
      })
    });
  }

  public getHealth(ship: Ship) {
    return ship.total - ship.hits > 0 ? ship.total - ship.hits : 0;
  }

  public takeGuess(a: number, b: number) {
    if (this.guesses.find(guess => guess[0] === a && guess[1] === b)) {
      throw new Error('You\'ve already guessed this.');
    }

    if (a > 9 || b > 9 || a < 0 || b < 0) {
      throw new Error('Invalid guess');
    }

    for (let ship of this.ships) {
      if (this.isHit(ship.positions, a, b)) {
        ship.hits++;
        this.tiles[a][b] = TileState.HIT;
        return;
      } else {
        this.tiles[a][b] = TileState.MISS;
      }
    }
  }

  private isHit(positions: Position[], a: number, b: number) {
    return !!positions.find(pos => pos[0] === a && pos[1] === b);
  }
}
