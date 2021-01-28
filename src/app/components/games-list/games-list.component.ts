import { Component, OnInit } from '@angular/core';
import { GamesService } from '@app/services/games.service';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';

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

  showGenres(genres: string[]) {
    if (genres && Array.isArray(genres)) {
      return genres.join(' / ');
    }
    return 'RPG / First person shooter';
  }
}
