import { EndGameWarningComponent } from './../end-game-warning/end-game-warning.component';
import { PlayerService } from './../../services/player/player.service';
import { Component, OnInit } from '@angular/core';
import { Strategy } from 'src/app/models/strategy/strategy.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from 'src/app/services/game/game.service';

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
  /*
  playerScore: number = 0;
  currentTurn: number = 0;
  hasPlayerGivenUp: boolean = false;
  */
  playersIds: number[];
  pushedGiveUpButton: boolean = false;

  constructor(private gameService: GameService, private playerService: PlayerService, private snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    await this.getPlayersIds();
    this.getPlayerId();
    this.getGameId();
  }

  async getPlayersIds() {
    return this.playerService.getAllPlayersIds().then((response) => {
      this.playersIds = response;
    });
  }

  getPlayerId() {
    return this.playerService.getPlayerId();
  }

  getGameId() {
    return this.gameService.getGameId();
  }

  openSnackBar() {
    this.pushedGiveUpButton = true;
    this.snackBar.openFromComponent(EndGameWarningComponent, {
      duration: 8000,
    });
  }

  async sendTurnDecision() {
    console.log(
      'gameId:',
      this.getGameId(),
      '& playerId:',
      this.getPlayerId(),
      '& selectedDecision:',
      this.selectedDecision
    );
    await this.playerService
      .sendTurnDecision(this.getGameId(), this.getPlayerId(), this.selectedDecision)
      .then(() => this.playTheTurn());
  }

  async playTheTurn() {
    this.playerService
      .playTheTurn(this.getGameId(), this.getPlayerId())
      .then(() => this.getTurnResultAndOpponentsLastTurn());
  }

  async getTurnResultAndOpponentsLastTurn() {
    this.playerService.getTurnResultAndOpponentsLastTurn(this.getGameId(), this.getPlayerId());
  }
}
