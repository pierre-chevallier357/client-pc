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
  gamesIdsButtonPressed: boolean = false;
  selectedGameId: number;
  playerId: number;
  disableSelect: boolean = true;

  constructor(private gameService: GameService, private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {}

  getAllGamesIds() {
    return this.gameService.getAllGamesIds().then((gamesIds) => {
      this.gamesIds = gamesIds.map((game) => game);
      this.gamesIdsButtonPressed = true;
    });
  }

  getCreatorGameId() {
    this.playerId = this.playerService.getPlayerId();
  }

  joinGame() {
    let url;
    this.playerService
      .joinGame(this.selectedGameId, this.playerId)
      .then(() => this.router.navigateByUrl('game/' + this.selectedGameId));
  }
}
