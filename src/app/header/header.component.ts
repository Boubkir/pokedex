import { Component } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchedPokemon: any[];
  constructor(
    public dataService: DataService
  ) {}


}
