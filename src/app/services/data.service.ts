import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  @Input() minPokemon = 0;
  @Input() maxPokemon = 21;
  searchedPokemon: any;
  searchValue: string = '';
  pokemon: any;
  loadingPokemon:any;
  searchNext$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${this.minPokemon}&limit=${this.maxPokemon}`
    );
  }

  searchPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  renderSearchedPokemon(pokemonToSearch: any) {
    this.searchPokemon(pokemonToSearch).subscribe((response: any) => {
      this.searchedPokemon = response;
      console.log(response);
    });
  }
}
