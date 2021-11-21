import { PlayerService } from './../../services/player/player.service';
import { GameService } from 'src/app/services/game/game.service';
import { Component, OnInit } from '@angular/core';
import { GameResult } from '../../enums/game-result/game-result.enum';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss'],
})
export class GameResultsComponent implements OnInit {
  result = GameResult;
  playerResult: GameResult = GameResult.Tie;
  scores: number[];

  constructor(private gameService: GameService, private playerService: PlayerService) {}

  async ngOnInit(): Promise<void> {
    await this.getScores();
    this.getPlayerResult();
  }

  async getScores() {
    const gameId = this.gameService.getGameId();
    const playerId = this.playerService.getPlayerId();
    this.scores = await this.gameService.getGameResults(gameId, playerId);
    return this.scores;
  }

  getPlayerResult(): GameResult {
    const player1Score = this.scores[0];
    const player2Score = this.scores[1];
    let playerResult: GameResult;
    if (player1Score > player2Score) {
      playerResult = GameResult.Win;
    } else if (player1Score === player2Score) {
      playerResult = GameResult.Tie;
    } else {
      playerResult = GameResult.Loss;
    }
    this.playerResult = playerResult;
    return playerResult;
  }
}
