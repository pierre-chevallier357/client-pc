import { GameService } from 'src/app/services/game/game.service';
import { PlayerService } from './../../services/player/player.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting-player',
  templateUrl: './waiting-player.component.html',
  styleUrls: ['./waiting-player.component.scss'],
})
export class WaitingPlayerComponent implements OnInit {
  playerId: number;
  gameId: number;

  constructor(private playerService: PlayerService, private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.getGameId();
    this.getPlayerId();
    console.log('[WaitingPlayerComponent] gameId: ', this.gameId, 'getPlayerId: ', this.playerId);
    this.waitForOtherPlayer();
  }

  getPlayerId() {
    this.playerId = this.playerService.getPlayerId();
  }

  getGameId() {
    this.gameId = this.gameService.getGameId();
  }

  async waitForOtherPlayer() {
    this.getGameId();
    console.log('[WaitingPlayerComponent] gameId: ', this.gameId);
    this.playerService
      .waitForOtherPlayer(this.gameId, this.playerId)
      .then(() => this.router.navigateByUrl('game/' + this.gameId));
  }
}
