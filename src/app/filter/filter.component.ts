import { FilterService } from './../services/filter.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output('pressed') pressed = new EventEmitter()

  character: string;
  filteredHeroes: any[];
  currentHeroes: any[]
  offset: number = 0;
  finished: boolean = false
  throttle: number = 100;
  scrollDistance: number = 1;
  scrollUpDistance: number = 2;
  direction: string = '';
  
  constructor(private filterService: FilterService  ) { }
  
  filterSearch() {
    this.pressed.emit(this.character)
    this.filterService.filterSearch(this.character)
      .subscribe(response => {
        const data = response.json()
        this.filteredHeroes = data.data.results
      })
  }

  onScrollDown () {
    this.getMoreFilterResults()
    this.direction = 'down'
  }
  
  getMoreFilterResults() {
    this.offset += 50; 
    this.filterService.getMoreFilterResults(this.character, this.offset)
      .subscribe(response => {
        const data = response.json()
        const currentHeroes = data.data.results
        this.concatHeroes(currentHeroes)
      })
  }

  concatHeroes(cur) {
    this.filteredHeroes = this.filteredHeroes.concat(cur)
  }

  ngOnInit() {}

  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path + "/standard_fantastic"
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

}
