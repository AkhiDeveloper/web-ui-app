import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDrawPageComponent } from './group-draw-page.component';

describe('GroupDrawPageComponent', () => {
  let component: GroupDrawPageComponent;
  let fixture: ComponentFixture<GroupDrawPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDrawPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDrawPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
