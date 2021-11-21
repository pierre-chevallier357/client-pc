import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private backendUrl = environment.apiUrl;
  private gameId: number;

  constructor() {}

  async getAllGamesIds(): Promise<number[]> {
    const url = await fetch(this.backendUrl + 'all-partie');
    let concatenatedGames: String = await url.text();
    let games = concatenatedGames.split('&').map(function (item) {
      return parseInt(item, 10);
    });
    games.splice(-1, 1); // Removes the last game which is NaN
    return games;
  }

  async createNewGame(playerId: number, numberOfTurns: number): Promise<number> {
    const url = await fetch(this.backendUrl + 'creation-partie/' + playerId + '&' + numberOfTurns);
    let gameId: number = Number(await url.text());
    this.gameId = gameId;
    return gameId;
  }

  getGameId(): number {
    return this.gameId;
  }

  setGameId(id: number) {
    this.gameId = id;
  }

  async getNumberOfTurns(gameId: number): Promise<number> {
    const url = await fetch(this.backendUrl + 'nb-coups/' + gameId);
    let numberOfTurns: number = Number(await url.text());
    return numberOfTurns;
  }

  async getGameResults(gameId: number, playerId: number): Promise<number[]> {
    const url = await fetch(this.backendUrl + 'resultat-final/' + gameId + '&' + playerId);
    let concatenatedResults: string = await url.text();
    console.log('concatenatedResults:', concatenatedResults);
    let results = concatenatedResults.split('&').map(function (item) {
      return parseInt(item, 10);
    });
    console.log('results:', results);
    return results;
  }
}
