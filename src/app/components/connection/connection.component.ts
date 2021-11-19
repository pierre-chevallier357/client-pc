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

  constructor(private playerService: PlayerService) {}

  ngOnInit() {}

  createPlayer() {
    this.playerService.createPlayer(this.firstname.value).then((id) => {
      this.playerId = id;
      this.playerService.setPlayerId(id);
    });
  }
}
