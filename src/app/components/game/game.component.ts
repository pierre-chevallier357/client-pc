import { Router } from '@angular/router';
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
  opponentsLastTurn: string;
  playerScore: number = 0;
  numberOfTurns: number;
  turnCounter: number = 1;
  /*
  hasPlayerGivenUp: boolean = false;
  */
  playersIds: number[];
  pushedGiveUpButton: boolean = false;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getNumberOfTurns();
    this.getPlayerId();
    this.getGameId();
    this.getNumberOfTurns();
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
    await this.playerService.sendTurnDecision(this.getGameId(), this.getPlayerId(), this.selectedDecision);
  }

  async playTheTurn() {
    await this.playerService.playTheTurn(this.getGameId(), this.getPlayerId());
  }

  async getPlayerScore(): Promise<number> {
    let turnResult = await this.playerService.getPlayerScore(this.getGameId(), this.getPlayerId());
    return turnResult;
  }

  async getOpponentsLastTurn(): Promise<string> {
    let opponentsLastTurn = await this.playerService.getOpponentsLastTurn(this.getGameId(), this.getPlayerId());
    return opponentsLastTurn;
  }

  async playTurnAndGetResults() {
    await this.sendTurnDecision();
    await this.playTheTurn();
    let playerScore = await this.getPlayerScore();
    this.playerScore = playerScore;
    let opponentsLastTurn = await this.getOpponentsLastTurn();
    this.opponentsLastTurn = opponentsLastTurn;
    if (this.turnCounter === this.numberOfTurns) {
      this.gameService.getGameResults(this.getGameId(), this.getPlayerId());
      this.router.navigateByUrl('/game-results');
    } else {
      this.incrementTurnCounter();
    }
  }

  incrementTurnCounter() {
    this.turnCounter++;
  }

  async getNumberOfTurns() {
    this.numberOfTurns = await this.gameService.getNumberOfTurns(this.getGameId());
  }
}
