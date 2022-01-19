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
  areDecisionButtonsEnabled: boolean = true;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getNumberOfTurns();
    this.getPlayerId();
    if (isNaN(this.getPlayerId())) {
      this.router.navigateByUrl('/home');
    }
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
    return this.playerService.getPlayerScore(this.getGameId(), this.getPlayerId());
  }

  async getOpponentsLastTurn(): Promise<string> {
    return this.playerService.getOpponentsLastTurn(this.getGameId(), this.getPlayerId());
  }

  async playTurn() {
    this.areDecisionButtonsEnabled = false;
    await this.sendTurnDecision();
    await this.playTheTurn();
    this.playerScore = await this.getPlayerScore();
    this.opponentsLastTurn = await this.getOpponentsLastTurn();
    this.areDecisionButtonsEnabled = true;
    if (this.turnCounter === this.numberOfTurns) {
      this.getGameResults();
    } else {
      this.incrementTurnCounter();
    }
  }

  getGameResults() {
    this.gameService.getGameResults(this.getGameId(), this.getPlayerId());
    this.router.navigateByUrl('/game-results');
  }

  incrementTurnCounter() {
    this.turnCounter++;
  }

  async getNumberOfTurns() {
    this.numberOfTurns = await this.gameService.getNumberOfTurns(this.getGameId());
  }

  openDialog() {
    this.dialog.open(EndGameDialogComponent);
  }

  disconnectPlayer() {
    this.playerService.disconnectPlayer(this.getGameId(), this.getPlayerId());
  }
}
