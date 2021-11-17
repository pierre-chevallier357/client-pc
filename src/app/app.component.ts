import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedStrategie: string;
  strategiesList: string[] = [
    'Donnant donnant',
    'Donnant donnant/aléatoire',
    'Donnant pour deux donnants et aléatoire',
    'Donnant pour deux donnants',
    'Sondeur naïf',
    'Sondeur repentant',
    'Pacificateur naïf',
    'Vrai pacificateur',
    'Aléatoire',
    'Toujours trahir',
    'Toujours coopérer',
    'Rancunier',
    'Pavlov',
    'Pavlov/aléatoire',
    'Adaptatif',
    'Graduel',
    'Donnant donnant soupçonneux',
    'Rancunier doux',
  ];
  selectedButton: string;
  player1Score: number = 0;
  player2Score: number = 0;
  currentTurn: number = 0;
  hasAnyPlayerGivenUp: boolean = false;

  // To communicate with the back-end
  // See this link : https://angular.io/guide/http
}
