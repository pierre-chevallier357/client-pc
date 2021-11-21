import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';
import { PlayerService } from './../../services/player/player.service';
import { Component, OnInit } from '@angular/core';
import { Strategy } from 'src/app/models/strategy/strategy.model';

@Component({
  selector: 'app-select-strategy',
  templateUrl: './select-strategy.component.html',
  styleUrls: ['./select-strategy.component.scss'],
})
export class SelectStrategyComponent implements OnInit {
  gameId: number;
  playerId: number;
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

  constructor(private playerService: PlayerService, private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameId = this.gameService.getGameId();
    this.playerId = this.playerService.getPlayerId();
  }

  async setComputerStrategy() {
    await this.playerService
      .setComputerStrategy(this.gameId, this.playerId, this.selectedStrategy)
      .then(() => this.router.navigateByUrl('/home'));
  }
}
