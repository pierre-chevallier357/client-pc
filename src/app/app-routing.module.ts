import { SelectStrategyComponent } from './components/select-strategy/select-strategy.component';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './components/connection/connection.component';
import { GameComponent } from './components//game/game.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { WaitingPlayerComponent } from './components/waiting-player/waiting-player.component';
import { HomeComponent } from './components/home/home.component';
import { GameRulesComponent } from './components/game-rules/game-rules.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'game/:id', component: GameComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'join-game', component: JoinGameComponent },
  { path: 'waiting-player', component: WaitingPlayerComponent },
  { path: 'game-results', component: GameResultsComponent },
  { path: 'select-strategy', component: SelectStrategyComponent },
  { path: 'home', component: HomeComponent },
  { path: 'rules', component: GameRulesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
