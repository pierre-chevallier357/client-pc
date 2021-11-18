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

  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<Player[]> {
    const url = this.backendUrl + 'all-joueur';
    return this.http.get<Player[]>(url);
  }
}
