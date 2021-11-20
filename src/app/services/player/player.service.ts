import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private backendUrl = environment.apiUrl;
  private playerId: number;

  constructor() {}

  async getAllPlayersIds(): Promise<number[]> {
    const url = await fetch(this.backendUrl + 'all-joueur-by-id');
    let concatenatedPlayers: String = await url.text();
    let players = concatenatedPlayers.split('&').map(function (item) {
      return parseInt(item, 10);
    });
    players.splice(-1, 1); // Removes the last player which is NaN
    return players;
  }

  async createPlayer(firstname: string): Promise<number> {
    const url = await fetch(this.backendUrl + 'creation-joueur/' + firstname);
    let playerId: number = Number(await url.text());
    this.playerId = playerId;
    return playerId;
  }

  setPlayerId(id: number) {
    this.playerId = id;
  }

  getPlayerId(): number {
    return this.playerId;
  }

  async waitForOtherPlayer(gameId: number, playerId: number): Promise<boolean> {
    const url = await fetch(this.backendUrl + 'attente-connection/' + gameId + '&' + playerId);
    let otherPlayerJoined: boolean = Boolean(await url.text());
    return otherPlayerJoined;
  }

  async joinGame(gameId: number, playerId: number): Promise<boolean> {
    const url = await fetch(this.backendUrl + 'rejoindrePartie/' + gameId + '&' + playerId);
    let playerJoined: boolean = Boolean(await url.text());
    return playerJoined;
  }

  async sendTurnDecision(gameId: number, playerId: number, turn: string): Promise<boolean> {
    const url = await fetch(this.backendUrl + 'coup/' + gameId + '&' + playerId + '&' + turn);
    let turnSent: boolean = Boolean(await url.text());
    return turnSent;
  }

  async playTheTurn(gameId: number, playerId: number): Promise<boolean> {
    const url = await fetch(this.backendUrl + 'partie/' + gameId + '&' + playerId);
    let turnPlayed: boolean = Boolean(await url.text());
    return turnPlayed;
  }

  async getTurnResultAndOpponentsLastTurn(gameId: number, playerId: number): Promise<{ number; string }> {
    const url = await fetch(this.backendUrl + 'resultat/' + gameId + '&' + playerId);
    let concatenatedResult: String = await url.text();
    console.log(concatenatedResult);
    let resultAndOpponentsLastTurn;
    concatenatedResult.split('&').map(function (result, oppLastTurn) {
      resultAndOpponentsLastTurn = { result, oppLastTurn };
      console.log('result:', result, '& oppLastTurn:', oppLastTurn);
    });
    return resultAndOpponentsLastTurn;
  }
}
