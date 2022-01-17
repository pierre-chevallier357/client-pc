import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Strategy } from 'src/app/models/strategy/strategy.model';

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

  async getPlayerScore(gameId: number, playerId: number): Promise<number> {
    const url = await fetch(this.backendUrl + 'resultat-tour/' + gameId + '&' + playerId);
    let playerScore: number = Number(await url.text());
    return playerScore;
  }

  async getOpponentsLastTurn(gameId: number, playerId: number): Promise<string> {
    const url = await fetch(this.backendUrl + 'dernier-coup-adv/' + gameId + '&' + playerId);
    let opponentsLastTurn: string = await url.text();
    return opponentsLastTurn;
  }

  async setComputerStrategy(gameId: number, playerId: number, strategy: Strategy): Promise<boolean> {
    const url = await fetch(this.backendUrl + 'strategie/' + gameId + '&' + playerId + '&' + strategy.id);
    let strategySent: boolean = Boolean(await url.text());
    return strategySent;
  }

  async disconnectPlayer(gameId: number, playerId: number) {
    await fetch(this.backendUrl + 'disconnect/' + gameId + '&' + playerId);
  }
}
