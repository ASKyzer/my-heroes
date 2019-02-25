import { CommonMethodsService } from './../services/common-methods.service';
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

  constructor(private commonService: CommonMethodsService) {}

  closeSidePanel() {
    this.change.emit(this.isOpen = false)
    this.isOpen = !this.isOpen;
  }
 
  concatImageUrl(hero) {
    return this.commonService.concatImageUrl(hero)
  }

  checkDescriptionAvailability(hero) {
    if (hero.description) return hero.description
    else return "This is a horrible database.  How do you not have images or descriptions of your super heroes?  Especially the image.  Don't you draw all these characters?"
  }

}
