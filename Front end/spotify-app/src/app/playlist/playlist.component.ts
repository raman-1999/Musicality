import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Song } from '../model/song';
import { AuthenticationService } from '../services/authentication.service';
import { SongService } from '../services/songDetails.service';
import { userDetails } from '../model/userdetails';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private auth: AuthenticationService, private songs: SongService, private snackBar: MatSnackBar) { }
  user: userDetails = {};
  song: Song = {}
  audio = new Audio();

  songDetails: Song[] = [];
  songIds: [] = []

  isMiniPlayer = false;
  isPlaying: boolean = false;
  isPageSize:boolean = true;

  pageNumber: number = 0;
  absoluteIndex: number = 0;

  email: any = localStorage.getItem("email");

  ngOnInit(): void {
    this.songs.refresh$.subscribe(() => {
      this.userLikedSongs();
      // this.userLikedSongIds();
    });
    this.userLikedSongs();
    // this.userLikedSongIds();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  songList?: Observable<any>;
  dataSource = new MatTableDataSource<Song>();

  userLikedSongs() {
    this.songs.getSongsForUser(this.email).subscribe(data => {
      this.songDetails = data;
      this.dataSource = new MatTableDataSource<Song>(this.songDetails);
      this.dataSource.paginator = this.paginator;
      this.songList = this.dataSource.connect();
      for(let i=0;i<this.songDetails.length;i++){
        this.songDetails[i].songIndex = i;
      }
      console.log(this.songDetails);
    })
  }

  currentAudio = new Audio();

  unlike(email?: string, name?: string) {
    for (let i = 0; i < this.songDetails.length; i++) {
      if (this.songDetails[i].pseudoName === name) {
        if(this.song.pseudoName === name){
          this.isMiniPlayer = false
          let audio = <HTMLAudioElement>document.getElementById('audio');
          audio.pause()
        }
        this.songs.deleteSongForUser(this.email, name).subscribe();
        this.audio.pause();
        this.isPlaying = false;
        this.snackBar.open('Song removed from melodies', 'OK', {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      }
    }
  }

  sendSongToMiniPlayer(index: number) {
    this.isMiniPlayer = true;
    this.isPlaying = true;
    this.absoluteIndex = 6 * (this.pageNumber) + index
    if(this.absoluteIndex > this.songDetails.length){
      this.absoluteIndex = this.absoluteIndex - 6
    }
    if (this.song == null) {
      this.song = this.songDetails[this.absoluteIndex];
      // this.song.songIndex = this.absoluteIndex;
      // this.song = this.songDetails[index];
      // this.song.songIndex = index;
    }
    else {
      this.song = {}
      this.song = this.songDetails[this.absoluteIndex];
      // this.song.songIndex = this.absoluteIndex;
      // this.song = this.songDetails[index];
      // this.song.songIndex = index;
    }
  }

  songChange(event: any) {
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
      this.userLikedSongs()
      console.log(this.songDetails)
    }
    else {
      this.songDetails = this.songDetails.filter(n => n.trackName?.toLocaleLowerCase().includes(str.toLowerCase()));
      console.log(this.songDetails)
    }
  }

  closePlayer(event: boolean) {
    this.isMiniPlayer = event;
  }

  OnPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex
  }

}
