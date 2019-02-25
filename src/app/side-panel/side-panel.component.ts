import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
  @Input('selectedHero') selectedHero: any;
  @Input('isOpen') isOpen: boolean = false;

  @Output('change') change = new EventEmitter()

  constructor() {}

  closeSidePanel() {
    this.change.emit(this.isOpen = false)
    this.isOpen = !this.isOpen;
  }
 
  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path + "/standard_fantastic"
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

  checkDescriptionAvailability(hero) {
    if (hero.description) return hero.description
    else return "This is a horrible database.  How do you not have images or descriptions of your super heroes?  Especially the image.  Don't you draw all these characters?"
  }

}
