import { environment } from './../../../environments/environment';
import { Player } from './../../models/player/player.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private backendUrl = environment.apiUrl;
  private creatingPlayerId: number;

  constructor(private http: HttpClient) {}

  async getAllPlayers(): Promise<number[]> {
    const url = await fetch(this.backendUrl + 'all-joueur-by-id');
    let temp: String = await url.text();
    let players = temp.split('&').map(function (item) {
      return parseInt(item, 10);
    });
    return players;
  }

  async createPlayer(firstname: string): Promise<number> {
    const url = await fetch(this.backendUrl + 'creation-joueur/' + firstname);
    let playerId: number = Number(await url.text());
    return playerId;
  }

  setCreatingPlayerId(id: number) {
    this.creatingPlayerId = id;
  }

  getCreatingPlayerId(): number {
    return this.creatingPlayerId;
  }
}
