import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDrawBoxComponent } from './group-draw-box.component';

describe('GroupDrawBoxComponent', () => {
  let component: GroupDrawBoxComponent;
  let fixture: ComponentFixture<GroupDrawBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDrawBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDrawBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
