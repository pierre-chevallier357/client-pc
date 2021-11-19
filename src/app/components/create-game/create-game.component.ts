import { Router } from '@angular/router';
import { PlayerService } from './../../services/player/player.service';
import { AfterViewInit, Component } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements AfterViewInit {
  gameId: number;
  playerId: number;
  numberOfTurns: number;
  turnsList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private gameService: GameService, private playerService: PlayerService, private router: Router) {}

  ngAfterViewInit(): void {
    this.getPlayerId();
    this.getGameId();
  }

  async createNewGame(): Promise<boolean> {
    await this.gameService.createNewGame(this.playerId, this.numberOfTurns).then((gameId) => {
      this.gameId = gameId;
      console.log('[CreateGameComponent] gameId:', this.gameId);
    });
    return true;
  }

  getPlayerId() {
    this.playerId = this.playerService.getPlayerId();
  }

  getGameId() {
    this.gameId = this.gameService.getCreatedGameId();
  }

  async waitForOtherPlayer() {
    this.getPlayerId();
    await this.createNewGame();
    this.router.navigateByUrl('/waiting-player');
  }
}
