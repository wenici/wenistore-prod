import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopModeFemmeComponent } from './top-mode-femme.component';

describe('TopModeFemmeComponent', () => {
  let component: TopModeFemmeComponent;
  let fixture: ComponentFixture<TopModeFemmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopModeFemmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopModeFemmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
