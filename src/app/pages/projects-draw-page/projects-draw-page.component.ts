import { Component, Input, OnInit } from '@angular/core';
import { AssetProviderService } from '../../services/asset-provider/asset-provider.service';
import { Observable, of } from 'rxjs';
import { Group } from '../../models/group';
import { Student } from '../../models/student';
import { GroupsStorageService } from '../../services/groups-storage-service/groups-storage.service';
import { DrawerService } from '../../services/drawer/drawer.service';

@Component({
  selector: 'app-projects-draw-page',
  standalone: true,
  imports: [],
  templateUrl: './projects-draw-page.component.html',
  styleUrl: './projects-draw-page.component.css'
})
export class ProjectsDrawPageComponent implements OnInit {
  projects$: Observable<string[]> = of([]);
  groups?: Group<Student>[];
  currentGroupId: string = '';

  constructor(
    private assetProvider: AssetProviderService,
    private groupStorage: GroupsStorageService,
    private drawer: DrawerService
  ){ }

  ngOnInit(): void {
    this.projects$ = this.assetProvider.getProjectsData$();
    this.groups = this.groupStorage.getAllGroups() ?? undefined;
    if(this.groups){
      this.currentGroupId = this.groups[0].id;
    }
  }

  addProject(groupId: string): void{
    this.projects$.subscribe((projects) => {
      const selected = [...this.getSelectedProjects()];
      const remained = projects.filter((project) => !selected.find( s => s === project));
      const drawn = this.drawer.draw(remained);
      const current_group = this.groupStorage.getGroupById(groupId);
      if(!current_group){
        throw new Error('Group not found!');
      }
      current_group.details.project = drawn;
      this.groupStorage.updateGroup(groupId, current_group.details);
    });
  }

  getSelectedProjects(): string[]{
    const selected: string[] = [];
    if(!this.groups) {
      return selected;
    }
    this.groups?.forEach((group) => {
      selected.push(group.details.project);
    });
    return selected;
  }
}
