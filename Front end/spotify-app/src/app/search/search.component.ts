import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  songName:string = ''

  @Output()
  searchedSong = new EventEmitter<string>();

  search() {
    this.searchedSong.emit(this.songName);
  }

}
