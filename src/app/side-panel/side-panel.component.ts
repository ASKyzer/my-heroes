import { Http } from '@angular/http';
import { HeroService } from './../services/hero.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeroesComponent } from '../heroes/heroes.component';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {
  @Input('selectedHero') selectedHero: any;
  @Input('isOpen') isOpen: boolean = false;

  @Output('change') change = new EventEmitter()

  // realatedHeroes: any[]
  // heroID: string

  constructor(private http: Http) { 
    // console.log(this.selectedHero)

  }

  closeSidePanel() {
    console.log("close button clicked")
    this.change.emit(this.isOpen = false)
    this.isOpen = !this.isOpen;
  }
 
  concatImageUrl(hero) {
    // console.log(this.selectedHero)
    // console.log(this.isOpen)
    const imgPath = hero.thumbnail.path + "/standard_fantastic"
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }


  // getRelatedHeroes() {
  //   this.heroID = this.selectedHero.id
  //   // console.log(this.heroID)
  //   let url = "https://gateway.marvel.com:443/v1/public/characters/" + this.heroID + "/comics?apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"

  //   this.http.get(url)
  //       .subscribe(response => {
  //         const data = response.json()
  //         let charArr = data.data.results
  //         // console.log(charArr)
  //         let itemsArr = []
  //         let nameArr = []
  //         charArr.forEach(el => {
  //           console.log(el.characters.items)
  //           itemsArr.push(el.characters.items)
  //         })
  //       })
  // }
}
