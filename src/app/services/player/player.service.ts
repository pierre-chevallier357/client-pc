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

  getAllPlayers(): Observable<Player[]> {
    const url = this.backendUrl + 'all-joueur';
    return this.http.get<Player[]>(url);
  }

  createPlayer(firstname: string): Observable<any> {
    console.log(this.backendUrl + 'creation-joueur/' + firstname);
    return this.http.post(this.backendUrl + 'creation-joueur/', firstname);
  }

  setCreatingPlayerId(id: number) {
    this.creatingPlayerId = id;
  }

  getCreatingPlayerId(): number {
    return this.creatingPlayerId;
  }
}
