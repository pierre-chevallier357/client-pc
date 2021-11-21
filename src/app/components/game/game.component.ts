import { Router } from '@angular/router';
import { EndGameDialogComponent } from './../end-game-dialog/end-game-dialog.component';
import { PlayerService } from './../../services/player/player.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  selectedDecision: string;
  opponentsLastTurn: string;
  playerScore: number = 0;
  numberOfTurns: number;
  turnCounter: number = 1;
  playersIds: number[];
  pushedGiveUpButton: boolean = false;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    public dialog: MatDialog,
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

  openDialog() {
    const dialogRef = this.dialog.open(EndGameDialogComponent);
  }
}
