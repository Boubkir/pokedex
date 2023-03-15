import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  lastScrollPosition: any;
  pokemons: any[] = [];
  sortedPokemons: any[] = this.pokemons.sort(function (a, b) {
    return a.id - b.id;
  });

  constructor(private dataService: DataService) {
    this.dataService.searchNext$.subscribe((searchValue) => {
      if (searchValue === '') {
        this.sortedPokemons = this.pokemons.sort((a, b) => a.id - b.id);
      } else {
        this.sortedPokemons = this.pokemons.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadPokemon();
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  loadPokemon(): void {
    this.dataService.getPokemons().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.dataService
          .searchPokemon(result.name)
          .subscribe((newResponse: any) => {
            const existingPokemon = this.pokemons.find(
              (pokemon: any) => pokemon.id === newResponse.id
            );
            if (!existingPokemon) {
              this.pokemons.push(newResponse);
              this.pokemons.sort((a: any, b: any) => a.id - b.id);
              console.log(this.pokemons);
            }
          });
      });
    });
  }

  handleScroll = (): void => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;
    const bottomPosition = documentHeight - 400;
    let scroll = false;

    if (scrollPosition >= bottomPosition && !scroll) {
      this.dataService.minPokemon += 20;
      this.dataService.maxPokemon += 20;
      this.loadPokemon();
      scroll = true;
    }
  };
}
