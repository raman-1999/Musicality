import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Song } from '../model/song';
import { userDetails } from '../model/userdetails';
import { AuthenticationService } from '../services/authentication.service';
import { SongService } from '../services/songDetails.service';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'

let controls = document.querySelectorAll("audio");
console.log(controls);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService, private songs: SongService, private snackBar: MatSnackBar, private changeDetectorRef: ChangeDetectorRef) { }

  user: userDetails = {};
  songDetails: Song[] = [];
  songIds: [] = []

  song: Song = {}

  isMiniPlayer = false;
  isPlaying: boolean = false;
  isPageSize:boolean = true;

  login$?: Observable<boolean>;

  str:string = "";

  ngOnInit(): void {
    this.allSongs();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  songList?: Observable<any>;
  dataSource = new MatTableDataSource<Song>();

  allSongs() {
    this.songs.getSongDetails().subscribe(data => {
      this.songDetails = data;
      this.dataSource = new MatTableDataSource<Song>(this.songDetails);
      this.dataSource.paginator = this.paginator;
      this.songList = this.dataSource.connect();
    })
    this.songs.getSongs().subscribe(data => {
      this.songIds = data;
    })
  }

  pageNumber: number = 0;
  absoluteIndex: number = 0;

  sendSongToMiniPlayer(index: number) {
    console.log(this.pageNumber)
    if (window.localStorage.getItem("email")) {
      this.login$ = this.auth.isLoggedIn;
      this.isMiniPlayer = true;
      this.absoluteIndex = 6 * (this.pageNumber) + index 
      if(this.absoluteIndex > this.songDetails.length){
        this.absoluteIndex = this.absoluteIndex - 6
      }
      if (this.song == null) {
        this.song = this.songDetails[this.absoluteIndex];
        this.song.songIndex = this.absoluteIndex;
      }
      else {
        this.song = {}
        this.song = this.songDetails[this.absoluteIndex];
        this.song.songIndex = this.absoluteIndex;
      }
    }
    else {
      alert("You are not logged in !")
    }
  }

  songChange(event: number) {
    if(event == 0){
      this.pageNumber = event;
      this.sendSongToMiniPlayer(event);
      this.paginator.firstPage()
    }
    else if (event < 0) {
      event = this.songDetails.length - 1;
      this.sendSongToMiniPlayer(event);
    }
    else {
      this.sendSongToMiniPlayer(event);
    }
  }

  onSongSearched(str: string) {
    if (str === "") {
      this.str = str
      this.allSongs()
    }
    else {
      this.str = str;
      this.songDetails = this.songDetails.filter(n => n.trackName?.toLocaleLowerCase().includes(str.toLowerCase()));
      this.dataSource = new MatTableDataSource<Song>(this.songDetails);
      this.dataSource.paginator = this.paginator;
      this.songList = this.dataSource.connect();
    }
    this.closePlayer(false)
  }

  closePlayer(event: boolean) {
    this.isMiniPlayer = event;
  }

  OnPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
  }

}
