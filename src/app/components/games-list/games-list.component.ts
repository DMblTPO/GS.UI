import { Component, OnInit } from '@angular/core';
import { GamesService } from '@app/services/games.service';
import { first } from 'rxjs/operators';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  games: Game[];
  genres: string[];
  selectedGenres: string[] = [];
  searchText = '';

  get isAnySelected() {
    return this.selectedGenres && this.selectedGenres.length > 0;
  }

  get filteredGames() {
    let filteredByGenre = (game: Game) => true;
    let filteredBySearch = (game: Game) => true;
    if (this.isAnySelected) {
      filteredByGenre = (game) => {
        return game.genres.findIndex((g) => this.selectedGenres.includes(g)) > -1;
      };
    }
    if (this.searchText) {
      filteredBySearch = (game) => {
        const name = game.name.toLowerCase();
        return name.indexOf(this.searchText) > -1;
      };
    }
    return this.games.filter(filteredByGenre).filter(filteredBySearch);
  }

  constructor(private readonly gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService
      .getGames()
      .pipe(first())
      .subscribe((x) => {
        this.games = x;
        this.genres = this.games
          .reduce((acc, val) => acc.concat(val.genres), [])
          .filter((v, i, a) => a.indexOf(v) === i);
      });
  }

  showGenres(genres: string[]) {
    if (genres && Array.isArray(genres)) {
      return genres.join(' / ');
    }
    return 'RPG / First person shooter';
  }

  toggleGenre(event: Event, genre: string) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedGenres.push(genre);
      return;
    }
    this.selectedGenres = [...this.selectedGenres.filter((x) => x !== genre)];
  }

  search(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value.toLowerCase();
  }
}
