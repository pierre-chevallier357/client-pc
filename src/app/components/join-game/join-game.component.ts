import { Router } from '@angular/router';
import { PlayerService } from './../../services/player/player.service';
import { GameService } from 'src/app/services/game/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  gamesIds: number[];
  selectedGameId: number;
  playerId: number;

  constructor(private gameService: GameService, private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.getAllGamesIds();
  }

  async getAllGamesIds(): Promise<number[]> {
    let receivedGamesIds: number[];
    await this.gameService.getAllGamesIds().then((gamesIds) => {
      receivedGamesIds = gamesIds.map((game) => game);
    });
    this.gamesIds = receivedGamesIds;
    return receivedGamesIds;
  }

  getGameId() {
    this.playerId = this.playerService.getPlayerId();
  }

  joinGame() {
    let url;
    this.playerService
      .joinGame(this.selectedGameId, this.playerId)
      .then(() => this.router.navigateByUrl('game/' + this.selectedGameId));
  }
}
