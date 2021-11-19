import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private backendUrl = environment.apiUrl;
  private creatingPlayerId: number;

  constructor() {}

  async getAllPlayersIds(): Promise<number[]> {
    const url = await fetch(this.backendUrl + 'all-joueur-by-id');
    let concatenatedPlayers: String = await url.text();
    let players = concatenatedPlayers.split('&').map(function (item) {
      return parseInt(item, 10);
    });
    return players;
  }

  async createPlayer(firstname: string): Promise<number> {
    const url = await fetch(this.backendUrl + 'creation-joueur/' + firstname);
    let playerId: number = Number(await url.text());
    this.creatingPlayerId = playerId;
    return playerId;
  }

  setCreatingPlayerId(id: number) {
    this.creatingPlayerId = id;
  }

  getCreatingPlayerId(): number {
    return this.creatingPlayerId;
  }
}
