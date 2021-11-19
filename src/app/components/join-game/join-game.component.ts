import { GameService } from 'src/app/services/game/game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  gamesIds: number[];
  gamesIdsButtonPressed: boolean = false;
  selectedGameId = new FormControl('');

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  getAllGamesIds() {
    return this.gameService.getAllGamesIds().then((gamesIds) => {
      this.gamesIds = gamesIds.map((game) => game);
      this.gamesIdsButtonPressed = true;
    });
  }
}
