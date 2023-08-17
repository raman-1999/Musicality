import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SongService } from '../services/songDetails.service';
import { Song } from '../model/song';
import { DataServiceService } from '../services/data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.css']
})
export class MiniPlayerComponent implements OnInit, OnChanges {

  constructor(private songService: SongService, private dataService: DataServiceService, private snackBar: MatSnackBar, private router: Router) {
    // router.events.subscribe((value) => {
    //   this.closePlayer();
    // })
  }

  @Input() song: Song = {};
  @Output() songEvent = new EventEmitter();
  @Output() exitPlayer = new EventEmitter();
  // audio = new Audio();

  songIds: [] = [];

  index?: number = 0
  musicIndex?: number = 0;
  volume: number = 50

  songId: string = ""
  trackName?: string = ""
  artistName?: string = ""
  imageId?: string = ""
  @Input() str: string = ""

  email: any = localStorage.getItem("email");

  isMute: boolean = false;
  isPlaying: boolean = false;

  ngOnInit(): void {

    const soundSVG = `<path d="M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm11.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z"/>`
    const muteSVG = `<path d="M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm15.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z"/>`
    const root = <HTMLInputElement>document.querySelector(':root')
    const volume = <HTMLInputElement>document.querySelector('#volume')
    const soundPicto = <HTMLInputElement>document.querySelector('#sound-picto')
    const slider = <HTMLInputElement>document.querySelector('#sound-slider')
    const sliderContainer = <HTMLInputElement>document.querySelector('#sound-slider__container')

    function handleRangeUpdate(el: any) {
      if (el.target) { el = el.target }
      volume.innerHTML = el.value
      root.style.setProperty('--percentage', `${el.value * 100 / (el.max - el.min)}%`)
      el.value > 0 ? soundPicto.innerHTML = soundSVG : soundPicto.innerHTML = muteSVG
    }

    handleRangeUpdate(slider)

    //toggle the volume 
    let lastVolume = 50
    function toggleMute() {
      if (Number(slider.value) > 0) {
        lastVolume = Number(slider.value)
        slider.value = "0"
        handleRangeUpdate(slider)
      } else {
        slider.value = String(lastVolume)
        handleRangeUpdate(slider)
      }
    }

    slider.addEventListener('input', handleRangeUpdate)
    soundPicto.addEventListener('click', toggleMute)

    /* inspired by https://codepen.io/Hyperplexed/pen/MWQeYLW */
    sliderContainer.onmousemove = e => {
      const rect = sliderContainer.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top

      sliderContainer.style.setProperty("--mouse-x", `${x}px`)
      sliderContainer.style.setProperty("--mouse-y", `${y}px`)
    }
  }

