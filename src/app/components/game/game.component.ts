import { PlayerService } from './../../services/player/player.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player/player.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  selectedStrategie: string;
  strategiesList: string[] = [
    'Donnant donnant',
    'Donnant donnant/aléatoire',
    'Donnant pour deux donnants et aléatoire',
    'Donnant pour deux donnants',
    'Sondeur naïf',
    'Sondeur repentant',
    'Pacificateur naïf',
    'Vrai pacificateur',
    'Aléatoire',
    'Toujours trahir',
    'Toujours coopérer',
    'Rancunier',
    'Pavlov',
    'Pavlov/aléatoire',
    'Adaptatif',
    'Graduel',
    'Donnant donnant soupçonneux',
    'Rancunier doux',
  ];
  selectedDecision: string;
  player1Score: number = 0;
  player2Score: number = 0;
  currentTurn: number = 0;
  hasAnyPlayerGivenUp: boolean = false;
  playersIds: number[];

  // To communicate with the back-end
  // See this link : https://angular.io/guide/http

  constructor(private playerService: PlayerService) {
    //this.getPlayers();
  }

  ngOnInit(): void {}

  getPlayers() {
    return this.playerService.getAllPlayers().then((response) => {
      this.playersIds = response;
    });
  }
}
