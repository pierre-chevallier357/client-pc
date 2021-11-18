import { PlayerService } from './../../services/player/player.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
  gameId: number;
  creatingPlayerId: number;
  numberOfTurns: number;
  turnsList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private gameService: GameService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayerId();
  }
  /*
  getAllGamesIds() {
    return this.gameService.getAllGames().subscribe((response) => {
      this.gamesIds = response.map((game) => game.id);
    });
  }
*/
  createNewGame() {
    this.gameService.createNewGame(this.creatingPlayerId, this.numberOfTurns).subscribe((game) => {
      console.log(game.id);
      this.gameId = game.id;
    });
  }

  getPlayerId() {
    this.creatingPlayerId = this.playerService.getCreatingPlayerId();
  }
}
