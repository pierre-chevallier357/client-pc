import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', redirectTo: '/connection', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: 'connection', component: ConnectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
