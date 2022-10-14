import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopModeHommeComponent } from './top-mode-homme.component';

describe('TopModeHommeComponent', () => {
  let component: TopModeHommeComponent;
  let fixture: ComponentFixture<TopModeHommeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopModeHommeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopModeHommeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
