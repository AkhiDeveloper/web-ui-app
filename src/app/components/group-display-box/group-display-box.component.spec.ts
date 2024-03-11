import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDisplayBoxComponent } from './group-display-box.component';

describe('GroupDisplayBoxComponent', () => {
  let component: GroupDisplayBoxComponent;
  let fixture: ComponentFixture<GroupDisplayBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDisplayBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDisplayBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