  ngOnChanges(): void {
    const progressBar = <HTMLInputElement>document.querySelector('.progress-bar'),
      progressArea = <HTMLInputElement>document.querySelector('.progress-area'),
      repeatBtn = <HTMLInputElement>document.querySelector('.fa-repeat')
    let musicTime = <HTMLInputElement>document.querySelector('.current'),
      musicTotal = <HTMLInputElement>document.querySelector('.total'),
      currentAudio = <HTMLAudioElement>document.getElementById('audio');

    if (this.router.url === '/playlist') {
      console.log(this.song)
      const likeBtn = <HTMLInputElement>document.querySelector('.fa');
      // likeBtn.classList.remove('fa');
      // likeBtn.classList.add('fa-solid');
      likeBtn.classList.add('active');

      this.songService.getSongIdsForUser(this.email).subscribe({
        next: (data: any) => {
          this.songIds = data;
          this.index = this.song.songIndex
          this.musicIndex = this.song.songIndex
          this.songId = this.songIds[this.index!];
          currentAudio.setAttribute('src', `http://localhost:8091/downloadSong/${this.songId}`);
          currentAudio.play()
          if (this.isPlaying === false) {
            this.closePlayer()
          }
        },
        error: (err) => {
          alert("SERVER ERROR !");
        },
      })
    }
    else {
      if (this.str == "") {
        this.songService.getSongs().subscribe({
          next: (data: any) => {
            this.songIds = data;
            this.index = this.song.songIndex
            this.musicIndex = this.song.songIndex
            this.songId = this.songIds[this.index!];
            console.log(this.musicIndex)
            // this.audio.src = `http://localhost:8091/downloadSong/${this.songId}`
            currentAudio.setAttribute('src', `http://localhost:8091/downloadSong/${this.songId}`);
            // this.audio.play();
            currentAudio.play()
            if (this.isPlaying === false) {
              this.closePlayer()
            }
          },
          error: (err) => {
            alert("SERVER ERROR !");
          }
        })
      }
      else {
        this.songService.getSongsByName(this.str).subscribe({
          next: (data: any) => {
            this.songIds = data;
            this.index = this.song.songIndex
            this.musicIndex = this.song.songIndex
            this.songId = this.songIds[this.index!];
            console.log(this.musicIndex)
            // this.audio.src = `http://localhost:8091/downloadSong/${this.songId}`
            currentAudio.setAttribute('src', `http://localhost:8091/downloadSong/${this.songId}`);
            // this.audio.play();
            currentAudio.play()
            if (this.isPlaying === false) {
              this.closePlayer()
            }
          },
          error: (err) => {
            alert("SERVER ERROR !");
          }
        })
      }
    }

    currentAudio.addEventListener('timeupdate', () => {
      const duration = currentAudio.duration,
        currentTime = currentAudio.currentTime;

      let progressWidth = (currentTime / duration) * 100;
      progressBar.style.width = `${progressWidth}%`;
      let audioTime = currentAudio.duration,
        totalMin = Math.floor(audioTime / 60),
        totalSec = Math.floor(audioTime % 60)
      if (totalSec < 10) {
        musicTotal.innerHTML = `${totalMin}:0${totalSec}`;
      }
      else {
        musicTotal.innerHTML = `${totalMin}:${totalSec}`;
      }

      let cMin = Math.floor(currentTime / 60),
        cSec = Math.floor(currentTime % 60)
      if (cSec < 10) {
        musicTime.innerHTML = `${cMin}:0${cSec}`;
      }
      else {
        musicTime.innerHTML = `${cMin}:${cSec}`;
      }


      if (duration === currentTime) {
        if (repeatBtn.classList.contains('active')) {
          currentAudio.currentTime = 0
          // this.audio.play()
          currentAudio.play()
        }
        else {
          this.next()
        }
      }
    })

    progressArea.addEventListener('click', (e) => {
      let progress = progressArea.clientWidth;
      let clickLocation = e.offsetX;
      currentAudio.currentTime = (clickLocation / progress) * currentAudio.duration;
    });

    const likeBtn = <HTMLInputElement>document.querySelector('.fa-heart');
    likeBtn.classList.add('fa-regular');
    likeBtn.classList.remove('fa-solid');
    likeBtn.classList.remove('active');

    this.trackName = this.song?.trackName;
    this.artistName = this.song?.artistName;
    this.imageId = this.song?.trackId

    this.isPlaying = true;
  }

  playSong() {
    this.isPlaying = true;
    // this.audio.play();
    let currentAudio = <HTMLAudioElement>document.getElementById('audio');
    currentAudio.play();
    console.log('playing')
  }

  pauseSong() {
    this.isPlaying = false;
    let currentAudio = <HTMLAudioElement>document.getElementById('audio');
    currentAudio.pause();
    // this.audio.pause();
    console.log('paused')
  }

  previous() {
    let currentSongIndex = this.musicIndex;
    if (currentSongIndex != undefined || currentSongIndex != null) {
      this.songEvent.emit(currentSongIndex - 1);
    }
  }

  next() {
    let currentSongIndex = this.musicIndex;
    if (currentSongIndex != undefined || currentSongIndex != null) {
      let emitValue = currentSongIndex + 1;
      if (emitValue == this.songIds.length) {
        this.songEvent.emit(0);
      }
      else {
        this.songEvent.emit(emitValue);
      }
    }
  }

  liked(email: any, songId: string, songDetails: Song) {

    this.songService.addSongForUser(email, songId, songDetails).subscribe({
      next: data => {
        const likeBtn = <HTMLInputElement>document.querySelector('.fa-heart');
        likeBtn.classList.remove('fa-regular');
        likeBtn.classList.add('fa-solid');
        likeBtn.classList.add('active');
        this.snackBar.open('Song added to your melodies', 'OK', {
          duration: 1500,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      },
      error: err => {
        alert('Song is already present in your melodies.');
      },
    });
  }

  repeat() {
    const repeatBtn = <HTMLInputElement>document.querySelector('.fa-repeat');
    repeatBtn.classList.toggle('active')
  }

  muteUnmute() {
    this.isMute = !this.isMute;
    let currentAudio = <HTMLAudioElement>document.getElementById('audio');
    if (this.isMute) {
      currentAudio.volume = 0;
      // this.audio.volume = 0;
    }
    else {
      currentAudio.volume = (this.volume) / 100;
      // this.audio.volume = (this.volume) / 100;
    }
  }

  setVolume() {
    let currentAudio = <HTMLAudioElement>document.getElementById('audio');
    currentAudio.volume = (this.volume) / 100;
    // this.audio.volume = (this.volume) / 100;
  }

  closePlayer() {
    let currentAudio = <HTMLAudioElement>document.getElementById('audio');
    currentAudio.pause();
    currentAudio.currentTime = 0;
    // this.audio.pause();
    // this.audio.currentTime = 0;
    this.isPlaying = false;
    this.exitPlayer.emit(false);
  }
}
