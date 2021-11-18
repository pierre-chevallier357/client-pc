import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from 'src/app/models/game/game.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    const url = this.backendUrl + 'all-partie';
    return this.http.get<Game[]>(url);
  }

  createNewGame(playerId: number, numberOfTurns: number): Observable<any> {
    const gameData = {
      playerId: playerId,
      numberOfTurns: numberOfTurns,
    };
    console.log(this.backendUrl + 'creation-partie/' + gameData);
    return this.http.post(this.backendUrl + 'creation-partie/', gameData);
  }
}
