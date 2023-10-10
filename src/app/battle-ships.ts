export enum TileState {
  EMPTY = 'EMPTY',
  HIT = 'HIT',
  MISS = 'MISS',
}

export enum ShipType {
  CARRIER = 'carrier',
  BATTLESHIP = 'battleship',
  CRUISER = 'cruiser',
  SUBMARINE = 'submarine',
  DESTROYER = 'destroyer',
}

export interface Response {
  shipTypes: ShipTypesResponse,
  layout: Layout[],
  status: {
    code: number,
  }
}

export type Position = [number, number];
export interface Ship {
  type: ShipType,
  total: number,
  hits: number,
  positions: Position[],
}
export type ShipTypesResponse = {
  [key in ShipType]: { size: number; count: number; };
};

export interface Layout {
  ship: ShipType,
  positions: Position[],
}
