import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loader = true;

  constructor(){  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false
    }, 0);
  }

  // @ViewChild("formComponent", { read: ViewContainerRef })
  // home!: ViewContainerRef;

  // async homeComponent() {
  //   const { HomeComponent } = await import("./home/home.component");
  //   this.home.clear();
  //   this.home.createComponent(HomeComponent);
  // }
}
