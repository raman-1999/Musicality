import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPlayerComponent } from './mini-player.component';

describe('MiniPlayerComponent', () => {
  let component: MiniPlayerComponent;
  let fixture: ComponentFixture<MiniPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniPlayerComponent]
    });
    fixture = TestBed.createComponent(MiniPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
