import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInformatiqueComponent } from './top-informatique.component';

describe('TopInformatiqueComponent', () => {
  let component: TopInformatiqueComponent;
  let fixture: ComponentFixture<TopInformatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopInformatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopInformatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
