import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private backendUrl = environment.apiUrl;
  private createdGameId: number;
  private joinedGameId: any;

  constructor() {}

  async getAllGamesIds(): Promise<number[]> {
    const url = await fetch(this.backendUrl + 'all-partie');
    let concatenatedGames: String = await url.text();
    let games = concatenatedGames.split('&').map(function (item) {
      return parseInt(item, 10);
    });
    games.splice(-1, 1); // Removes the last "game" which is NaN
    return games;
  }

  async createNewGame(playerId: number, numberOfTurns: number): Promise<number> {
    const url = await fetch(this.backendUrl + 'creation-partie/' + playerId + '&' + numberOfTurns);
    let gameId: number = Number(await url.text());
    this.createdGameId = gameId;
    console.log('[GameService] [createNewGame] createdGameId: ', this.createdGameId);
    return gameId;
  }

  getCreatedGameId(): number {
    console.log('[GameService] [getCreatedGameId] createdGameId: ', this.createdGameId);
    return this.createdGameId;
  }

  getJoinedGameId(): number {
    return this.joinedGameId;
  }

  setJoinedGameId(id: any) {
    this.joinedGameId = id;
  }
}
