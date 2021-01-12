import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games-service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  games: Observable<Game[]>;

  constructor(private readonly gamesService: GamesService) {}

  ngOnInit(): void {
    this.games = this.gamesService.getGames();
  }
}
