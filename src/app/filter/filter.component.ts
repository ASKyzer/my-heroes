import { DataService } from './../services/data.service';
import { FilterService } from './../services/filter.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  character: string;
  heroes: any[];
  offset: number = 0;
  finished = false
  throttle = 100;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  

  constructor(private filterService: FilterService  ) { }
  
  filterSearch() {
    this.filterService.filterSearch(this.character)
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
        console.log(this.heroes)
      })
  }

  ngOnInit() {}

  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path + "/standard_fantastic"
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

}
