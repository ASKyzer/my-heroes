import { FilterService } from './../services/filter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  character: string;
  heroes: any[];
  currentHeroes: any[]
  offset: number = 0;
  finished: boolean = false
  throttle: number = 100;
  scrollDistance: number = 1;
  scrollUpDistance: number = 2;
  direction: string = '';
  
  constructor(private filterService: FilterService  ) { }
  
  filterSearch() {
    this.filterService.filterSearch(this.character)
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
        console.log(this.heroes)
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
    this.heroes = this.heroes.concat(cur)
  }

  ngOnInit() {}

  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path + "/standard_fantastic"
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

}
