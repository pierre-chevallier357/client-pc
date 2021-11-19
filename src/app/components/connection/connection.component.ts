import { Router } from '@angular/router';
import { PlayerService } from './../../services/player/player.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent implements OnInit {
  firstname = new FormControl('');
  playerId: number;
  selectedCreateNewGame: boolean = true;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit() {}

  createPlayer() {
    this.playerService.createPlayer(this.firstname.value).then((id) => {
      this.playerId = id;
      this.playerService.setPlayerId(id);
      if (this.selectedCreateNewGame) {
        this.router.navigateByUrl('/create-game');
      } else {
        this.router.navigateByUrl('/join-game');
      }
    });
  }
}
