import { PlayerService } from './../../services/player/player.service';
import { Component, OnInit } from '@angular/core';
import { Strategy } from 'src/app/models/strategy/strategy.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  selectedStrategy: Strategy;
  strategiesList: Strategy[] = [
    { id: 1, name: 'Aléatoire' },
    { id: 2, name: 'Donnant pour deux donnants' },
    { id: 3, name: 'Donnant pour deux donnants et aléatoire' },
    { id: 4, name: 'Donnant donnant' },
    { id: 5, name: 'Donnant donnant/aléatoire' },
    { id: 6, name: 'Pacificateur naïf' },
    { id: 7, name: 'Rancunier' },
    { id: 8, name: 'Sondeur naïf' },
    { id: 9, name: 'Sondeur repentant' },
    { id: 10, name: 'Toujours coopérer' },
    { id: 11, name: 'Toujours trahir' },
    { id: 12, name: 'Vrai pacificateur' },
  ];
  selectedDecision: string;
  player1Score: number = 0;
  player2Score: number = 0;
  currentTurn: number = 0;
  hasAnyPlayerGivenUp: boolean = false;
  playersIds: number[];

  constructor(private playerService: PlayerService) {
    //this.getPlayers();
  }

  ngOnInit(): void {}

  getPlayers() {
    return this.playerService.getAllPlayersIds().then((response) => {
      this.playersIds = response;
    });
  }
}
