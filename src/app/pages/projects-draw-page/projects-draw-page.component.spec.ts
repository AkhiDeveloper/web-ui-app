import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDrawPageComponent } from './projects-draw-page.component';

describe('ProjectsDrawPageComponent', () => {
  let component: ProjectsDrawPageComponent;
  let fixture: ComponentFixture<ProjectsDrawPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDrawPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsDrawPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
