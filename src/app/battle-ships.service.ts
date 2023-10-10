import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Response} from './battle-ships';

@Injectable({
  providedIn: 'root'
})
export class BattleShipsService {

  constructor(private http: HttpClient) { }

  public getGameData(): Observable<Response> {
    return this.http.get<{data: Response}>('/api/data').pipe(
      map(result => result.data)
    )
  }
}
