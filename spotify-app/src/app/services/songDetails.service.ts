import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Song } from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getSongDetails(): Observable<Array<Song>> {
    return this.http.get<Array<Song>>("http://localhost:8091/allImages");
  }

  getSongs(): Observable<any> {
    return this.http.get("http://localhost:8091/allSongs");
  }

  addSongForUser(email?: string, songId?: string, songDetails?: Song) {
    return this.http.put<Song>(`http://localhost:8091/addTrack/${email}/${songId}`, songDetails);
  }

  getSongsForUser(email?: any): Observable<any> {
    return this.http.get(`http://localhost:8091/app/allTracks/${email}`);
  }

  getSongsByName(name?: string): Observable<any> {
    return this.http.get(`http://localhost:8091/song/${name}`);
  }

  getSongIdsForUser(email?: any): Observable<any> {
    return this.http.get(`http://localhost:8091/app/allSongIds/${email}`);
  }

  deleteSongForUser(email?: string, name?: string) {
    return this.http.delete(`http://localhost:8091/app/deleteTrack/${email}/${name}`).pipe(
      tap(() => {
        return this.refresh$.next();
      })
    );
  }

  public refresh$ = new Subject<void>();

  get refresh() {
    return this.refresh$;
  }

  // miniPlayer:boolean = false;

  // get isMiniPlayer() {
  //   return this.miniPlayer
  // }

  // showMiniPlayer() {
  //   this.miniPlayer = true;
  // }

  // song: Song = {}

  // sendSelectedSong(song:Song) {
  //   if(this.song == null){
  //     this.song = song
  //   }
  //   else {
  //     this.song = {}
  //     this.song = song
  //   }

  // }

  // get selectedSong(){
  //   return this.song;
  // }

  // setSelectedSong():Song{
  //   let status = localStorage.getItem("token");
  //     if(status){
  //       return this.song;
  //     }
  //     return {};
  // }

  // public currentSong = new BehaviorSubject<Song>(this.setSelectedSong());

}
