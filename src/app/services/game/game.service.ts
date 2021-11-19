import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private backendUrl = environment.apiUrl;
  private createdGameId: number;

  constructor() {}

  async getAllGamesIds(): Promise<number[]> {
    const url = await fetch(this.backendUrl + 'all-partie');
    let concatenatedGames: String = await url.text();
    let games = concatenatedGames.split('&').map(function (item) {
      return parseInt(item, 10);
    });
    return games;
  }

  async createNewGame(playerId: number, numberOfTurns: number): Promise<number> {
    const url = await fetch(this.backendUrl + 'creation-partie/' + playerId + '&' + numberOfTurns);
    let gameId: number = Number(await url.text());
    this.createdGameId = gameId;
    return gameId;
  }

  getCreatedGameId(): number {
    return this.createdGameId;
  }
}
